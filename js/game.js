let canvas;
// let ctx;

let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  // ctx = canvas.getContext("2d");
  //   character.src = `../img/2_character_pepe/2_walk/W-21.png`;
  console.log("my character is", world.character);
}
