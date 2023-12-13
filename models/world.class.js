class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    // new BackgroundObject("../img/5_background/layers/air.png", 0),
    // new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    // new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    // new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/air.png", -719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("../img/5_background/layers/air.png", 0),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/air.png", 719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("../img/5_background/layers/air.png", 2 * 719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 2 * 719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 2 * 719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 2 * 719),
    new BackgroundObject("../img/5_background/layers/air.png", 3 * 719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 3 * 719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 3 * 719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 3 * 719),
  ];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);

    this.addObjectToMap(this.clouds);
    this.ctx.translate(-this.camera_x, 0);

    // Draw will allays be
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mov) {
    if (mov.otherDirection) {
      this.flipImage(mov);
      // this.ctx.save();
      // this.ctx.translate(mov.width, 0);
      // this.ctx.scale(-1, 1);
      // mov.x = mov.x * -1;
    }
    this.ctx.drawImage(mov.img, mov.x, mov.y, mov.width, mov.height);
    if (mov.otherDirection) {
      this.flipImageBack(mov);
    }
  }

  flipImage(mov) {
    this.ctx.save();
    this.ctx.translate(mov.width, 0);
    this.ctx.scale(-1, 1);
    mov.x = mov.x * -1;
  }
  flipImageBack(mov) {
    mov.x = mov.x * -1;
    this.ctx.restore();
  }
}
