!function () {
    var initializing = !1,
        fnTest = /xyz/.test(function () {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.BaseClass = function () {
    }, BaseClass.extend = function (prop) {
        function BaseClass() {
            !initializing && this.initialize && this.initialize.apply(this, arguments)
        }

        var _super = this.prototype;
        initializing = !0;
        var prototype = new this;
        initializing = !1;
        for (var name in prop) "function" == typeof prop[name] && "function" == typeof _super[name] && fnTest.test(prop[name]) ? prototype[name] = function (name, fn) {
            return function () {
                var tmp = this._super;
                this._super = _super[name];
                var ret = fn.apply(this, arguments);
                return this._super = tmp, ret
            }
        }(name, prop[name]) : prototype[name] = prop[name];
        return BaseClass.prototype = prototype, BaseClass.prototype.constructor = BaseClass, BaseClass.extend = arguments.callee, BaseClass
    }
}();

function isUndefined(object) {
    return void 0 === object
}

function isUndefinedOrNull(object) {
    return void 0 === object || null === object
}
var OSH = {
    version: "dev"
};
window.OSH = OSH, window.OSH.Video = {}, window.OSH.UI = {}, window.OSH.UI.View = {}, window.OSH.Styler = {}, window.OSH.ContextMenu = {}, window.OSH.DataReceiver = {}, window.OSH.DataConnector = {}, window.OSH.Utils = {}, window.OSH.DataSender = {};
!function () {
    var ua = navigator.userAgent.toLowerCase(),
        doc = document.documentElement,
        ie = "ActiveXObject" in window,
        webkit = ua.indexOf("webkit") !== -1,
        phantomjs = ua.indexOf("phantom") !== -1,
        android23 = ua.search("android [23]") !== -1,
        chrome = ua.indexOf("chrome") !== -1,
        gecko = ua.indexOf("gecko") !== -1 && !webkit && !window.opera && !ie,
        win = 0 === navigator.platform.indexOf("Win"),
        mobile = "undefined" != typeof orientation || ua.indexOf("mobile") !== -1,
        msPointer = !window.PointerEvent && window.MSPointerEvent,
        pointer = window.PointerEvent || msPointer,
        ie3d = ie && "transition" in doc.style,
        webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !android23,
        gecko3d = "MozPerspective" in doc.style,
        opera12 = "OTransition" in doc.style,
        touch = !window.L_NO_TOUCH && (pointer || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    OSH.Browser = {
        ie: ie,
        ielt9: ie && !document.addEventListener,
        edge: "msLaunchUri" in navigator && !("documentMode" in document),
        webkit: webkit,
        gecko: gecko,
        android: ua.indexOf("android") !== -1,
        android23: android23,
        chrome: chrome,
        safari: !chrome && ua.indexOf("safari") !== -1,
        win: win,
        ie3d: ie3d,
        webkit3d: webkit3d,
        gecko3d: gecko3d,
        opera12: opera12,
        any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,
        mobile: mobile,
        mobileWebkit: mobile && webkit,
        mobileWebkit3d: mobile && webkit3d,
        mobileOpera: mobile && window.opera,
        mobileGecko: mobile && gecko,
        touch: !!touch,
        msPointer: !!msPointer,
        pointer: !!pointer,
        retina: (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1
    }
}();

function onMouseUpdate(e) {
    absoluteXposition = e.pageX, absoluteYposition = e.pageY
}
var MAX_LONG = Math.pow(2, 53) + 1;
OSH.Utils = function () {
}, OSH.Utils.randomUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = 16 * Math.random() | 0;
        return ("x" == c ? r : 3 & r | 8).toString(16)
    })
}, OSH.Utils.stampUUID = function (obj) {
    return obj._osh_id = obj._osh_id || OSH.Utils.randomUUID(), obj._osh_id
}, OSH.Utils.jsonix_XML2JSON = function (xmlStr) {
    SOS_2_0_Module_Factory();
    return new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]).createUnmarshaller().unmarshalString(xmlStr)
}, OSH.Utils.jsonix_JSON2XML = function (jsonStr) {
    SOS_2_0_Module_Factory();
    return new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]).createMarshaller().marshalString(jsonStr)
}, OSH.Utils.ParseBytes = function (buffer, offset, type) {
    var view = new DataView(buffer);
    return {
        double: function (offset) {
            return {
                val: view.getFloat64(offset),
                bytes: 8
            }
        },
        float64: function (offset) {
            return {
                val: view.getFloat64(offset),
                bytes: 8
            }
        },
        float32: function (offset) {
            return {
                val: view.getFloat32(offset),
                bytes: 4
            }
        },
        signedByte: function (offset) {
            return {
                val: view.getInt8(offset),
                bytes: 1
            }
        },
        signedInt: function (offset) {
            return {
                val: view.getInt32(offset),
                bytes: 4
            }
        },
        signedShort: function (offset) {
            return {
                val: view.getInt16(offset),
                bytes: 2
            }
        },
        unsignedByte: function (offset) {
            return {
                val: view.getUint8(offset),
                bytes: 1
            }
        },
        unsignedInt: function (offset) {
            return {
                val: view.getUint32(offset),
                bytes: 4
            }
        },
        unsignedShort: function (offset) {
            return {
                val: view.getUint16(offset),
                bytes: 2
            }
        }
    }[type](offset)
}, OSH.Utils.ReadData = function (struct, data, offsetBytes) {
    for (var offset = offsetBytes, i = 0; i < struct.fields.length; i++) {
        var currFieldStruct = struct.fields[i];
        if (void 0 !== currFieldStruct.type && null !== currFieldStruct.type) {
            var ret = OSH.Utils.ParseBytes(data, offset, currFieldStruct.type);
            currFieldStruct.val = ret.val, offset += ret.bytes
        } else if (void 0 !== currFieldStruct.count && null !== currFieldStruct.count) {
            if (isNaN(currFieldStruct.count)) {
                var id = currFieldStruct.count,
                    fieldName = struct.id2FieldMap[id];
                currFieldStruct.count = struct.findFieldByName(fieldName).val
            }
            for (var c = 0; c < currFieldStruct.count; c++)
                for (var j = 0; j < currFieldStruct.fields.length; j++) {
                    var field = JSON.parse(JSON.stringify(currFieldStruct.fields[j]));
                    offset = OSH.Utils.ReadData(field, data, offset), currFieldStruct.val.push(field)
                }
        }
    }
    return offset
}, OSH.Utils.GetResultObject = function (resultStructure) {
    for (var result = {}, i = 0; i < resultStructure.fields.length; i++)
        if (void 0 !== resultStructure.fields[i].count) {
            result[resultStructure.fields[i].name] = [];
            for (var c = 0; c < resultStructure.fields[i].count; c++) {
                for (var item = {}, k = 0; k < resultStructure.fields[i].val[c].fields.length; k++) item[resultStructure.fields[i].val[c].fields[k].name] = resultStructure.fields[i].val[c].fields[k].val;
                result[resultStructure.fields[i].name].push(item)
            }
        } else result[resultStructure.fields[i].name] = resultStructure.fields[i].val;
    return result
}, OSH.Utils.isOpera = function () {
    return !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
}, OSH.Utils.isFirefox = function () {
    return "undefined" != typeof InstallTrigger
}, OSH.Utils.isSafari = function () {
    return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0
}, OSH.Utils.isIE = function () {
    return !!document.documentMode
}, OSH.Utils.isChrome = function () {
    return !!window.chrome && !!window.chrome.webstore
}, OSH.Utils.isBlink = function () {
    return (isChrome || isOpera) && !!window.CSS
};
var absoluteXposition = null,
    absoluteYposition = null;
document.addEventListener("mousemove", onMouseUpdate, !1), document.addEventListener("mouseenter", onMouseUpdate, !1), OSH.Utils.getXCursorPosition = function () {
    return absoluteXposition
}, OSH.Utils.getYCursorPosition = function () {
    return absoluteYposition
}, OSH.Utils.isArrayIntersect = function (a, b) {
    return a.filter(function (element) {
            return b.indexOf(element) > -1
        }).length > 0
}, OSH.Utils.isElement = function (o) {
    return "object" == typeof HTMLElement ? o instanceof HTMLElement : o && "object" == typeof o && null !== o && 1 === o.nodeType && "string" == typeof o.nodeName
}, OSH.Utils.isWebWorker = function () {
    return "undefined" != typeof Worker
}, OSH.Utils.takeScreeshot = function (div) {
}, OSH.Utils.removeCss = function (div, css) {
    css = div.className.replace(css, ""), div.className = css
}, OSH.Utils.addCss = function (div, css) {
    div.setAttribute("class", div.className + " " + css)
}, OSH.Utils.removeLastCharIfExist = function (value, char) {
    return void 0 !== typeof value && null !== value && 0 !== value.length && value.endsWith("/") ? value.substring(0, value.length - 1) : value
};
OSH.EventMap = BaseClass.extend({
    initialize: function () {
        this.eventMap = {}
    },
    observe: function (eventName, fnCallback) {
        void 0 !== eventName && void 0 !== fnCallback && (eventName in this.eventMap || (this.eventMap[eventName] = []), this.eventMap[eventName].push(fnCallback))
    },
    fire: function (eventName, properties) {
        if (void 0 !== eventName && eventName in this.eventMap)
            for (var fnCallbackArr = this.eventMap[eventName], i = 0; i < fnCallbackArr.length; i++) fnCallbackArr[i](properties)
    }
});
OSH.EventManager = function () {
};
var eventMap = new OSH.EventMap;
OSH.EventManager.fire = function (eventName, properties) {
    properties.name = eventName, eventMap.fire("osh:" + eventName, properties)
}, OSH.EventManager.observe = function (eventName, fnCallback) {
    eventMap.observe("osh:" + eventName, fnCallback)
}, OSH.EventManager.observeDiv = function (divId, eventName, fnCallback) {
    elem = document.getElementById(divId), elem.addEventListener(eventName, fnCallback)
}, OSH.EventManager.EVENT = {
    DATA: "data",
    SYNC_DATA: "syncData",
    SELECT_VIEW: "selectView",
    CONTEXT_MENU: "contextMenu",
    SHOW_VIEW: "showView",
    CONNECT_DATASOURCE: "connectDataSource",
    DISCONNECT_DATASOURCE: "disconnectDataSource",
    DATASOURCE_UPDATE_TIME: "updateDataSourceTime",
    CURRENT_MASTER_TIME: "currentMasterTime",
    UAV_TAKEOFF: "uav:takeoff",
    UAV_GOTO: "uav:goto",
    UAV_LOOKAT: "uav:lookat",
    UAV_LAND: "uav:land",
    UAV_ORBIT: "uav:orbit",
    LOADING_START: "loading:start",
    LOADING_STOP: "loading:stop",
    ADD_VIEW_ITEM: "addViewItem",
    RESIZE: "resize",
    PTZ_SEND_REQUEST: "ptzSendRequest"
};
var INITIAL_BUFFERING_TIME = 3e3,
    BUFFER_STATUS = {
        CANCEL: "cancel",
        START: "start",
        STOP: "stop",
        NOT_START_YET: "notStartYet"
    };
