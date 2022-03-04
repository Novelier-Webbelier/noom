const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const camerasSelect = document.querySelector("#cameras");

let myStream;
let muted = false;
let cameraOff = false;

function putOption(deviceId, label) {
  camerasSelect.innerHTML += `<option value=${deviceId}>${label}</option>`;
}

async function getCameras() {
  try {
    const devices = navigator.mediaDevices.enumerateDevices();
    const cameras = (await devices).filter(
      (device) => device.kind === "videoinput"
    );
    cameras.forEach((camera) => {
      putOption(camera.deviceId, camera.label);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    myFace.srcObject = myStream;
    await getCameras();
  } catch (error) {
    console.log(error);
  }
}

getMedia();

function handleMuteBtnClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Ummute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraBtnClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteBtnClick);
cameraBtn.addEventListener("click", handleCameraBtnClick);
