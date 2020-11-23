console.log("LOAD");

const playerClass = "video-player";
const playClass =
  "tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--overlay tw-core-button tw-core-button--overlay tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative";
const deleteInterval = 100;

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

    const button = document.getElementsByClassName(playClass)[0];
    if (button.ariaLabel.startsWith("Pause")) button.click();
  }
};

const videoplayer = document.getElementsByClassName(playerClass)[0];
const container = videoplayer.parentElement;

const iframe = document.createElement("iframe");
iframe.setAttribute("class", playerClass);
iframe.setAttribute("src", buildURL());

container.append(iframe);

intervalID = setInterval(deleteVideo, deleteInterval);
console.log("Interval", intervalID);

// const updateChannel = () => iframe.setAttribute("src", buildURL());
