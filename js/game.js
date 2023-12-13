let canvas;
// let ctx;
let keyboard = new Keyboard();
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  // ctx = canvas.getContext("2d");
  //   character.src = `../img/2_character_pepe/2_walk/W-21.png`;
  console.log("my character is", world.character);
}

window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = true;
    console.log(keyboard);
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
  // console.log(e);
});

window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = false;
    console.log(keyboard);
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
  // console.log(e);
});
