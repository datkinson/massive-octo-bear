var params = {"request": true, "statusReciever": false};
var devices = [];
function initialiseSuccess(response) {
	console.log(response);
	bluetoothle.startScan(scanSuccess, scanError);
}

function initialiseError(response) {
	console.log(response);
}

function scanSuccess(response) {
	response.time = Math.floor(Date.now() / 1000);
	devices[response.address] = response;
	renderList(devices, "devices");
}

function scanError(response) {
	console.log(response);
}

function initialiseBluetooth() {
	bluetoothle.initialize(initialiseSuccess, initialiseError, params);
}

function renderList(array, elementClass) {
	var html = "";
	for (var device in array){
		if(device!=='undefined'){
			if(array.hasOwnProperty(device)) {
				if(array[device].time > (Math.floor(Date.now() / 1000) - 10)) {
					console.log(array[device]);
					html=html+"<li class='topcoat-list__item'>";
					html=html+"Device: "+device+"<br>";
					html=html+"Signal: "+array[device].rssi+"<br>";
					html=html+"Name: "+array[device].name+"<br>";
					html=html+"Advertisement: "+array[device].advertisement+"<br>";
					html=html+"</li>";
				}
			}
		}
	}
	document.getElementById("devices").innerHTML = html;
}

//setTimeout( initialiseBluetooth, 2000 );


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
	initialiseBluetooth();
    },
    // Update DOM on a Received Event
};
