console.log("LOAD");

const playerClass = "video-player";
const playClass =
  "tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--overlay tw-core-button tw-core-button--overlay tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative";
const titleClass =
  "tw-c-text-base tw-font-size-4 tw-line-height-heading tw-semibold tw-title";

const deleteInterval = 100;
const locationInterval = 1000;

const embedID = "embedPlayer";
const playAttribute = "data-a-player-state";

const exceptionChannels = ["browse", "videos"];
let prevChannel;

const getChannel = () => window.location.href.split("/")[3];
const buildEmbedSRC = () =>
  `https://player.twitch.tv/?channel=${getChannel()}&parent=twitch.tv`;

const getEmbed = () => document.getElementById(embedID);
const embedExists = () => Boolean(getEmbed());

const updateSrc = () => {
  if (embedExists()) getEmbed().setAttribute("src", buildEmbedSRC());
};

const getButtons = () => Array.from(document.getElementsByClassName(playClass));
const getPlayButton = () =>
  getButtons().filter((v) => v.getAttribute(playAttribute))[0];
const playButtonExists = () => Boolean(getPlayButton());

const channelIsException = () => exceptionChannels.includes(getChannel());
const isPlaying = () =>
  playButtonExists() &&
  getPlayButton().getAttribute(playAttribute) === "playing";

const removeEmbed = () => embedExists() && getEmbed().remove();

const pauseBackground = () => {
  if (!channelIsException() && isPlaying()) getPlayButton().click();
};

const prevChannelIsException = () => exceptionChannels.includes(prevChannel);

handleLocation = () => {
  const newChannel = getChannel();
  if (channelIsException()) removeEmbed();

  if (prevChannel !== newChannel) {
    if (!prevChannelIsException() && !embedExists()) createIframe();
    prevChannel = newChannel;
    updateSrc();
  }

  pauseBackground();
};

const createIframe = () => {
  const videoplayer = document.getElementsByClassName(playerClass)[0];
  const container = videoplayer.parentElement;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", embedID);
  iframe.setAttribute("class", playerClass);

  container.append(iframe);
};

locationID = setInterval(handleLocation, locationInterval);
