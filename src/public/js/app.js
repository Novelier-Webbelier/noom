const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;

let roomName;

function clearInput(tag) {
  tag.value = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const content = input.value;
  socket.emit("new_message", content, roomName, () => {
    sendMessage(`You : ${content}`);
  });
  clearInput(input);
}

function handleNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const content = input.value;
  socket.emit("nickname", input.value);
}

function handleRommSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  clearInput(input);
}

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNameSubmit);
}

function sendMessage(message) {
  const ul = room.querySelector("ul");
  ul.innerHTML += `<li>${message}</li>`;
}

form.addEventListener("submit", handleRommSubmit);

socket.on("welcome", (user) => {
  sendMessage(`${user} arrived!`);
});

socket.on("new_message", (message) => {
  sendMessage(`${message}`);
});

socket.on("bye", (left) => {
  sendMessage(`${left} left!`);
});
