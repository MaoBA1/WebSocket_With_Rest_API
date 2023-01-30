const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
app.set(express.urlencoded({ extended: false }));
app.set(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ]
    }
});

server.listen(3002, () => {
    console.log("SERVER RUNNIG");
})