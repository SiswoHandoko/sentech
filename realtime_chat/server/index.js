const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user joining
    socket.on('join', (userData) => {
        connectedUsers.set(socket.id, {
            id: socket.id,
            name: userData.name || `User ${socket.id.substring(0, 6)}`,
            avatar: userData.avatar || '👤'
        });

        // Notify all clients about new user
        io.emit('userJoined', {
            id: socket.id,
            name: connectedUsers.get(socket.id).name,
            avatar: connectedUsers.get(socket.id).avatar
        });

        // Send current users list to the new user
        socket.emit('usersList', Array.from(connectedUsers.values()));
    });

    // Handle incoming messages
    socket.on('message', (messageData) => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            const message = {
                id: Date.now() + Math.random(),
                text: messageData.text,
                user: {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                },
                timestamp: new Date().toISOString(),
                type: messageData.type || 'text'
            };

            // Broadcast message to all connected clients
            io.emit('newMessage', message);
        }
    });

    // Handle typing indicators
    socket.on('typing', (isTyping) => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            socket.broadcast.emit('userTyping', {
                userId: socket.id,
                userName: user.name,
                isTyping
            });
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            connectedUsers.delete(socket.id);
            io.emit('userLeft', {
                id: socket.id,
                name: user.name
            });
        }
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
