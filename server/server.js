const express = require("express");
const Socket = require("socket.io");
const PORT = 5000;

const app = express();
const server = require("http").createServer(app);

//initialize our Socket.IO instance using the created HTTP server and
//configure it with CORS settings, allowing any domain to connect
const io = Socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

//to store randomly generated user data
const users = [];

//.on method to listen for events from clients, and
//the .emit method is used to send events and data to clients.
io.on("connection", (socket) => {
    //listens for an adduser event emitted from the client when a new user joins the chat.
    socket.on("adduser", (username) => {
        socket.user = username;
        users.push(username);
        //both the users list and a private event are emitted back to the client.
        io.sockets.emit("users", users);

        io.to(socket.id).emit("private", {
            id: socket.id,
            name: socket.user,
            msg: "secret message",
        });
    });

    //to handle incoming chat messages from clients
    socket.on("message", (message) => {
        io.sockets.emit("message", {
            message,
            user: socket.user,
            id: socket.id,
        });
    });

    //ensures that disconnected users are removed from the users array
    socket.on("disconnect", () => {
        console.log(`user ${socket.user} is disconnected`);
        if (socket.user) {
            users.splice(users.indexOf(socket.user), 1);
            io.sockets.emit("user", users);
            console.log("remaining users:", users);
        }
    });
});

server.listen(PORT, () => {
    console.log("listening on PORT: ", PORT);
});
//NOw our server is ready to emit events to available clients.
