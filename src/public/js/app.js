const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;

let roomName;

function clearInput(tag) {
  tag.innerText = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const content = input.value;
  socket.emit("new_message", content, roomName, () => {
    sendMessage(`You : ${content}`);
  });
  clearInput(input);
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
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

function sendMessage(message) {
  const ul = room.querySelector("ul");
  ul.innerHTML += `<li>${message}</li>`;
}

form.addEventListener("submit", handleRommSubmit);

socket.on("welcome", () => {
  sendMessage("Someone joined!");
});

socket.on("new_message", (message) => {
  sendMessage(`Anon : ${message}`);
});

socket.on("bye", () => {
  sendMessage("Someone left!");
});
