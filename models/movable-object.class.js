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

  applyGravity() {
    setInterval(() => {
      if (this.hasJump()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 25);
  }

  hasJump() {
    return this.isAboveGround() || this.speedY > 0;
  }
  hasWalkOnEnemy() {
    return this.isAboveGround() && this.speedY <= 0;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof SmallChicken) {
      return this.y <= 370;
    } else {
      return this.y <= 220;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset_xPlus > mo.x + mo.offset_xMinus &&
      this.y + this.height - this.offset_yMinus > mo.y + mo.offset_yPlus &&
      this.x + this.offset_xMinus < mo.x + mo.width - mo.offset_xPlus &&
      this.y + this.offset_yPlus < mo.y + mo.height - mo.offset_yMinus
    );
  }

  hit(lostEnergy) {
    this.energy -= lostEnergy;
    if (this.energy < 20) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  endbossHit() {
    this.endbossHealth -= 1;
    if (this.endbossHealth < 2) {
      this.endbossHealth = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isEndbossDead() {
    return this.endbossHealth === 0;
  }

  isDead() {
    return this.energy <= 0;
  }
  isHurt(time) {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < time;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  objectCurrentPosition() {
    return this.x;
  }

  jump() {
    this.speedY = 25;
  }
  gameOver() {
    document.getElementById("game-over").classList.remove("d-none");
  }
}
