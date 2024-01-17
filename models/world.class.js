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
    this.bottlerun();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions(this.level.enemies, 0.5);
      this.checkCollisionWithBottle();
      this.checkCollisionWithCoins();
    }, 1000 / 60);
  }

  bottlerun() {
    setInterval(() => {
      this.checkThrowObject();
      this.checkCollisionsBottleEnemies();
    }, 200);
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
      if (object instanceof SmallChicken && !object.isAboveGround()) {
        this.character.jump();
      }
      object[removeEnemyIndex].energy = 0;
      object.splice(removeEnemyIndex, 1);
      // setTimeout(() => object.splice(removeEnemyIndex, 1), 500);
    } else {
      this.character.hit(lostEnergy);
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  collissionBottleChicken(bottle, enemies) {
    return bottle.x + bottle.width >= enemies.x && bottle.x <= enemies.x + enemies.width && bottle.y + bottle.height >= enemies.y && bottle.y <= enemies.y + enemies.height;
  }

  /**
   * check if the thrown bottles collide with an enemy
   */
  checkCollisionsBottleEnemies() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, i) => {
        if (this.collissionBottleChicken(bottle, enemy)) {
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            this.level.enemies.splice(i, 1); // if the collision happen with a either a small or a normal chicken then their muss be dead
          }
          if (enemy instanceof Endboss) {
            // for the endboss however, the number of collision is needed until its energy get to null
            this.endboss.endbossHit();
            this.statusEndboss.setPercentage(this.endboss.endbossHealth);
          }
        }
      });
    });
  }

  /**
   * This function draw all the objects in canvas. Every time an object has to be added to the canvas this wil happen by the mean of this function
   */

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

  /**
   * This function draw all the objects in canvas. Every time an object in the an array of objects
   * has to be added to the canvas this wil happen by the mean of this function
   */

  addObjectToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * This function also draw  objects in canvas. However, the object has to be a single object but no an element of array object
   */
  /**
   *
   * @param {object} mov - refers to the movable objects
   */

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
