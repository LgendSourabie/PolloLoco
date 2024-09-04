/**
 * Audios and musics during the game
 */

const GAME_START_MUSIC = new Audio("../assets/audios/music.mp3");
const JUMP_SOUND = new Audio("../assets/audios/jump.mp3");
const WIN_SOUND = new Audio("../assets/audios/win.mp3");
const CHICKEN_SOUND = new Audio("../assets/audios/chicken.mp3");
const PEPE_DEAD_SOUND = new Audio("../assets/audios/pepe_dead.mp3");
const PEPE_WALKING_SOUND = new Audio("../assets/audios/running.mp3");
const BOTTLE_SOUND = new Audio("../assets/audios/throw.mp3");
const ENDBOSS_DEAD_SOUND = new Audio("../assets/audios/endboss_dead.mp3");
const CHICKEN_HURT_SOUND = new Audio("../assets/audios/chicken_hurt.mp3");
const PEPE_HURT_SOUND = new Audio("../assets/audios/pepe_hurt.mp3");
const COLLECT_BOTTLE_SOUND = new Audio("../assets/audios/collect_bottle.mp3");
const COLLECT_COIN_SOUND = new Audio("../assets/audios/collect_coin.mp3");

/**
 * HTML elements and variables
 */
let canvas;
let btnFullscreen = document.getElementById("btn-fullscreen");
let volumeBtn = document.getElementById("volume-high");
let infoPage = document.getElementById("info-container");
let gameInfo = document.getElementById("game-info");
let gameHelp = document.getElementById("help");
let keyboard = new Keyboard();
let world;
/**
 * wether the game is running or not (startscreen) - used to control the mobile device options
 *  or check is sound is on or off
 */
let isRunning = false;
let isSoundOn = true;

/**
 * enable or disable the fullscreen option when the fullscreen icon (button) is clicked
 */

btnFullscreen.addEventListener("click", () => {
  fullScreen();
});

/**
 * enable or disable all volumes  when the volume button is clicked
 */
volumeBtn.addEventListener("click", () => {
  toggleVolumeBtn();
  if (isSoundOn) disableSound();
  else enableSound();
});

/**
 * toggle the volume Icon between volume allowed and mute
 */

function toggleVolumeBtn() {
  let volumeIcon = document.getElementById("volume-icon");
  let currentVolumeBtn = volumeIcon.getAttribute("src");
  if (currentVolumeBtn === "../assets/icons/volume-high.svg") volumeIcon.setAttribute("src", "../assets/icons/volume-xmark.svg");
  else volumeIcon.setAttribute("src", "../assets/icons/volume-high.svg");
}

/**
 * enable sound by using the volume property
 */
function enableSound() {
  GAME_START_MUSIC.volume = 0.25;
  JUMP_SOUND.volume = 0.25;
  WIN_SOUND.volume = 0.25;
  CHICKEN_SOUND.volume = 0.25;
  CHICKEN_HURT_SOUND.volume = 0.25;
  PEPE_DEAD_SOUND.volume = 0.25;
  PEPE_WALKING_SOUND.volume = 0.25;
  BOTTLE_SOUND.volume = 0.25;
  PEPE_HURT_SOUND.volume = 0.25;
  ENDBOSS_DEAD_SOUND.volume = 0.25;
  COLLECT_BOTTLE_SOUND.volume = 0.25;
  COLLECT_COIN_SOUND.volume = 0.25;
  isSoundOn = true;
}

/**
 * Sounds are virtually disable by reducing the volume to zero
 */

function disableSound() {
  GAME_START_MUSIC.volume = 0;
  JUMP_SOUND.volume = 0;
  WIN_SOUND.volume = 0;
  CHICKEN_SOUND.volume = 0;
  CHICKEN_HURT_SOUND.volume = 0;
  PEPE_DEAD_SOUND.volume = 0;
  PEPE_WALKING_SOUND.volume = 0;
  BOTTLE_SOUND.volume = 0;
  PEPE_HURT_SOUND.volume = 0;
  ENDBOSS_DEAD_SOUND.volume = 0;
  COLLECT_BOTTLE_SOUND.volume = 0;
  COLLECT_COIN_SOUND.volume = 0;
  isSoundOn = false;
}

