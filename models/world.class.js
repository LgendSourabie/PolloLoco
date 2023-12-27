class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  canvasWidth = 1200;
  canvasHeigth = 560;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.iscolliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }
  checkThrowObject() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0); //Backward and draw image
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0); //Forward

    this.addToMap(this.character);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);

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
    }
    mov.draw(this.ctx);

    mov.drawFrame(this.ctx);
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
