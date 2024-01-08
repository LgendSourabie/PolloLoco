class SmallChicken extends MovableObject {
  height = 40;
  width = 40;
  // y = 1;
  y = 370;

  offset_xPlus = 0;
  offset_xMinus = 0;
  offset_yPlus = 0;
  offset_yMinus = 0;

  // y = 360;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  world;
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x + Math.random() * 250;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // small chicken jump every 4 s to make the game more challenging
    setInterval(() => {
      if (!this.isDead()) this.jump();
    }, 4000);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
