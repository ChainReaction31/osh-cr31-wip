/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/** @constant
    @type {number}
    @default
 */
var INITIAL_BUFFERING_TIME = 3000; // ms time

/**
 * This enumeration contains the whole list of available status for a job.
 * @enum
 * @readonly
 * @type {{CANCEL: string, START: string, STOP: string, NOT_START_YET: string}}
 */
var BUFFER_STATUS = {
  CANCEL: 'cancel',
  START: 'start',
  STOP: 'stop',
  NOT_START_YET: 'notStartYet'
};

/**
 * @classdesc Represents the buffer element which is in charge of synchronizing data.
 * @class
 * @param {Object} options The options object
 * @param {Object} options.replayFactor defines the replay speed of the buffer in order to synchronize data
 * @example
 var buffer = new OSH.Buffer({
    replayFactor: 1
 });
 */
OSH.Buffer = BaseClass.extend({
  initialize:function(options) {
    this.buffers = {};

    this.replayFactor = 1;

    // update values from options
    if(typeof options != "undefined") {
      if(typeof options.replayFactor != "undefined") {
        this.replayFactor = options.replayFactor;
      }
    }

    // define buffer variable

    // defines a status to stop the buffer after stop() calling.
    // If start() method is called, this variable should be set to TRUE
    this.stop = false;
    this.bufferingState = false;
  },

  /**
   * Starts observing the data stream.
   * @memberof OSH.Buffer
   * @instance
   */
  startObservers: function() {
    this.observeId = OSH.Utils.randomUUID();
    this.boundHandlerMethod = this.push.bind(this);
    OSH.EventManager.observe(OSH.EventManager.EVENT.DATA,this.boundHandlerMethod,this.observeId);
  },

  /**
   * Stops observing the data stream.
   * @memberof OSH.Buffer
   * @instance
   */
  stopObservers: function() {
    if(typeof this.observeId != "undefined" || this.observeId !== null) {
      OSH.EventManager.observe(OSH.EventManager.EVENT.DATA, this.boundHandlerMethod,this.observeId);
      this.observeId = undefined;
    }
  },

  /**
   * Starts the buffer and starts the observers.
   * @memberof OSH.Buffer
   * @instance
   */
  start: function() {
    this.stop = false;
    this.startObservers();
    this.startRealTime = new Date().getTime();
    this.processSyncData();
  },

  /**
   * Stops the buffer and stops the observers.
   * @memberof OSH.Buffer
   * @instance
   */
  stop: function() {
    this.stopObservers();
    this.stop = true;
  },

  /**
   * Cancels all current running/pending jobs. This function loop over the
   * datasources and cancel them one by one.
   * @memberof OSH.Buffer
   * @instance
   */
  cancelAll: function() {
    for(var dataSourceId in this.buffers){
      this.cancelDataSource(dataSourceId);
    }
  },

  /**
   * Cancels the dataSource. Cancels means to clear the data contained into the buffer and change the status to CANCEL
   * @param dataSourceId The dataSource to cancel
   * @memberof OSH.Buffer
   * @instance
   */
  cancelDataSource: function(dataSourceId) {
    this.buffers[dataSourceId].buffer = [];
    this.buffers[dataSourceId].status = BUFFER_STATUS.CANCEL;
  },

  /**
   * Starts buffering the dataSource.
   * @param dataSourceId the dataSource to start
   * @memberof OSH.Buffer
   * @instance
   */
  startDataSource: function(dataSourceId) {
    this.buffers[dataSourceId].status = BUFFER_STATUS.NOT_START_YET;
    this.buffers[dataSourceId].lastRecordTime = Date.now();
  },

  /**
   * Starts all dataSources. The method loops over all datasources and
   * calls the {@link OSH.Buffer.startDataSource}.
   * @memberof OSH.Buffer
   * @instance
   */
  startAll: function() {
    for(var dataSourceId in this.buffers){
      this.startDataSource(dataSourceId);
    }
  },

  /**
   * Adds a new dataSource into the buffer.
   * @param dataSourceId The dataSource to add
   * @param options syncMasterTime | bufferingTime | timeOut | name
   * @memberof OSH.Buffer
   * @instance
   */
  addDataSource: function(dataSourceId,options) {
    this.buffers[dataSourceId] = {
        buffer: [],
        syncMasterTime: false,
        bufferingTime: INITIAL_BUFFERING_TIME,
        timeOut: 3000,
        lastRecordTime: Date.now(),
        status: BUFFER_STATUS.NOT_START_YET,
        name: "undefined"
    };

    if(typeof options != "undefined") {
      if(typeof  options.syncMasterTime != "undefined") {
        this.buffers[dataSourceId].syncMasterTime = options.syncMasterTime;
      }

      if(typeof  options.bufferingTime != "undefined") {
        this.buffers[dataSourceId].bufferingTime = options.bufferingTime;
      }
      
      if(typeof  options.timeOut != "undefined") {
          this.buffers[dataSourceId].timeOut = options.timeOut;
        }

      if(typeof  options.name != "undefined") {
        this.buffers[dataSourceId].name = options.name;
      }
    }
  },

  /**
   * Adds an entity which contains one or more dataSources.
   * The dataSources are then added to the buffer using {@link OSH.Buffer.addDataSource}
   * @param entity The entity to add
   * @param options The options object passed to the {@link OSH.Buffer.addDataSource}
   * @memberof OSH.Buffer
   * @instance
   */
  addEntity: function(entity,options) {
    // get dataSources from entity and add them to buffers
    if(typeof  entity.dataSources != "undefined") {
      for(var i =0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i],options);
      }
    }
  },

  /**
   * Pushes a data into the buffer. This method is used as internal method by the {@link OSH.Buffer.startObservers}.
   * The event contains the necessary elements to process the data.
   * @param event The event object received from the OSH.EventManager
   * @param event.dataSourceId The dataSource id to process
   * @param event.syncMasterTime A boolean used to check if the data has to be synchronized with another data. If the value
   * is FALSE, the data will pass through the buffer and send back immediately.
   * @param event.data The raw data provided by the DataSource
   * @param event.data.timeStamp The timeStamp of the data. It will be used in case of the syncMasterTime is set to TRUE.
   * @memberof OSH.Buffer
   * @instance
   */
  push: function(event) {
    var dataSourceId = event.dataSourceId;
    
    // append the data to the existing corresponding buffer
    var currentBufferObj = this.buffers[dataSourceId];
    
    // discard data if it should be synchronized by was too late
    var sync = currentBufferObj.syncMasterTime;
    if (sync && event.data.timeStamp < this.currentTime)
        return;
    
    // also discard if streamwas canceled
    if (currentBufferObj.status == BUFFER_STATUS.CANCEL)
      return;    

    // define the time of the first data as relative time
    if(currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) {
      currentBufferObj.startRelativeTime = event.data.timeStamp;
      currentBufferObj.startRelativeRealTime = new Date().getTime();
      currentBufferObj.status = BUFFER_STATUS.START;
    }

    currentBufferObj.buffer.push(event.data);
    currentBufferObj.lastRecordTime = Date.now();

    if(!sync) {
      this.processData(currentBufferObj,dataSourceId);
    }

  },

  /**
   * [TODO] This is an internal method.
   * @memberof OSH.Buffer
   * @instance
   */
  processSyncData: function() {
    if(!this.bufferingState) {

      var minTimeStampBufferObj = null;
      var minTimeStampDSId = null;
      var minTimeStamp = MAX_LONG;
      var currentBufferObj = null;

      var mustBuffering = false;
      var maxBufferingTime = -1;

      for (var dataSourceId in this.buffers) {
        currentBufferObj = this.buffers[dataSourceId];
        if((currentBufferObj.status == BUFFER_STATUS.START || currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) && currentBufferObj.syncMasterTime) {
          if(currentBufferObj.buffer.length === 0){
            /*if(maxBufferingTime < currentBufferObj.bufferingTime) {
              maxBufferingTime = currentBufferObj.bufferingTime;
            }*/
            var waitTime = currentBufferObj.timeOut - (Date.now() - currentBufferObj.lastRecordTime);
            if (waitTime > 0) {
                window.setTimeout(function () { // to be replaced by setInterval
                   this.processSyncData();
                }.bind(this), waitTime/10.0);
                return;
            } else {
                //console.log("Timeout of data source " + dataSourceId);
            }
          } else if (currentBufferObj.buffer[0].timeStamp < minTimeStamp) {
              minTimeStampBufferObj = currentBufferObj;
              minTimeStampDSId = dataSourceId;
              minTimeStamp = currentBufferObj.buffer[0].timeStamp;
          }
        }
      }

      // re-buffer because at least one dataSource has no data and its status is START
      /*if(maxBufferingTime > -1) {
        this.buffering(currentBufferObj.name,maxBufferingTime);
      } else*/ if(minTimeStampBufferObj !== null) {
        this.currentTime = minTimeStamp;
        this.processData(minTimeStampBufferObj, minTimeStampDSId, function () {
            this.processSyncData();
        }.bind(this));
      } else {
          window.setTimeout(function () {
              this.processSyncData();
          }.bind(this), 1000);
      }
    }
  },

  /**
   * [TODO] This is an internal method.
   * @memberof OSH.Buffer
   * @instance
   */
  processData: function(bufferObj,dataSourceId,fnEndTimeout) {
    // compute waitTime and dispatch data
    var startRelativeTime = bufferObj.startRelativeTime;
    var elapsedTime = new Date().getTime() - bufferObj.startRelativeRealTime;
    var data = bufferObj.buffer.shift();

    var waitTime = (((data.timeStamp-startRelativeTime) / this.replayFactor) - elapsedTime);
    bufferObj.startRelativeTime = data.timeStamp;
    bufferObj.startRelativeRealTime = new Date().getTime();

    if(waitTime > 0) {
      //callback the data after waiting for a time equals to the difference between the two timeStamps
      window.setTimeout(function () {
        //TODO: check if BUFFER TASK isw
        this.dispatchData(dataSourceId,data);
        if(typeof fnEndTimeout != "undefined") {
          fnEndTimeout();
        }
      }.bind(this), waitTime);
    } else {
      this.dispatchData(dataSourceId,data);
      if(typeof fnEndTimeout != "undefined") {
        fnEndTimeout();
      }
    }
  },

  /**
   * Dispatches the data through the EventManager. If the data to process is synchronized, it will launch a {@link OSH.EventManager.EVENT.CURRENT_MASTER_TIME} event
   * with {timeStamp:xxx} as parameter. In all case, it launches a {@link OSH.EventManager.EVENT.DATA}-dataSourceId event with {data:data} as parameter.
   * @param dataSourceId The dataSourceId of the data. It will be used as concatenated String into the fire method.
   * @param data The data to fire
   * @memberof OSH.Buffer
   * @instance
   */
  dispatchData: function(dataSourceId,data) {
    var bufObj = this.buffers[dataSourceId];
    if (bufObj.status != BUFFER_STATUS.CANCEL) {
        if(bufObj.syncMasterTime) {
          OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_MASTER_TIME,
              {
                timeStamp: data.timeStamp,
                dataSourceId: dataSourceId
              });
        }
        OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSourceId, {data : data});
    }
  },

  /**
   * This method is responsible of buffering data, that is to say it will timeOut the whole process to wait after more data.
   * @param name The name of the current dataSource which needs to be buffered
   * @param bufferingTime The buffering time
   * @memberof OSH.Buffer
   * @instance
   */
  buffering: function(name,bufferingTime) {
    OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_START,{name:name});
    this.bufferingState = true;
    window.setTimeout(function(){
      this.bufferingState = false;
      OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_STOP);
      this.processSyncData();
    }.bind(this),bufferingTime);
  }
});