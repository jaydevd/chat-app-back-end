require('dotenv').config();
const { sequelize } = require('./api/config/database.js');
const express = require('express');
const { router } = require('./api/routes/index');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./api/config/socketHandler.js');
const app = express();

sequelize.sync().then(() => {
    console.log("Database synced successfully.");
}).catch((err) => {
    console.error("Error syncing database:", err);
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust as needed for security
    }
});

app.use(express.static('public'));
app.use('/', router);

socketHandler(io);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started at http://localhost:5000"));