OSH.Buffer = BaseClass.extend({
    initialize: function (options) {
        this.buffers = {}, this.replayFactor = 1, void 0 !== options && void 0 !== options.replayFactor && (this.replayFactor = options.replayFactor), this.stop = !1, this.bufferingState = !1
    },
    startObservers: function () {
        this.observeId = OSH.Utils.randomUUID(), this.boundHandlerMethod = this.push.bind(this), OSH.EventManager.observe(OSH.EventManager.EVENT.DATA, this.boundHandlerMethod, this.observeId)
    },
    stopObservers: function () {
        void 0 === this.observeId && null === this.observeId || (OSH.EventManager.observe(OSH.EventManager.EVENT.DATA, this.boundHandlerMethod, this.observeId), this.observeId = void 0)
    },
    start: function () {
        this.stop = !1, this.startObservers(), this.startRealTime = (new Date).getTime(), this.processSyncData()
    },
    stop: function () {
        this.stopObservers(), this.stop = !0
    },
    cancelAll: function () {
        for (var dataSourceId in this.buffers) this.cancelDataSource(dataSourceId)
    },
    cancelDataSource: function (dataSourceId) {
        this.buffers[dataSourceId].buffer = [], this.buffers[dataSourceId].status = BUFFER_STATUS.CANCEL
    },
    startDataSource: function (dataSourceId) {
        this.buffers[dataSourceId].status = BUFFER_STATUS.NOT_START_YET, this.buffers[dataSourceId].lastRecordTime = Date.now()
    },
    startAll: function () {
        for (var dataSourceId in this.buffers) this.startDataSource(dataSourceId)
    },
    addDataSource: function (dataSourceId, options) {
        this.buffers[dataSourceId] = {
            buffer: [],
            syncMasterTime: !1,
            bufferingTime: INITIAL_BUFFERING_TIME,
            timeOut: 3e3,
            lastRecordTime: Date.now(),
            status: BUFFER_STATUS.NOT_START_YET,
            name: "undefined"
        }, void 0 !== options && (void 0 !== options.syncMasterTime && (this.buffers[dataSourceId].syncMasterTime = options.syncMasterTime), void 0 !== options.bufferingTime && (this.buffers[dataSourceId].bufferingTime = options.bufferingTime), void 0 !== options.timeOut && (this.buffers[dataSourceId].timeOut = options.timeOut), void 0 !== options.name && (this.buffers[dataSourceId].name = options.name))
    },
    addEntity: function (entity, options) {
        if (void 0 !== entity.dataSources)
            for (var i = 0; i < entity.dataSources.length; i++) this.addDataSource(entity.dataSources[i], options)
    },
    push: function (event) {
        var dataSourceId = event.dataSourceId,
            currentBufferObj = this.buffers[dataSourceId],
            sync = currentBufferObj.syncMasterTime;
        sync && event.data.timeStamp < this.currentTime || currentBufferObj.status != BUFFER_STATUS.CANCEL && (currentBufferObj.status == BUFFER_STATUS.NOT_START_YET && (currentBufferObj.startRelativeTime = event.data.timeStamp, currentBufferObj.startRelativeRealTime = (new Date).getTime(), currentBufferObj.status = BUFFER_STATUS.START), currentBufferObj.buffer.push(event.data), currentBufferObj.lastRecordTime = Date.now(), sync || this.processData(currentBufferObj, dataSourceId))
    },
    processSyncData: function () {
        if (!this.bufferingState) {
            var minTimeStampBufferObj = null,
                minTimeStampDSId = null,
                minTimeStamp = MAX_LONG,
                currentBufferObj = null;
            for (var dataSourceId in this.buffers)
                if (currentBufferObj = this.buffers[dataSourceId], (currentBufferObj.status == BUFFER_STATUS.START || currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) && currentBufferObj.syncMasterTime)
                    if (0 === currentBufferObj.buffer.length) {
                        var waitTime = currentBufferObj.timeOut - (Date.now() - currentBufferObj.lastRecordTime);
                        if (waitTime > 0) return void window.setTimeout(function () {
                            this.processSyncData()
                        }.bind(this), waitTime / 10)
                    } else currentBufferObj.buffer[0].timeStamp < minTimeStamp && (minTimeStampBufferObj = currentBufferObj, minTimeStampDSId = dataSourceId, minTimeStamp = currentBufferObj.buffer[0].timeStamp);
            null !== minTimeStampBufferObj ? (this.currentTime = minTimeStamp, this.processData(minTimeStampBufferObj, minTimeStampDSId, function () {
                this.processSyncData()
            }.bind(this))) : window.setTimeout(function () {
                this.processSyncData()
            }.bind(this), 1e3)
        }
    },
    processData: function (bufferObj, dataSourceId, fnEndTimeout) {
        var startRelativeTime = bufferObj.startRelativeTime,
            elapsedTime = (new Date).getTime() - bufferObj.startRelativeRealTime,
            data = bufferObj.buffer.shift(),
            waitTime = (data.timeStamp - startRelativeTime) / this.replayFactor - elapsedTime;
        bufferObj.startRelativeTime = data.timeStamp, bufferObj.startRelativeRealTime = (new Date).getTime(), waitTime > 0 ? window.setTimeout(function () {
            this.dispatchData(dataSourceId, data), void 0 !== fnEndTimeout && fnEndTimeout()
        }.bind(this), waitTime) : (this.dispatchData(dataSourceId, data), void 0 !== fnEndTimeout && fnEndTimeout())
    },
    dispatchData: function (dataSourceId, data) {
        var bufObj = this.buffers[dataSourceId];
        bufObj.status != BUFFER_STATUS.CANCEL && (bufObj.syncMasterTime && OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_MASTER_TIME, {
            timeStamp: data.timeStamp,
            dataSourceId: dataSourceId
        }), OSH.EventManager.fire(OSH.EventManager.EVENT.DATA + "-" + dataSourceId, {
            data: data
        }))
    },
    buffering: function (name, bufferingTime) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_START, {
            name: name
        }), this.bufferingState = !0, window.setTimeout(function () {
            this.bufferingState = !1, OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_STOP), this.processSyncData()
        }.bind(this), bufferingTime)
    }
});
OSH.DataConnector.DataConnector = BaseClass.extend({
    initialize: function (url) {
        this.url = url, this.id = "DataConnector-" + OSH.Utils.randomUUID()
    },
    getId: function () {
        return this.id
    },
    getUrl: function () {
        return this.url
    }
});
OSH.DataConnector.AjaxConnector = OSH.DataConnector.DataConnector.extend({
    initialize: function (url, properties) {
        this._super(url), this.method = "POST", this.responseType = "arraybuffer", void 0 !== properties && (properties.method && (this.method = properties.method), properties.responseType && (this.responseType = properties.responseType))
    },
    sendRequest: function (request, extraUrl) {
        var self = this,
            xmlhttp = new XMLHttpRequest;
        xmlhttp.timeout = 6e4, null === request ? (void 0 !== extraUrl ? xmlhttp.open("GET", this.getUrl() + "?" + extraUrl, !0) : xmlhttp.open("GET", this.getUrl(), !0), xmlhttp.responseType = this.responseType, xmlhttp.onload = function (oEvent) {
            xmlhttp.response && self.onMessage(xmlhttp.response)
        }, xmlhttp.ontimeout = function (e) {
            console.log("Timeout")
        }, xmlhttp.send(null)) : (xmlhttp.open("POST", this.getUrl(), !0), xmlhttp.setRequestHeader("Content-Type", "text/xml"), xmlhttp.send(request), xmlhttp.onreadystatechange = function () {
            xmlhttp.readyState < 4 || 4 === xmlhttp.readyState && (200 == xmlhttp.status && xmlhttp.status < 300 ? this.onSuccess(xmlhttp.responseText) : this.onError(""))
        }.bind(this))
    },
    onError: function (event) {
    },
    onSuccess: function (event) {
    },
    connect: function () {
        this.sendRequest(null)
    }
});
OSH.DataConnector.WebSocketDataConnector = OSH.DataConnector.DataConnector.extend({
    connect: function () {
        if (!this.init) {
            if (OSH.Utils.isWebWorker()) {
                var url = this.getUrl(),
                    blobURL = URL.createObjectURL(new Blob(["(", function () {
                        function init(url) {
                            ws = new WebSocket(url), ws.binaryType = "arraybuffer", ws.onmessage = function (event) {
                                event.data.byteLength > 0 && self.postMessage(event.data, [event.data])
                            }, ws.onerror = function (event) {
                                ws.close()
                            }
                        }

                        function close() {
                            ws.close()
                        }

                        var ws = null;
                        self.onmessage = function (e) {
                            "close" == e.data ? close() : init(e.data)
                        }
                    }.toString(), ")()"], {
                        type: "application/javascript"
                    }));
                this.worker = new Worker(blobURL), this.worker.postMessage(url), this.worker.onmessage = function (e) {
                    this.onMessage(e.data)
                }.bind(this), URL.revokeObjectURL(blobURL)
            } else this.ws = new WebSocket(this.getUrl()), this.ws.binaryType = "arraybuffer", this.ws.onmessage = function (event) {
                event.data.byteLength > 0 && this.onMessage(event.data)
            }.bind(this), this.ws.onerror = function (event) {
                this.ws.close()
            }.bind(this);
            this.init = !0
        }
    },
    disconnect: function () {
        OSH.Utils.isWebWorker() && null != this.worker ? (this.worker.postMessage("close"), this.worker.terminate(), this.init = !1) : null != this.ws && (this.ws.close(), this.init = !1)
    },
    onMessage: function (data) {
    },
    close: function () {
        this.disconnect()
    }
});
OSH.DataReceiver.DataSource = BaseClass.extend({
    initialize: function (name, properties) {
        this.id = "DataSource-" + OSH.Utils.randomUUID(), this.name = name, this.properties = properties, this.timeShift = 0, this.connected = !1, this.initDataSource(properties)
    },
    initDataSource: function (properties) {
        void 0 !== properties.timeShift && (this.timeShift = properties.timeShift), void 0 !== properties.syncMasterTime ? this.syncMasterTime = properties.syncMasterTime : this.syncMasterTime = !1, void 0 !== properties.bufferingTime && (this.bufferingTime = properties.bufferingTime), void 0 !== properties.timeOut && (this.timeOut = properties.timeOut), "ws" == properties.protocol ? (this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties)), this.connector.onMessage = this.onMessage.bind(this)) : "http" == properties.protocol && (this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties)), this.connector.responseType = "arraybuffer", this.connector.onMessage = this.onMessage.bind(this))
    },
    disconnect: function () {
        this.connector.disconnect(), this.connected = !1, OSH.EventManager.fire(OSH.EventManager.EVENT.DATA + "-" + this.id, {
            dataSourceId: this.id,
            reset: !0
        })
    },
    connect: function () {
        this.connector.connect(), this.connected = !0
    },
    onMessage: function (data) {
        this.onData({
            timeStamp: this.parseTimeStamp(data) + this.timeShift,
            data: this.parseData(data)
        })
    },
    parseTimeStamp: function (data) {
        return (new Date).getTime()
    },
    parseData: function (data) {
        return data
    },
    onData: function (data) {
    },
    getId: function () {
        return this.id
    },
    getName: function () {
        return this.name
    },
    buildUrl: function (properties) {
        var url = "";
        return url += properties.protocol + "://", url += properties.endpointUrl + "?", url += "service=" + properties.service + "&", url += "version=2.0&", url += "request=GetResult&", url += "offering=" + properties.offeringID + "&", url += "observedProperty=" + properties.observedProperty + "&", url += "temporalFilter=phenomenonTime," + properties.startTime + "/" + properties.endTime + "&", properties.replaySpeed && (url += "replaySpeed=" + properties.replaySpeed), properties.responseFormat && (url += "&responseFormat=" + properties.responseFormat), url
    }
});
OSH.DataReceiver.EulerOrientation = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(","),
            yaw = parseFloat(tokens[1]);
        return {
            pitch: parseFloat(tokens[2]),
            roll: parseFloat(tokens[3]),
            heading: yaw
        }
    }
});
OSH.DataReceiver.LatLonAlt = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return {
            lat: parseFloat(tokens[1]),
            lon: parseFloat(tokens[2]),
            alt: parseFloat(tokens[3])
        }
    }
});
OSH.DataReceiver.Nexrad = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(","),
            el = parseFloat(tokens[2]),
            az = parseFloat(tokens[3]),
            rangeToCenterOfFirstRefGate = parseFloat(tokens[4]),
            refGateSize = parseFloat(tokens[5]),
            numRefGates = parseInt(tokens[6]),
            rangeToCenterOfFirstVelGate = parseFloat(tokens[7]),
            velGateSize = parseFloat(tokens[8]),
            numVelGates = parseInt(tokens[9]),
            rangeToCenterOfFirstSwGate = parseFloat(tokens[10]),
            swGateSize = parseFloat(tokens[11]),
            numSwGates = parseInt(tokens[12]),
            i = 13,
            refData = [];
        for (count = 0; count < numRefGates; count++) refData.push(parseFloat(tokens[i++]));
        var velData = [];
        for (count = 0; count < numVelGates; count++) velData.push(parseFloat(tokens[i++]));
        var swData = [];
        for (count = 0; count < numSwGates; count++) swData.push(parseFloat(tokens[i++]));
        return {
            elevation: el,
            azimuth: az,
            rangeToCenterOfFirstRefGate: rangeToCenterOfFirstRefGate,
            refGateSize: refGateSize,
            rangeToCenterOfFirstVelGate: rangeToCenterOfFirstVelGate,
            velGateSize: velGateSize,
            rangeToCenterOfFirstSwGate: rangeToCenterOfFirstSwGate,
            swGateSize: swGateSize,
            reflectivity: refData,
            velocity: velData,
            spectrumWidth: swData
        }
    }
});
OSH.DataReceiver.DataSourceUAHWeather = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return {
            airPres: parseFloat(tokens[1]),
            airTemp: parseFloat(tokens[2]),
            humidity: parseFloat(tokens[3]),
            windSpeed: parseFloat(tokens[4]),
            windDir: parseFloat(tokens[5]),
            rainCnt: parseFloat(tokens[6])
        }
    }
});
OSH.DataReceiver.OrientationQuaternion = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(","),
            qx = parseFloat(tokens[1]),
            qy = parseFloat(tokens[2]),
            qz = parseFloat(tokens[3]),
            qw = parseFloat(tokens[4]),
            ix = 0 * qw + qy * -1 - 0 * qz,
            iy = 0 * qw + 0 * qz - qx * -1,
            iz = qw * -1 + 0 * qx - 0 * qy,
            iw = 0 * -qx - 0 * qy - qz * -1;
        return xp = ix * qw + iw * -qx + iy * -qz - iz * -qy, yp = iy * qw + iw * -qy + iz * -qx - ix * -qz, zp = iz * qw + iw * -qz + ix * -qy - iy * -qx, {
            heading: 90 - 180 / Math.PI * Math.atan2(yp, xp),
            roll: null,
            pitch: null
        }
    }
});
OSH.DataReceiver.VideoH264 = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options)
    },
    parseTimeStamp: function (data) {
        return 1e3 * new DataView(data).getFloat64(0, !1)
    },
    parseData: function (data) {
        return new Uint8Array(data, 12, data.byteLength - 12)
    }
});
OSH.DataReceiver.VideoMjpeg = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options)
    },
    parseTimeStamp: function (data) {
        return 1e3 * new DataView(data).getFloat64(0, !1)
    },
    parseData: function (data) {
        var imgBlob = new Blob([data]);
        return window.URL.createObjectURL(imgBlob.slice(12))
    }
});

function readMP4Info(data) {
    var infos = {
            absoluteTime: 0,
            pts: 0,
            timeScale: 0,
            duration: 0,
            rate: 0
        },
        pos = 60;
    return infos.absoluteTime = new DataView(data, pos, pos + 8).getUint32(0), infos.absoluteTime = 1e3 * (infos.absoluteTime - 2082844800), pos += 8, infos.pts = new DataView(data, pos, pos + 4).getUint32(0), pos += 4, infos.timeScale = new DataView(data, pos, pos + 4).getUint32(0), infos.timeScale = 1 / infos.timeScale, pos += 4, infos.duration = new DataView(data, pos, pos + 4).getUint32(0), pos += 4, infos.rate = new DataView(data, pos, pos + 4).getUint32(0), infos
}

