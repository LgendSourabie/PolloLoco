class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  chickens_life = 1;
  speedY = 0;
  acceleration = 4;
  energy = 100;
  lastHit = 0;
  endbossHealth = 10;

  offset_xPlus = 0;
  offset_xMinus = 0;
  offset_yPlus = 0;
  offset_yMinus = 0;
  jump_sound = new Audio("audios/jump.mp3");

  applyGravity() {
    setInterval(() => {
      if (this.hasJump()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y > 169 && this instanceof Character) this.y = 169;
        if (this.y > 396 && this instanceof SmallChicken) this.y = 396;
      }
    }, 25);
  }

  hasJump() {
    return this.isAboveGround() || this.speedY > 0;
  }
  hasWalkOnEnemy() {
    return this.isAboveGround() && this.speedY < 0;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof SmallChicken) {
      return this.y <= 396;
    } else {
      return this.y <= 160;
    }
  }

  // Collision check
  // iscolliding(mov, xplus = 0, yplus = 0) {
  //   return this.x + this.width > mov.x + xplus && this.y + this.height > mov.y + yplus && this.x < mov.x && this.y < mov.y + mov.height;
  // }

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

  chickenHit() {
    this.chickens_life -= 1;
    if (this.chickens_life <= 0) {
      this.chickens_life = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isChickenDead() {
    return this.chickens_life === 0;
  }

  isEndbossDead() {
    return this.endbossHealth === 0;
  }

  isDead() {
    return this.energy === 0;
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
    this.speedY = 30;
  }
  gameOver() {
    document.getElementById("game-over").classList.remove("d-none");
  }
}
