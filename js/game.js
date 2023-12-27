let canvas;
// let ctx;
let keyboard = new Keyboard();
let world;
const buttonX = 500; // Button position and size
const buttonY = 240;
const buttonWidth = 200;
const buttonHeight = 80;
const fullScreenBtnX = 1125; // Button position and size
const fullScreenBtnY = 515;
const fullScreenBtnWidth = 50;
const fullScreenBtnHeight = 30;

function init() {
  canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, 1200, 560);
    // Button
    ctx.fillStyle = "#ccfbf1";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.strokeStyle = "rgba(119, 54, 5, 0.8)";
    ctx.lineWidth = 0;
    ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.font = "900 2.5rem system-ui";
    ctx.fillText("Play Now", buttonX + 5, buttonY + 50);

    //Fullscreen Button
    // ctx.beginPath();
    // ctx.lineWidth = "2";
    // ctx.strokeStyle = "rgba(255,255,255,0.7)";
    // ctx.rect(fullScreenBtnX, fullScreenBtnY, fullScreenBtnWidth, fullScreenBtnHeight);
    // ctx.stroke();
    // Cursor pointer

    canvas.addEventListener("mousemove", function (event) {
      const mouseX = event.clientX - canvas.getBoundingClientRect().left;
      const mouseY = event.clientY - canvas.getBoundingClientRect().top;

      // Check if the mouse is over the button area
      if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        // Set cursor style to "pointer" when over the button
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    });

    canvas.addEventListener("click", function (event) {
      handleButtonClick(event, buttonX, buttonY, buttonWidth, buttonHeight, function () {
        playGame();
      });
      // handleButtonClick(event, fullScreenBtnX, fullScreenBtnY, fullScreenBtnWidth, fullScreenBtnHeight, function () {
      //   canvas.requestFullscreen();
      // });
    });
  };
  img.src = "./img/9_intro_outro_screens/start/startscreen_2.png";
}

function handleButtonClick(event, x, y, width, height, callback) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  // Check if the click is within the button area
  if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
    callback();
  }
}

// function fullScreen() {
//   canvas = document.getElementById("canvas");
//   canvas.requestFullscreen();
// }

function playGame() {
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
