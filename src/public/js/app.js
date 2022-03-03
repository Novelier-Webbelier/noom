const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;

let roomName;
let count;

function clearInput(tag) {
  tag.value = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const content = input.value;
  socket.emit("new_message", content, roomName, () => {
    sendMessage(room.querySelector("ul"), `You : ${content}`);
  });
  clearInput(input);
}

function handleNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const content = input.value;
  socket.emit("nickname", content);
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
  setTitle();
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNameSubmit);
}

function setTitle() {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName} (${count})`;
}

function sendMessage(parentTag, message) {
  parentTag.innerHTML += `<li>${message}</li>`;
}

function clearMessage(parentTag) {
  parentTag.innerHTML = "";
}

form.addEventListener("submit", handleRommSubmit);

socket.on("welcome", (user, newCount) => {
  sendMessage(room.querySelector("ul"), `${user} arrived!`);
  count = newCount;
  setTitle();
});

socket.on("new_message", (message) => {
  sendMessage(room.querySelector("ul"), `${message}`);
});

socket.on("bye", (left, newCount) => {
  sendMessage(room.querySelector("ul"), `${left} left!`);
  count = newCount;
  setTitle();
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  clearMessage(roomList);
  rooms.forEach((room) => {
    sendMessage(roomList, room);
  });
});
