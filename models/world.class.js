class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  /**
   * array to store collected bottles
   */
  throwableObjects = [];
  canvasWidth = 1200;
  canvasHeigth = 560;

  /**
   * Add new status Bars to canvas
   */
  statusBar = new StatusBar();
  statusCoin = new StatusCoin();
  statusBottle = new StatusBottle();
  statusEndboss = new StatusEndboss();
  endboss = this.level.enemies.slice(-1)[0];

  endbossHealth = 10;
  /**
   * only the range of remaining bottles [0-20,20-40,....,80-100]
   */
  remainingBottles = 0;
  /**
   * only the range of remaining coins [0-20,20-40,....,80-100]
   */
  remainingCoins = 0;

  /**
   * constructor for adding element to the game and adding game logics
   * @param {html element} canvas
   * @param {string} keyboard
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.bottlerun();
  }

  /**
   * set  the current object as world
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * check game logics to take actions
   */
  run() {
    setInterval(() => {
      this.checkCollisions(this.level.enemies, 0.5);
      this.checkCollisionWithBottle();
      this.checkCollisionWithCoins();
    }, 1000 / 25);
  }
  /**
   * check if bottle is thrown or/and collided with enemies
   */
  bottlerun() {
    setInterval(() => {
      this.checkThrowObject();
      this.checkCollisionsBottleEnemies();
    }, 200);
  }

  /**
   * check if bottle is thrown
   */
  checkThrowObject() {
    if (this.keyboard.D && this.remainingBottles > 0) {
      this.remainingBottles -= 21;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.statusBottle.setPercentage(this.remainingBottles);
    }
  }

  /**
   *  check collision btn character and enemies
   * @param {Object} object - character or enemies
   * @param {number} lostEnergy - specifies the amount that should be withdraw from the energy of the character/enemies
   */
  checkCollisions(object, lostEnergy) {
    object.forEach((enemy, i) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Chicken) {
          this.isEnemyDead(enemy, i, 2 * lostEnergy);
        } else if (enemy instanceof SmallChicken) {
          this.isEnemyDead(enemy, i, lostEnergy);
        } else if (enemy instanceof Endboss) {
          this.character.hit(0.5);
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * check collision with coins
   */
  checkCollisionWithCoins() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.remainingCoins += 21;
        COLLECT_COIN_SOUND.play();
        this.statusCoin.setPercentage(this.remainingCoins);
        this.level.coins.splice(i, 1);
      }
    });
  }

  /**
   * check collision with bottles
   */
  checkCollisionWithBottle() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.remainingBottles += 21;
        COLLECT_BOTTLE_SOUND.play();
        this.statusBottle.setPercentage(this.remainingBottles);
        this.level.bottles.splice(i, 1);
      }
    });
  }

  /**
   * check is Object should be remove  from canvas (is dead)
   * @param {Objects} object
   * @param {number} removeEnemyIndex - index of the element to be removed from the object array
   * @param {number} lostEnergy - number to redraw from current Object energy
   */
  isEnemyDead(object, removeEnemyIndex, lostEnergy) {
    if (this.character.hasWalkOnEnemy()) {
      if (object instanceof SmallChicken && !object.isAboveGround()) {
        this.character.jump();
      }
      this.level.enemies[removeEnemyIndex].chickenDead();
      this.deleteEnemy(object, this.level.enemies, removeEnemyIndex);
      CHICKEN_HURT_SOUND.play();
    } else {
      this.character.hit(lostEnergy);
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * remove chicken from canvas (chicken is dead)
   * @param {Object} currentEnemy - chicken to be deleted
   * @param {Array} allEnemies - Array of chickens
   * @param {number} indexOfEnemy - index of the chicken to be deleted
   */
  deleteEnemy(currentEnemy, allEnemies, indexOfEnemy) {
    let time;
    time = currentEnemy.isAboveGround() ? 0 : 120;
    setTimeout(() => {
      allEnemies.splice(indexOfEnemy, 1);
    }, time);
  }
  /**
   *
   * @param {Object} bottle - object is a bottle
   * @param {Object} enemies .- object is a chicken or small chicken
   * @returns boolean true or false wether collision happened
   */

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
            /**
             * if the collision happen with a either a small or a normal chicken then their muss be dead
             */
            this.level.enemies.splice(i, 1);
          }
          if (enemy instanceof Endboss) {
            /**
             * for the endboss however, the number of collision is needed until its energy get to null
             */
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

    /**
     * Camera Backward and draw images
     */
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);

    this.addToMap(this.statusCoin);
    this.addToMap(this.statusBottle);
    this.addToMap(this.statusEndboss);

    /**
     * Camera Forward and draw images
     */
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.bottles);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    /**
     * Draw will allays be called by itself
     */
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
   *
   * @param {object} mov - refers to the movable objects
   */

  addToMap(mov) {
    if (mov.otherDirection) {
      this.flipImage(mov);
    }
    mov.draw(this.ctx);
    if (mov.otherDirection) {
      this.flipImageBack(mov);
    }
  }

  /**
   * function to flip the object moving direction
   * @param {Object} mov - moveable object
   */
  flipImage(mov) {
    this.ctx.save();
    this.ctx.translate(mov.width, 0);
    this.ctx.scale(-1, 1);
    mov.x = mov.x * -1;
  }

  /**
   * function to flip back the object moving direction
   * @param {Object} mov - moveable object
   */
  flipImageBack(mov) {
    mov.x = mov.x * -1;
    this.ctx.restore();
  }
}
