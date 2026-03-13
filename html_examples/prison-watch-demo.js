const PRISON_WATCH_DEMO_VERSION = "1.0.0";

const rowElement = document.querySelector(".pw-row");
const guiltyButton = document.querySelector('[data-vote="guilty"]');
const notGuiltyButton = document.querySelector('[data-vote="not-guilty"]');
const guiltyBar = document.querySelector("[data-bar-guilty]");
const notGuiltyBar = document.querySelector("[data-bar-not-guilty]");
const guiltyPercent = document.querySelector("[data-percent-guilty]");
const notGuiltyPercent = document.querySelector("[data-percent-not-guilty]");

const scorecardSentenced = document.querySelector("[data-scorecard-sentenced]");
const scorecardAccuracy = document.querySelector("[data-scorecard-accuracy]");
const sidebarSentenced = document.querySelector("[data-sidebar-sentenced]");
const sidebarAcquitted = document.querySelector("[data-sidebar-acquitted]");

const voteState = {
  guilty: 74,
  notGuilty: 26
};

function updateScorecard() {
  const sentencedCount = rowElement?.dataset.status === "sentenced" ? 1 : 0;
  const acquittedCount = 12;
  const accuracy = Math.round((sentencedCount / 50) * 100);

  scorecardSentenced.textContent = String(sentencedCount);
  scorecardAccuracy.textContent = `${accuracy}%`;
  sidebarSentenced.textContent = String(sentencedCount);
  sidebarAcquitted.textContent = String(acquittedCount);
}

function updateVotes() {
  const total = voteState.guilty + voteState.notGuilty;
  const guiltyValue = Math.round((voteState.guilty / total) * 100);
  const notGuiltyValue = 100 - guiltyValue;

  guiltyBar.style.width = `${guiltyValue}%`;
  notGuiltyBar.style.width = `${notGuiltyValue}%`;
  guiltyPercent.textContent = `${guiltyValue}% Guilty`;
  notGuiltyPercent.textContent = `${notGuiltyValue}% Not Guilty`;
}

function registerVote(type) {
  if (type === "guilty") {
    voteState.guilty += 1;
  }

  if (type === "not-guilty") {
    voteState.notGuilty += 1;
  }

  updateVotes();
}

guiltyButton?.addEventListener("click", () => registerVote("guilty"));
notGuiltyButton?.addEventListener("click", () => registerVote("not-guilty"));

document.documentElement.setAttribute("data-demo-version", PRISON_WATCH_DEMO_VERSION);
updateScorecard();
updateVotes();
