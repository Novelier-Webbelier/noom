import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = 3000;

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

function onSocketMessage(message) {
  console.log(message.toString("utf-8"));
}

function onSocketConnected() {
  console.log("✅ Connected to Browser");
}

function onSocketClose() {
  console.log("❌ Disconnected to Server");
}

wss.on("connection", (socket) => {
  onSocketConnected();
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("Hello!");
});

server.listen(PORT, handleListen);