/**
 * enter full screen modus
 */

function fullScreen() {
  main = document.getElementById("main");
  canvas = document.getElementById("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  toggleFullScreen(main);
}

/**
 *
 * @param {html-element-ID} main - id of an html element which need to be shown in fullscreen
 */

function fullScreenDisplay(main) {
  if (main.requestFullscreen) {
    return main.requestFullscreen(); //Chrome
  } else if (main.mozRequestFullScreen) {
    return main.mozRequestFullScreen(); // mozilla
  } else if (main.webkitRequestFullscreen) {
    return main.webkitRequestFullscreen(); // iOS Safari
  } else if (main.msRequestFullscreen) {
    return main.msRequestFullscreen(); // for IE11
  }
}

/**
 *
 * @param {ID of html element} main - id of main container
 */

function toggleFullScreen(main) {
  if (!document.fullscreenElement) {
    fullScreenDisplay(main);
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

/**
 * initialization of the game when page loads
 */

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * attaches event to keys when down
 * allow playing the game using keys - when specified keys are pressed => event are listened and suitable responses given
 */

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

/**
 * disallow the event attached to keys when key is up
 */

window.addEventListener("keyup", function (e) {
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
});

/**
 * enable display of HTML elements
 */

function enableDisplay() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  document.getElementById("game-info").classList.add("d-none");
  document.getElementById("help").classList.add("d-none");
}

/**
 * disable display of canvas und fullscreen button
 */
function disableDisplay() {
  document.getElementById("canvas").classList.remove("d-none");
  btnFullscreen.classList.remove("d-none");
}

/**
 * start playing the game and set a flag to true which
 * is later check to know if the game is running
 */
function playGame() {
  isRunning = true;
  init();
  addEventListenersMobile();
  enableDisplay();
  disableDisplay();
  volumeBtn.classList.remove("d-none");
  document.getElementById("btn-grp-game-info").style.display = "none";
  playMusic();
}

/**
 * start music and let it play in loop
 */

function playMusic() {
  GAME_START_MUSIC.volume = 0.25;
  GAME_START_MUSIC.play();
  GAME_START_MUSIC.loop = true;
}

/**
 * allow the user to play the game again when it is over
 */
function tryAgain() {
  enableDisplay();
  disableDisplay();
  document.getElementById("game-over-win").classList.add("d-none");
  document.getElementById("btn-try-again").classList.add("d-none");
  document.getElementById("game-over-lost").classList.add("d-none");
  init();
  addEventListenersMobile();
}

/**
 * event listener for mobile devices
 */

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
                    <button class="btn-fi  btn-third btn-close" onclick="closeInfoPage()"><img src="../assets/icons/xmark-solid.svg" alt="Close" /></button>
                    <span class="big-letter">W</span>elcome to "El Pollo Loco," a thrilling adventure set in the scorching desert of Spain! Take control of our fearless protagonist, Pepe, as he navigates the arid landscape teeming with feisty foes—small chickens, standard chickens, and formidable Enboss chickens. Your mission is to guide Pepe through this poultry peril, armed with the ability to jump on or throw bottles at the smaller chickens, while the Enboss requires a strategic barrage of bottles to defeat. As Pepe ventures through the desert, make sure to collect valuable bottles and coins strewn along the way to enhance your chances of survival. Master the art of timing and precision to triumph over the clucking chaos that awaits you in "El Pollo Loco"! Are you ready to prove yourself against the relentless chicken onslaught? May the desert winds guide you, adventurer!
  `;

const markupHelp = `
                    <h2>Game Instructions</h2>
                    <button class="btn-fi  btn-third btn-close" onclick="closeInfoPage()"><img src="../assets/icons/xmark-solid.svg" alt="Close" /></button>

                    <div>
                    <button id="arrow-left" class="btn-fi btn-third "><img src="../assets/icons/arrow-left.svg" alt="Left" /></button>
                    <p>Move backward and navigate through the challenging desert terrain. </p>
                    </div>
                    <div>
                    <button id="arrow-right" class="btn-fi  btn-third "><img src="../assets/icons/arrow-right.svg" alt="Right" /></button>
                    <p>Forge ahead, overcoming obstacles and confronting the relentless chicken enemies.</p>
                    </div>
                    <div>
                    <button id="arrow-up" class="btn-fi  btn-third "><img src="../assets/icons/arrow-up.svg" alt="Up" /></button>
                    <p>Take a leap into the air with a skillful jump to avoid chicken attacks or reach higher platforms. </p>
                    </div>
                    <div>
                    <button id="throw" class="btn-fi  btn-third-fi "><img src="../assets/icons/circle.svg" alt="Throw" /></button>
                    <p>Equip Pepe with the ability to defend himself by hurling bottles at the oncoming chicken adversaries. Use this strategic move to eliminate both small chickens and the formidable Enboss. </p>
                    </div>
                    <div>
                    <button id="btn-fullscreen" class="btn-fi btn-full-rect"><img src="../assets/icons/maximize.svg" alt="Fullscreen" /></button>
                    <p>Additionally, for an immersive gaming experience, use the Square Button to toggle fullscreen mode. Immerse yourself fully in the vibrant and challenging world of "El Pollo Loco" as you navigate the desert landscape, battle chickens, and collect valuable items. Enjoy the game in all its glory with the square button, and may your journey through the desert be both thrilling and visually captivating! </p>
                    </div>
  `;

/**
 * render the game infos when the info button is clicked
 */

function renderGameInfos() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  btnFullscreen.classList.add("d-none");
  infoPage.classList.remove("d-none");
  infoPage.innerHTML = markupInfo;
}

/**
 * render help for playing the game when the help button is clicked
 */

function renderGameHelp() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("btn-play").classList.add("d-none");
  btnFullscreen.classList.add("d-none");
  infoPage.classList.remove("d-none");
  infoPage.innerHTML = markupHelp;
}
/**
 * allow closing the help page or returning to the startpage
 */

function closeInfoPage() {
  document.getElementById("start-screen").classList.remove("d-none");
  document.getElementById("btn-play").classList.remove("d-none");
  infoPage.classList.add("d-none");
}

/**
 * asked the user to turn is device when playing on a mobile device
 */
function turnScreenOrientation() {
  if (window.mobileCheck()) {
    document.getElementById("main").style.border = "unset";
    document.getElementById("main").style.width = "unset";
    document.getElementById("header").style.display = "none";
    document.querySelector("body").style.margin = "0";
    disableDisplayHTML();
  } else {
    document.getElementById("main").style.border = "12px solid rgba(255, 255, 255, 0.8)";
    document.getElementById("header").style.display = "block";
    document.querySelector("body").style.margin = "8px";
    enableDisplayHTML();
  }
}

/**
 * disable the display of HTML elements
 */
function disableDisplayHTML() {
  document.getElementById("arrow-left").classList.remove("d-none");
  document.getElementById("arrow-right").classList.remove("d-none");
  document.getElementById("arrow-up").classList.remove("d-none");
  document.getElementById("throw").classList.remove("d-none");
  document.querySelector(".help-resp").classList.remove("d-none");
  document.querySelector(".info-resp").classList.remove("d-none");
}

/**
 * enable the display of HTML elements
 */

function enableDisplayHTML() {
  document.getElementById("arrow-left").classList.add("d-none");
  document.getElementById("arrow-right").classList.add("d-none");
  document.getElementById("arrow-up").classList.add("d-none");
  document.getElementById("throw").classList.add("d-none");
}

/**
 * call the function every 0.1 second to check the device type
 */
setInterval(() => {
  turnScreenOrientation();
}, 100);

/**
 * This function check the type of device with the parameters of all types of mobile devices and return true or false
 * @returns boolean - true or false wether user is currently trying to play on a mobile device (current device is mobile device => true)
 */

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
