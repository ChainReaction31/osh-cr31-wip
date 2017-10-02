/**
 * Created by ChainReaction31 on 9/29/2017.
 */
var mapPane;
var sensorDatePane;
var reorderState;
var styleSheet;

function init() {
    //styleSheet = getStyleSheet("test");
    mapPane = document.getElementById("divB");
    sensorDataPane = document.getElementById("divC");
    reorderState = false;
}

function reorder() {
    console.log("Button Pressed");
    if (!reorderState) {
        mapPane.style.gridColumnStart = 1;
        mapPane.style.gridColumnEnd = 10;
        mapPane.style.gridRowStart = 7;
        mapPane.style.gridRowEnd = 10;
        mapPane.style.backgroundColor = "purple";

        sensorDataPane.style.gridColumnStart = 2;
        sensorDataPane.style.gridColumnEnd = 10;
        sensorDataPane.style.gridRowStart = 1;
        sensorDataPane.style.gridRowEnd = 7;

        reorderState = true;
        return;
    }
    else if (reorderState) {
        sensorDataPane.style.gridColumnStart = 1;
        sensorDataPane.style.gridColumnEnd = 10;
        sensorDataPane.style.gridRowStart = 7;
        sensorDataPane.style.gridRowEnd = 10;

        mapPane.style.gridColumnStart = 2;
        mapPane.style.gridColumnEnd = 10;
        mapPane.style.gridRowStart = 1;
        mapPane.style.gridRowEnd = 7;
        mapPane.style.backgroundColor = "green";

        reorderState = false;
        return;
    }
}

function getStyleSheet(title) {
    var sheet;
    var sheetFound = false;
    for (i = 0; i < document.styleSheets.length; i++) {
        sheet = document.styleSheets[i];
        if(sheet.title === title){
            sheetFound = true;
            return sheet;
        }
    }
}
