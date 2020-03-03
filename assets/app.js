var sessionTime = 20;
var restTime = 5;
var minutes = sessionTime;
var seconds;
var intervalId;
var ding = new Audio('assets/ding.mp3');
var body = document.getElementsByTagName('body')[0];

document.getElementById("playpauseButton").addEventListener("click", playpause);
document.getElementById("sessionButton").addEventListener("click", session);
document.getElementById("restButton").addEventListener("click", rest);
document.getElementById("plusButton").addEventListener("click", plus);
document.getElementById("minusButton").addEventListener("click", minus);

function plus() {
  if (document.getElementById("container").classList.contains("session")) {
    sessionTime = Math.min(sessionTime + 1, 60);
    minutes = sessionTime;
    reset();
  } else {
    restTime = Math.min(restTime + 1, 60);
    minutes = restTime;
    reset();
  }
}

function minus() {
  if (document.getElementById("container").classList.contains("session")) {
    sessionTime = Math.max(sessionTime - 1, 1);
    minutes = sessionTime;
    reset();
  } else {
    restTime = Math.max(restTime - 1, 1);
    minutes = restTime;
    reset();
  }
}

function session() {
  document.getElementById("sessionButton").disabled = true;
  document.getElementById("restButton").disabled = false;
  document.getElementById("container").classList.toggle("session");
  minutes = sessionTime;
  reset();
  document.querySelector("link[rel='shortcut icon']").href = "assets/images/tomato.png";
  body.style.backgroundImage = "url(assets/images/tomatoBackground.svg)";
}

function rest() {
  document.getElementById("sessionButton").disabled = false;
  document.getElementById("restButton").disabled = true;
  document.getElementById("container").classList.toggle("session");
  minutes = restTime;
  reset();
  document.querySelector("link[rel='shortcut icon']").href = "assets/images/apple.png";
  body.style.backgroundImage = "url(assets/images/appleBackground.svg)";
}

function formatNumber(myNumber) {
  return ("0" + myNumber).slice(-2);
}

function refreshDisplays() {
  document.getElementById("minutesDisplay").innerHTML = minutes;
  document.getElementById("sessionTimeDisplay").innerHTML = sessionTime;
  document.getElementById("restTimeDisplay").innerHTML = restTime;
  document.getElementById("secondsDisplay").innerHTML = formatNumber(seconds);
  document.title = minutes + ":" + formatNumber(seconds) + " " + " Pomodoro Timer";
}

function playpause() {
  document.getElementById("playpauseButton").classList.toggle("pause");
  if (document.getElementById("playpauseButton").classList.contains("pause") === false) {
    document.getElementById("playpauseButton").innerHTML = '<i class="fas fa-pause"></i>';
    app();
  } else {
    pause();
  }
}

function pause() {
  document.getElementById("playpauseButton").classList.add("pause");
  document.getElementById("playpauseButton").innerHTML = '<i class="fas fa-play"></i>';
  clearInterval(intervalId);
}

function reset() {
  seconds = 0;
  refreshDisplays();
  pause();
}

function finish() {
  ding.play();
  clearInterval(intervalId);
  if (document.getElementById("container").classList.contains("rest")) {
    session();
    app();
  } else {
    rest();
    app();
  }
}

function app() {
  intervalId = setInterval(function() {
    if (seconds > 0) {
      seconds -= 1;
      refreshDisplays();
    } else {
      if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
        refreshDisplays();
      } else {
        finish();
      }
    }
  }, 1000);
}

reset();
session();