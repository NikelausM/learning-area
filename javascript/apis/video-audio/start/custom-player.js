// Select tags
const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';


// Play button logic

play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
    if(media.paused) {
        play.setAttribute('data-icon','u');// pause icon
        media.play();
    } else {
        play.setAttribute('data-icon','P');// play icon
        media.pause();
    }
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

// Stop button logic 
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','P');
    
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

// Rewind and fast forward button logic
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');
    
    if(rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');
    
    if(fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if(media.currentTime <= 3) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
    }
}

function windForward() {
    if(media.currentTime >= media.duration - 3) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}

// The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
media.addEventListener('timeupdate', handleSetTime(null));

function handleSetTime(currentTime) {
    return function(e) {
        setTime(e, currentTime);
    }
}

function setTime(e, currentTime) {
    if(currentTime) {
        console.log("not null")
    }
    currentTime = (currentTime) ? currentTime : media.currentTime;
    console.log("currentTime: ", currentTime);
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime - minutes * 60);
    let minuteValue;
    let secondValue;
    
    minuteValue = (minutes < 10) ? '0' + minutes : minutes;
    
    secondValue = (seconds < 10) ? '0' + seconds : seconds;
    
    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;
    
    let barLength = timerWrapper.clientWidth * (currentTime/media.duration);
    timerBar.style.width = barLength + 'px';
}

console.log("bounding: ", timerWrapper.getBoundingClientRect())
document.onclick = function(e) {
    console.log(e.x) + ',' + console.log(e.y)
}

timerWrapper.addEventListener("click", mediaTimeBar);

function mediaTimeBar(e) {
    try {
        media.pause();
        updateTime(e);
        media.play();
    }
    catch(err) {
        console.log(err);
    }
}

function updateTime(e) {
    try {
        let barLength = e.x - timerWrapper.getBoundingClientRect().left;
        let currentTime = (barLength / timerWrapper.clientWidth) * media.duration;
        setTime(e, currentTime);
        media.currentTime = currentTime;
    }
    catch(err) {
        console.log(err);
    }
}