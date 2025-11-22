// -------------------- Digital Clock --------------------
function updateClock() {
  let now = new Date();

  // Get time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Display time
  document.getElementById("digitalClock").innerText =
    `${hours}:${minutes}:${seconds}`;

  // Display date
  let dateStr = now.toDateString();
  document.getElementById("todayDate").innerText = dateStr;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // run immediately

// -------------------- Stopwatch --------------------
let stopwatchInterval;
let elapsedSeconds = 0;

// Format time
function formatTime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  // Add leading zeros
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  return `${hrs}:${mins}:${secs}`;
}

// Start stopwatch
document.getElementById("startBtn").addEventListener("click", function () {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      elapsedSeconds++;
      document.getElementById("stopwatch").innerText = formatTime(elapsedSeconds);
    }, 1000);
  }
});

// Stop stopwatch
document.getElementById("stopBtn").addEventListener("click", function () {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

// Reset stopwatch
document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedSeconds = 0;
  document.getElementById("stopwatch").innerText = "00:00:00";
});
