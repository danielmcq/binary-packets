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
		console.log("message received", msg)
		ws.send(msg+" whoa whoa")
	})

	console.log("Client connected on socket")
})

app.listen(config.server.port, () => {
	const hostUrl = url.format(Object.assign({}, config.server))
	console.log(`Listening at ${hostUrl}`)
})