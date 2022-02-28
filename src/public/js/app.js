const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New Message : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("❌ Disconnected to Server");
});

setInterval(() => {
  socket.send("Hello from the browser!");
}, 1000);
