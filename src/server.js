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

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 1000);
  });
});

httpServer.listen(
  PORT,
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
);
