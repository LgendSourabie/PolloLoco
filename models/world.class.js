class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("../img/5_background/layers/air.png", 0),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
  ];
  canvas;
  ctx;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);

    this.addObjectToMap(this.clouds);

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
    this.ctx.drawImage(mov.img, mov.x, mov.y, mov.width, mov.height);
  }
}
