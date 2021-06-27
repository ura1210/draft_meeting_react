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
    if (roomInfo.has(createInfo.roomID)) {
      io.to(socket.id).emit("DuplicateID");
    } else {
      //roomを新たに作成
      createInfo.status = "wait";
      roomInfo.set(createInfo.roomID, createInfo);
      socket.join(createInfo.roomID);
      io.to(socket.id).emit("roomCreate");
    }
  });

  socket.on("enter", (enterInfo) => {
    if (roomInfo.has(enterInfo.roomID)) {
      socket.join(enterInfo.roomID);
      if (roomInfo.get(enterInfo.roomID).status !== "wait") {
        io.to(socket.id).emit("roomEnterError", 1);
      }
      io.to(socket.id).emit("roomEnter", roomInfo.get(enterInfo.roomID));
    } else {
      io.to(socket.id).emit("roomEnterError", 2);
    }
  });

  socket.on("start", (roomID) => {
    roomInfo.get(roomID).status = "start";
    io.of("/")
      .in(roomID)
      .clients(function (error, clients) {
        roomInfo.get(roomID).clients = clients;
        roomInfo.get(roomID).clientNum = clients.length;
      });
    io.to(roomID).emit("start");
  });

  socket.on("nomination", (selected, roomID) => {
    const roomInfoNow = roomInfo.get(roomID);
    if (!roomInfoNow) {
      return;
    }
    if (roomInfoNow.readyNum) {
      roomInfoNow.readyNum++;
      roomInfoNow.draftChoice.set(socket.id, selected);
    } else {
      roomInfoNow.readyNum = 1;
      roomInfoNow.draftChoice = new Map();
      roomInfoNow.draftChoice.set(socket.id, selected);
    }
    if (roomInfoNow.clientNum === roomInfoNow.readyNum) {
      //全員選択した
      roomInfoNow.draftStatus = new Map();
      roomInfoNow.clients.forEach((e) => {
        roomInfoNow.draftStatus.set(e.id, "");
      });

      //競合なしなら決定
      const values = [];
      for (let [key, value] of roomInfoNow.draftChoice) {
        values.push(value);
      }

      const notConflict = values.filter((val, idx, arr) => {
        return arr.indexOf(val) === arr.lastIndexOf(val);
      });

      const conflict = values.filter((val, idx, arr) => {
        return arr.indexOf(val) !== arr.lastIndexOf(val);
      });

      for (let [key, value] of roomInfoNow.draftChoice) {
        for (let v of notConflict) {
          if (v === value) {
            roomInfoNow.draftStatus.set(key, "今回決定");
          }
        }
      }

      //競合
      const conflictNum = conflict.map((e) => {
        let num = 0;
        for (let v of conflict) {
          if (v === e) {
            num++;
          }
        }
        return num;
      });
      eru gurasu
      3 2
      2 1

      const mape = new Map();
     conflictNum.forEach((e) =>
        mape.set(e, Math.floor(Math.random() * e) + 1)
      );
     
      for (let [key, value] of roomInfoNow.draftChoice) {
        const n = 0;
        conflict.find((e) => {
          if (value === e) {
            n++;
            if(mape.get(e)===n){
              roomInfoNow.draftStatus.set(key, "今回決定");
            }
          }
        });
      }

      for (let [key, value] of roomInfoNow.draftStatus) {
        if(value==="今回決定" && value!=="再指名" ){
          roomInfoNow.draftStatus.set(key, "再指名");
        }
      }

      //終了
      roomInfoNow.draftStatus.forEach((value, key) =>{
        console.log(key + ' = ' + value)
      })


    }
  });

  socket.on("exit", (roomID) => {
    io.of("/")
      .in(roomID)
      .clients(function (error, clients) {
        socket.leave(roomID);
        if (clients.length === 1) {
          roomInfo.delete(roomID);
        }
      });
  });
});
