console.log("LOAD");

const getChannel = () => window.location.href.split("/")[3];
const buildURL = () =>
  `https://player.twitch.tv/?channel=${getChannel()}&parent=twitch.tv`;

const deleteVideo = () => {
  const video = document.querySelector("video");
  if (video) video.remove();
  console.log("deleted");
};

const playerClass = "video-player";
const deleteTimeout = 20000;

const videoplayer = document.getElementsByClassName(playerClass)[0];
const container = videoplayer.parentElement;

const iframe = document.createElement("iframe");
iframe.setAttribute("class", playerClass);
iframe.setAttribute("src", buildURL());

container.append(iframe);

setTimeout(deleteVideo, deleteTimeout);

// const updateChannel = () => iframe.setAttribute("src", buildURL());
