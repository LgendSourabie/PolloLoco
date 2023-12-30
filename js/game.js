const buttonX = 500; // Button position and size
const buttonY = 240;
const buttonWidth = 200;
const buttonHeight = 80;
const fullScreenBtnX = 1125; // Button position and size
const fullScreenBtnY = 515;
const fullScreenBtnWidth = 50;
const fullScreenBtnHeight = 30;
let canvas;
let btnFullscreen = document.getElementById("btn-fullscreen");
let infoPage = document.getElementById("info-container");
let gameInfo = document.getElementById("game-info");
let gameHelp = document.getElementById("help");
gameStartMusic = new Audio("./audios/music.mp3");
let keyboard = new Keyboard();
// let gameStartMusic = new Audio("../audios/music.mp3");
let world;

function startBackgroundMusic() {
  gameStartMusic.play();
  gameStartMusic.muted = true;
}
document.addEventListener("mouseover", startBackgroundMusic());

function toggleVolume() {
  if (gameStartMusic.muted) {
    gameStartMusic.muted = false;
  } else {
    gameStartMusic.muted = true;
  }
}

btnFullscreen.addEventListener("click", () => {
  main = document.getElementById("main");
  canvas = document.getElementById("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  // return main.requestFullscreen();

  if (main.requestFullscreen) {
    return main.requestFullscreen();
  } else if (main.mozRequestFullScreen) {
    return main.mozRequestFullScreen();
  } else if (main.webkitRequestFullscreen) {
    return main.webkitRequestFullscreen();
  } else if (main.msRequestFullscreen) {
    return main.msRequestFullscreen();
  }
});

function fullScreen(elementId) {
  document.getElementById("mobile-navigation").style.display = "flex";
  let elem = document.getElementById(elementId);
  document.getElementById("canvas").style.width = "100%";
  document.getElementById("canvas").style.height = "100vh";
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my character is", world.character);
}

window.addEventListener("keydown", function (e) {
  canvas = document.getElementById("canvas");
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (e.key === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (e.key === "ArrowUp") {
    keyboard.UP = true;
  }
  if (e.key === "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (e.key === " ") {
    keyboard.SPACE = true;
  }
  if (e.key === "d") {
    keyboard.D = true;
  }
  if (e.key === "f" || e.key === "F") {
    canvas.requestFullscreen();
  }
});

window.addEventListener("keyup", function (e) {
  // console.log(e);
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (e.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (e.key === "ArrowUp") {
    keyboard.UP = false;
  }
  if (e.key === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (e.key === " ") {
    keyboard.SPACE = false;
  }
  if (e.key === "d") {
    keyboard.D = false;
  }
  // console.log(e);
});

function enableDisplay() {
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  document.getElementById("game-info").classList.add("d-none");
  document.getElementById("help").classList.add("d-none");
}
function disableDisplay() {
  document.getElementById("canvas").classList.remove("d-none");
  btnFullscreen.classList.remove("d-none");
}

function playGame() {
  enableDisplay();
  disableDisplay();
  init();
  addEventListenersMobile();
}

function tryAgain() {
  enableDisplay();
  disableDisplay();
  document.getElementById("game-over-win").classList.add("d-none");
  document.getElementById("btn-try-again").classList.add("d-none");
  document.getElementById("game-over-lost").classList.add("d-none");
  init();
  addEventListenersMobile();
}

function addEventListenersMobile() {
  document.getElementById("arrow-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("arrow-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById("arrow-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("arrow-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("arrow-up").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("arrow-up").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById("throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

const markupInfo = `
<h2>What is El Pollo loco?</h2>
<button class="btn-fi  btn-third btn-close" onclick="closeInfoPage()"><img src="./icons/xmark-solid.svg" alt="Close" /></button>
<span class="big-letter">W</span>elcome to "El Pollo Loco," a thrilling adventure set in the scorching desert of Spain! Take control of our fearless protagonist, Pepe, as he navigates the arid landscape teeming with feisty foes—small chickens, standard chickens, and formidable Enboss chickens. Your mission is to guide Pepe through this poultry peril, armed with the ability to jump on or throw bottles at the smaller chickens, while the Enboss requires a strategic barrage of bottles to defeat. As Pepe ventures through the desert, make sure to collect valuable bottles and coins strewn along the way to enhance your chances of survival. Master the art of timing and precision to triumph over the clucking chaos that awaits you in "El Pollo Loco"! Are you ready to prove yourself against the relentless chicken onslaught? May the desert winds guide you, adventurer!
  `;
const markupHelp = `

<h2>Game Instructions</h2>
<button class="btn-fi  btn-third btn-close" onclick="closeInfoPage()"><img src="./icons/xmark-solid.svg" alt="Close" /></button>

<div>
<button id="arrow-left" class="btn-fi btn-third "><img src="./icons/arrow-left.svg" alt="Left" /></button>
<p>Move backward and navigate through the challenging desert terrain. </p>
</div>
<div>
<button id="arrow-right" class="btn-fi  btn-third "><img src="./icons/arrow-right.svg" alt="Right" /></button>
<p>Forge ahead, overcoming obstacles and confronting the relentless chicken enemies.</p>
</div>
<div>
<button id="arrow-up" class="btn-fi  btn-third "><img src="./icons/arrow-up.svg" alt="Up" /></button>
<p>Take a leap into the air with a skillful jump to avoid chicken attacks or reach higher platforms. </p>
</div>
<div>
<button id="throw" class="btn-fi  btn-third-fi "><img src="./icons/circle.svg" alt="Throw" /></button>
<p>Equip Pepe with the ability to defend himself by hurling bottles at the oncoming chicken adversaries. Use this strategic move to eliminate both small chickens and the formidable Enboss. </p>
</div>
<div>
<button id="btn-fullscreen" class="btn-fi btn-full-rect"><img src="./icons/maximize.svg" alt="Fullscreen" /></button>
<p>Additionally, for an immersive gaming experience, use the Square Button to toggle fullscreen mode. Immerse yourself fully in the vibrant and challenging world of "El Pollo Loco" as you navigate the desert landscape, battle chickens, and collect valuable items. Enjoy the game in all its glory with the square button, and may your journey through the desert be both thrilling and visually captivating! </p>
</div>
  `;

function renderGameInfos() {
  // infoPage.innerHTML = "";
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  btnFullscreen.classList.add("d-none");
  infoPage.classList.remove("d-none");
  infoPage.innerHTML = markupInfo;
}

function renderGameHelp() {
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  btnFullscreen.classList.add("d-none");
  infoPage.classList.remove("d-none");
  infoPage.innerHTML = markupHelp;
  // infoPage.insertAdjacentHTML("afterbegin", markup);
}

function closeInfoPage() {
  document.getElementById("startscreen").classList.remove("d-none");
  document.getElementById("btn-play").classList.remove("d-none");
  btnFullscreen.classList.remove("d-none");
  infoPage.classList.add("d-none");
}

// gameHelp.addEventListener("click", renderGameInstruction(markupHelp));
// gameInfo.addEventListener("click", renderGameInstruction(markupInfo));
