"use strict"

const express   = require("express")
const expressWs = require("express-ws")
const url       = require("url")

const app = express()

expressWs(app)

const DEFAULT = {
	server: {
		protocol: "http:",
		hostname: "localhost",
		port: 8080
	}
}

const config = Object.assign({}, DEFAULT)

app.use("/", (req, res, next) => {
	console.log("File requested", req.path)
	next()
}, express.static("src/client"))

app.ws("/echo", (ws, req) => {
	ws.on("message", msg => {
		if (msg instanceof Buffer) {
			if (msg[0] === 0xff) {
				let resPacketData = stringToBinaryArray("SOCKET001")

				let binaryPacket = createBinaryArray(resPacketData)
				console.log("binaryPacket", binaryPacket)
				ws.send(binaryPacket)
			} else {
				ws.send("packet received")
			}
		} else {
			console.log("message received", msg)
			ws.send(msg)
		}
	})

	console.log("Client connected on socket")
})

app.listen(config.server.port, () => {
	const hostUrl = url.format(Object.assign({}, config.server))
	console.log(`Listening at ${hostUrl}`)
})

function stringToBinaryArray (string) {
	return string.split("").map(letter => letter.charCodeAt(0).toString(16) ).join("")
}

function createBinaryArray (hexdataString) {
	return new Uint8Array(hexdataString.match(/.{2}/g).map(e => parseInt(e, 16)))
}