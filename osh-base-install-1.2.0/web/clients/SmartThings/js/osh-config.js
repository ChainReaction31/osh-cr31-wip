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
            endpointUrl: cloudHostName + "/sensorhub/sos",
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
            endpointUrl: cloudHostName + "/sensorhub/sos",
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

    addMotionSensor("motion1", "Motion - Southeast", "urn:osh:client:788c0cdb-021d-4af4-bdd1-a88759541182-sos", -86.590321, 34.725591);
    addMotionSensor("motion2", "Motion - Southwest", "urn:osh:client:bc3af5df-5d8e-4ffc-9033-653225be8fa5-sos", -86.590970, 34.725154);
    addMotionSensor("motion3", "Motion - Northeast", "urn:osh:client:dfea68d4-5c6f-4a89-aa1b-33ae9075d6e1-sos", -86.591303, 34.726620);
    addMotionSensor("motion4", "Motion - Northwest", "urn:osh:client:e4bc1957-a74a-485f-9317-b5f5646f6d1d-sos", -86.591934, 34.726383);

    addDoorSensor("door1", "Access North East", "urn:osh:client:319aa28d-300b-4c5a-834b-edc1d6cb9336-sos", -86.591568, 34.726743);
    addDoorSensor("door2", "Loading Dock 1", "urn:osh:client:1b837d84-3c33-459c-b7e9-a43efddd7c56", -86.592039, 34.726109);
    addDoorSensor("door3", "Loading Dock 2", "urn:osh:client:0552cd9c-daab-4853-b2c8-1549d1adf36d", -86.591961, 34.726008);
    addDoorSensor("door4", "Access South West 1", "urn:osh:client:4b1c2dc7-a544-478f-8de3-9362e5e63a15-sos", -86.591290, 34.725343);
    addDoorSensor("door5", "Access South West 2", "urn:osh:client:17f35aff-2913-43ec-8215-b62131f5cf6d", -86.591085, 34.725119);


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
            endpointUrl: cloudHostName + "/sensorhub/sos",
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