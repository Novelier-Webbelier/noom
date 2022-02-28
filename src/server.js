import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = 3000;

const sockets = [];

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  return res.render("home");
});

const handleListen = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketConnected() {
  console.log("✅ Connected to Browser");
}

function onSocketClose() {
  console.log("❌ Disconnected to Server");
}

wss.on("connection", (socket) => {
  sockets.push(socket);
  onSocketConnected();
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
});

setInterval(() => {
  console.log(sockets.length);
}, 1000);

server.listen(PORT, handleListen);
