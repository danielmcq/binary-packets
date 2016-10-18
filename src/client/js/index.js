var wsUri = "ws://localhost:8080/echo";
var output;
var ws;
var closeTimer;

function init() {
	output = document.getElementById("output");

	testWebSocket();
}

function testWebSocket() {
	ws = new WebSocket(wsUri);
	ws.onopen    = onOpen;
	ws.onclose   = onClose;
	ws.onmessage = onMessage;
	ws.onerror   = onError;
}

function onOpen(evt) {
	writeToScreen("CONNECTED");
	doSend("WebSocket works");
	setTimeout(function(){
		doSend("another message")
		setTimeout(function(){
			var binArray = createBinaryArray("ff00ff00")
			doSend(binArray)
		}, 500)
	}, 500)
	resetTimer()
}

function onClose(evt) {
	writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
	writeToScreen('<span class="message response">RESPONSE: ' + evt.data+'</span>');
	resetTimer()
}

function onError(evt) {
	writeToScreen('<span class="message error">ERROR:</span> ' + evt.data);
}

function doSend(message) {
	writeToScreen("SENT: " + message);
	ws.send(message);
}

function writeToScreen(message) {
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}

function resetTimer () {
	if (closeTimer) {
		clearTimeout(closeTimer)
	}

	closeTimer = setTimeout(function(){
		ws.close();
	}, 10000)
}

function createBinaryArray (hexdataString) {
	var byteArray = new Uint8Array(hexdataString.match(/.{2}/g).map(e => parseInt(e, 16)));

	return new Blob([byteArray], {type: "application/octet-stream"});
}

window.addEventListener("load", init, false);