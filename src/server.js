import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(publicRooms());
    console.log(`Socket Event : ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
  });

  socket.on("new_message", (message, roomName, done) => {
    socket.to(roomName).emit("new_message", `${socket.nickname} : ${message}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
});

httpServer.listen(
  PORT,
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
);