function readNCC(bytes, n) {
    for (var res = "", i = 0; i < n; i++) res += String.fromCharCode(bytes[i]);
    return res
}
OSH.DataReceiver.VideoMp4 = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options), this.absoluteTime = -1
    },
    parseTimeStamp: function (data) {
        if (this.absoluteTime == -1) {
            var infos = readMP4Info(data);
            return this.absoluteTime = infos.absoluteTime, this.timeScale = infos.timeScale, this.absoluteTime
        }
        var infos = readMP4Info(data);
        return 1e3 * infos.pts * this.timeScale + this.absoluteTime
    }
});
OSH.DataReceiver.JSON = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        return new Date(JSON.parse(rec).time).getTime()
    },
    parseData: function (data) {
        var rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))),
            result = {};
        for (var key in rec) "time" !== key && (result[key] = rec[key]);
        return result
    },
    buildUrl: function (properties) {
        var url = "";
        url += properties.protocol + "://", url += properties.endpointUrl + "?", url += "service=" + properties.service + "&", url += "version=2.0&", url += "request=GetResult&", url += "offering=" + properties.offeringID + "&", url += "observedProperty=" + properties.observedProperty + "&";
        var startTime = properties.startTime,
            endTime = properties.endTime;
        return "now" !== startTime && 0 != this.timeShift && "urn:android:device:060693280a28e015-sos" !== properties.offeringID && (startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString(), endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString()), url += "temporalFilter=phenomenonTime," + startTime + "/" + endTime + "&", properties.replaySpeed && (url += "replaySpeed=" + properties.replaySpeed), url += "&responseFormat=application/json"
    }
});
OSH.DataReceiver.Chart = OSH.DataReceiver.DataSource.extend({
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime()
    },
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data)),
            tokens = rec.trim().split(",");
        return tokens.shift(), tokens
    }
});
OSH.DataReceiver.DataReceiverController = BaseClass.extend({
    initialize: function (options) {
        this.options = options, this.initBuffer(), this.dataSourcesIdToDataSources = {}, OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE, function (event) {
            for (var eventDataSourcesIds = event.dataSourcesId, i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                id in this.dataSourcesIdToDataSources && (this.dataSourcesIdToDataSources[id].syncMasterTime && this.updateDataSourceTime(id, new Date(this.buffer.currentTime).toISOString()), this.dataSourcesIdToDataSources[id].connect(), this.buffer.startDataSource(id))
            }
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, function (event) {
            for (var eventDataSourcesIds = event.dataSourcesId, i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                id in this.dataSourcesIdToDataSources && (this.dataSourcesIdToDataSources[id].disconnect(), this.buffer.cancelDataSource(id))
            }
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, function (event) {
            var dataSourcesToReconnect = [];
            for (var id in this.dataSourcesIdToDataSources) {
                var dataSrc = this.dataSourcesIdToDataSources[id];
                dataSrc.syncMasterTime && dataSrc.connected && (dataSrc.disconnect(), this.buffer.cancelDataSource(id), dataSourcesToReconnect.push(id))
            }
            this.buffer.currentTime = Date.parse(event.startTime);
            for (var i = 0; i < dataSourcesToReconnect.length; i++) {
                var id = dataSourcesToReconnect[i],
                    dataSrc = this.dataSourcesIdToDataSources[id];
                this.updateDataSourceTime(id, event.startTime, event.endTime), dataSrc.connect(), this.buffer.startDataSource(id)
            }
        }.bind(this))
    },
    updateDataSourceTime: function (id, startTime, endTime) {
        var dataSource = this.dataSourcesIdToDataSources[id],
            props = dataSource.properties,
            options = dataSource.options;
        void 0 !== startTime && (props.startTime = startTime), void 0 !== endTime && (props.endTime = endTime), dataSource.initDataSource(props, options)
    },
    initBuffer: function () {
        this.buffer = new OSH.Buffer(this.options)
    },
    addEntity: function (entity, options) {
        if (void 0 !== entity.dataSources)
            for (var i = 0; i < entity.dataSources.length; i++) this.addDataSource(entity.dataSources[i], options)
    },
    addDataSource: function (dataSource, options) {
        this.dataSourcesIdToDataSources[dataSource.id] = dataSource, this.buffer.addDataSource(dataSource.id, {
            name: dataSource.name,
            syncMasterTime: dataSource.syncMasterTime,
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut
        }), dataSource.onData = function (data) {
            this.buffer.push({
                dataSourceId: dataSource.getId(),
                data: data
            })
        }.bind(this)
    },
    connectAll: function () {
        this.buffer.start();
        for (var id in this.dataSourcesIdToDataSources) this.dataSourcesIdToDataSources[id].connect()
    }
});
OSH.DataSender.DataSink = BaseClass.extend({
    initialize: function (name, properties, options) {
        "http" == properties.protocol && (this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties)), this.connector.onError = this.onCatchError.bind(this), this.connector.onSuccess = this.onCatchSuccess.bind(this)), this.id = "DataSender-" + OSH.Utils.randomUUID(), this.name = name, this.properties = properties
    },
    sendRequest: function (properties) {
        this.connector.sendRequest(this.buildRequest(properties))
    },
    buildRequest: function (properties) {
        return ""
    },
    buildUrl: function (properties) {
        var url = "";
        return url += properties.protocol + "://", url += properties.endpointUrl
    },
    onCatchError: function (response) {
        this.onError(response)
    },
    onCatchSuccess: function (response) {
        this.onSuccess(response)
    },
    onError: function (response) {
    },
    onSuccess: function (response) {
    },
    getId: function () {
        return this.id
    },
    getName: function () {
        return this.name
    }
});
OSH.DataSender.PtzTasking = OSH.DataSender.DataSink.extend({
    initialize: function (name, properties) {
        this._super(name, properties), OSH.EventManager.observe(OSH.EventManager.EVENT.PTZ_SEND_REQUEST + "-" + this.id, function (event) {
            this.connector.sendRequest(this.buildRequest(this.getCommandData(event.cmdData)))
        }.bind(this))
    },
    getCommandData: function (values) {
        var cmdData = "";
        return null != values.rtilt && (cmdData += "rtilt," + values.rtilt + " "), null != values.rpan && (cmdData += "rpan," + values.rpan + " "), null != values.rzoom && (cmdData += "rzoom," + values.rzoom + " "), cmdData
    },
    buildRequest: function (cmdData) {
        var xmlSpsRequest = "<sps:Submit ";
        return xmlSpsRequest += 'service="' + this.properties.service + '" ', xmlSpsRequest += 'version="' + this.properties.version + '" ', xmlSpsRequest += 'xmlns:sps="http://www.opengis.net/sps/2.0" xmlns:swe="http://www.opengis.net/swe/2.0"> ', xmlSpsRequest += "<sps:procedure>" + this.properties.offeringID + "</sps:procedure>", xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>", xmlSpsRequest += '<sps:encoding><swe:TextEncoding blockSeparator=" "  collapseWhiteSpaces="true" decimalSeparator="." tokenSeparator=","/></sps:encoding>', xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>", xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>"
    }
});
OSH.DataSender.FoscamPtzTasking = OSH.DataSender.PtzTasking.extend({
    getCommandData: function (values) {
        var cmdData = "";
        return null !== values.preset ? cmdData = "preset," + values.preset : null !== values.rzoom ? (cmdData = "zoom,", cmdData += values.rzoom < 0 ? "out" : "in") : null != values.rpan && null != values.rtilt ? (cmdData += "relMove,", null !== values.rtilt && (cmdData += values.rtilt < 0 ? "Bottom" : "Top"), cmdData += values.rpan < 0 ? "Left" : "Right") : (null !== values.rpan && (cmdData += "relMove,", cmdData += values.rpan < 0 ? "Left" : "Right", cmdData += " "), null !== values.rtilt && (cmdData += "relMove,", cmdData += values.rtilt < 0 ? "Down" : "Up")), cmdData
    }
});
OSH.DataSender.UavMapTasking = OSH.DataSender.DataSink.extend({
    initialize: function (name, properties) {
        this._super(name, properties), OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_TAKEOFF, function (event) {
            this.connector.sendRequest(this.buildTakeOffRequest())
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_GOTO, function (event) {
            this.connector.sendRequest(this.buildGotoRequest({
                lat: event.geoLat,
                lon: event.geoLon
            }))
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_ORBIT, function (event) {
            this.connector.sendRequest(this.buildOrbitRequest({
                lat: event.geoLat,
                lon: event.geoLon,
                radius: 10
            }))
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LOOKAT, function (event) {
            this.connector.sendRequest(this.buildLookAtRequest({
                lat: event.geoLat,
                lon: event.geoLon
            }))
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LAND, function (event) {
            this.connector.sendRequest(this.buildLandRequest({
                lat: event.geoLat,
                lon: event.geoLon
            }))
        }.bind(this))
    },
    buildTakeOffRequest: function (props) {
        return this.buildRequest("navCommands,TAKEOFF,10")
    },
    buildGotoRequest: function (props) {
        return this.buildRequest("navCommands,GOTO_LLA," + props.lat + "," + props.lon + ",0,0")
    },
    buildOrbitRequest: function (props) {
        return this.buildRequest("navCommands,ORBIT," + props.lat + "," + props.lon + ",0," + props.radius)
    },
    buildLookAtRequest: function (props) {
        return this.buildRequest("camCommands,MOUNT_TARGET," + props.lat + "," + props.lon + ",0")
    },
    buildLandRequest: function (props) {
        return this.buildRequest("navCommands,LAND," + props.lat + "," + props.lon)
    },
    buildRequest: function (cmdData) {
        var xmlSpsRequest = "<sps:Submit ";
        return xmlSpsRequest += 'service="' + this.properties.service + '" ', xmlSpsRequest += 'version="' + this.properties.version + '" ', xmlSpsRequest += 'xmlns:sps="http://www.opengis.net/sps/2.0" xmlns:swe="http://www.opengis.net/swe/2.0"> ', xmlSpsRequest += "<sps:procedure>" + this.properties.offeringID + "</sps:procedure>", xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>", xmlSpsRequest += '<sps:encoding><swe:TextEncoding blockSeparator=" "  collapseWhiteSpaces="true" decimalSeparator="." tokenSeparator=","/></sps:encoding>', xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>", xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>", document.fire("osh:log", xmlSpsRequest), xmlSpsRequest
    }
});
OSH.DataSender.DataSenderController = BaseClass.extend({
    initialize: function (options) {
        this.dataSources = {}
    },
    addDataSource: function (dataSource) {
        this.dataSources[dataSource.getId()] = dataSource
    },
    sendRequest: function (dataSourceId, properties, onSuccess, onError) {
        dataSourceId in this.dataSources && (void 0 !== onSuccess && null != onSuccess && (this.dataSources[dataSourceId].onSuccess = function (response) {
            onSuccess(response)
        }), void 0 !== onError && null != onError && (this.dataSources[dataSourceId].onError = function (response) {
            onError(response)
        }), this.dataSources[dataSourceId].sendRequest(properties))
    }
});
OSH.Log = BaseClass.extend({
    initialize: function () {
        this.logDiv = document.createElement("TEXTAREA"), this.logDiv.setAttribute("class", "osh-log popup-content"), this.logDiv.setAttribute("wrap", "off"), this.first = !0, document.observe("dom:loaded", function () {
            new OSH.UI.DialogView({
                title: "Logging console"
            })
        }.bind(this)), document.observe("osh:log", function (event) {
            this.first ? (this.logDiv.value = "[osh-log]> " + event.memo + "\n", this.first = !1) : this.logDiv.value += "[osh-log]> " + event.memo + "\n"
        }.bind(this))
    }
});
OSH.UI.View = BaseClass.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this.stylers = [], this.contextMenus = [], this.viewItems = [], this.names = {}, this.stylerToObj = {}, this.stylerIdToStyler = {}, this.lastRec = {}, this.selectedDataSources = [], this.dataSources = [], this.id = "view-" + OSH.Utils.randomUUID(), this.dataSourceId = -1, void 0 !== options && void 0 !== options.dataSourceId && (this.dataSourceId = options.dataSourceId), void 0 !== options && void 0 !== options.entityId && (this.entityId = options.entityId), this.css = "", this.cssSelected = "", void 0 !== options && void 0 !== options.css && (this.css = options.css), void 0 !== options && void 0 !== options.cssSelected && (this.cssSelected = options.cssSelected), this.init(parentElementDivId, viewItems, options)
    },
    init: function (parentElementDivId, viewItems, options) {
        this.elementDiv = document.createElement("div"), this.elementDiv.setAttribute("id", this.id), this.elementDiv.setAttribute("class", this.css), this.divId = this.id;
        var div = document.getElementById(parentElementDivId);
        if (void 0 === div || null == div ? (document.body.appendChild(this.elementDiv), this.hide(), this.container = document.body) : (div.appendChild(this.elementDiv), this.container = div), this.beforeAddingItems(options), void 0 !== viewItems)
            for (var i = 0; i < viewItems.length; i++) this.addViewItem(viewItems[i]);
        void 0 !== options && void 0 !== options.show && (document.getElementById(this.divId).style.display = options.show ? "block" : "none"), this.handleEvents(), void 0 !== options && void 0 !== options.dataSourceId && OSH.EventManager.observe(OSH.EventManager.EVENT.DATA + "-" + options.dataSourceId, function (event) {
            event.reset ? this.reset() : this.setData(options.dataSourceId, event.data)
        }.bind(this));
        var self = this;
        new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                "style" === mutation.attributeName && self.onResize()
            })
        }).observe(this.elementDiv, {
            attributes: !0
        })
    },
    hide: function () {
        this.elementDiv.style.display = "none"
    },
    onResize: function () {
    },
    attachTo: function (divId) {
        void 0 !== this.elementDiv.parentNode && this.elementDiv.parentNode.removeChild(this.elementDiv), document.getElementById(divId).appendChild(this.elementDiv), "none" == this.elementDiv.style.display && (this.elementDiv.style.display = "block"), this.onResize()
    },
    beforeAddingItems: function (options) {
    },
    getId: function () {
        return this.id
    },
    getDivId: function () {
        return this.divId
    },
    setData: function (dataSourceId, data) {
    },
    show: function (properties) {
    },
    shows: function (properties) {
    },
    addViewItem: function (viewItem) {
        if (this.viewItems.push(viewItem), viewItem.hasOwnProperty("styler")) {
            var styler = viewItem.styler;
            this.stylers.push(styler), viewItem.hasOwnProperty("name") && (this.names[styler.getId()] = viewItem.name), styler.init(this), styler.viewItem = viewItem, this.stylerIdToStyler[styler.id] = styler
        }
        viewItem.hasOwnProperty("contextmenu") && this.contextMenus.push(viewItem.contextmenu);
        for (var ds = styler.getDataSourcesIds(), i = 0; i < ds.length; i++) {
            var dataSourceId = ds[i],
                self = this;
            !function (frozenDataSourceId) {
                OSH.EventManager.observe(OSH.EventManager.EVENT.DATA + "-" + frozenDataSourceId, function (event) {
                    if (!event.reset) {
                        var selected = !1;
                        selected = void 0 !== self.selectedEntity ? viewItem.entityId == self.selectedEntity : self.selectedDataSources.indexOf(frozenDataSourceId) > -1, styler.setData(frozenDataSourceId, event.data, self, {
                            selected: selected
                        }), self.lastRec[frozenDataSourceId] = event.data
                    }
                }), OSH.EventManager.observe(OSH.EventManager.EVENT.SELECT_VIEW, function (event) {
                    var selected = !1;
                    selected = void 0 !== event.entityId ? viewItem.entityId == event.entityId : event.dataSourcesIds.indexOf(frozenDataSourceId) > -1, frozenDataSourceId in self.lastRec && styler.setData(frozenDataSourceId, self.lastRec[frozenDataSourceId], self, {
                        selected: selected
                    })
                })
            }(dataSourceId)
        }
    },
    handleEvents: function () {
        OSH.EventManager.observe(OSH.EventManager.EVENT.SELECT_VIEW, function (event) {
            this.selectDataView(event.dataSourcesIds, event.entityId)
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.SHOW_VIEW, function (event) {
            this.show(event)
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.ADD_VIEW_ITEM, function (event) {
            void 0 !== event.viewId && event.viewId == this.id && this.addViewItem(event.viewItem)
        }.bind(this)), OSH.EventManager.observe(OSH.EventManager.EVENT.RESIZE + "-" + this.divId, function (event) {
            this.onResize()
        }.bind(this))
    },
    selectDataView: function (dataSourcesIds, entityId) {
        if (void 0 !== this.dataSources) {
            this.selectedDataSources = dataSourcesIds, this.selectedEntity = entityId;
            for (var j = 0; j < this.dataSources.length; j++) this.setData(this.dataSources[j], this.lastRec[this.dataSources[j]])
        }
    },
    getDataSourcesId: function () {
        var res = [];
        this.dataSourceId != -1 && res.push(this.dataSourceId);
        for (var i = 0; i < this.viewItems.length; i++) {
            var viewItem = this.viewItems[i];
            if (viewItem.hasOwnProperty("styler")) {
                var styler = viewItem.styler;
                res = res.concat(styler.getDataSourcesIds())
            }
        }
        return res
    },
    reset: function () {
    }
});
OSH.UI.ContextMenu = BaseClass.extend({
    initialize: function (properties) {
        void 0 !== properties && void 0 !== properties.id ? this.id = properties.id : this.id = "contextMenu-" + OSH.Utils.randomUUID(), this.handleEvents()
    },
    show: function () {
    },
    hide: function () {
    },
    handleEvents: function () {
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONTEXT_MENU + "-" + this.id, function (event) {
            "show" == event.action ? this.show(event) : "hide" == event.action && this.hide()
        }.bind(this))
    }
});
OSH.UI.ContextMenu.CssMenu = OSH.UI.ContextMenu.extend({
    initialize: function (properties, type) {
        if (this._super(properties), this.items = [], this.type = void 0 !== type ? type : "", void 0 !== properties && void 0 !== properties.items)
            for (var i = 0; i < properties.items.length; i++) {
                var elId = OSH.Utils.randomUUID(),
                    htmlVar = '<a  id="' + elId + '" ';
                void 0 !== properties.items[i].css && (htmlVar += 'class="' + properties.items[i].css + '" ');
                var name = "";
                void 0 !== properties.items[i].name && (name = properties.items[i].name), htmlVar += 'title="' + name + '"', htmlVar += '><span id ="' + elId + '"class="' + this.type + '-menu-label">' + name + "</span></a>";
                var action = "";
                void 0 !== properties.items[i].action && (action = properties.items[i].action);
                var viewId = "";
                void 0 !== properties.items[i].viewId && (viewId = properties.items[i].viewId), this.items.push({
                    html: htmlVar,
                    id: elId,
                    action: action,
                    viewId: viewId
                })
            }
    },
    show: function (properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID(),
            htmlVar = (OSH.Utils.randomUUID(), "");
        htmlVar += '<div class="' + this.type + '-menu">', htmlVar += '  <div class="' + this.type + '-menu-circle">';
        for (var i = 0; i < this.items.length; i++) htmlVar += this.items[i].html;
        htmlVar += "  </div>", htmlVar += '  <a id="' + closeId + '"class="' + this.type + '-menu-button fa fa-times fa-2x"></a>', htmlVar += "</div>", this.rootTag = document.createElement("div"), this.rootTag.setAttribute("class", this.type + "-menu-container"), this.rootTag.innerHTML = htmlVar, document.body.appendChild(this.rootTag);
        for (var items = document.querySelectorAll("." + this.type + "-menu-circle a"), i = 0, l = items.length; i < l; i++) items[i].style.left = (50 - 35 * Math.cos(-.5 * Math.PI - 1 / l * 2 * i * Math.PI)).toFixed(4) + "%", items[i].style.top = (50 + 35 * Math.sin(-.5 * Math.PI - 1 / l * 2 * i * Math.PI)).toFixed(4) + "%";
        document.getElementById(closeId).onclick = this.hide.bind(this);
        var offsetX = 0,
            offsetY = 0;
        properties.offsetX && (offsetX = properties.offsetX), properties.offsetY && (offsetY = properties.offsetY), document.querySelector("." + this.type + "-menu-circle").classList.toggle("open"), void 0 !== properties.x && (this.rootTag.style.left = properties.x + offsetX), void 0 !== properties.y && (this.rootTag.style.top = properties.y + offsetY), this.bindEvents = {};
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            this.bindEvents[item.id] = item.viewId, document.getElementById(item.id).onclick = function (event) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                })
            }.bind(this)
        }
        this.rootTag.onmousedown = function (event) {
            event.preventDefault(), event.stopPropagation()
        }
    },
    hide: function ($super) {
        document.querySelector("." + this.type + "-menu-circle").classList.toggle("open"), this.removeElement()
    },
    removeElement: function () {
        void 0 !== this.rootTag && null != this.rootTag && void 0 !== this.rootTag.parentNode && (this.rootTag.parentNode.removeChild(this.rootTag), this.rootTag = null)
    },
    getTransform: function (el) {
        var transform = el.style.transform;
        return transform && 0 !== transform.length ? /^\s*((\w+)\s*\(([^)]+)\))/.exec(transform)[1] : ""
    }
});
OSH.UI.ContextMenu.CircularMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize: function (properties) {
        this._super(properties, "circular")
    }
});
OSH.UI.ContextMenu.StackMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize: function (properties) {
        this._super(properties, "stack")
    },
    show: function (properties) {
        this.removeElement();
        var htmlVar = "";
        htmlVar += '  <div class="' + this.type + '-menu-circle">';
        for (var i = 0; i < this.items.length; i++) htmlVar += this.items[i].html;
        htmlVar += "  </div>", this.rootTag = document.createElement("div"), this.rootTag.setAttribute("class", this.type + "-menu-container"), this.rootTag.innerHTML = htmlVar, void 0 !== properties.div ? properties.div.appendChild(this.rootTag) : document.body.appendChild(this.rootTag);
        var offsetX = 0,
            offsetY = 0;
        properties.offsetX && (offsetX = properties.offsetX), properties.offsetY && (offsetY = properties.offsetY), void 0 !== properties.x && (this.rootTag.style.left = properties.x + offsetX), void 0 !== properties.y && (this.rootTag.style.top = properties.y + offsetY), document.querySelector("." + this.type + "-menu-circle").classList.toggle("open"), this.bindEvents = {};
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            this.bindEvents[item.id] = item.viewId, document.getElementById(item.id).onclick = function (event) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                })
            }.bind(this)
        }
        this.rootTag.onmousedown = function (event) {
            event.preventDefault(), event.stopPropagation()
        }
    }
});
OSH.UI.Styler = BaseClass.extend({
    initialize: function (jsonProperties) {
        this.properties = jsonProperties, this.id = "styler-" + OSH.Utils.randomUUID(), this.dataSourceToStylerMap = {}, this.initEvents()
    },
    initEvents: function () {
        OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, function (event) {
            this.clear()
        }.bind(this))
    },
    clear: function () {
    },
    setData: function (dataSourceId, data, view) {
    },
    getId: function () {
        return this.id
    },
    select: function (dataSourceIds) {
    },
    addFn: function (dataSourceIds, fn) {
        for (var i = 0; i < dataSourceIds.length; i++) {
            var dataSourceId = dataSourceIds[i];
            void 0 === this.dataSourceToStylerMap[dataSourceId] && (this.dataSourceToStylerMap[dataSourceId] = []), this.dataSourceToStylerMap[dataSourceId].push(fn)
        }
    },
    setData: function (dataSourceId, rec, view, options) {
        if (dataSourceId in this.dataSourceToStylerMap) {
            for (var fnArr = this.dataSourceToStylerMap[dataSourceId], i = 0; i < fnArr.length; i++) fnArr[i](rec.data, rec.timeStamp, options);
            return !0
        }
        return !1
    },
    getDataSourcesIds: function () {
        var res = [];
        for (var i in this.dataSourceToStylerMap) res.push(i);
        return res
    },
    init: function () {
    }
});
OSH.UI.Styler.ImageDraping = OSH.UI.Styler.extend({
    initialize: function (properties) {
        if (this._super(properties), this.properties = properties, this.platformLocation = null, this.platformOrientation = null, this.gimbalOrientation = null, this.cameraModel = null, this.imageSrc = null, this.snapshotFunc = null, this.options = {}, void 0 !== properties.platformLocation && (this.platformLocation = properties.platformLocation), void 0 !== properties.platformOrientation && (this.platformOrientation = properties.platformOrientation), void 0 !== properties.gimbalOrientation && (this.gimbalOrientation = properties.gimbalOrientation), void 0 !== properties.cameraModel && (this.cameraModel = properties.cameraModel), void 0 !== properties.imageSrc && (this.imageSrc = properties.imageSrc), void 0 !== properties.platformLocationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.platformLocation = properties.platformLocationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.platformLocationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.platformOrientationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.platformOrientation = properties.platformOrientationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.platformOrientationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.gimbalOrientationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.gimbalOrientation = properties.gimbalOrientationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.gimbalOrientationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.cameraModelFunc) {
            var fn = function (rec, timeStamp, options) {
                this.cameraModel = properties.cameraModelFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.cameraModelFunc.dataSourceIds, fn)
        }
        void 0 !== properties.snapshotFunc && (this.snapshotFunc = properties.snapshotFunc)
    },
    init: function (view) {
        this._super(view)
    },
    setData: function (dataSourceId, rec, view, options) {
        if (this._super(dataSourceId, rec, view, options)) {
            var snapshot = !1;
            null != this.snapshotFunc && (snapshot = this.snapshotFunc()), void 0 !== view && null != this.platformLocation && null != this.platformOrientation && null != this.gimbalOrientation && null != this.cameraModel && null != this.imageSrc && view.updateDrapedImage(this, rec.timeStamp, options, snapshot)
        }
    }
});
OSH.UI.Styler.Curve = OSH.UI.Styler.extend({
    initialize: function (properties) {
        if (this._super(properties), this.xLabel = "", this.yLabel = "", this.color = "#000000", this.stroke = 1, this.x = 0, this.y = [], void 0 !== properties.stroke && (this.stroke = properties.stroke), void 0 !== properties.color && (this.color = properties.color), void 0 !== properties.x && (this.x = properties.x), void 0 !== properties.y && (this.y = properties.y), void 0 !== properties.strokeFunc) {
            var fn = function (rec, timeStamp, options) {
                this.stroke = properties.strokeFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.strokeFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.colorFunc) {
            var fn = function (rec, timeStamp, options) {
                this.color = properties.colorFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.colorFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.valuesFunc) {
            var fn = function (rec, timeStamp, options) {
                var values = properties.valuesFunc.handler(rec, timeStamp, options);
                this.x = values.x, this.y = values.y
            }.bind(this);
            this.addFn(properties.valuesFunc.dataSourceIds, fn)
        }
    },
    setData: function (dataSourceId, rec, view, options) {
        this._super(dataSourceId, rec, view, options) && void 0 !== view && view.updateCurve(this, rec.timeStamp, options)
    }
});
OSH.UI.Styler.Nexrad = OSH.UI.Styler.extend({
    initialize: function (properties) {
        if (this._super(properties), this.properties = properties, this.location = null, this.radialData = null, this.options = {}, void 0 !== properties.location && (this.location = properties.location), void 0 !== properties.radialData && (this.radialData = properties.radialData), void 0 !== properties.locationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.location = properties.locationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.locationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.radialDataFunc) {
            var fn = function (rec, timeStamp, options) {
                this.radialData = properties.radialDataFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.radialDataFunc.dataSourceIds, fn)
        }
        this.reflectivityColorMap = [Cesium.Color.fromBytes(100, 100, 100), Cesium.Color.fromBytes(204, 255, 255), Cesium.Color.fromBytes(204, 153, 204), Cesium.Color.fromBytes(153, 102, 153), Cesium.Color.fromBytes(102, 51, 102), Cesium.Color.fromBytes(204, 204, 153), Cesium.Color.fromBytes(153, 153, 102), Cesium.Color.fromBytes(100, 100, 100), Cesium.Color.fromBytes(4, 233, 231), Cesium.Color.fromBytes(1, 159, 244), Cesium.Color.fromBytes(3, 0, 244), Cesium.Color.fromBytes(2, 253, 2), Cesium.Color.fromBytes(1, 197, 1), Cesium.Color.fromBytes(0, 142, 0), Cesium.Color.fromBytes(253, 248, 2), Cesium.Color.fromBytes(229, 188, 0), Cesium.Color.fromBytes(253, 149, 0), Cesium.Color.fromBytes(253, 0, 0), Cesium.Color.fromBytes(212, 0, 0), Cesium.Color.fromBytes(188, 0, 0), Cesium.Color.fromBytes(248, 0, 253), Cesium.Color.fromBytes(152, 84, 198), Cesium.Color.fromBytes(253, 253, 253)], this.pointCollection = new Cesium.PointPrimitiveCollection, this.radialCount = 0
    },
    init: function (view) {
        this._super(view)
    },
    setData: function (dataSourceId, rec, view, options) {
        if (this._super(dataSourceId, rec, view, options) && void 0 !== view) {
            var DTR = Math.PI / 180;
            if (rec.data.elevation > .7) return;
            for (var radarLoc = Cesium.Cartesian3.fromDegrees(this.location.x, this.location.y, this.location.z), quat = Cesium.Transforms.headingPitchRollQuaternion(radarLoc, (rec.data.azimuth - 90) * DTR, rec.data.elevation * DTR, 0), rotM = Cesium.Matrix3.fromQuaternion(quat), dist0 = (new Cesium.PointPrimitiveCollection, rec.data.rangeToCenterOfFirstRefGate), step = rec.data.refGateSize, i = 0; i < rec.data.reflectivity.length; i++) {
                var val = rec.data.reflectivity[i];
                if (!(val < -32 || val > 94.5)) {
                    var gatePos = new Cesium.Cartesian3(dist0 + i * step, 0, 0);
                    Cesium.Matrix3.multiplyByVector(rotM, gatePos, gatePos), this.pointCollection.add({
                        position: Cesium.Cartesian3.add(radarLoc, gatePos, gatePos),
                        color: this.getReflectivityColor(val),
                        pixelSize: 3
                    })
                }
            }
            this.radialCount++, 100 == this.radialCount && (view.viewer.scene.primitives.add(this.pointCollection), this.pointCollection = new Cesium.PointPrimitiveCollection, this.radialCount = 0)
        }
    },
    getReflectivityColor: function (val) {
        var index = Math.floor((val + 30) / 5) + 1;
        return this.reflectivityColorMap[index]
    }
});
OSH.UI.Styler.Polyline = OSH.UI.Styler.extend({
    initialize: function (properties) {
        if (this._super(properties), this.properties = properties, this.locations = [], this.color = "red", this.weight = 1, this.opacity = 1, this.smoothFactor = 1, this.maxPoints = 10, void 0 !== properties.color && (this.color = properties.color), void 0 !== properties.weight && (this.weight = properties.weight), void 0 !== properties.opacity && (this.opacity = properties.opacity), void 0 !== properties.smoothFactor && (this.smoothFactor = properties.smoothFactor), void 0 !== properties.maxPoints && (this.maxPoints = properties.maxPoints), void 0 !== properties.locationFunc) {
            var fn = function (rec) {
                var loc = properties.locationFunc.handler(rec);
                this.locations.push(loc), this.locations.length > this.maxPoints && this.locations.shift()
            }.bind(this);
            this.addFn(properties.locationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.colorFunc) {
            var fn = function (rec) {
                this.color = properties.colorFunc.handler(rec)
            }.bind(this);
            this.addFn(properties.colorFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.weightFunc) {
            var fn = function (rec) {
                this.weight = properties.weightFunc.handler(rec)
            }.bind(this);
            this.addFn(properties.weightFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.opacityFunc) {
            var fn = function (rec) {
                this.opacity = properties.opacityFunc.handler(rec)
            }.bind(this);
            this.addFn(properties.opacityFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.smoothFactorFunc) {
            var fn = function (rec) {
                this.smoothFactor = properties.smoothFactorFunc.handler(rec)
            }.bind(this);
            this.addFn(properties.smoothFactorFunc.dataSourceIds, fn)
        }
    },
    setData: function (dataSourceId, rec, view, options) {
        this._super(dataSourceId, rec, view, options) && void 0 !== view && "function" == typeof view.updatePolyline && view.updatePolyline(this)
    },
    clear: function ($super) {
        this.locations = []
    }
});
OSH.UI.Styler.PointMarker = OSH.UI.Styler.extend({
    initialize: function (properties) {
        if (this._super(properties), this.properties = properties, this.location = null, this.orientation = {
                heading: 0
            }, this.icon = null, this.iconAnchor = [16, 16], this.label = null, this.color = "#000000", this.options = {}, void 0 !== properties.location && (this.location = properties.location), void 0 !== properties.orientation && (this.orientation = properties.orientation), void 0 !== properties.icon && (this.icon = properties.icon), void 0 !== properties.iconAnchor && (this.iconAnchor = properties.iconAnchor), void 0 !== properties.label && (this.label = properties.label), void 0 !== properties.color && (this.color = properties.color), void 0 !== properties.locationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.location = properties.locationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.locationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.orientationFunc) {
            var fn = function (rec, timeStamp, options) {
                this.orientation = properties.orientationFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.orientationFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.iconFunc) {
            var fn = function (rec, timeStamp, options) {
                this.icon = properties.iconFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.iconFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.labelFunc) {
            var fn = function (rec, timeStamp, options) {
                this.label = properties.labelFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.labelFunc.dataSourceIds, fn)
        }
        if (void 0 !== properties.colorFunc) {
            var fn = function (rec, timeStamp, options) {
                this.color = properties.colorFunc.handler(rec, timeStamp, options)
            }.bind(this);
            this.addFn(properties.colorFunc.dataSourceIds, fn)
        }
    },
    init: function (view) {
        this._super(view), void 0 !== view && null != this.location && view.updateMarker(this, 0, {})
    },
    setData: function (dataSourceId, rec, view, options) {
        this._super(dataSourceId, rec, view, options) && void 0 !== view && null != this.location && view.updateMarker(this, rec.timeStamp, options)
    },
    clear: function ($super) {
    }
});
OSH.UI.Nvd3CurveChartView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options), this.entityId = options.entityId;
        var xLabel = "Time",
            yLabel = "yLabel",
            useInteractiveGuideline = (d3.format(".02f"), !0),
            showLegend = !0,
            showYAxis = !0,
            showXAxis = !0;
        if (void 0 !== options) {
            if (options.xLabel) var xLabel = options.xLabel;
            if (options.yLabel) var yLabel = options.yLabel;
            options.xTickFormat && options.xTickFormat, options.yTickFormat && options.yTickFormat, options.showLegend && (showLegend = options.showLegend), options.showXAxis && (showXAxis = options.showXAxis), options.showYAxis && (showYAxis = options.showYAxis), options.useInteractiveGuideline && (useInteractiveGuideline = options.useInteractiveGuideline), options.transitionDuration && options.transitionDuration, options.maxPoints && (this.maxPoints = options.maxPoints)
        }
        this.chart = nv.models.lineChart().margin({
            left: 75,
            right: 25
        }).options({
            duration: 1,
            useInteractiveGuideline: useInteractiveGuideline
        }).duration(1).showLegend(showLegend).showYAxis(showYAxis).showXAxis(showXAxis), this.chart.xAxis.axisLabel(xLabel).tickFormat(function (d) {
            return d3.time.format.utc("%H:%M:%SZ")(new Date(d))
        }), this.chart.yAxis.axisLabel(yLabel).tickFormat(d3.format(".02f")).axisLabelDistance(15), this.css = document.getElementById(this.divId).className, void 0 !== options && (options.css && (this.css += " " + options.css), options.cssSelected && (this.cssSelected = options.cssSelected));
        var svg = document.createElementNS(d3.ns.prefix.svg, "svg");
        this.div = document.getElementById(this.divId), this.div.appendChild(svg), this.div.style.width = this.width, this.div.style.height = this.height, this.svgChart = d3.select("#" + this.divId + " svg");
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: self.getDataSourcesId(),
                entityId: self.entityId
            })
        })
    },
    updateCurve: function (styler, timestamp, options) {
        if (void 0 === this.data) {
            this.d3Data = [];
            options.name;
            this.data = {
                values: [],
                key: this.names[styler.getId()],
                interpolate: "cardinal",
                area: !0
            }, this.data.values.push({
                y: styler.y,
                x: styler.x
            }), this.svgChart.datum([this.data]).call(this.chart)
        } else this.data.values.push({
            y: styler.y,
            x: styler.x
        });
        this.chart.update(), this.data.values.length > this.maxPoints && this.data.values.shift()
    },
    selectDataView: function (dataSourceIds) {
        var currentDataSources = this.getDataSourcesId();
        OSH.Utils.isArrayIntersect(dataSourceIds, currentDataSources) ? this.div.setAttribute("class", this.css + " " + this.cssSelected) : this.div.setAttribute("class", this.css)
    },
    reset: function () {
        this.data.values = [], this.chart.update()
    }
});
OSH.UI.DiscoveryView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, properties) {
        this._super(parentElementDivId, [], properties), this.dialogContainer = document.body.id, this.swapId = "", void 0 !== properties && (void 0 !== properties.dataReceiverController ? this.dataReceiverController = properties.dataReceiverController : (this.dataReceiverController = new OSH.DataReceiver.DataReceiverController({
            replayFactor: 1
        }), this.dataReceiverController.connectAll()), void 0 !== properties.swapId && (this.swapId = properties.swapId), void 0 !== properties.dialogContainer && (this.dialogContainer = properties.dialogContainer)), this.formTagId = "form-" + OSH.Utils.randomUUID(), this.serviceSelectTagId = "service-" + OSH.Utils.randomUUID(), this.offeringSelectTagId = "offering-" + OSH.Utils.randomUUID(), this.observablePropertyTagId = "obsProperty-" + OSH.Utils.randomUUID(), this.startTimeTagId = "startTime-" + OSH.Utils.randomUUID(), this.endTimeTagId = "endTime-" + OSH.Utils.randomUUID(), this.typeSelectTagId = "type-" + OSH.Utils.randomUUID(), this.formButtonId = "submit-" + OSH.Utils.randomUUID(), this.syncMasterTimeId = "syncMasterTime-" + OSH.Utils.randomUUID(), this.entitiesSelectTagId = "entities-" + OSH.Utils.randomUUID(), this.viewSelectTagId = "dialogSelect-" + OSH.Utils.randomUUID();
        var discoveryForm = document.createElement("form");
        discoveryForm.setAttribute("action", "#"), discoveryForm.setAttribute("id", this.formTagId), discoveryForm.setAttribute("class", "discovery-form"), document.getElementById(this.divId).appendChild(discoveryForm);
        var strVar = "";
        strVar += "<ul>", strVar += "            <li>", strVar += "                <h2>Discovery</h2>", strVar += '                <span class="required_notification">* Denotes Required Field</span>', strVar += "            </li>", strVar += "            <li>", strVar += "                <label>Service:</label>", strVar += '                <div class="select-style">', strVar += '                     <select id="' + this.serviceSelectTagId + '" required pattern="^(?!Select a service$).*">', strVar += '                         <option value="" disabled selected>Select a service</option>', strVar += "                     </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += "                <label>Offering:</label>", strVar += '                <div class="select-style">', strVar += '                    <select id="' + this.offeringSelectTagId + '" required>', strVar += '                        <option value="" disabled selected>Select an offering</option>', strVar += "                    </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += "                <label>Observable Property:</label>", strVar += '                <div class="select-style">', strVar += '                     <select id="' + this.observablePropertyTagId + '" required>', strVar += '                         <option value="" disabled selected>Select a property</option>', strVar += "                     </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += '                <label for="startTime">Start time:</label>', strVar += '                <input id="' + this.startTimeTagId + '" type="text" name="startTime" class="input-text" placeholder="YYYY-MM-DDTHH:mm:ssZ" required/>', strVar += '                <span class="form_hint">YYYY-MM-DDTHH:mm:ssZ</span>', strVar += "            </li>", strVar += "            <li>", strVar += '                <label for="endTime">End time:</label>', strVar += '                <input id="' + this.endTimeTagId + '" type="text" name="endTime" class="input-text" placeholder="YYYY-MM-DDTHH:mm:ssZ"  required/>', strVar += '                <span class="form_hint">YYYY-MM-DDTHH:mm:ssZ</span>', strVar += "            </li>", strVar += "            <li>", strVar += '                <label for="syncMasterTime">Sync master time:</label>', strVar += '                <input id="' + this.syncMasterTimeId + '"  class="input-checkbox" type="checkbox" name=syncMasterTime" />', strVar += "            </li>", strVar += "            <li>", strVar += "                <label>Type:</label>", strVar += '                <div class="select-style">', strVar += '                    <select id="' + this.typeSelectTagId + '" required>', strVar += '                        <option value="" disabled selected>Select a type</option>', strVar += "                    </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += "                <label>Entities:</label>", strVar += '                <div class="select-style">', strVar += '                    <select id="' + this.entitiesSelectTagId + '">', strVar += '                        <option value="" selected>None</option>', strVar += "                    </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += "                <label>View:</label>", strVar += '                <div class="select-style">', strVar += '                    <select id="' + this.viewSelectTagId + '" required>', strVar += '                        <option value="" disabled selected>Select a view</option>', strVar += "                    </select>", strVar += "                </div>", strVar += "            </li>", strVar += "            <li>", strVar += '                <button id="' + this.formButtonId + '" class="submit" type="submit">Add</button>', strVar += "            </li>", strVar += "        </ul>", discoveryForm.innerHTML = strVar, void 0 !== properties && (void 0 !== properties.services && this.addValuesToSelect(this.serviceSelectTagId, properties.services), void 0 !== properties.entities && this.addObjectsToSelect(this.entitiesSelectTagId, properties.entities), void 0 !== properties.views ? this.views = properties.views : this.views = []);
        for (var type in OSH.UI.DiscoveryView.Type) this.addValueToSelect(this.typeSelectTagId, OSH.UI.DiscoveryView.Type[type]);
        OSH.EventManager.observeDiv(this.serviceSelectTagId, "change", this.onSelectedService.bind(this)), OSH.EventManager.observeDiv(this.offeringSelectTagId, "change", this.onSelectedOffering.bind(this)), OSH.EventManager.observeDiv(this.typeSelectTagId, "change", this.onSelectedType.bind(this)), OSH.EventManager.observeDiv(this.formTagId, "submit", this.onFormSubmit.bind(this))
    },
    onSelectedService: function (event) {
        var serverTag = document.getElementById(this.serviceSelectTagId),
            option = serverTag.options[serverTag.selectedIndex];
        this.removeAllFromSelect(this.offeringSelectTagId), this.oshServer = new OSH.Server({
            sos: "sos",
            sps: "sps",
            url: OSH.Utils.removeLastCharIfExist(option.value, "/"),
            baseUrl: "sensorhub"
        });
        var onSuccessGetCapabilities = function (jsonObj) {
                for (var offering = (document.getElementById(this.startTimeTagId), document.getElementById(this.endTimeTagId), null), i = 0; i < jsonObj.Capabilities.contents.offering.length; i++) offering = jsonObj.Capabilities.contents.offering[i], this.addValueToSelect(this.offeringSelectTagId, offering.name, offering)
            }.bind(this),
            onErrorGetCapabilities = function (event) {
            };
        this.oshServer.getCapabilities(onSuccessGetCapabilities, onErrorGetCapabilities)
    },
    onSelectedOffering: function (event) {
        var e = document.getElementById(this.offeringSelectTagId),
            option = e.options[e.selectedIndex],
            offering = option.parent;
        this.removeAllFromSelect(this.observablePropertyTagId);
        var startTimeInputTag = document.getElementById(this.startTimeTagId),
            endTimeInputTag = document.getElementById(this.endTimeTagId);
        if (startTimeInputTag.value = offering.phenomenonTime.beginPosition, void 0 !== offering.phenomenonTime.endPosition.indeterminatePosition) {
            var d = new Date;
            d.setUTCFullYear(2055), endTimeInputTag.value = d.toISOString()
        } else endTimeInputTag.value = offering.phenomenonTime.endPosition;
        for (var i = 0; i < offering.observableProperty.length; i++) this.addValueToSelect(this.observablePropertyTagId, offering.observableProperty[i], offering)
    },
    onSelectedType: function (event) {
        var typeTag = document.getElementById(this.typeSelectTagId),
            tagValue = typeTag.value;
        this.removeAllFromSelect(this.viewSelectTagId);
        for (var i = 0; i < this.views.length; i++) {
            var currentView = this.views[i];
            void 0 !== currentView.type && currentView.type == tagValue && this.addValueToSelect(this.viewSelectTagId, currentView.name, void 0, currentView)
        }
    },
    onFormSubmit: function (event) {
        event.preventDefault();
        var serviceTag = document.getElementById(this.serviceSelectTagId),
            serviceTagSelectedOption = serviceTag.options[serviceTag.selectedIndex],
            offeringTag = document.getElementById(this.offeringSelectTagId),
            offeringTagSelectedOption = offeringTag.options[offeringTag.selectedIndex],
            observablePropertyTag = document.getElementById(this.observablePropertyTagId),
            observablePropertyTagSelectedOption = observablePropertyTag.options[observablePropertyTag.selectedIndex],
            startTimeInputTag = document.getElementById(this.startTimeTagId),
            endTimeInputTag = document.getElementById(this.endTimeTagId),
            syncMasterTimeTag = document.getElementById(this.syncMasterTimeId),
            viewTag = (document.getElementById(this.typeSelectTagId), document.getElementById(this.viewSelectTagId)),
            viewTagOption = viewTag.options[viewTag.selectedIndex],
            entityTag = document.getElementById(this.entitiesSelectTagId),
            entityTagTagOption = entityTag.options[entityTag.selectedIndex],
            name = offeringTagSelectedOption.parent.name,
            endPointUrl = serviceTagSelectedOption.value + "sensorhub/sos",
            offeringID = offeringTagSelectedOption.parent.identifier,
            obsProp = observablePropertyTagSelectedOption.value,
            startTime = startTimeInputTag.value,
            endTime = endTimeInputTag.value,
            entityId = (viewTagOption.object.viewId, void 0);
        void 0 !== entityTagTagOption.object && (entityId = entityTagTagOption.object.id), endPointUrl = endPointUrl.replace("http://", "");
        var syncMasterTime = syncMasterTimeTag.checked;
        switch (viewTagOption.object.type) {
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG:
                this.createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId);
                break;
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264:
                this.createH264VideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId);
                break;
            case OSH.UI.DiscoveryView.Type.MARKER_GPS:
                this.createGPSMarker(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, viewTagOption.object.viewId, entityId);
                break;
            case OSH.UI.DiscoveryView.Type.DIALOG_CHART:
                this.createChartDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId)
        }
        return !1
    },
    addObjectsToSelect: function (tagId, objectsArr) {
        for (var selectTag = document.getElementById(tagId), i = 0; i < objectsArr.length; i++) {
            var object = objectsArr[i],
                option = document.createElement("option");
            option.text = object.name, option.value = object.name, option.object = object, selectTag.add(option)
        }
    },
    addValuesToSelect: function (tagId, valuesArr) {
        for (var selectTag = document.getElementById(tagId), i = 0; i < valuesArr.length; i++) {
            var value = valuesArr[i],
                option = document.createElement("option");
            option.text = value, option.value = value, selectTag.add(option)
        }
    },
    addValueToSelect: function (tagId, value, parent, object) {
        var selectTag = document.getElementById(tagId),
            option = document.createElement("option");
        option.text = value, option.value = value, option.parent = parent, void 0 !== object && (option.object = object), void 0 !== parent && (option.parent = parent), selectTag.add(option)
    },
    removeAllFromSelect: function (tagId) {
        var i, selectTag = document.getElementById(tagId);
        for (i = selectTag.options.length - 1; i > 0; i--) selectTag.remove(i)
    },
    createGPSMarker: function (name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, viewId, entityId) {
        var gpsDataSource = new OSH.DataReceiver.LatLonAlt(name, {
                protocol: "ws",
                service: "SOS",
                endpointUrl: endPointUrl,
                offeringID: offeringID,
                observedProperty: obsProp,
                startTime: startTime,
                endTime: endTime,
                replaySpeed: 1,
                syncMasterTime: syncMasterTime,
                bufferingTime: 1e3,
                timeShift: -16e3
            }),
            pointMarker = new OSH.UI.Styler.PointMarker({
                locationFunc: {
                    dataSourceIds: [gpsDataSource.id],
                    handler: function (rec) {
                        return {
                            x: rec.lon,
                            y: rec.lat,
                            z: rec.alt
                        }
                    }
                },
                icon: "images/cameralook.png",
                iconFunc: {
                    dataSourceIds: [gpsDataSource.getId()],
                    handler: function (rec, timeStamp, options) {
                        return options.selected ? "images/cameralook-selected.png" : "images/cameralook.png"
                    }
                }
            });
        this.dataReceiverController.addDataSource(gpsDataSource);
        var viewItem = {
            styler: pointMarker,
            name: name
        };
        void 0 !== entityId && (viewItem.entityId = entityId), OSH.EventManager.fire(OSH.EventManager.EVENT.ADD_VIEW_ITEM, {
            viewItem: viewItem,
            viewId: viewId
        }), OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {
            dataSourcesId: [gpsDataSource.id]
        })
    },
    createMJPEGVideoDialog: function (name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoMjpeg(name, {
                protocol: "ws",
                service: "SOS",
                endpointUrl: endPointUrl,
                offeringID: offeringID,
                observedProperty: obsProp,
                startTime: startTime,
                endTime: endTime,
                replaySpeed: 1,
                syncMasterTime: syncMasterTime,
                bufferingTime: 1e3
            }),
            dialog = new OSH.UI.DialogView(this.dialogContainer, {
                draggable: !0,
                css: "dialog",
                name: name,
                show: !0,
                dockable: !1,
                closeable: !0,
                connectionIds: [videoDataSource.id],
                swapId: this.swapId
            });
        new OSH.UI.MjpegView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.id,
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId: entityId,
            keepRatio: !0
        });
        this.dataReceiverController.addDataSource(videoDataSource), OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {
            dataSourcesId: [videoDataSource.id]
        })
    },
    createH264VideoDialog: function (name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoH264(name, {
                protocol: "ws",
                service: "SOS",
                endpointUrl: endPointUrl,
                offeringID: offeringID,
                observedProperty: obsProp,
                startTime: startTime,
                endTime: endTime,
                replaySpeed: 1,
                syncMasterTime: syncMasterTime,
                bufferingTime: 1e3
            }),
            dialog = new OSH.UI.DialogView(this.dialogContainer, {
                draggable: !0,
                css: "dialog",
                name: name,
                show: !0,
                dockable: !1,
                closeable: !0,
                connectionIds: [videoDataSource.id],
                swapId: this.swapId,
                keepRatio: !0
            });
        new OSH.UI.FFMPEGView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.getId(),
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId: entityId,
            useWorker: !0,
            useWebWorkerTransferableData: !0
        });
        this.dataReceiverController.addDataSource(videoDataSource), OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {
            dataSourcesId: [videoDataSource.id]
        })
    },
    createChartDialog: function (name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        var chartDataSource = new OSH.DataReceiver.Chart(name, {
                protocol: "ws",
                service: "SOS",
                endpointUrl: endPointUrl,
                offeringID: offeringID,
                observedProperty: obsProp,
                startTime: startTime,
                endTime: endTime,
                replaySpeed: 1,
                syncMasterTime: syncMasterTime,
                bufferingTime: 1e3
            }),
            dialog = new OSH.UI.DialogView(this.dialogContainer, {
                draggable: !0,
                css: "dialog",
                name: name,
                show: !0,
                dockable: !1,
                closeable: !0,
                connectionIds: [chartDataSource.id],
                swapId: this.swapId
            });
        new OSH.UI.Nvd3CurveChartView(dialog.popContentDiv.id, [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [chartDataSource.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x: timeStamp,
                            y: parseFloat(rec[2])
                        }
                    }
                }
            })
        }], {
            name: name,
            yLabel: "",
            xLabel: "",
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 30
        });
        this.dataReceiverController.addDataSource(chartDataSource), OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {
            dataSourcesId: [chartDataSource.id]
        })
    }
}), OSH.UI.DiscoveryView.Type = {
    MARKER_GPS: "Marker(GPS)",
    DIALOG_VIDEO_H264: "Video Dialog(H264)",
    DIALOG_VIDEO_MJPEG: "Video Dialog(MJPEG)",
    DIALOG_CHART: "Chart Dialog"
};
OSH.UI.EntityTreeView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, entityItems, options) {
        this._super(parentElementDivId, [], options), this.entityItems = entityItems, this.initTree(options)
    },
    initTree: function (options) {
        this.tree = createTree(this.divId, "white", null);
        for (var i = 0; i < this.entityItems.length; i++) {
            var currentItem = this.entityItems[i],
                entity = currentItem.entity,
                path = currentItem.path,
                treeIcon = currentItem.treeIcon,
                contextMenuId = currentItem.contextMenuId;
            path.endsWith("/") && (path = path.substring(0, path.length - 1));
            for (var folder = path.split("/"), nbNodes = folder.length, currentNode = this.tree, pos = 0; nbNodes > 0;) {
                var existingChildNode = null;
                for (n = 0; n < currentNode.childNodes.length; n++) {
                    var node = currentNode.childNodes[n];
                    if (node.text === folder[pos]) {
                        existingChildNode = node;
                        break
                    }
                }
                currentNode = null == existingChildNode ? currentNode === this.tree ? this.tree.createNode(folder[pos], !1, "", this.tree, null, null) : currentNode.createChildNode(folder[pos], !1, "", null, null) : existingChildNode, pos++, nbNodes--
            }
            var entityNode;
            entityNode = currentNode === this.tree ? this.tree.createNode(entity.name, !1, treeIcon, this.tree, entity, contextMenuId) : currentNode.createChildNode(entity.name, !1, treeIcon, entity, contextMenuId), currentItem.node = entityNode
        }
        this.tree.drawTree()
    },
    selectDataView: function (dataSourcesIds, entityId) {
        if (void 0 !== entityId)
            for (var i = 0; i < this.entityItems.length; i++) {
                var currentItem = this.entityItems[i];
                if (currentItem.entity.id === entityId) {
                    this.tree.selectNode(currentItem.node, !1);
                    for (var node = currentItem.node.parent; node != this.tree;) this.tree.expandNode(node), node = node.parent
                }
            }
    }
});
OSH.UI.CesiumView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, properties) {
        this._super(parentElementDivId, viewItems, properties);
        var cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css), this.imageDrapingPrimitive = null, this.imageDrapingPrimitiveReady = !1, this.frameCount = 0, this.captureCanvas = document.createElement("canvas"), this.captureCanvas.width = 640, this.captureCanvas.height = 480
    },
    updateMarker: function (styler, timeStamp, options) {
        var markerId = 0;
        styler.getId() in this.stylerToObj ? markerId = this.stylerToObj[styler.getId()] : (markerId = this.addMarker({
            lat: styler.location.y,
            lon: styler.location.x,
            alt: styler.location.z,
            orientation: styler.orientation,
            color: styler.color,
            icon: styler.icon,
            label: styler.label,
            timeStamp: timeStamp,
            selected: void 0 !== options.selected && options.selected
        }), this.stylerToObj[styler.getId()] = markerId), this.updateMapMarker(markerId, {
            lat: styler.location.y,
            lon: styler.location.x,
            alt: styler.location.z,
            orientation: styler.orientation,
            color: styler.color,
            icon: styler.icon,
            timeStamp: timeStamp,
            selected: void 0 !== options.selected && options.selected
        })
    },
    updateDrapedImage: function (styler, timeStamp, options, snapshot) {
        var llaPos = styler.platformLocation,
            camPos = Cesium.Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z),
            DTR = Math.PI / 180,
            attitude = styler.platformOrientation,
            gimbal = styler.gimbalOrientation,
            nedTransform = Cesium.Transforms.northEastDownToFixedFrame(camPos),
            camRot = new Cesium.Matrix3;
        Cesium.Matrix4.getRotation(nedTransform, camRot);
        var rotM = new Cesium.Matrix3,
            uavHeading = Cesium.Matrix3.fromRotationZ(attitude.heading * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavHeading, camRot);
        var uavPitch = Cesium.Matrix3.fromRotationY(attitude.pitch * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavPitch, camRot);
        var uavRoll = Cesium.Matrix3.fromRotationX(attitude.roll * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavRoll, camRot);
        var gimbalYaw = Cesium.Matrix3.fromRotationZ(gimbal.heading * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalYaw, camRot);
        var gimbalRoll = Cesium.Matrix3.fromRotationX(gimbal.roll * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalRoll, camRot);
        var gimbalPitch = Cesium.Matrix3.fromRotationY((90 + gimbal.pitch) * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalPitch, camRot);
        var img2cam = Cesium.Matrix3.fromRotationZ(90 * DTR, rotM);
        Cesium.Matrix3.multiply(camRot, img2cam, camRot);
        var camProj = styler.cameraModel.camProj,
            camDistR = styler.cameraModel.camDistR,
            camDistT = styler.cameraModel.camDistT,
            imgSrc = styler.imageSrc;
        if (snapshot) {
            this.captureCanvas.getContext("2d").drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height), imgSrc = this.captureCanvas
        }
        var encCamPos = Cesium.EncodedCartesian3.fromCartesian(camPos),
            appearance = new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: "Image",
                        uniforms: {
                            image: imgSrc,
                            camPosHigh: encCamPos.high,
                            camPosLow: encCamPos.low,
                            camAtt: Cesium.Matrix3.toArray(Cesium.Matrix3.transpose(camRot, new Cesium.Matrix3)),
                            camProj: Cesium.Matrix3.toArray(camProj),
                            camDistR: camDistR,
                            camDistT: camDistT
                        }
                    }
                }),
                vertexShaderSource: Cesium._shaders.ImageDrapingVS,
                fragmentShaderSource: Cesium._shaders.ImageDrapingFS
            });
        if (null == this.imageDrapingPrimitive || snapshot) {
            null == this.imageDrapingPrimitive && (this.imageDrapingPrimitive = {});
            var promise = Cesium.sampleTerrain(this.viewer.terrainProvider, 11, [Cesium.Cartographic.fromDegrees(llaPos.x, llaPos.y)]),
                that = this;
            Cesium.when(promise, function (updatedPositions) {
                var newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Cesium.Primitive({
                    geometryInstances: new Cesium.GeometryInstance({
                        geometry: new Cesium.RectangleGeometry({
                            rectangle: Cesium.Rectangle.fromDegrees(llaPos.x - .1, llaPos.y - .1, llaPos.x + .1, llaPos.y + .1),
                            height: updatedPositions[0].height - 100,
                            extrudedHeight: llaPos.z - 1
                        })
                    }),
                    appearance: appearance
                }));
                snapshot || (that.imageDrapingPrimitive = newImageDrapingPrimitive), that.viewer.scene.primitives.raiseToTop(that.imageDrapingPrimitive), that.imageDrapingPrimitiveReady = !0
            })
        } else this.imageDrapingPrimitiveReady && (this.imageDrapingPrimitive.appearance = appearance);
        this.frameCount++
    },
    beforeAddingItems: function ($super, options) {
        this.markers = {};
        this.first = true;

        var imageryProviders = Cesium.createDefaultImageryProviderViewModels();
        this.viewer = new Cesium.Viewer(this.divId, {
            baseLayerPicker: true,
            imageryProviderViewModels: imageryProviders,
            selectedImageryProviderViewModel: imageryProviders[6],
            timeline: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            geocoder: true,
            fullscreenButton: false,
            showRenderLoopErrors: true,
            animation: false,
            targetFrameRate: 10
        });

        this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world'
        });

        this.viewer.scene.copyGlobeDepth = true;
        this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;

        var self = this;
        Cesium.knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
            //change icon
            if (Cesium.defined(entity)) {
                var dataSrcIds = [];
                var entityId;
                for (var stylerId in self.stylerToObj) {
                    if(self.stylerToObj[stylerId] == entity._dsid) {
                        for(var i=0;i < self.stylers.length;i++) {
                            if(self.stylers[i].getId() == stylerId) {
                                dataSrcIds = dataSrcIds.concat(self.stylers[i].getDataSourcesIds());
                                entityId = self.stylers[i].viewItem.entityId;
                                break;
                            }
                        }
                    }
                }
                OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                    dataSourcesIds: dataSrcIds,
                    entityId : entityId
                });
            }
        }.bind(this));
    },
    addMarker : function(properties) {

        var imgIcon = 'images/cameralook.png';
        if(properties.icon != null) {
            imgIcon = properties.icon;
        }
        var isModel = imgIcon.endsWith(".glb");
        var name = properties.label;
        var geom;

        if (isModel)
        {
            geom = {
                name: name,
                position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
                model : {
                    uri: imgIcon,
                    scale: 4,
                    modelM: Cesium.Matrix4.IDENTITY.clone()
                }
            };
        }
        else
        {
            geom = {
                //name: properties.label,
                position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
                billboard : {
                    image : imgIcon,
                    rotation : Cesium.Math.toRadians(0),
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                    scale: 0.5
                }
            };
        }

        var entity = this.viewer.entities.add(geom);
        var id = "view-marker-"+OSH.Utils.randomUUID();
        entity._dsid = id;
        this.markers[id] = entity;

        return id;
    },
    updateMapMarker: function(id, properties) {
        var lon = properties.lon;
        var lat = properties.lat;
        var alt = properties.alt;
        var orient = properties.orientation;
        var imgIcon = properties.icon;
        var isModel = imgIcon.endsWith(".glb");

        if (!isNaN(lon) && !isNaN(lat)) {
            var marker = this.markers[id];

            // get ground altitude if non specified
            if (typeof(alt) == "undefined" || isNaN(alt)) {
                alt = this.getAltitude(lat, lon);
                if (alt > 1)
                    alt += 0.3;
            }

            // update icon or models
            if (isModel) {
                marker.model.uri.setValue(imgIcon); // Updates icon model } else { marker.billboard.image = imgIcon; // Updates icon billboard image }

                // zoom map if first marker update
                if (this.first) {
                    this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 2000));
                    this.first = false;
                }

                if (properties.selected) {
                    this.viewer.selectedEntity = marker;
                }
            }

            // update position
            var pos = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
            marker.position = pos

            // update orientation
            if (typeof(orient) != "undefined") {
                var DTR = Math.PI / 180.;
                var heading = orient.heading;
                var pitch = 0.0;
                var roll = 0.0;
                var quat = Cesium.Transforms.headingPitchRollQuaternion(pos, heading * DTR, /*roll*DTR*/0.0, pitch * DTR); // inverse roll and pitch to go from NED to ENU
                marker.orientation = quat;
            }


        }
    },
    getAltitude: function (lat, lon) {
        var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3),
            altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));
        return ("undefined" == altitude || altitude <= 0) && (altitude = .1), altitude
    }
});
OSH.UI.LeafletView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options);
        var cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css)
    },
    beforeAddingItems: function (options) {
        this.initMap(options), this.initEvents()
    },
    initEvents: function () {
        document.getElementById(this.divId).oncontextmenu = function (e) {
            new Object({
                keyCode: 93
            });
            void 0 != e.preventDefault && e.preventDefault(), void 0 != e.stopPropagation && e.stopPropagation()
        }
    },
    initMap: function (options) {
        var initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        this.first = !0;
        var defaultLayers = this.getDefaultLayers(),
            defaultLayer = defaultLayers[0].layer,
            baseLayers = {},
            overlays = {};
        baseLayers[defaultLayers[0].name] = defaultLayers[0].layer, overlays[defaultLayers[1].name] = defaultLayers[1].layer, void 0 !== options && (options.initialView && (initialView = {
            location: new L.LatLng(options.initialView.lat, options.initialView.lon),
            zoom: options.initialView.zoom
        }), options.autoZoomOnFirstMarker || (this.first = !1), options.overlayLayers && (overlays = options.overlayLayers), options.baseLayers && (baseLayers = options.baseLayers), options.defaultLayer && (defaultLayer = options.defaultLayer)), this.map = new L.Map(this.divId, {
            fullscreenControl: !0,
            layers: defaultLayer
        }), L.control.layers(baseLayers, overlays).addTo(this.map), this.map.setView(initialView.location, initialView.zoom), this.markers = {}, this.polylines = {}
    },
    getDefaultBaseLayers: function () {
        return {}
    },
    getDefaultLayers: function (options) {
        var maxZoom = 22;
        void 0 !== options && options.maxZoom && (maxZoom = options.maxZoom);
        var esriLayer = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: '&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: maxZoom,
            maxNativeZoom: 19
        });
        return [{
            name: "OSM Streets",
            layer: L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                id: "mapbox.streets",
                attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: maxZoom
            })
        }, {
            name: "Esri Satellite",
            layer: esriLayer
        }]
    },
    initLayers: function () {
        var osm = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            minZoom: 1,
            maxZoom: 22,
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
        this.map.addLayer(osm)
    },
    addMarker: function (properties) {
        var marker = null;
        if (null != properties.icon) {
            var markerIcon = L.icon({
                iconAnchor: properties.iconAnchor,
                iconUrl: properties.icon
            });
            marker = L.marker([properties.lat, properties.lon], {
                icon: markerIcon
            })
        } else marker = L.marker([properties.lat, properties.lon]);
        marker.bindPopup(properties.name), marker.addTo(this.map), marker.setRotationAngle(properties.orientation);
        var id = "view-marker-" + OSH.Utils.randomUUID();
        this.markers[id] = marker, this.first === !0 && (this.map.setView(new L.LatLng(properties.lat, properties.lon), 19), this.first = !1);
        var self = this;
        return marker._icon.id = id, marker.on("click", function () {
            var dataSourcesIds = [];
            for (var stylerId in self.stylerToObj)
                if (self.stylerToObj[stylerId] == id) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId: styler.viewItem.entityId
                    });
                    break
                }
        }), document.getElementById(id).oncontextmenu = function (e) {
            new Object({
                keyCode: 93
            });
            void 0 != e.preventDefault && e.preventDefault(), void 0 != e.stopPropagation && e.stopPropagation();
            for (var stylerId in self.stylerToObj)
                if (self.stylerToObj[stylerId] == id) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU + "-" + self.stylerIdToStyler[stylerId].viewItem.contextMenuId, {
                        offsetX: -70,
                        offsetY: -70,
                        action: "show",
                        x: OSH.Utils.getXCursorPosition(),
                        y: OSH.Utils.getYCursorPosition(),
                        drawLineTo: id
                    });
                    break
                }
        }.bind(this), id
    },
    addPolyline: function (properties) {
        for (var polylinePoints = [], i = 0; i < properties.locations.length; i++) polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        var polyline = new L.Polyline(polylinePoints, {
                color: properties.color,
                weight: properties.weight,
                opacity: properties.opacity,
                smoothFactor: properties.smoothFactor
            }).addTo(this.map),
            id = "view-polyline-" + OSH.Utils.randomUUID();
        return this.polylines[id] = polyline, id
    },
    updateMarker: function (styler) {
        var markerId = 0;
        styler.getId() in this.stylerToObj ? markerId = this.stylerToObj[styler.getId()] : (markerId = this.addMarker({
            lat: styler.location.y,
            lon: styler.location.x,
            orientation: styler.orientation.heading,
            color: styler.color,
            icon: styler.icon,
            iconAnchor: styler.iconAnchor,
            name: this.names[styler.getId()]
        }), this.stylerToObj[styler.getId()] = markerId);
        var marker = this.markers[markerId],
            lon = styler.location.x,
            lat = styler.location.y;
        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng)
        }
        if (void 0 !== styler.orientation && marker.setRotationAngle(styler.orientation.heading), null != styler.icon && marker._icon.iconUrl != styler.icon) {
            var markerIcon = L.icon({
                iconAnchor: [16, 16],
                iconUrl: styler.icon
            });
            marker.setIcon(markerIcon)
        }
    },
    updatePolyline: function (styler) {
        var polylineId = 0;
        if (styler.getId() in this.stylerToObj ? polylineId = this.stylerToObj[styler.getId()] : (polylineId = this.addPolyline({
                color: styler.color,
                weight: styler.weight,
                locations: styler.locations,
                maxPoints: styler.maxPoints,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            }), this.stylerToObj[styler.getId()] = polylineId), polylineId in this.polylines) {
            var polyline = this.polylines[polylineId];
            this.map.removeLayer(polyline);
            for (var polylinePoints = [], i = 0; i < styler.locations.length; i++) polylinePoints.push(new L.LatLng(styler.locations[i].y, styler.locations[i].x));
            var polyline = new L.Polyline(polylinePoints, {
                color: styler.color,
                weight: styler.weight,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            }).addTo(this.map);
            this.polylines[polylineId] = polyline
        }
    },
    attachTo: function (parentElement) {
        this._super(parentElement), this.map.invalidateSize()
    },
    onResize: function ($super) {
        this._super(), this.map.invalidateSize()
    }
}), L.Map = L.Map.extend({
    openPopup: function (popup) {
        return this._popup = popup, this.addLayer(popup).fire("popupopen", {
            popup: this._popup
        })
    }
}),
    function () {
        var proto_initIcon = L.Marker.prototype._initIcon,
            proto_setPos = L.Marker.prototype._setPos,
            oldIE = "msTransform" === L.DomUtil.TRANSFORM;
        L.Marker.addInitHook(function () {
            var iconAnchor = this.options.icon.options.iconAnchor;
            iconAnchor && (iconAnchor = iconAnchor[0] + "px " + iconAnchor[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0
        }), L.Marker.include({
            _initIcon: function () {
                proto_initIcon.call(this)
            },
            _setPos: function (pos) {
                proto_setPos.call(this, pos), this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, oldIE ? this._icon.style[L.DomUtil.TRANSFORM] = " rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)")
            },
            setRotationAngle: function (angle) {
                return this.options.rotationAngle = angle, this.update(), this
            },
            setRotationOrigin: function (origin) {
                return this.options.rotationOrigin = origin, this.update(), this
            }
        })
    }();
OSH.UI.OpenLayerView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options), this.onResize()
    },
    beforeAddingItems: function (options) {
        this.initMap(options), void 0 !== options && options.map || this.initEvents()
    },
    initEvents: function () {
        document.getElementById(this.divId).oncontextmenu = function (e) {
            new Object({
                keyCode: 93
            });
            void 0 != e.preventDefault && e.preventDefault(), void 0 != e.stopPropagation && e.stopPropagation()
        };
        var self = this;
        this.map.getViewport().addEventListener("contextmenu", function (e) {
            e.preventDefault();
            var feature = self.map.forEachFeatureAtPixel(self.map.getEventPixel(e), function (feature, layer) {
                return feature
            });
            if (feature) {
                var id = feature.ha;
                for (var stylerId in self.stylerToObj)
                    if (self.stylerToObj[stylerId] == id) {
                        OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU + "-" + self.stylerIdToStyler[stylerId].viewItem.contextMenuId, {
                            offsetX: -70,
                            offsetY: -70,
                            action: "show",
                            x: OSH.Utils.getXCursorPosition(),
                            y: OSH.Utils.getYCursorPosition()
                        });
                        break
                    }
            }
        }), this.map.on("click", function (e) {
            self.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                var id = feature.ha,
                    dataSourcesIds = [];
                for (var stylerId in self.stylerToObj)
                    if (self.stylerToObj[stylerId] == id) {
                        var styler = self.stylerIdToStyler[stylerId];
                        OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                            dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                            entityId: styler.viewItem.entityId
                        });
                        break
                    }
            })
        })
    },
    updateMarker: function (styler) {
        var markerId = 0;
        styler.getId() in this.stylerToObj ? markerId = this.stylerToObj[styler.getId()] : (markerId = this.addMarker({
            lat: styler.location.y,
            lon: styler.location.x,
            orientation: styler.orientation.heading,
            color: styler.color,
            icon: styler.icon,
            name: this.names[styler.getId()]
        }), this.stylerToObj[styler.getId()] = markerId);
        var markerFeature = this.markers[markerId],
            lon = styler.location.x,
            lat = styler.location.y;
        if (!isNaN(lon) && !isNaN(lat)) {
            var coordinates = ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:900913");
            markerFeature.getGeometry().setCoordinates(coordinates)
        }
        if (null != styler.icon) {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    opacity: .75,
                    src: styler.icon,
                    rotation: styler.orientation.heading * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle)
        }
    },
    updatePolyline: function (styler) {
        var polylineId = 0;
        if (styler.getId() in this.stylerToObj ? polylineId = this.stylerToObj[styler.getId()] : (polylineId = this.addPolyline({
                color: styler.color,
                weight: styler.weight,
                locations: styler.locations,
                maxPoints: styler.maxPoints,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor,
                name: this.names[styler.getId()]
            }), this.stylerToObj[styler.getId()] = polylineId), polylineId in this.polylines) {
            for (var geometry = this.polylines[polylineId], polylinePoints = [], i = 0; i < styler.locations.length; i++) polylinePoints.push(ol.proj.transform([styler.locations[i].x, styler.locations[i].y], "EPSG:4326", "EPSG:900913"));
            geometry.setCoordinates(polylinePoints)
        }
    },
    initMap: function (options) {
        var initialView = null;
        this.first = !0;
        var overlays = [];
        this.markers = {}, this.polylines = {};
        var baseLayers = this.getDefaultLayers();
        if (void 0 !== options) {
            var maxZoom = 19;
            if (options.map) return void(this.map = options.map);
            options.maxZoom && (maxZoom = options.maxZoom), options.initialView && (initialView = new ol.View({
                center: ol.proj.transform([options.initialView.lon, options.initialView.lat], "EPSG:4326", "EPSG:900913"),
                zoom: options.initialView.zoom,
                maxZoom: maxZoom
            })), options.autoZoomOnFirstMarker || (this.first = !1), options.overlayLayers && (overlays = options.overlayLayers), options.baseLayers && (baseLayers = options.baseLayers), options.defaultLayer && options.defaultLayer
        } else initialView = new ol.View({
            center: ol.proj.transform([0, 0], "EPSG:4326", "EPSG:900913"),
            zoom: 11,
            maxZoom: maxZoom
        });
        this.map = new ol.Map({
            target: this.divId,
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: !1
                }
            }).extend([new ol.control.ZoomSlider, new ol.control.Rotate, new ol.control.ScaleLine]),
            interactions: ol.interaction.defaults().extend([new ol.interaction.Select({
                condition: ol.events.condition.mouseMove
            })]),
            layers: [new ol.layer.Group({
                title: "Base maps",
                layers: baseLayers
            }), new ol.layer.Group({
                title: "Overlays",
                layers: overlays
            })],
            view: initialView
        });
        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: "Layers"
        });
        this.map.addControl(layerSwitcher);
        var select_interaction = new ol.interaction.Select,
            self = this;
        select_interaction.getFeatures().on("add", function (e) {
            var feature = e.element,
                dataSourcesIds = [];
            for (var stylerId in self.stylerToObj)
                if (self.stylerToObj[stylerId] == feature.getId()) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId: styler.viewItem.entityId
                    });
                    break
                }
        }), this.map.addInteraction(select_interaction)
    },
    getDefaultBaseLayers: function () {
        return {}
    },
    getDefaultLayers: function () {
        return [new ol.layer.Tile({
            title: "OSM",
            type: "base",
            visible: !0,
            source: new ol.source.OSM
        })]
    },
    addMarker: function (properties) {
        var marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], "EPSG:4326", "EPSG:900913")),
            markerFeature = new ol.Feature({
                geometry: marker,
                name: "Marker"
            });
        if (null != properties.icon) {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    opacity: .75,
                    src: properties.icon,
                    rotation: properties.orientation * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle)
        }
        var vectorMarkerLayer = new ol.layer.Vector({
            title: properties.name,
            source: new ol.source.Vector({
                features: [markerFeature]
            })
        });
        this.map.addLayer(vectorMarkerLayer);
        var id = "view-marker-" + OSH.Utils.randomUUID();
        return markerFeature.setId(id), this.markers[id] = markerFeature, this.first && (this.first = !1, this.map.getView().setCenter(ol.proj.transform([properties.lon, properties.lat], "EPSG:4326", "EPSG:900913")), this.map.getView().setZoom(19)), id
    },
    createMarkerFromStyler: function (styler) {
        if (styler.getId() in this.stylerToObj) return this.stylerToObj[styler.getId()];
        var properties = {
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            },
            marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], "EPSG:4326", "EPSG:900913")),
            markerFeature = new ol.Feature({
                geometry: marker,
                name: "Marker"
            });
        if (null != properties.icon) {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    opacity: .75,
                    src: properties.icon,
                    rotation: properties.orientation * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle)
        }
        var id = "view-marker-" + OSH.Utils.randomUUID();
        return markerFeature.setId(id), this.markers[id] = markerFeature, this.stylerToObj[styler.getId()] = id, id
    },
    addPolyline: function (properties) {
        for (var polylinePoints = [], i = 0; i < properties.locations.length; i++) polylinePoints.push(ol.proj.transform([properties.locations[i].x, properties.locations[i].y], "EPSG:4326", "EPSG:900913"));
        var pathGeometry = new ol.geom.LineString(polylinePoints),
            feature = new ol.Feature({
                geometry: pathGeometry,
                name: "Line"
            }),
            source = new ol.source.Vector({
                features: [feature]
            }),
            vectorPathLayer = new ol.layer.Vector({
                title: properties.name,
                source: source,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: properties.color
                    }),
                    stroke: new ol.style.Stroke({
                        color: properties.color,
                        width: properties.weight
                    })
                })
            });
        this.map.addLayer(vectorPathLayer);
        var id = "view-polyline-" + OSH.Utils.randomUUID();
        return this.polylines[id] = pathGeometry, id
    },
    onResize: function ($super) {
        this._super(), this.map.updateSize()
    }
});
OSH.UI.DialogView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options), this.dialogId = "dialog-" + OSH.Utils.randomUUID(), this.pinDivId = "dialog-pin-" + OSH.Utils.randomUUID();
        var closeDivId = "dialog-close-" + OSH.Utils.randomUUID();
        this.connectDivId = "dialog-connect-" + OSH.Utils.randomUUID(), this.name = "Untitled";
        var htmlVar = "";
        if (htmlVar += "<div>", this.dockable = !1, this.closeable = !1, this.connected = !1, this.swapped = !1, this.connectionIds = [], this.draggable = !1, isUndefined(options) || (void 0 !== options.swapId && "" != options.swapId && (this.swapDivId = "dialog-exchange-" + OSH.Utils.randomUUID(), htmlVar += '<a id="' + this.swapDivId + '"class="pop-exchange fa fa-exchange" title="swap"></a>', this.divIdToSwap = options.swapId), void 0 !== options.connectionIds && void 0 !== options.connectionIds && options.connectionIds.length > 0 && (htmlVar += '<a id="' + this.connectDivId + '"class="pop-connect"></a>', this.connected = !0, this.connectionIds = options.connectionIds), void 0 !== options.dockable && options.dockable && (htmlVar += '<a id="' + this.pinDivId + '"class="pop-pin"></a>', this.dockable = options.dockable), void 0 !== options.closeable && options.closeable && (htmlVar += '<a id="' + closeDivId + '"class="pop-close" title="close">x</a>', this.closeable = options.closeable), void 0 !== options.draggable && options.draggable && (this.draggable = options.draggable), void 0 !== options.name && (this.name = options.name)), this.titleId = "dialog-title-" + OSH.Utils.randomUUID(), htmlVar += '<h3 id="' + this.titleId + '">' + this.name + "</h3></div>", this.rootTag = document.getElementById(this.divId), this.rootTag.innerHTML = htmlVar, this.rootTag.setAttribute("class", "pop-over resizable"), this.rootTag.setAttribute("draggable", this.draggable), this.keepRatio = !1, !isUndefined(options)) {
            var css = this.rootTag.className;
            options.css && (css += " " + options.css), options.keepRatio && (css += " keep-ratio-w", this.keepRatio = !0), this.rootTag.setAttribute("class", css)
        }
        this.flexDiv = document.createElement("div"), this.flexDiv.setAttribute("class", "pop-inner"), this.popContentDiv = document.createElement("div"), this.popContentDiv.setAttribute("class", "pop-content"), this.popContentDiv.setAttribute("id", "pop-content-id-" + OSH.Utils.randomUUID()), this.keepRatio || OSH.Utils.addCss(this.popContentDiv, "no-keep-ratio"), this.flexDiv.appendChild(this.popContentDiv), this.rootTag.appendChild(this.flexDiv), void 0 !== options && (void 0 === options.show || options.show ? this.initialWidth = this.rootTag.offsetWidth : this.rootTag.style.display = "none"), this.rootTag.addEventListener("dragstart", this.drag_start.bind(this), !1), document.addEventListener("dragover", this.drag_over.bind(this), !1), document.addEventListener("drop", this.drop.bind(this), !1), this.closeable && (document.getElementById(closeDivId).onclick = this.close.bind(this)), this.dockable && (document.getElementById(this.pinDivId).onclick = this.unpin.bind(this)), this.connectionIds.length > 0 && (document.getElementById(this.connectDivId).onclick = this.connect.bind(this)), void 0 !== this.swapDivId && (document.getElementById(this.swapDivId).onclick = this.swapClick.bind(this)), this.handleEvents();
        var self = this;
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE, function (event) {
            var dataSources = event.dataSourcesId;
            dataSources.length == self.connectionIds.length && dataSources.filter(function (n) {
                return self.connectionIds.indexOf(n) != -1
            }).length == self.connectionIds.length && (document.getElementById(self.connectDivId).setAttribute("class", "pop-connect"), self.connected = !0)
        }), OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, function (event) {
            var dataSources = event.dataSourcesId;
            dataSources.length == self.connectionIds.length && dataSources.filter(function (n) {
                return self.connectionIds.indexOf(n) != -1
            }).length == self.connectionIds.length && (document.getElementById(self.connectDivId).setAttribute("class", "pop-disconnect"), self.connected = !1)
        }), OSH.EventManager.observe("swap-restore", function (event) {
            self.swapped && event.exclude != self.id && (self.swap(), self.swapped = !1)
        });
        var p = this.rootTag.parentNode,
            testDiv = document.createElement("div");
        testDiv.setAttribute("class", "outer-dialog"), testDiv.appendChild(this.rootTag), p.appendChild(testDiv)
    },
    swapClick: function () {
        OSH.EventManager.fire("swap-restore", {
            exclude: this.id
        }), this.swap()
    },
    swap: function () {
        var containerDivToSwap = document.getElementById(this.divIdToSwap);
        if ("undefined" != containerDivToSwap && null != containerDivToSwap) {
            if (this.swapped) {
                var popContent = this.popContentDiv.firstChild,
                    swapContainerContent = document.getElementById(this.contentViewId);
                containerDivToSwap.removeChild(swapContainerContent), this.popContentDiv.removeChild(popContent), containerDivToSwap.appendChild(popContent), this.popContentDiv.appendChild(swapContainerContent), document.getElementById(this.titleId).innerText = this.name, this.swapped = !1, this.keepRatio && (OSH.Utils.addCss(this.rootTag, "keep-ratio-w"), OSH.Utils.removeCss(this.popContentDiv, "no-keep-ratio"), OSH.Utils.removeCss(containerDivToSwap, "keep-ratio-h"))
            } else {
                var popContent = this.popContentDiv.firstChild;
                this.contentViewId = popContent.id;
                var swapContainerContent = containerDivToSwap.firstChild;
                containerDivToSwap.removeChild(swapContainerContent), this.popContentDiv.removeChild(popContent), containerDivToSwap.appendChild(popContent), this.popContentDiv.appendChild(swapContainerContent), this.swapped = !0, document.getElementById(this.titleId).innerText = "- Swapped -", this.keepRatio && (OSH.Utils.removeCss(this.rootTag, "keep-ratio-w"), OSH.Utils.addCss(this.popContentDiv, "no-keep-ratio"), OSH.Utils.addCss(containerDivToSwap, "keep-ratio-h"))
            }
            for (var everyChild = document.getElementById(this.divIdToSwap).querySelectorAll("div"), i = 0; i < everyChild.length; i++) {
                var id = everyChild[i].id;
                id.startsWith("view-") && OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE + "-" + id)
            }
            for (var everyChild = this.popContentDiv.querySelectorAll("div"), i = 0; i < everyChild.length; i++) {
                var id = everyChild[i].id;
                id.startsWith("view-") && OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE + "-" + id)
            }
        }
    },
    show: function (properties) {
        properties.viewId.indexOf(this.getId()) > -1 && (this.rootTag.style.display = "block", void 0 === this.initialWidth && (this.initialWidth = this.rootTag.offsetWidth))
    },
    connect: function () {
        this.swapped || (this.connected ? OSH.EventManager.fire(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, {
            dataSourcesId: this.connectionIds
        }) : OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {
            dataSourcesId: this.connectionIds
        }))
    },
    unpin: function () {
        if (this.draggable) this.rootTag.style.top = 0, this.rootTag.style.left = 0 - (this.rootTag.offsetWidth - this.initialWidth), this.rootTag.style.position = "relative", this.rootTag.setAttribute("draggable", !1), document.body.removeChild(this.rootTag), this.container.appendChild(this.rootTag), this.draggable = !1, document.getElementById(this.pinDivId).setAttribute("class", "pop-pin");
        else {
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = this.rootTag.getBoundingClientRect(),
                offsetTop = elemRect.top - bodyRect.top,
                offsetLeft = elemRect.left - bodyRect.left;
            this.rootTag.setAttribute("draggable", !0), this.rootTag.parentNode.removeChild(this.rootTag), document.body.appendChild(this.rootTag), this.rootTag.style.top = offsetTop, this.rootTag.style.left = offsetLeft, this.rootTag.style.position = "absolute", this.draggable = !0, document.getElementById(this.pinDivId).setAttribute("class", "pop-pin pop-pin-drag")
        }
    },
    onClose: function (callback) {
        this.onClose = callback
    },
    close: function () {
        this.rootTag.style.display = "none", this.onClose && this.onClose()
    },
    drag_start: function (event) {
        event.stopPropagation();
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.effectAllowed = "all", event.dataTransfer.setData("text-" + this.rootTag.id, parseInt(style.getPropertyValue("left"), 10) - event.clientX + "," + (parseInt(style.getPropertyValue("top"), 10) - event.clientY))
    },
    drag_over: function (event) {
        return event.stopPropagation(), event.preventDefault(), !1
    },
    drop: function (event) {
        event.stopPropagation();
        var offset = event.dataTransfer.getData("text-" + this.rootTag.id).split(",");
        return this.rootTag.style.left = 100 * (event.clientX + parseInt(offset[0], 10)) / window.innerWidth + "%", this.rootTag.style.top = event.clientY + parseInt(offset[1], 10) + "px", event.preventDefault(), !1
    }
});
OSH.UI.MultiDialogView = OSH.UI.DialogView.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, options), this.popExtraDiv = document.createElement("div"), this.popExtraDiv.setAttribute("class", "pop-extra"), this.popExtraDiv.setAttribute("id", "pop-extra-id-" + OSH.Utils.randomUUID()), this.flexDiv.appendChild(this.popExtraDiv)
    },
    appendView: function (parentElement, properties) {
        var divToAdd = document.getElementById(parentElement);
        "none" === divToAdd.style.display && (divToAdd.style.display = "block");
        var extraDiv = document.createElement("div");
        extraDiv.setAttribute("class", "pop-extra-el");
        var i = document.createElement("i");
        i.setAttribute("class", "fa fa-caret-right pop-extra-collapse fa-2x"), i.onclick = function () {
            i.className.indexOf("fa-caret-down") == -1 ? i.className = "fa fa-caret-down pop-extra-show fa-2x" : i.className = "fa fa-caret-right pop-extra-collapse fa-2x"
        }, extraDiv.appendChild(i), extraDiv.appendChild(divToAdd), this.popExtraDiv.appendChild(extraDiv)
    },
    swap: function () {
        var currentSwapValue = this.swapped;
        this._super(), this.popExtraDiv.style.display = currentSwapValue ? "block" : "none"
    },
    show: function (properties) {
        this._super(properties)
    }
});
OSH.UI.Loading = BaseClass.extend({
    initialize: function () {
        var loadingDiv = document.createElement("div");
        loadingDiv.setAttribute("class", "loading-container"), OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_START, function (event) {
            var htmlVar = "";
            htmlVar += '\t<div class="loading-dot-container">', htmlVar += '\t<div class="loading-dot-section-1"><span class="loading-label">Buffering</span></div>', htmlVar += '\t<div class="loading-dot-section-2">', htmlVar += '\t<div class="loading-dot"></div>', htmlVar += '\t<div class="loading-dot"></div>', htmlVar += '\t<div class="loading-dot"></div>', htmlVar += "\t</div>", htmlVar += "\t</div>", loadingDiv.innerHTML = htmlVar, document.body.appendChild(loadingDiv)
        }), OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_STOP, function (event) {
            document.body.removeChild(loadingDiv)
        })
    }
}), new OSH.UI.Loading;
OSH.UI.RangeSlider = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options), this.slider = document.createElement("div");
        var activateButtonDiv = document.createElement("div"),
            aTagActivateButton = document.createElement("a");
        activateButtonDiv.appendChild(aTagActivateButton), this.slider.setAttribute("class", "osh-rangeslider-slider"), activateButtonDiv.setAttribute("class", "osh-rangeslider-control");
        var self = this;
        activateButtonDiv.addEventListener("click", function (event) {
            activateButtonDiv.className.indexOf("osh-rangeslider-control-select") > -1 ? (activateButtonDiv.setAttribute("class", "osh-rangeslider-control"), self.deactivate()) : (activateButtonDiv.setAttribute("class", "osh-rangeslider-control-select"), self.activate())
        }), document.getElementById(this.divId).appendChild(this.slider), document.getElementById(this.divId).appendChild(activateButtonDiv);
        var startTime = (new Date).getTime();
        this.endTime = new Date("2055-01-01T00:00:00Z").getTime(), this.slider.setAttribute("disabled", !0), this.dataSourcesId = [], this.multi = !1, this.dataCount = 0, this.refreshRate = 10, void 0 !== options && (void 0 !== options.startTime && (startTime = new Date(options.startTime).getTime()), void 0 !== options.endTime && (this.endTime = new Date(options.endTime).getTime()), void 0 !== options.dataSourcesId && (this.dataSourcesId = options.dataSourcesId), void 0 !== options.refreshRate && (this.refreshRate = options.refreshRate)), noUiSlider.create(this.slider, {
            start: [startTime, this.endTime],
            range: {
                min: startTime,
                max: this.endTime
            },
            format: wNumb({
                decimals: 0
            }),
            behaviour: "drag",
            connect: !0,
            tooltips: [wNumb({
                decimals: 1,
                edit: function (value) {
                    return new Date(parseInt(value)).toISOString().split("T")[1].split("Z")[0]
                }
            }), wNumb({
                decimals: 1,
                edit: function (value) {
                    return new Date(parseInt(value)).toISOString().split("T")[1].split("Z")[0]
                }
            })],
            pips: {
                mode: "positions",
                values: [5, 25, 50, 75],
                density: 1,
                format: wNumb({
                    edit: function (value) {
                        return new Date(parseInt(value)).toISOString().replace(".000Z", "Z")
                    }
                })
            }
        }), this.slider.noUiSlider.on("slide", function (values, handle) {
            self.update = !0
        }), OSH.EventManager.observe(OSH.EventManager.EVENT.CURRENT_MASTER_TIME, function (event) {
            var filterOk = !0;
            self.dataSourcesId.length > 0 && self.dataSourcesId.indexOf(event.dataSourceId) < 0 && (filterOk = !1), filterOk && !self.lock && ++self.dataCount % self.refreshRate == 0 && (self.slider.noUiSlider.set([event.timeStamp]), self.dataCount = 0)
        })
    },
    deactivate: function () {
        if (this.slider.setAttribute("disabled", !0), this.lock = !1, this.update) {
            var values = this.slider.noUiSlider.get();
            OSH.EventManager.fire(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
                startTime: new Date(parseInt(values[0])).toISOString(),
                endTime: new Date(parseInt(values[1])).toISOString()
            })
        }
        this.update = !1
    },
    activate: function () {
        this.slider.removeAttribute("disabled"), this.lock = !0
    }
});
var htmlTaskingComponent = "";
htmlTaskingComponent += '<div class="ptz-zoom">', htmlTaskingComponent += '   <div class="ptz-zoom-in"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>', htmlTaskingComponent += '   <div class="ptz-zoom-bar"></div>', htmlTaskingComponent += '   <div class="ptz-zoom-out"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>', htmlTaskingComponent += "</div>", htmlTaskingComponent += '<div class="ptz">', htmlTaskingComponent += '   <div tag="0" class=\'moveUp\' name=""></div>', htmlTaskingComponent += '   <div tag="91" class=\'moveTopLeft\' name=""></div>', htmlTaskingComponent += '   <div tag="90" class="moveTopRight" name=""></div>', htmlTaskingComponent += '   <div tag="6" class="moveLeft" name=""></div>', htmlTaskingComponent += '   <div cmd="ptzReset" class="reset" title="Center" name=""></div>', htmlTaskingComponent += '   <div tag="4" class="moveRight" name=""></div>', htmlTaskingComponent += '   <div tag="93" class="moveBottomLeft" name=""></div>', htmlTaskingComponent += '   <div tag="92" class="moveBottomRight" name=""></div>', htmlTaskingComponent += '   <div tag="2" class="moveDown" name=""></div>', htmlTaskingComponent += "</div>", htmlTaskingComponent += '<div class="ptz-right">', htmlTaskingComponent += "<ul>", htmlTaskingComponent += "            <li>", htmlTaskingComponent += "                <label>Presets:</label>", htmlTaskingComponent += '                <div class="ptz-select-style">', htmlTaskingComponent += '                     <select class="ptz-presets" required pattern="^(?!Select a Preset).*">', htmlTaskingComponent += '                         <option value="" disabled selected>Select a Preset</option>', htmlTaskingComponent += "                     </select>", htmlTaskingComponent += "                </div>", htmlTaskingComponent += "            </li>", htmlTaskingComponent += "</ul>", htmlTaskingComponent += "</div>", OSH.UI.PtzTaskingView = OSH.UI.View.extend({
    initialize: function (divId, options) {
        this._super(divId, [], options);
        var width = "640",
            height = "480";
        this.css = "tasking", this.cssSelected = "", void 0 !== options && (options.width && (width = options.width), options.height && (height = options.height), options.css && (this.css += options.css), options.cssSelected && (this.cssSelected = options.cssSelected), options.dataSenderId && (this.dataSenderId = options.dataSenderId)), this.rootTag = document.createElement("div"), this.rootTag.setAttribute("height", height), this.rootTag.setAttribute("width", width), this.rootTag.setAttribute("class", this.css), this.rootTag.setAttribute("id", "dataview-" + OSH.Utils.randomUUID()), document.getElementById(this.divId).appendChild(this.rootTag), this.rootTag.innerHTML = htmlTaskingComponent, this.pan = 0, this.tilt = 0, this.zoom = 0;
        this.observers = [], document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveUp").onclick = function () {
            this.onTiltClick(5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveTopLeft").onclick = function () {
            this.onTiltPanClick(-5, 5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveTopRight").onclick = function () {
            this.onTiltPanClick(5, 5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveRight").onclick = function () {
            this.onPanClick(5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveLeft").onclick = function () {
            this.onPanClick(-5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveDown").onclick = function () {
            this.onTiltClick(-5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveBottomLeft").onclick = function () {
            this.onTiltPanClick(-5, -5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz > .moveBottomRight").onclick = function () {
            this.onTiltPanClick(5, -5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-in").onclick = function () {
            this.onZoomClick(5)
        }.bind(this), document.querySelector("#" + this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-out").onclick = function () {
            this.onZoomClick(-5)
        }.bind(this), void 0 !== options && options.presets && (this.addPresets(options.presets), document.querySelector("#" + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets").onchange = this.onSelectedPresets.bind(this))
    },
    addPresets: function (presetsArr) {
        var selectTag = document.querySelector("#" + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets");
        for (var i in presetsArr) {
            var option = document.createElement("option");
            option.text = presetsArr[i], option.value = presetsArr[i], selectTag.add(option)
        }
    },
    onSelectedPresets: function (event) {
        var serverTag = document.querySelector("#" + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets"),
            option = serverTag.options[serverTag.selectedIndex];
        this.onChange(null, null, null, option.value)
    },
    removeInterval: function (interval) {
        this.timerIds.length > 0 && setTimeout(clearInterval(this.timerIds.pop()), interval + 50)
    },
    onTiltClick: function (value) {
        this.tilt += value, this.onChange(null, value, null, null)
    },
    onTiltPanClick: function (tiltValue, panValue) {
        this.tilt += tiltValue, this.pan += panValue, this.onChange(tiltValue, panValue, null, null)
    },
    onPanClick: function (value) {
        this.pan += value, this.onChange(value, null, null, null)
    },
    onZoomClick: function (value) {
        this.zoom += value, this.onChange(null, null, value, null)
    },
    onChange: function (rpan, rtilt, rzoom, preset) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.PTZ_SEND_REQUEST + "-" + this.dataSenderId, {
            cmdData: {
                rpan: rpan,
                rtilt: rtilt,
                rzoom: rzoom,
                preset: preset
            },
            onSuccess: function (event) {
                console.log("Failed to send request: " + event)
            },
            onError: function (event) {
                console.log("Request sent successfully: " + event)
            }
        })
    }
});
OSH.UI.FFMPEGView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options), this.fps = 0;
        var width = "640",
            height = "480";
        if (this.nbFrames = 0, this.FLUSH_LIMIT = 200, this.statistics = {
                videoStartTime: 0,
                videoPictureCounter: 0,
                windowStartTime: 0,
                windowPictureCounter: 0,
                fps: 0,
                fpsMin: 1e3,
                fpsMax: -1e3,
                fpsSinceStart: 0
            }, this.useWorker = OSH.Utils.isWebWorker(), this.resetCalled = !0, this.useTransferableData = !0, void 0 !== options) {
            if (options.width && (width = options.width), options.height && (height = options.height), this.useWorker = void 0 !== options.useWorker && options.useWorker && OSH.Utils.isWebWorker(), options.adjust) {
                var divElt = document.getElementById(this.divId);
                divElt.offsetWidth < width && (width = divElt.offsetWidth), divElt.offsetHeight < height && (height = divElt.offsetHeight)
            }
            options.useWebWorkerTransferableData && (this.useWebWorkerTransferableData = options.useWebWorkerTransferableData)
        }
        this.yuvCanvas = new YUVCanvas({
            width: width,
            height: height,
            contextOptions: {
                preserveDrawingBuffer: !0
            }
        }), document.getElementById(this.divId).appendChild(this.yuvCanvas.canvasElement);
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            })
        }), this.useWorker ? this.initFFMPEG_DECODER_WORKER() : this.initFFMEG_DECODER()
    },
    setData: function (dataSourceId, data) {
        var pktData = data.data,
            pktSize = pktData.length;
        if (this.resetCalled = !1, this.useWorker) this.decodeWorker(pktSize, pktData);
        else {
            var decodedFrame = this.decode(pktSize, pktData);
            this.displayFrame(decodedFrame), this.update = !1
        }
        this.checkFlush()
    },
    checkFlush: function () {
        !this.useWorker && this.nbFrames >= this.FLUSH_LIMIT && (this.nbFrames = 0, _avcodec_flush_buffers(this.av_ctx))
    },
    selectDataView: function (dataSourceIds, entityId) {
        dataSourceIds.indexOf(this.dataSourceId) > -1 || void 0 !== this.entityId && this.entityId == entityId ? document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected) : document.getElementById(this.divId).setAttribute("class", this.css)
    },
    reset: function () {
        _avcodec_flush_buffers(this.av_ctx), this.resetCalled = !0;
        var nodata = new Uint8Array(1);
        this.yuvCanvas.drawNextOuptutPictureGL({
            yData: nodata,
            yDataPerRow: 1,
            yRowCnt: 1,
            uData: nodata,
            uDataPerRow: 1,
            uRowCnt: 1,
            vData: nodata,
            vDataPerRow: 1,
            vRowCnt: 1
        })
    },
    updateStatistics: function () {
        var s = this.statistics;
        s.videoPictureCounter += 1, s.windowPictureCounter += 1;
        var now = Date.now();
        s.videoStartTime || (s.videoStartTime = now);
        var videoElapsedTime = now - s.videoStartTime;
        if (s.elapsed = videoElapsedTime / 1e3, !(videoElapsedTime < 1e3)) {
            if (!s.windowStartTime) return void(s.windowStartTime = now);
            if (now - s.windowStartTime > 1e3) {
                var windowElapsedTime = now - s.windowStartTime,
                    fps = s.windowPictureCounter / windowElapsedTime * 1e3;
                s.windowStartTime = now, s.windowPictureCounter = 0, fps < s.fpsMin && (s.fpsMin = fps), fps > s.fpsMax && (s.fpsMax = fps), s.fps = fps
            }
            var fps = s.videoPictureCounter / videoElapsedTime * 1e3;
            s.fpsSinceStart = fps
        }
    },
    onAfterDecoded: function () {
    },
    initFFMPEG_DECODER_WORKER: function (callback) {
        function release(decodedFrame) {
            self.worker.postMessage({
                data: decodedFrame,
                release: !0
            }, [decodedFrame.y.buffer, decodedFrame.u.buffer, decodedFrame.v.buffer])
        }

        this.worker = new Worker("js/workers/osh-UI-FFMPEGViewWorker.js");
        var decodedFrame, self = this;
        this.worker.onmessage = function (e) {
            null !== e.data && (decodedFrame = e.data.data, this.displayFrame(e.data.width, e.data.height, decodedFrame), release(decodedFrame))
        }.bind(this), this.worker.onerror = function (e) {
            console.error(e)
        }
    },
    displayFrame: function (width, height, decodedFrame) {
        this.resetCalled || (this.yuvCanvas.canvasElement.drawing = !0, width != this.yuvCanvas.width && (this.yuvCanvas.canvasElement.width = width, this.yuvCanvas.width = width), height != this.yuvCanvas.height && (this.yuvCanvas.canvasElement.height = height, this.yuvCanvas.height = height), this.yuvCanvas.drawNextOuptutPictureGL({
            yData: decodedFrame.y,
            yDataPerRow: width,
            yRowCnt: height,
            uData: decodedFrame.u,
            uDataPerRow: width / 2,
            uRowCnt: height / 2,
            vData: decodedFrame.v,
            vDataPerRow: width / 2,
            vRowCnt: height / 2
        }), this.yuvCanvas.canvasElement.drawing = !1, this.updateStatistics(), this.onAfterDecoded())
    },
    decodeWorker: function (pktSize, pktData) {
        if (this.useWebWorkerTransferableData) this.worker.postMessage({
            data: pktData,
            release: !1
        }, [pktData.buffer]);
        else {
            var noTransferableObjData = {
                data: pktData,
                byteOffset: pktData.byteOffset,
                release: !1
            };
            this.worker.postMessage(noTransferableObjData)
        }
    },
    initFFMEG_DECODER: function () {
        Module.ccall("avcodec_register_all");
        var codec = Module.ccall("avcodec_find_decoder_by_name", "number", ["string"], ["h264"]);
        return 0 == codec ? void console.error("Could not find H264 codec") : (this.av_ctx = _avcodec_alloc_context3(codec), _avcodec_open2(this.av_ctx, codec, 0) < 0 ? void console.error("Could not initialize codec") : (this.av_pkt = Module._malloc(96), this.av_pktData = Module._malloc(153600), _av_init_packet(this.av_pkt), Module.setValue(this.av_pkt + 24, this.av_pktData, "*"), this.av_frame = _avcodec_alloc_frame(), this.av_frame || alert("Could not allocate video frame"), this.got_frame = Module._malloc(4), void(this.maxPktSize = 51200)))
    },
    decode: function (pktSize, pktData) {
        if (!this.update) {
            this.update = !0, pktSize > this.maxPktSize && (Module._free(this.av_pktData), this.av_pktData = Module._malloc(pktSize), Module.setValue(this.av_pkt + 24, this.av_pktData, "*"), this.maxPktSize = pktSize);
            var self = this;
            Module.setValue(self.av_pkt + 28, pktSize, "i32"), Module.writeArrayToMemory(pktData, self.av_pktData);
            if (_avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt) < 0) return console.log("Error while decoding frame"), null;
            if (0 == Module.getValue(self.got_frame, "i8")) return null;
            var decoded_frame = self.av_frame,
                frame_width = Module.getValue(decoded_frame + 68, "i32"),
                frame_height = Module.getValue(decoded_frame + 72, "i32"),
                frameYDataPtr = Module.getValue(decoded_frame, "*"),
                frameUDataPtr = Module.getValue(decoded_frame + 4, "*"),
                frameVDataPtr = Module.getValue(decoded_frame + 8, "*");
            try {
                return {
                    frame_width: frame_width,
                    frame_height: frame_height,
                    frameYDataPtr: frameYDataPtr,
                    frameUDataPtr: frameUDataPtr,
                    frameVDataPtr: frameVDataPtr,
                    frameYData: new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height),
                    frameUData: new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2),
                    frameVData: new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2)
                }
            } catch (e) {
                return console.error(e), null
            }
        }
    }
});
OSH.UI.MjpegView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        if (this._super(parentElementDivId, [], options), this.imgTag = document.createElement("img"), this.imgTag.setAttribute("id", "dataview-" + OSH.Utils.randomUUID()), this.rotation = 0, void 0 !== options && void 0 !== options.rotation) {
            this.rotation = options.rotation * Math.PI / 180, this.canvas = document.createElement("canvas"), this.canvas.width = 640, this.canvas.height = 480;
            var ctx = this.canvas.getContext("2d");
            ctx.translate(0, 480), ctx.rotate(this.rotation), document.getElementById(this.divId).appendChild(this.canvas)
        } else document.getElementById(this.divId).appendChild(this.imgTag);
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            })
        })
    },
    setData: function (dataSourceId, data) {
        var oldBlobURL = this.imgTag.src;
        this.imgTag.src = data.data, window.URL.revokeObjectURL(oldBlobURL)
    },
    selectDataView: function (dataSourceIds, entityId) {
        dataSourceIds.indexOf(this.dataSourceId) > -1 || void 0 !== this.entityId && this.entityId == entityId ? document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected) : document.getElementById(this.divId).setAttribute("class", this.css)
    },
    reset: function () {
        this.imgTag.src = ""
    }
});
OSH.UI.Mp4View = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options);
        this.codecs = "avc1.64001E", void 0 !== options && (options.css && (this.css = options.css), options.codecs && (this.codecs = options.codecs)), this.video = document.createElement("video"), this.video.setAttribute("control", ""), document.getElementById(this.divId).appendChild(this.video);
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            })
        }), this.mediaSource = new MediaSource, this.buffer = null, this.queue = [], this.video.src = window.URL.createObjectURL(this.mediaSource), this.mediaSource.addEventListener("sourceopen", function (e) {
            this.mediaSource.duration = 1e7, this.video.play(), this.buffer = this.mediaSource.addSourceBuffer('\tvideo/mp4; codecs="avc1.64001E"; profiles="isom,iso2,avc1,iso6,mp41"');
            this.mediaSource;
            this.buffer.addEventListener("updatestart", function (e) {
                this.queue.length > 0 && !this.buffer.updating && this.buffer.appendBuffer(this.queue.shift())
            }.bind(this)), this.buffer.addEventListener("error", function (e) {
            }), this.buffer.addEventListener("abort", function (e) {
            }), this.buffer.addEventListener("updateend", function () {
                this.queue.length > 0 && this.buffer.appendBuffer(this.queue.shift())
            }.bind(this))
        }.bind(this), !1);
        this.mediaSource;
        this.mediaSource.addEventListener("sourceopen", function (e) {
        }), this.mediaSource.addEventListener("sourceended", function (e) {
        }), this.mediaSource.addEventListener("sourceclose", function (e) {
        }), this.mediaSource.addEventListener("error", function (e) {
        }), OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            })
        })
    },
    setData: function (dataSourceId, data) {
        this.buffer.updating || this.queue.length > 0 ? this.queue.push(data.data) : this.buffer.appendBuffer(data.data)
    },
    selectDataView: function (dataSourceIds, entityId) {
        dataSourceIds.indexOf(this.dataSourceId) > -1 || void 0 !== this.entityId && this.entityId == entityId ? document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected) : document.getElementById(this.divId).setAttribute("class", this.css)
    }
});
