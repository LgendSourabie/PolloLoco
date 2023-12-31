class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusCoin = new StatusCoin();
  throwableObjects = [];
  canvasWidth = 1200;
  canvasHeigth = 560;
  statusBottle = new StatusBottle();
  statusEndboss = new StatusEndboss();
  endboss = this.level.enemies.slice(-1)[0];
  endbossHealth = 10;
  remainingBottles = 0; // only the range of remaining bottles [0-20,20-40,....,80-100]
  remainingCoins = 0; // only the range of remaining coins [0-20,20-40,....,80-100]
  jump_sound = new Audio("audios/jump.mp3");

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
      // this.checkCollisions();
      this.checkCollisions(this.level.enemies, 0.5);
      this.checkCollisionWithBottle();
      this.checkCollisionWithCoins();
      this.checkCollisionsBottleEnemies();
      this.checkThrowObject();
    }, 1000 / 60);
  }

  checkThrowObject() {
    if (this.keyboard.D && this.remainingBottles > 0) {
      this.remainingBottles -= 21;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.statusBottle.setPercentage(this.remainingBottles);
    }
  }

  checkCollisions(object, lostEnergy) {
    object.forEach((enemy, i) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Chicken) {
          this.isEnemyDead(this.level.enemies, i, 2 * lostEnergy);
        } else if (enemy instanceof SmallChicken) {
          this.isEnemyDead(this.level.enemies, i, lostEnergy);
        } else if (enemy instanceof Endboss) {
          this.character.hit(100);
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionWithCoins() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.remainingCoins += 21;
        this.statusCoin.setPercentage(this.remainingCoins);
        this.level.coins.splice(i, 1);
      }
    });
  }
  checkCollisionWithBottle() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.remainingBottles += 21;
        this.statusBottle.setPercentage(this.remainingBottles);
        this.level.bottles.splice(i, 1);
      }
    });
  }

  isEnemyDead(object, removeEnemyIndex, lostEnergy) {
    if (this.character.hasWalkOnEnemy()) {
      object[removeEnemyIndex].energy = 0;
      if (object instanceof Chicken) setTimeout(() => object.splice(removeEnemyIndex, 1), 500);
      // if (object instanceof SmallChicken) setTimeout(() => object.splice(removeEnemyIndex, 1), 500);
      // object.splice(removeEnemyIndex, 1);
      // if (object instanceof SmallChicken) this.character.jump();
      if (object instanceof SmallChicken) {
        if (!object.isAboveGround()) {
          this.character.jump();
          setTimeout(() => object.splice(removeEnemyIndex, 1), 500);
        } else if (object.isAboveGround()) {
          setTimeout(() => object.splice(removeEnemyIndex, 1), 0);
        }
      }
    } else {
      this.character.hit(lostEnergy);
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  collissionBottleChicken(bottle, enemies) {
    return bottle.x + bottle.width >= enemies.x && bottle.x <= enemies.x + enemies.width && bottle.y + bottle.height >= enemies.y && bottle.y <= enemies.y + enemies.height;
  }

  checkCollisionsBottleEnemies() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, i) => {
        if (this.collissionBottleChicken(bottle, enemy)) {
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            this.level.enemies.splice(i, 1);
          }
          if (enemy instanceof Endboss) {
            this.endboss.endbossHit();
            this.statusEndboss.setPercentage(this.endboss.endbossHealth);
          }
        }
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0); //Backward and draw image
    this.addToMap(this.statusBar);

    this.addToMap(this.statusCoin);
    this.addToMap(this.statusBottle);
    this.addToMap(this.statusEndboss);

    this.ctx.translate(this.camera_x, 0); //Forward

    this.addToMap(this.character);

    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.bottles);
    this.addObjectToMap(this.level.coins);
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

    // mov.drawFrame(this.ctx);
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
