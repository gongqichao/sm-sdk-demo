import { Scene } from "@soulmachines/smwebsdk";

const apiKey =
  "eyJzb3VsSWQiOiJkZG5hLWFpeWl4aWE1MWY5LS1leHBsb3JlciIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzA1MDUzMGQwLTU4ZGQtNGI5ZS05ZGE2LWQ5MjczNjU2MTdiMyJ9";

let scene;

async function connect() {
  // get the video element
  const videoEl = document.getElementById("sm-video");

  // create a new scene object
  scene = new Scene({
    apiKey: apiKey,
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true, camera: true },
    requiredMediaDevices: { microphone: true, camera: true },
  });

  // connect the Scene to the session server
  await scene
    .connect()
    .then((sessionId) => onConnectionSuccess(sessionId))
    .catch((error) => onConnectionError(error));
}

/**
 * Handle successful connection
 * On success, we must start the video.
 */
function onConnectionSuccess(sessionId) {
  console.info("success! session id:", sessionId);
  document.myScene = scene;

  // start the video playing
  //   scene
  //     .startVideo()
  //     .then((videoState) => console.info("started video with state:", videoState))
  //     .catch((error) => console.warn("could not start video:", error));
}

function play() {
  console.log("play the video");
  let scene = document.myScene;
  // if Scene has not been iniated, this will cause error
  console.log(scene);
  scene
    .startVideo()
    .then((videoState) => console.info("started video with state:", videoState))
    .catch((error) => console.warn("could not start video:", error));
}

/**
 * Handle failed connection
 * On error, we must display some feedback to the user
 */
function onConnectionError(error) {
  switch (error.name) {
    case "noUserMedia":
      console.warn("user blocked device access");
      break;
    case "noScene":
    case "serverConnectionFailed":
      console.warn("server connection failed");
      break;
    default:
      console.warn("unhandled error:", error);
  }
}

/**
 * Event listeners for button in the HTML
 */

const connectButton = document.getElementById("connect-button");
connectButton.addEventListener("click", () => connect());

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => (window.location = "/"));

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => play());
