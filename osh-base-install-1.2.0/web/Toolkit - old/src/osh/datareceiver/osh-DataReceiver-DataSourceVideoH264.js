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

/**
 * @classdesc This datasource provides parsing to H264 raw data.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoH264
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var videoDataSource = new OSH.DataReceiver.VideoH264("H264 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        syncMasterTime: false,
        bufferingTime: 1000
  });
 */
OSH.DataReceiver.VideoH264 = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options);
    },

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {function} $super the parseTimeStamp super method
     * @param {ArrayBuffer} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.VideoH264
     * @instance
     */
    parseTimeStamp: function (data) {
        // read double time stamp as big endian
        return new DataView(data).getFloat64(0, false) * 1000;
    },

    /**
     * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
     * @param {function} $super the parseData super method
     * @param {ArrayBuffer} data the data to parse
     * @returns {Uint8Array} the parsed data
     * @memberof OSH.DataReceiver.VideoH264
     * @instance
     */
    parseData: function (data) {
        return new Uint8Array(data, 12, data.byteLength - 12); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
    }
});

