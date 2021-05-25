
const video = document.getElementById("video");
// video.addEventListener("play", refreshState);

const cssFiltersButtons = document.getElementsByClassName("cssFilter");

function launch() {
    setupVideo();
    setupButtons();
}

function setupVideo() {
    navigator.mediaDevices
        .getUserMedia({video: true, audio: false})
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch(err => console.error("can't found your camera :(", err));
}

function setupButtons() {
    for (let filterButton of cssFiltersButtons) {
        filterButton.addEventListener("click", handleVideo);
    }
}

function handleVideo(event) {
    video.className = event.target.dataset.id;
    return false;
}

launch();