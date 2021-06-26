const express = require("express");
const app = express();
const http = require("http");
const socketIo  = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server).listen(server);
const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(50)

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
})

io.on("connection", (socket) => {
    console.log("conect");
  });



const createDoraftedListHTML = doraftedList => {
    let str_ = "";
    doraftedList.split(/\n/).forEach(str => {
        str_ += `<li>${str}</li>\n`;
    });
    return str_;
}

const createMemberListHTML = memberList => {
    let str_ = "";
    memberList.forEach(str => {
        str_ += `<li>${socetIDtoInfo[str].name}</li>`;
    });
    return str_;
}

const createMemberListHTML2 = memberList => {
    let str_ = "<th></th>";
    memberList.forEach(str => {
        str_ += `<th>${socetIDtoInfo[str].name}</th>`;
    });
    return str_;
}
