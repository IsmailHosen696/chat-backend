const express = require("express");
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express()
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

io.on("connection", (socket) => {
    console.log(socket);
})

server.listen(3002, () => console.log("listening"))