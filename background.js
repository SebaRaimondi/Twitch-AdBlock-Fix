const getChannel = () => window.location.href.split("/")[3];
const buildURL = () =>
  `https://player.twitch.tv/?channel=${getChannel()}&parent=twitch.tv`;

const playerClass = "video-player";

const videoplayer = document.getElementsByClassName(playerClass)[0];
const container = videoplayer.parentElement;

const iframe = document.createElement("iframe");
iframe.setAttribute("class", playerClass);
iframe.setAttribute("src", buildURL());

videoplayer.remove();
container.append(iframe);

// const updateChannel = () => iframe.setAttribute("src", buildURL());
