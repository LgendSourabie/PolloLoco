class SmallChicken extends MovableObject {
  height = 60;
  width = 60;
  // y = 1;
  y = 396;

  // offset_xPlus = 90;
  // offset_xMinus = 90;
  // offset_yPlus = 0;
  // offset_yMinus = 0;
  offset_xPlus = 10;
  offset_xMinus = 10;
  offset_yPlus = 10;
  offset_yMinus = 10;
  // y = 360;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  world;
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x + Math.random() * 250;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // small chicken jump every 4 s to make the game more challenging
    setInterval(() => {
      this.jump();
    }, 4000);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
