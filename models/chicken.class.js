class Chicken extends MovableObject {
  height = 60;
  width = 60;
  y = 396;
  // y = 360;
  chicken_sound = new Audio("audios/chicken.mp3");
  offset_xPlus = 20;
  offset_xMinus = 20;
  offset_yPlus = 5;
  offset_yMinus = 5;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);
    setInterval(() => {
      this.chicken_sound.play();
    }, 1000);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
