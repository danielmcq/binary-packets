var wsUri = "ws://localhost:8080/echo";
var output;

function init() {
	output = document.getElementById("output");

	testWebSocket();
}

function testWebSocket() {
	websocket = new WebSocket(wsUri);
	websocket.onopen    = function(event) { onOpen(event)    };
	websocket.onclose   = function(event) { onClose(event)   };
	websocket.onmessage = function(event) { onMessage(event) };
	websocket.onerror   = function(event) { onError(event)   };
}

function onOpen(evt) {
	writeToScreen("CONNECTED");
	doSend("WebSocket rocks");
}

function onClose(evt) {
	writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
	writeToScreen('<span class="message response">RESPONSE: ' + evt.data+'</span>');
	websocket.close();
}

function onError(evt) {
	writeToScreen('<span class="message error">ERROR:</span> ' + evt.data);
}

function doSend(message) {
	writeToScreen("SENT: " + message);
	websocket.send(message);
}

function writeToScreen(message) {
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}

window.addEventListener("load", init, false);