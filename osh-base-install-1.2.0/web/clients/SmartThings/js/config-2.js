/**
 * Created by Ian Patterson on 6/6/2017.
 */

var tempDataSource = new OSH.DataReceiver.Chart("temp test", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "localhost:8181/sensorhub/sos",
    offeringID: "urn:mysos:simcbrn",
    observedProperty: "http://sensorml.com/ont/swe/property/Temperature",
    startTime: "now",
    endTime: "2055-01-01Z",
    syncMasterTime: false,
    bufferingTime: 1000
});