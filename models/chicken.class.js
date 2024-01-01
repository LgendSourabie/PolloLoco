class Chicken extends MovableObject {
  height = 60;
  width = 60;
  y = 396;
  // y = 360;

  chicken_sound = new Audio("audios/chicken.mp3");

  offset_xPlus = 20;
  offset_xMinus = 20;
  offset_yPlus = 20;
  offset_yMinus = 20;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  // IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING);

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

  sound_id;
  enableChickenSound() {
    this.sound_id = setInterval(() => {
      this.chicken_sound.play();
    }, 1000);
  }

  muteChickenSound() {
    this.chicken_sound.muted = true;
  }
}
