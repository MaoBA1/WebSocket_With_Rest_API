const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const mongoUrl = `mongodb+srv://maor:wm2qpAw2cZ0nwpkJ@postsandchats.orle5k9.mongodb.net/PostAndChats_db?retryWrites=true&w=majority`;

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST", "PUT", "DELETE" ]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("send_post", (data) => {
        console.log(data);
        socket.emit("recive_post", {post:data})
    })
     socket.emit("recive_message",{message:"test"})
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})

mongoose.connect(mongoUrl)
.then((result) => {
    console.log(result);
    server.listen(3002, () => {
        console.log("SERVER RUNNIG");
    })
})

