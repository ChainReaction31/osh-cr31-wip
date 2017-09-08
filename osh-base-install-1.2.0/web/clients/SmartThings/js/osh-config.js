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

    // viewer vars
    var scene = viewer.scene;
    var camera = scene.camera;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);


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
// TODO: crop out unnecessary code from starburst example to get the effect right for multiple sensors

// Add labels clustered at the same location
var numBillboards = 30;
for (var i = 0; i < numBillboards; ++i) {
    var position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
    viewer.entities.add({
        position : position,
        billboard : {
            image : '../images/facility.gif',
            scale : 2.5
        },
        label : {
            text : 'Label' + i,
            show : false
        }
    });
}

handler.setInputAction(function(movement) {
    // Star burst on left mouse click.
    starBurst(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

handler.setInputAction(function(movement) {
    // Remove the star burst when the mouse exits the circle or show the label of the billboard the mouse is hovering over.
    updateStarBurst(movement.endPosition);
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

camera.moveStart.addEventListener(function() {
    // Reset the star burst on camera move because the lines from the center
    // because the line end points rely on the screen space positions of the billboards.
    undoStarBurst();
});

// State saved across mouse click and move events
var starBurstState = {
    enabled : false,
    pickedEntities : undefined,
    billboardEyeOffsets : undefined,
    labelEyeOffsets : undefined,
    linePrimitive : undefined,
    radius : undefined,
    center : undefined,
    pixelPadding : 10.0,
    angleStart : 0.0,
    angleEnd : Cesium.Math.PI,
    maxDimension : undefined
};

function offsetBillboard(entity, entityPosition, angle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets) {
    var x = magnitude * Math.cos(angle);
    var y = magnitude * Math.sin(angle);

    var offset = new Cesium.Cartesian2(x, y);

    var drawingBufferWidth = scene.drawingBufferWidth;
    var drawingBufferHeight = scene.drawingBufferHeight;

    var diff = Cesium.Cartesian3.subtract(entityPosition, camera.positionWC, new Cesium.Cartesian3());
    var distance = Cesium.Cartesian3.dot(camera.directionWC, diff);

    var dimensions = camera.frustum.getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, new Cesium.Cartesian2());
    Cesium.Cartesian2.multiplyByScalar(offset, Cesium.Cartesian2.maximumComponent(dimensions), offset);

    var labelOffset;
    var billboardOffset = entity.billboard.eyeOffset;

    var eyeOffset = new Cesium.Cartesian3(offset.x, offset.y, 0.0);
    entity.billboard.eyeOffset = eyeOffset;
    if (Cesium.defined(entity.label)) {
        labelOffset = entity.label.eyeOffset;
        entity.label.eyeOffset = new Cesium.Cartesian3(offset.x, offset.y, -10.0);
    }

    var endPoint = Cesium.Matrix4.multiplyByPoint(camera.viewMatrix, entityPosition, new Cesium.Cartesian3());
    Cesium.Cartesian3.add(eyeOffset, endPoint, endPoint);
    Cesium.Matrix4.multiplyByPoint(camera.inverseViewMatrix, endPoint, endPoint);
    lines.push(endPoint);

    billboardEyeOffsets.push(billboardOffset);
    labelEyeOffsets.push(labelOffset);
}

function starBurst(mousePosition) {
    if (Cesium.defined(starBurstState.pickedEntities)) {
        return;
    }

    var pickedObjects = scene.drillPick(mousePosition);
    if (!Cesium.defined(pickedObjects) || pickedObjects.length < 2) {
        return;
    }

    var billboardEntities = [];
    var length = pickedObjects.length;
    var i;

    for (i = 0; i < length; ++i) {
        var pickedObject = pickedObjects[i];
        if (pickedObject.primitive instanceof Cesium.Billboard) {
            billboardEntities.push(pickedObject);
        }
    }

    if (billboardEntities.length === 0) {
        return;
    }

    var pickedEntities = starBurstState.pickedEntities = [];
    var billboardEyeOffsets = starBurstState.billboardEyeOffsets = [];
    var labelEyeOffsets = starBurstState.labelEyeOffsets = [];
    var lines = [];
    starBurstState.maxDimension = Number.NEGATIVE_INFINITY;

    var angleStart = starBurstState.angleStart;
    var angleEnd = starBurstState.angleEnd;

    var angle = angleStart;
    var angleIncrease;
    var magnitude;
    var magIncrease;
    var maxDimension;

    // Drill pick gets all of the entities under the mouse pointer.
    // Find the billboards and set their pixel offsets in a circle pattern.
    length = billboardEntities.length;
    i = 0;
    while (i < length) {
        var object = billboardEntities[i];
        if (pickedEntities.length === 0) {
            starBurstState.center = Cesium.Cartesian3.clone(object.primitive.position);
        }

        if (!Cesium.defined(angleIncrease)) {
            var width = object.primitive.width;
            var height = object.primitive.height;
            maxDimension = Math.max(width, height) * object.primitive.scale + starBurstState.pixelPadding;
            magnitude = maxDimension + maxDimension * 0.5;
            magIncrease = magnitude;
            angleIncrease = maxDimension / magnitude;
        }

        offsetBillboard(object.id, object.primitive.position, angle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets);
        pickedEntities.push(object);

        var reflectedAngle = angleEnd - angle;
        if (i + 1 < length && reflectedAngle - angleIncrease * 0.5 > angle + angleIncrease * 0.5) {
            object = billboardEntities[++i];
            offsetBillboard(object.id, object.primitive.position, reflectedAngle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets);
            pickedEntities.push(object);
        }

        angle += angleIncrease;
        if (reflectedAngle - angleIncrease * 0.5 < angle + angleIncrease * 0.5) {
            magnitude += magIncrease;
            angle = angleStart;
            angleIncrease = maxDimension / magnitude;
        }

        ++i;
    }

    // Add lines from the pick center out to the translated billboard.
    var instances = [];
    length = lines.length;
    for (i = 0; i < length; ++i) {
        var pickedEntity = pickedEntities[i];
        starBurstState.maxDimension = Math.max(pickedEntity.primitive.width, pickedEntity.primitive.height, starBurstState.maxDimension);

        instances.push(new Cesium.GeometryInstance({
            geometry : new Cesium.SimplePolylineGeometry({
                positions : [starBurstState.center, lines[i]],
                followSurface : false,
                granularity : Cesium.Math.PI_OVER_FOUR
            }),
            attributes : {
                color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE)
            }
        }));
    }

    starBurstState.linePrimitive = scene.primitives.add(new Cesium.Primitive({
        geometryInstances : instances,
        appearance : new Cesium.PerInstanceColorAppearance({
            flat : true,
            translucent : false
        }),
        asynchronous : false
    }));

    viewer.selectedEntity = undefined;
    starBurstState.radius = magnitude + magIncrease;
}

function updateStarBurst(mousePosition) {
    if (!Cesium.defined(starBurstState.pickedEntities)) {
        return;
    }

    if (!starBurstState.enabled) {
        // For some reason we get a mousemove event on click, so
        // do not show a label on the first event.
        starBurstState.enabled = true;
        return;
    }

    // Remove the star burst if the mouse exits the screen space circle.
    // If the mouse is inside the circle, show the label of the billboard the mouse is hovering over.
    var screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, starBurstState.center);
    var fromCenter = Cesium.Cartesian2.subtract(mousePosition, screenPosition, new Cesium.Cartesian2());
    var radius = starBurstState.radius;

    if (Cesium.Cartesian2.magnitudeSquared(fromCenter) > radius * radius || fromCenter.y > 3.0 * (starBurstState.maxDimension + starBurstState.pixelPadding)) {
        undoStarBurst();
    } else {
        showLabels(mousePosition);
    }
}

function undoStarBurst() {
    var pickedEntities = starBurstState.pickedEntities;
    if (!Cesium.defined(pickedEntities)) {
        return;
    }

    var billboardEyeOffsets = starBurstState.billboardEyeOffsets;
    var labelEyeOffsets = starBurstState.labelEyeOffsets;

    // Reset billboard and label pixel offsets.
    // Hide overlapping labels.
    for (var i = 0; i < pickedEntities.length; ++i) {
        var entity = pickedEntities[i].id;
        entity.billboard.eyeOffset = billboardEyeOffsets[i];
        if (Cesium.defined(entity.label)) {
            entity.label.eyeOffset = labelEyeOffsets[i];
            entity.label.show = false;
        }
    }

    // Remove lines from the scene.
    // Free resources and reset state.
    scene.primitives.remove(starBurstState.linePrimitive);
    starBurstState.linePrimitive = undefined;
    starBurstState.pickedEntities = undefined;
    starBurstState.billboardEyeOffsets = undefined;
    starBurstState.labelEyeOffsets = undefined;
    starBurstState.radius = undefined;
    starBurstState.enabled = false;
}

var currentObject;

function showLabels(mousePosition) {
    var pickedObjects = scene.drillPick(mousePosition);
    var pickedObject;

    if (Cesium.defined(pickedObjects)) {
        var length = pickedObjects.length;
        for (var i = 0; i < length; ++i) {
            if (pickedObjects[i].primitive instanceof Cesium.Billboard) {
                pickedObject = pickedObjects[i];
                break;
            }
        }
    }

    if (pickedObject !== currentObject) {
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id.label)) {
            if (Cesium.defined(currentObject)) {
                currentObject.id.label.show = false;
            }

            currentObject = pickedObject;
            pickedObject.id.label.show = true;
        } else if (Cesium.defined(currentObject)) {
            currentObject.id.label.show = false;
            currentObject = undefined;
        }
    }
}
