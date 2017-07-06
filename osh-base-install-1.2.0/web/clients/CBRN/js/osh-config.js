/**
 * Created by Ian Patterson on 5/18/2017.
 */

function init()
{
    // Constants
    var pointMarker;
    const HOSTNAME = "localhost:";
    const ENTITY_ID = "simcbrn";
    const ENTITY_NAME = "Simulated CBRN";
    const OFFERING_ID = "urn:mysos:simcbrn";
    const START_TIME = "2017-06-01T19:00:40Z";
    const END_TIME = "2017-06-30T19:22:00Z";
    console.log("Test init");
    console.log(OFFERING_ID);


    //--------------------------------------------------//
    //------------------Data Sources--------------------//
    //--------------------------------------------------//
    var hazardLevel = new OSH.DataReceiver.JSON("Alerts", {
            protocol: "ws",
            service: "SOS",
            endpointUrl: HOSTNAME + "8181/sensorhub/sos",
            offeringID: OFFERING_ID,
            observedProperty: "http://sensorml.com/ont/swe/property/HazardLevel",
            endTime: "2018-01-01",
            startTime: "now",
            replaySpeed: "1",
            syncMasterTime: true,
            bufferingTime: 60000,
            timeOut: 60000
        }
    );


    var gpsData = new OSH.DataReceiver.JSON("Location", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: "now",
        endTime: "2018-01-01",
        replaySpeed: "1",
        syncMasterTime: true
    });


    var tempData = new OSH.DataReceiver.Chart("temp test", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/Temperature",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: true,
        bufferingTime: 1000
    });

    var numericalAlert = new OSH.DataReceiver.JSON("Alert Level", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/Level",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: true,
        bufferingTime: 1000
    });

    var continuousLevel = new OSH.DataReceiver.JSON("Continuous Alert Level", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/Continuous",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: true,
        bufferingTime: 1000
});

    console.log("Printing Data Sources...");
    console.log(hazardLevel);
    //console.log(gpsData);
    //console.log(tempData);
    console.log(numericalAlert);
    console.log(gpsData.id);

    //-------------------------------------------------------//
    //-----------------------ENTITIES------------------------//
    //-------------------------------------------------------//

    var cbrnEntity = {
        id: "simCBRN",
        name: "Sim CBRN",
        dataSources: [hazardLevel, gpsData, tempData, numericalAlert, continuousLevel]
    };
    console.log(cbrnEntity);
    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
        });

    dataSourceController.addEntity(cbrnEntity);
    dataSourceController.connectAll();

    //------------------------------------------------------//
    //-----------------------STYLERS------------------------//
    //------------------------------------------------------//
    pointMarker = new OSH.UI.Styler.PointMarker(
    {
        label: "CBRN",
        location:
            {
                x: 1.42376557,
                y: 43.61758626,
                z: 100
            },
        locationFunc:
        {
            dataSourceIds: [gpsData.getId()],
            handler: function (rec)
            {
                //console.log(rec);
                return{
                    x: rec.location.lon,
                    y: rec.location.lat,
                    z: rec.location.alt
                };
            }
        },
        /*orientationFunc:
        {
            dataSourceIds: [gpsData.getId()],
            handler: function (rec) {
                //console.log("Entered second handler of styler");
                return {
                    //heading: rec.heading
                    heading: 0
                };
            }
        },*/
        /*orientation: {
            heading: 0
        },*/
        icon: './images/CBRN_Icons/sphereGreen.glb',

        iconFunc:
            {
                dataSourceIds: [hazardLevel.getId()],
                handler: function(rec) {
                    console.log(String(rec.hazard_level).toLowerCase());
                    if(rec.hazard_level.toLowerCase() === "none")
                    {
                        return 'images/CBRN_Icons/sphereGreen.glb';
                    }
                    else if(rec.hazard_level.toLowerCase() === "low")
                    {
                        return 'images/CBRN_Icons/sphereYellow.glb';
                    }
                    else if(rec.hazard_level.toLowerCase() === "medium")
                    {
                        return 'images/CBRN_Icons/sphereOrange.glb';
                    }
                    else if(rec.hazard_level.toLowerCase() === "high")
                    {
                        return 'images/CBRN_Icons/sphereRed.glb';
                    }
                }
            }
    });

    //-------------------------------------------------//
    //----------------------VIEWS----------------------//
    //-------------------------------------------------//

    // Map View
    window.CESIUM_BASE_URL = "../vendor/";
    var mapView = new OSH.UI.CesiumView("mapView", [

        {
            name: "Sim CBRN",
            entityId: cbrnEntity.id,
            styler: pointMarker
        }]);

    //mapView.updateMarker();

    // Chart Views
    // temperature chart view
    var contChartDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: true,
        css: "video-dialog",
        name: "CBRN - Intensity",
        show: true,
        dockable: true,
        closeable: true,
        canDisconnect : true,
        swapId: "main-container",
        connectionIds: [continuousLevel.getId()]
    });


    var contChartView = new OSH.UI.Nvd3CurveChartView(contChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [continuousLevel.getId()],
                    handler: function (rec, timeStamp) {
                        console.log(rec.continuous);
                        return {
                            x: timeStamp,
                            y: parseFloat(rec.continuous)
                        };
                    }
                }
            })
        }],
        {
            name: "Intensity Chart",
            yLabel: 'Source Intensity',
            xLabel: 'Time',
            css:"chart-view",
            cssSelected: "video-selected",
            maxPoints:30
        }
    );

    var hazChartDialog = new OSH.UI.DialogView("dialog-second-container", {
        draggable: true,
        css: "video-dialog",
        name: "CBRN - Hazard Level",
        show: true,
        dockable: true,
        closeable: true,
        canDisconnect : true,
        swapId: "second-container",
        connectionIds: [numericalAlert.getId()]
    });

    var hazChartView = new OSH.UI.Nvd3CurveChartView(hazChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [numericalAlert.getId()],
                    handler: function (rec, timeStamp) {
                        console.log(rec.alert_level);
                        return {
                            x: timeStamp,
                            y: parseFloat(rec.alert_level)
                        };
                    }
                }
            })
        }],
        {
            name: "Hazard Level Chart",
            yLabel: 'Level',
            xLabel: 'Time',
            css:"chart-view",
            cssSelected: "video-selected",
            maxPoints:30
        }
    );

    //--------------------------------------------------------------//
    //------------------------ Tree View ---------------------------//
    //--------------------------------------------------------------//
   /* var entityTreeDialog = new OSH.UI.DialogView(document.body.id, {
        css: "tree-dialog",
        name: "Entities",
        show: true,
        draggable: true,
        dockable: false,
        closeable: true
    });

    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
        cbrnEntity,
        { css: "tree-container" }
    );

    // time slider view
    var mainContainer = document.getElementById("main-container");
    var currentClassName = mainContainer.className;

    if (startTime !== "now") {
        var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
            startTime: gpsData.properties.startTime,
            endTime: gpsData.properties.endTime,
            dataSourcesId: [gpsData.id]
        });

        if(typeof currentClassName !== "undefined") {
            currentClassName += " main-view-range-slider";
        } else {
            currentClassName = "main-view-range-slider";
        }
        mainContainer.setAttribute("class",currentClassName);
    } else {
        if(typeof currentClassName !== "undefined") {
            currentClassName += " main-view";
        } else {
            currentClassName = "main-view";
        }
        mainContainer.setAttribute("class",currentClassName);
    }*/

    // Create a circle.
    var circle = new Cesium.GeometryInstance({
        geometry: new Cesium.CircleGeometry({
            center: Cesium.Cartesian3.fromDegrees(-86.589159, 34.726681 ),
            radius: 1000.0
        }),
        id: "circle",
        attributes: {
            color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
        }
    });
    //var geometry = Cesium.CircleGeometry.createGeometry(circle);
    mapView.viewer.scene.primitives.add(new Cesium.GroundPrimitive({
        geometryInstances : circle
    }));

   /* // Example 1: Create primitive with a single instance
    var rectangleInstance = new Cesium.GeometryInstance({
        geometry : new Cesium.RectangleGeometry({
            rectangle : Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0)
        }),
        id : 'rectangle',
        attributes : {
            color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
        }
    });
    mapView.viewer.scene.primitives.add(new Cesium.GroundPrimitive({
        geometryInstances : rectangleInstance
    }));*/
}

