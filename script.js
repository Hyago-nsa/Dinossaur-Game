import { setupGround, updateGround } from "./ground.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00002;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");

document.addEventListener("keydown", handleStart, { once: true });
window.addEventListener("resize", setPixelToWorldScale);

setPixelToWorldScale();

let lastTime;
let speedScale;
let score;

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  lastTime = time;

  updateGround(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function handleStart() {
  setupGround();

  lastTime = null;
  speedScale = 1;
  score = 0;
  window.requestAnimationFrame(update);
}
