"use strict"

const express   = require("express")
const expressWs = require("express-ws")
const url       = require("url")

const app = express()

const DEFAULT = {
	server: {
		protocol: "http:",
		hostname: "localhost",
		port: 8080
	}
}

const config = Object.assign({}, DEFAULT)

app.get("/", (req, res) => {
	res.send("working")
})

app.listen(config.server.port, () => {
	const hostUrl = url.format(Object.assign({}, config.server))
	console.log(`Listening at ${hostUrl}`)
})