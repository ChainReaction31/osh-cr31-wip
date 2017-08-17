/**
 * Created by Ian Patterson on 5/18/2017.
 */

function init()
{
    // Constants
    var pointMarker;
    const HOSTNAME = "http://146.148.39.135";
    /*const ENTITY_ID = "simcbrn";
    const ENTITY_NAME = "Simulated CBRN";*/
    //const OFFERING_ID = "urn:mysos:simcbrn";
    const START_TIME = "now";
    const END_TIME = "2017-09-30T19:22:00Z";
    console.log("Test init");
    //console.log(OFFERING_ID);

    // Menu IDs
    var treeMenuId = "tree-menu-";
    var mapMenuId = "map-menu-";
    var menuGroupId = "allmenus";

    // to handle mouse movement script
    // TODO: repurpose the handler to work with the OSH library
    var viewer = new Cesium.Viewer('cesiumContainer');
    var scene = viewer.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var SelectedObj = null;


    //-------------------------------------------------------//
    //-----------------Data Source Controller----------------//
    //-------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });

    //--------------------------------------------------//
    //------------------Data Sources--------------------//
    //--------------------------------------------------//
    // Add sources for each sensor
    var motion1 = new OSH.DataReceiver.JSON("Aeon MS6", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + ":8181/sensorhub/sos",
        offeringID: "urn:osh:client:Aeon_Labs_MultiSensor_6-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/MotionSensor",
        endTime: END_TIME,
        startTime: START_TIME,
        replaySpeed: "1",
        syncMasterTime: true,
        bufferingTime: 60000,
        timeOut: 60000
    });

    var motion2 = new OSH.DataReceiver.JSON("Aeon MS6", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + ":8181/sensorhub/sos",
        offeringID: OFFERING_ID,
        observedProperty: "http://sensorml.com/ont/swe/property/HazardLevel",
        endTime: END_TIME,
        startTime: START_TIME,
        replaySpeed: "1",
        syncMasterTime: true,
        bufferingTime: 60000,
        timeOut: 60000
    });

    var motion3 = new OSH.DataReceiver.JSON("Aeon MS6", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + ":8181/sensorhub/sos",
        offeringID: OFFERING_ID,
        observedProperty: "http://sensorml.com/ont/swe/property/HazardLevel",
        endTime: END_TIME,
        startTime: START_TIME,
        replaySpeed: "1",
        syncMasterTime: true,
        bufferingTime: 60000,
        timeOut: 60000
    });

    var contact1 = new OSH.DataReceiver.JSON("Door 1", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: HOSTNAME + ":8181/sensorhub/sos",
        offeringID: OFFERING_ID,
        observedProperty: "http://sensorml.com/ont/swe/property/ContactSensor",
        endTime: END_TIME,
        startTime: START_TIME,
        replaySpeed: "1",
        syncMasterTime: true,
        bufferingTime: 60000,
        timeOut: 60000
    });


    //-------------------------------------------------------//
    //-----------------------ENTITIES------------------------//
    //-------------------------------------------------------//

    var cbrnEntity = {
        id: "simCBRN",
        name: "Sim CBRN",
        dataSources: [hazardLevel, gpsData, tempData, numericalAlert, continuousLevel, pointSourceData]
    };
    console.log(cbrnEntity);


    dataSourceController.addEntity(cbrnEntity);
    dataSourceController.connectAll();

    //------------------------------------------------------//
    //-----------------------STYLERS------------------------//
    //------------------------------------------------------//

    //-------------------------------------------------//
    //----------------------VIEWS----------------------//
    //-------------------------------------------------//

    // Map View
    window.CESIUM_BASE_URL = "../vendor/";
    var mapView = new OSH.UI.CesiumView("mapView",
    [{
        name: "SmartThings Integration",
        entityId: cbrnEntity.id,
        styler: pointMarker
    }]);

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


    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id, treeItems,
        { css: "tree-container" }
    );
}

function generateMapView(){}

function displaySensorInfo() {

    var scene = mapView.viewer.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(click){
       var pickedObject = scene.pick(click.position);
       if(Cesium.defined(pickedObject) && (pickedObject.id === entity)){
           // TODO: entity will be some entity from the instance as opposed to a specific one
           // TODO: create pop up dialog on when the handler executes
       }
    });
}

