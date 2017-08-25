/**
 * Created by ChainReaction31 on 8/18/2017.
 * Adapted from the Geo-HSV Indoor Common Operating Picture client
 */

function init() {

    var stHostName = "botts-geo.com:8181";
    var hostName = "localhost:8181";
    var cloudHostName = "146.148.39.135:8181";

    // time settings
    // for real-time
    var startTime = "now";
    var endTime = "2080-01-01T00:00:00Z";
    var sync = false;

    // for replay
    /*var startTime = "2017-08-17T22:37:21.005Z";
    var endTime = "2017-08-17T22:47:15.042Z";
    var sync = true;*/

    var replaySpeed = "1";
    var bufferingTime = 100;
    var dataStreamTimeOut = 4000;
    var useFFmpegWorkers = true;

    // menu ids
    var treeMenuId = "tree-menu-";
    var mapMenuId = "map-menu-";
    var menuGroupId = "allmenus";


    // ---------------------------------------------------------------//
    // ------------------- Data Sources Controller -------------------//
    // ---------------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });


    //--------------------------------------------------------------//
    //------------------------  Map View(s)  -----------------------//
    //--------------------------------------------------------------//

    var cesiumView = new OSH.UI.CesiumView("main-container", []);
    cesiumView.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

    var lat = 34.72704;
    var lon = -86.59074;
    var halfsize = 0.002045;
    var aratio = 0.8;
    var east = lon + halfsize*aratio;
    var west = lon - halfsize*aratio;
    var north = lat + halfsize;
    var south = lat - halfsize;
    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    var vbc = cesiumView.viewer.entities.add({
        name: "Von Braun Center",
        rectangle: {
            coordinates: rectangle,
            material: new Cesium.ImageMaterialProperty({
                image: './models/vbc_facility_rot.png',
                transparent: true
            })
        }
    });


    function addMotionSensor(entityID, entityName, offeringID, lon, lat) {

        // create data sources
        var sensorData = new OSH.DataReceiver.JSON("Motion", {
            protocol: "ws",
            service: "SOS",
            endpointUrl: stHostName + "/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/MotionSensor",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: bufferingTime,
            timeOut: dataStreamTimeOut,
            connect: offeringID != null
        });

        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [sensorData]
        };
        dataSourceController.addEntity(entity);

        // add item to tree
        treeItems.push({
            entity: entity,
            path: "Motion Sensors",
            treeIcon: "images/motion-on.png"
        })

        // add marker to map
        cesiumView.addViewItem({
            name: entityName,
            entityId: entity.id,
            styler: new OSH.UI.Styler.PointMarker({
                location: {
                    x: lon,
                    y: lat,
                    z: 0
                },
                orientation: {
                    heading: 90
                },
                icon: 'images/motion-off.png',
                iconFunc: {
                    dataSourceIds: [sensorData.getId()],
                    handler: function (rec, timeStamp) {
                        if (rec.motion == 'active') {
                            return 'images/motion-on.png'
                        } else {
                            return 'images/motion-off.png';
                        }
                    }
                },
                label: entityName
            }),
            contextMenuId: mapMenuId + entityID
        });

        return entity;
    }

    function addDoorSensor(entityID, entityName, offeringID, lon, lat) {

        // create data sources
        var sensorData = new OSH.DataReceiver.JSON("Door", {
            protocol: "ws",
            service: "SOS",
            endpointUrl: stHostName + "/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/ContactSensor",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: bufferingTime,
            timeOut: dataStreamTimeOut,
            connect: offeringID != null
        });

        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [sensorData]
        };
        dataSourceController.addEntity(entity);

        // add item to tree
        treeItems.push({
            entity: entity,
            path: "Door Sensors",
            treeIcon: "images/door-closed.png"
        })

        // add marker to map
        cesiumView.addViewItem({
            name: entityName,
            entityId: entity.id,
            styler: new OSH.UI.Styler.PointMarker({
                location: {
                    x: lon,
                    y: lat,
                    z: 0
                },
                orientation: {
                    heading: 90
                },
                icon: 'images/door-closed.png',
                iconFunc: {
                    dataSourceIds: [sensorData.getId()],
                    handler: function (rec, timeStamp) {
                        if (rec.contact == 'open') {
                            return 'images/door-open.png'
                        } else {
                            return 'images/door-closed.png';
                        }
                    }
                },
                label: entityName
            }),
            contextMenuId: mapMenuId + entityID
        });

        return entity;
    }


    // --------------------------------------------------------------//
    // ------------------------- Entities ---------------------------//
    // --------------------------------------------------------------//

    var treeItems = [];

    addMotionSensor("motion1", "Motion - South East", "urn:osh:client:f2da0945-4a38-4d1a-95ce-faa807872cd0-sos", -86.590321, 34.725591);
    addMotionSensor("motion2", "Motion - South West", "urn:osh:client:c99a7368-1bc1-4f00-82ce-cf0072ffbec5-sos", -86.590970, 34.725154);
    addMotionSensor("motion3", "Motion - North East", null, -86.591303, 34.726620);
    addMotionSensor("motion4", "Motion - North West", null, -86.591934, 34.726383);

    addDoorSensor("door1", "Access North East", "urn:osh:client:94dc0797-f0ca-497c-893d-5fb0ce350711-sos", -86.591568, 34.726743);
    addDoorSensor("door2", "Loading Dock 1", null, -86.592039, 34.726109);
    addDoorSensor("door3", "Loading Dock 2", null, -86.591961, 34.726008);
    addDoorSensor("door4", "Access South West 1", null, -86.591290, 34.725343);
    addDoorSensor("door5", "Access South West 2", null, -86.591085, 34.725119);


    // --------------------------------------------------------------//
    // ------------------------ Tree View ---------------------------//
    // --------------------------------------------------------------//

    var entityTreeDialog = new OSH.UI.DialogView(document.body.id, {
        css: "tree-dialog",
        name: "Entities",
        show: true,
        draggable: true,
        dockable: false,
        closeable: true
    });

    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id, treeItems, {
        css: "tree-container"
    });

    // time slider view
    if (startTime !== 'now') {
        var rangeSlider = new OSH.UI.RangeSlider("rangeslider-container", {
            startTime: startTime,
            endTime: endTime,
            css: "rangeSlider"
        });
    }

    // start streams and display
    dataSourceController.connectAll();
    cesiumView.viewer.flyTo(vbc, {offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-90), Cesium.Math.toRadians(-90), 500)});


    //--------------------------------------------------------------//
    //------ Helper methods to add specific types of sensors -------//
    //--------------------------------------------------------------//

    function addTempSensor() {
        // create data sources
        var sensorData = new OSH.DataReceiver.JSON("Temperature", {
            protocol: "ws",
            service: "SOS",
            endpointUrl: stHostName + "/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/Temperature",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: bufferingTime,
            timeOut: dataStreamTimeOut,
            connect: offeringID != null
        });

        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [sensorData]
        };
        dataSourceController.addEntity(entity);

        // add item to tree
        treeItems.push({
            entity: entity,
            path: "Temperature Sensors",
            treeIcon: "images/Thermometer(Base).svg"
        })

        // add marker to map
        cesiumView.addViewItem({
            name: entityName,
            entityId: entity.id,
            styler: new OSH.UI.Styler.PointMarker({    //TODO: add varied temp sensor icons
                location: {
                    x: lon,
                    y: lat,
                    z: 0
                },
                orientation: {
                    heading: 90
                },
                icon: 'images/Thermometer(Base).svg',
                iconFunc: {
                    dataSourceIds: [sensorData.getId()],
                    handler: function (rec, timeStamp) { // TODO: need several levels of temp icon from cold to hot
                        if (rec.temperature > 65 && rec.temperature <= 75) {
                            return 'images/Thermometer(Normal).svg'
                        } else if (rec.temperature > 75 && rec.temperature <= 85) {
                            return 'images/Thermometer(Hot).svg';
                        } else if (rec.temperature > 85) {
                            return 'images/Thermometer(Hottest).svg'
                        } else if (rec.temperature > 55 && rec.temperature <= 65) {
                            return 'images/Thermometer(Cool).svg'
                        } else if (rec.temperature <= 55) {
                            return
                        }
                    }
                },
                label: entityName
            }),
            contextMenuId: mapMenuId + entityID
        });

        return entity;
    }

    function addLuminanceSensor() {

    }

    function addHumiditySensor() {

    }

    function addUVSensor() {

    }

    function addSoundSensor() {

    }

    function addSoundPressureLevelSenor() {

    }

    function addPresenceSensor() {

    }
}

// TODO: add various other sensors and things