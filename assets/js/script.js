// ELEMENTS
const player = document.querySelector("#player");
const video = player.querySelector("#video");
const timerDuration = player.querySelector(".timer .duration");
const timerCurrent = player.querySelector(".timer .current");
const progressArea = player.querySelector(".progress-area");
const progressBar = player.querySelector(".progress-area .progress-bar");
const playBtn = player.querySelector(".play");
const backwardBtn = player.querySelector(".backward");
const forwardBtn = player.querySelector(".forward");
const fullscreenBtn = player.querySelector(".fullscreen");
const settings = player.querySelector("#settings");
const settingsOpenBtn = player.querySelector(".settings");
const settingsCloseBtn = player.querySelector("#settings .playspeed .header .close");
const speedOptions = player.querySelectorAll(".playspeed li");
const volumeRange = player.querySelector(".volume #volume-range");

//FUNCTIONS
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="material-symbols-rounded">pause</i>';
    } else {
        video.pause();
        playBtn.innerHTML = '<i class="material-symbols-rounded">play_arrow</i>';
    }
}

function skip(e) {
    video.currentTime += parseInt(e.target.dataset.time);
}

function changeTime() {
    let currentTime = video.currentTime;

    let percentage = (currentTime * 100) / video.duration;
    progressBar.style.width = `${percentage}%`;

    updateTimer(currentTime, timerCurrent);
}

function updateTimer(time, element) {
    let mins = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    element.innerHTML = `${mins}:${("0" + seconds).slice(-2)}`;
}

function toggleSettings() {
    settings.classList.toggle("active");
}

function changeSpeed(e) {
    video.playbackRate = parseFloat(e.target.dataset.speed);
}

function changeVolume() {
    video.volume = volumeRange.value / 100;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) { // Firefox
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) { // Chrome, Safari and Opera
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { // IE/Edge
            player.msRequestFullscreen();
        }
    } else {
        document.exitFullscreen();
    }
}

function changeProgress(e) {
    if (!changingProgress && e.type != "click") return;

    let current = e.offsetX;
    let max = progressArea.offsetWidth;
    let percentage = ((current * 100) / max) * 0.01;
    video.currentTime = video.duration * percentage;
}


// EVENTS
window.addEventListener('load', () => {
    updateTimer(video.duration, timerDuration);
    video.volume = 0.3;
});

video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
backwardBtn.addEventListener('click', skip);
forwardBtn.addEventListener('click', skip);
video.addEventListener('timeupdate', changeTime);
settingsOpenBtn.addEventListener('click', toggleSettings);
settingsCloseBtn.addEventListener('click', toggleSettings);
speedOptions.forEach(option => option.addEventListener('click', changeSpeed));
volumeRange.addEventListener('change', changeVolume);
fullscreenBtn.addEventListener('click', toggleFullscreen);

let changingProgress = false;
progressArea.addEventListener('click', changeProgress);
progressArea.addEventListener('mousedown', () => changingProgress = true);
progressArea.addEventListener('mouseup', () => changingProgress = false);
progressArea.addEventListener('mouseout', () => changingProgress = false);
progressArea.addEventListener('mousemove', changeProgress);

video.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="material-symbols-rounded" title="Recomeçar">restart_alt</i>';
});
