const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("highfive-app"));

io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for high-five events
    socket.on("highFive", () => {
        io.emit("highFiveReceived"); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

