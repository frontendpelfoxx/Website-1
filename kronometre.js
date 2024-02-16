var toggler_icon = document.getElementById("toggler-icon");
var sidebar = document.getElementById("sidebar");
var toggler = document.getElementById("toggler");
var fs = document.getElementById("fs");
var clock = document.getElementById("clock");
var date = new Date();
var hours = document.getElementById("hours");
var munites = document.getElementById("munites");
var seconds = document.getElementById("seconds");

toggler.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-active");
  toggler_icon.classList.toggle("toggler-active");
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fs.innerHTML = "fullscreen_exit";
  } else if (document.exitFullscreen) {
    fs.innerHTML = "fullscreen";
    document.exitFullscreen();
  }
}

let stopwatch;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    stopwatch = setInterval(updateTime, 10);
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;
  }
}

function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(stopwatch);
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatch);
  elapsedTime = 0;
  document.getElementById("timer").textContent = "00:00:00";
  document.getElementById("start-btn").disabled = false;
  document.getElementById("stop-btn").disabled = true;
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("timer").textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}
