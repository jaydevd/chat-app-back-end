require('dotenv').config();
const express = require('express');
const http = require('http');
// const router = require('./api/routes/index');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React app origin
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:5173", // React app origin
    methods: ["GET", "POST"],
    credentials: true,
})
)
const CHAT_BOT = 'ChatBot'; // Add this

let chatRoom = 'Javascript'; // E.g. javascript, node,...
let users = [];

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('send_message', (data) => {
        const { message, username, room, __createdtime__ } = data;
        console.log("sent message: ", data);
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender
    });

    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        console.log(username, room);
        socket.join(room); // Join the user to a socket room
        console.log(`${username} joined room: ${room}`);

        // Add this
        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined

        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        socket.emit('receive_message', {
            message: `Welcome ${username}!`,
            username: CHAT_BOT,
            __createdtime__,
        });

        chatRoom = room;
        users.push({ id: socket.id, username, room });
        chatRoomUsers = users.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    });

    socket.on('register', (username) => {
        users[username] = socket.id;
        socket.username = username;
    });

    socket.on('privateMessage', ({ to, msg }) => {
        const targetSocketId = users[to];
        if (targetSocketId) {
            io.to(targetSocketId).emit('privateMessage', {
                from: socket.username,
                msg,
            });
        }
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${5000}`);
});