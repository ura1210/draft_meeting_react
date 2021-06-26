const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server).listen(server);
const events = require("events");
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(50);

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

//
let roomInfo = new Map();
//

io.on("connection", (socket) => {
  socket.on("create", (createInfo) => {
    if (!roomInfo.has(createInfo.roomID)) {
      roomInfo.set(createInfo.roomID, createInfo);
      socket.join(createInfo.roomID);
      io.to(socket.id).emit("roomCreate");
    }
  });
});
