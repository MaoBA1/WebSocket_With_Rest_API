const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');



const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST", "PUT", "DELETE" ]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})



server.listen(3002, () => {
    console.log("SERVER RUNNIG");
})