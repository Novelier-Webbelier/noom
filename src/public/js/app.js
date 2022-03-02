const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function handleRommSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
}

form.addEventListener("submit", handleRommSubmit);
