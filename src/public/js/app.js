const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;

let roomName;

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
}

function handleRommSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

function sendMessage(message) {
  const ul = room.querySelector("ul");
  ul.innerHTML += `<li>${message}</li>`;
}

form.addEventListener("submit", handleRommSubmit);

socket.on("welcome", () => {
  sendMessage("Some joined!");
});
