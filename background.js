console.log("LOAD");

const playerClass = "video-player";
const playClass =
  "tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--overlay tw-core-button tw-core-button--overlay tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative";
const titleClass =
  "tw-c-text-base tw-font-size-4 tw-line-height-heading tw-semibold tw-title";
const deleteInterval = 100;
const locationInterval = 1000;

const iframeID = "videopt";

const getChannel = () => window.location.href.split("/")[3];
const buildURL = () =>
  `https://player.twitch.tv/?channel=${getChannel()}&parent=twitch.tv`;

const updateSrc = () => {
  const iframe = document.getElementById(iframeID);
  if (iframe) iframe.setAttribute("src", buildURL());
};

const pauseBackground = () => {
  const button = Array.from(
    document.getElementsByClassName(playClass)
  ).filter((v) => v.getAttribute("data-a-player-state"))[0];
  const channel = getChannel();

  console.log("Button", button);
  console.log("Channel", channel);
  if (!button || channel === "browse" || channel === "videos") return;

  const state = button.getAttribute("data-a-player-state");
  console.log("State", state);
  if (state === "playing") button.click();
};

let prevChannel;
handleLocation = () => {
  const newChannel = getChannel();
  if (newChannel === "browse" || newChannel === "videos") {
    const iframe = document.getElementById(iframeID);
    if (iframe) iframe.remove();
  }

  if (prevChannel !== newChannel) {
    if (
      prevChannel !== "browse" &&
      prevChannel !== "videos" &&
      !document.getElementById(iframeID)
    )
      createIframe();
    prevChannel = newChannel;
    updateSrc();
  }

  pauseBackground();
};

const createIframe = () => {
  const videoplayer = document.getElementsByClassName(playerClass)[0];
  const container = videoplayer.parentElement;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", iframeID);
  iframe.setAttribute("class", playerClass);

  container.append(iframe);
};

locationID = setInterval(handleLocation, locationInterval);
