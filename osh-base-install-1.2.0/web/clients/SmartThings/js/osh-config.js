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
    const END_TIME = "2017-08-30T19:22:00Z";
    console.log("Test init");
    console.log(OFFERING_ID);

    var groundPrims = {};
    var sourceArray = {};
    var compSourceArray = {};
    this.srcData;


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
    });


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

    /*var sourceString = new OSH.DataReceiver.JSON("Source String", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/SourceStrings",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: true,
        bufferingTime: 1000
});

    var sourceRadii = new OSH.DataReceiver.JSON("Source Radii", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/SourceRadii",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: true,
        bufferingTime: 1000
    });*/

    var pointSourceData = new OSH.DataReceiver.JSON("Source Radii", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + "8181/sensorhub/sos",
        offeringID: "urn:mysos:simcbrn",
        observedProperty: "http://sensorml.com/ont/swe/property/PointSource",
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
        dataSources: [hazardLevel, gpsData, tempData, numericalAlert, continuousLevel, pointSourceData]
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
    var mapView = new OSH.UI.CesiumView("mapView",
    [{
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
            maxPoints:30,
            axisControl: {
                constrainAxes: true,
                minY: 0,
                maxY: 600
            }
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
            maxPoints:30,
            axisControl: {
                constrainAxes: true,
                minY: 0,
                maxY: 6
            }
        }
    );

    //--------------------------------------------------------------------------//
    //--------------------------GROUND PRIMITIVE(S)-----------------------------//
    //--------------------------------------------------------------------------//

    function areaOfEffect(coordArray, radiusArray)
    {
        console.log(this.srcData);
        mapView.viewer.scene.primitives.remove(groundPrims[0]);
        // Create a circle.
            var circle1 = new Cesium.GeometryInstance({
                geometry: new Cesium.CircleGeometry({
                    center: Cesium.Cartesian3.fromDegrees(parseFloat(coordArray[1]), parseFloat(coordArray[0])),
                    //radius: 1000.0
                    radius: 1000 * parseFloat(radiusArray[0])
                }),
                id: "circle",
                attributes: {
                    color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.3)
                }
            });
        var circle2 = new Cesium.GeometryInstance({
            geometry: new Cesium.CircleGeometry({
                center: Cesium.Cartesian3.fromDegrees(parseFloat(coordArray[4]), parseFloat(coordArray[3])),
                radius: 1000 * parseFloat(radiusArray[1])
            }),
            id: "circle",
            attributes: {
                color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.3)
            }
        });
        var circle3 = new Cesium.GeometryInstance({
            geometry: new Cesium.CircleGeometry({
                center: Cesium.Cartesian3.fromDegrees(parseFloat(coordArray[7]), parseFloat(coordArray[6])),
                radius: 1000 * parseFloat(radiusArray[2])
            }),
            id: "circle",
            attributes: {
                color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.3)
            }
        });

            groundPrims[0] = new Cesium.GroundPrimitive({
                geometryInstances: [circle1, circle2, circle3]
            });
            // TODO: add check to see if we're changing coords
            // TODO: Change logic to not perform this action every time

            addGroundPrims();
    }

    function addGroundPrims() {
        //var geometry = Cesium.CircleGeometry.createGeometry(circle);
        console.log(mapView.viewer.scene.primitives);
        mapView.viewer.scene.primitives.add(groundPrims[0]);
    }


    /*OSH.EventManager.observe(OSH.EventManager.EVENT.DATA+"-"+sourceRadii.getId(),
        function (event)
        {
            this.srcData = event.data;
            console.dir(this.srcData);
        }.bind(this));
    console.dir(this.srcData);*/

    pointSourceData.onData = function (rec) {
        console.log(rec.data);
        let test = rec.data.PointSource;

        //test;
        //console.log(psMainString);

        sourceArray.sourceString = parseSourceString(test.source_string);
        sourceArray.sourceRadii= parseSourceString(test.source_radii);
        var coordsDidChange = true;
        for (i = 0; i<9;i++)
        {
            if(!(sourceArray.sourceString[i] === compSourceArray[i]))
            {
                coordsDidChange = true;
            }
            else
            {
                coordsDidChange = false;
            }
        }
        compSourceArray = sourceArray.sourceString;

        if(coordsDidChange)
        {
            areaOfEffect(sourceArray.sourceString, sourceArray.sourceRadii);
        }
    };

   /* sourceRadii.onData = function (rec) {
      let data = rec.data.source_radii;

    };*/


     function parseSourceString(psMainString) {

         return psMainString.split(",");
     }







    //--------------------------------------------------------------//
    //------------------------ Tree View ---------------------------//
    //--------------------------------------------------------------//
    var entityTreeDialog = new OSH.UI.DialogView(document.body.id, {
        css: "tree-dialog",
        name: "Entities",
        show: true,
        draggable: true,
        dockable: false,
        closeable: true
    });


    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
        [{
            entity: cbrnEntity,
            path: "Sensors/CBRN",
            treeIcon: "images/CBRN_Icons/CBRN(Green).png"
        }],
        { css: "tree-container" }
    );
}

