class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  chickens_life = 1;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  endbossHealth = 10;

  offset_xPlus = 0;
  offset_xMinus = 0;
  offset_yPlus = 0;
  offset_yMinus = 0;

  /**
   * apply gravity to the moveable object
   */
  applyGravity() {
    setInterval(() => {
      if (this.hasJump()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 25);
  }

  /**
   * check if character has jumped
   */
  hasJump() {
    return this.isAboveGround() || this.speedY > 0;
  }

  /**
   * check if character has walked on enemies
   */
  hasWalkOnEnemy() {
    return this.isAboveGround() && this.speedY <= 0;
  }

  /**
   * check if character is above ground
   */

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof SmallChicken) {
      return this.y <= 370;
    } else {
      return this.y <= 220;
    }
  }

  /**
   * check for any collision btn character and Objects
   * @param {Object} mo - moveable objects
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset_xPlus > mo.x + mo.offset_xMinus &&
      this.y + this.height - this.offset_yMinus > mo.y + mo.offset_yPlus &&
      this.x + this.offset_xMinus < mo.x + mo.width - mo.offset_xPlus &&
      this.y + this.offset_yPlus < mo.y + mo.height - mo.offset_yMinus
    );
  }
  /**
   * check if the Object has been hit
   * @param {number} lostEnergy - amount to withdraw from the current energy of the Object
   */

  hit(lostEnergy) {
    this.energy -= lostEnergy;
    PEPE_HURT_SOUND.play();
    if (this.energy < 20) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * check if endboss has been hit
   */
  endbossHit() {
    this.endbossHealth -= 1;
    if (this.endbossHealth < 2) {
      this.endbossHealth = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * check if endboss is dead
   * @returns true or false wether endboss is dead
   */
  isEndbossDead() {
    return this.endbossHealth === 0;
  }

  /**
   * check if Object is dead
   * @returns true false
   */
  isDead() {
    return this.energy <= 0;
  }

  chickenDead() {
    return (this.energy = 0);
  }
  /**
   *
   * @param {number} time - time reference for checking the previous hit time
   * @returns returns true false
   */
  isHurt(time) {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < time;
  }

  /**
   * move to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * move to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * play image animation
   * @param {array} images - array of images to be played
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * determine the current position of Object
   * @returns number - current position of the  Object
   */
  objectCurrentPosition() {
    return this.x;
  }

  /**
   * function to make the character jump
   */
  jump() {
    this.speedY = 25;
  }
  /**
   * function to end the game if character is dead or endboss is dead
   */
  gameOver() {
    document.getElementById("game-over").classList.remove("d-none");
  }
}
