var application = {};
application.params = {"request": true, "statusReciever": false};
application.devices = [];
application.content = [];


application.content.push({'address': 'EA:FC:5B:28:2C:76', 'uri': 'example.com', 'text': 'Device 1'});
application.content.push({'address': '28:B2:BD:86:BA:B8', 'uri': 'test.example.com', 'text': 'Location 1'});

function initialiseSuccess(response) {
	//console.log(response);
	document.getElementById("status").innerHTML = "Bluetooth service "+response.status;
	bluetoothle.startScan(scanSuccess, scanError);
}

function initialiseError(response) {
	console.log(response);
	document.getElementById("status").innerHTML = "Error Bluetooth service "+response.status;
}

function scanSuccess(response) {
	response.time = Math.floor(Date.now() / 1000);
	application.devices[response.address] = response;
	renderList(application.devices, "devices");
	renderClosest(getClosest(application.devices), "closest");
}

function scanError(response) {
	console.log(response);
}

function initialiseBluetooth() {
	bluetoothle.initialize(initialiseSuccess, initialiseError, application.params);
}

function renderList(array, elementClass) {
	var html = "";
	for (var device in array){
		if(device!=='undefined'){
			if(array.hasOwnProperty(device)) {
				if(array[device].time > (Math.floor(Date.now() / 1000) - 10)) {
					//console.log(array[device]);
					html=html+"<li class='topcoat-list__item'>";
					html=html+"Device: "+device+"<br>";
					html=html+"Signal: "+array[device].rssi+"<br>";
					html=html+"Name: "+array[device].name+"<br>";
					html=html+"Advertisement: "+array[device].advertisement+"<br>";
					html=html+"</li>";
					var bytes = bluetoothle.encodedStringToBytes(array[device].advertisement);
					//console.log(bytes);
				}
			}
		}
	}
	document.getElementById("devices").innerHTML = html;
}

function renderClosest(device, elementClass) {
	var render_content = device.address;
	for (var content in application.content) {
		if(application.content[content].address == device.address) {
			if(typeof application.content[content].text !== 'undefined') {
				render_content = application.content[content].text;
			} else if(typeof application.content[content].uri !== 'undefined') {
				render_content = application.content[content].uri;
			}
		}
	}
	document.getElementById(elementClass).innerHTML = render_content;
}

function getClosest(devices) {
	var closest;
	for (var device in devices) {
		if(device !== 'undefined') {
			if(devices.hasOwnProperty(device)) {
				if(typeof closest !== 'undefined') {
					if(devices[device].rssi > closest.rssi) {
						closest = devices[device];
					}
				} else {
					closest = devices[device];
				}
			}
		}
	}
	return closest;
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
