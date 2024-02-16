/*
WEB DEVELOPER MAHMUT EFE CÜN TARAFINDAN YAPILMIŞTIR.
*/

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

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  clock.innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let countdown;
let isPaused = false;

document.getElementById("submit-btn").addEventListener("click", startCountdown);

function startCountdown() {
  const hoursInput = document.getElementById("a");
  const minutesInput = document.getElementById("b");
  const secondsInput = document.getElementById("c");
  var settings = document.getElementById("settings");
  settings.classList.add("none");

  if (!hoursInput || !minutesInput || !secondsInput) {
    console.error("Input bulunamadı");
    return;
  }

  const hours = hoursInput.value || 0;
  const minutes = minutesInput.value || 0;
  const seconds = secondsInput.value || 0;

  let totalSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  if (totalSeconds <= 0 || isNaN(totalSeconds)) {
    return;
  }

  clearInterval(countdown);

  countdown = setInterval(() => {
    if (!isPaused) {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(countdown);
      } else {
        const hoursLeft = Math.floor(totalSeconds / 3600);
        const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
        const secondsLeft = totalSeconds % 60;
        document.getElementById("timer").innerText = `${String(
          hoursLeft
        ).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(
          secondsLeft
        ).padStart(2, "0")}`;
      }
    }
  }, 1000);
}

function stopCountdown() {
  if (!isPaused) {
    clearInterval(countdown);
    isPaused = true;
    document.getElementById("resume-btn").classList.remove("none");
    document.getElementById("stop-btn").classList.add("none");
  }
}

function resumeCountdown() {
  if (isPaused) {
    startCountdown();
    isPaused = false;
    document.getElementById("resume-btn").classList.add("none");
    document.getElementById("stop-btn").classList.remove("none");
  }
}

function resetCountdown() {
  clearInterval(countdown);
  document.getElementById("timer").innerText = "00:00:00";
  isPaused = false;
  document.getElementById("resume-btn").classList.add("none");
  document.getElementById("stop-btn").classList.remove("none");
  settings.classList.remove("none");
}

let alarmTime;
let alarmInterval;
const alarmSound = document.getElementById("alarm-sound");
const stopButton = document.getElementById("stop-btn");

function setAlarm() {
  const currentTime = new Date();
  const inputTime = document.getElementById("alarm-time").value;
  const [hours, minutes] = inputTime.split(":");
  alarmTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    hours,
    minutes
  );

  const now = new Date();
  const timeToAlarm = alarmTime - now;

  if (timeToAlarm > 0) {
    alarmInterval = setTimeout(startAlarm, timeToAlarm);
    document.getElementById("stop-btn").classList.remove("hidden");
  } else {
    alert("Geçerli bir saat seçin.");
  }
}

function startAlarm() {
  alarmSound.play();
  stopButton.addEventListener("click", stopAlarm);
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  clearTimeout(alarmInterval);
  stopButton.classList.add("hidden");
}
