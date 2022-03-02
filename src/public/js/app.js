const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`The backend says : ${msg}`);
}

function handleRommSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}

form.addEventListener("submit", handleRommSubmit);
