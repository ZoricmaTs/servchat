const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("IO Connection");
  socket.on("newMessage", function (data, room) {
    console.log("There are new message " + data + " on Room " + room);
    socket.to(room).emit("clientMessage", data);
  });

  socket.on("joinRoom", function (data) {
    console.log("User Join to room " + data);
    socket.join(data);
  });

  socket.on("leaveRoom", function (data) {
    console.log("User Leave to room " + data);
    socket.leave(data);
  });
});

server.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
