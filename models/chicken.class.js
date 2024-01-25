class Chicken extends MovableObject {
  height = 45;
  width = 45;
  y = 365;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   *
   * @param {number} x - start position of chicken to be added
   */
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x + Math.random() * 500; // current position of chickens
    this.speed = 0.15 + Math.random() * 0.25; // speed of chicken when moving towards the character
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.animate();
  }

  /**
   * animate chicken by playing image animation and moving chicken to the left
   */
  animate() {
    let interval_ID = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    let interval_ID2 = setInterval(() => {
      if (this.isDead()) {
        this.loadImage(this.IMAGES_DEAD);
        clearInterval(interval_ID);
        clearInterval(interval_ID2);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
