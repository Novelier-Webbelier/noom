const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nicknameForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  return JSON.stringify({ type, payload });
}

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_msg", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
}

function createLiTag(message) {
  return `<li>${message}</li>`;
}

function putMessage(message) {
  messageList.innerHTML += createLiTag(message);
}

socket.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socket.addEventListener("close", () => {
  console.log("❌ Disconnected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New Message : ", message.data);
  putMessage(message.data);
});

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);
