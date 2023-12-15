class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  speed = 0.15;
  otherDirection = false;
  currentImage = 0;
  imageCache = {};
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y <= 125;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  // Collision check
  iscolliding(mov) {
    return this.x + this.width > mov.x && this.y + this.height > mov.y && this.x < mov.x && this.y < mov.y + mov.height;
  }
  /**
   * @param{array} arr-['img1,...]
   *
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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

  jump() {
    this.speedY = 30;
  }
}

// iscolliding(obj){
//   return (this.x+this.y)>=obj.x && this.x<=(obj.x+obj.width) &&
//   (this.y+this.offsetY+this.height) >= obj.y &&
//    (this.y+this.offsetY)<=(obj.y+obj.height) &&
//    obj.onCollisionCourse
// }
