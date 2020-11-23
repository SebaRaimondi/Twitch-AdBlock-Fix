console.log("LOAD");

const getChannel = () => window.location.href.split("/")[3];
const buildURL = () =>
  `https://player.twitch.tv/?channel=${getChannel()}&parent=twitch.tv`;

let intervalID;
const deleteVideo = () => {
  const video = document.querySelector("video");

  if (video) {
    console.log("Video", video);
    clearInterval(intervalID);
    video.remove();
    console.log("deleted");
  } else console.log("False video", video);
};

const playerClass = "video-player";
const deleteInterval = 20000;

const videoplayer = document.getElementsByClassName(playerClass)[0];
const container = videoplayer.parentElement;

const iframe = document.createElement("iframe");
iframe.setAttribute("class", playerClass);
iframe.setAttribute("src", buildURL());

container.append(iframe);

intervalID = setInterval(deleteVideo, deleteInterval);
console.log("Interval", intervalID);

// const updateChannel = () => iframe.setAttribute("src", buildURL());
