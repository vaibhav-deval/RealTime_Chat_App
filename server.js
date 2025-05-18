const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user-joined', (username) => {
        socket.username = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', data); // Send to everyone EXCEPT sender
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            socket.broadcast.emit('user-disconnected', socket.username); // Exclude sender
        }
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});