const express = require("express");
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express()
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

server.listen(3001, () => console.log("listening"))