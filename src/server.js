import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = 3000;

// This is a fake user database
const sockets = [];

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/*", (req, res) => {
  return res.redirect("/");
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

  socket["nickname"] = "Anon";
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    const msg = JSON.parse(message);

    switch (msg.type) {
      case "new_msg":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname} : ${msg.payload}`)
        );

      case "nickname":
        socket["nickname"] = msg.payload;
    }
  });
});

server.listen(PORT, handleListen);
