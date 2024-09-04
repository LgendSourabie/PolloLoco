class SmallChicken extends MovableObject {
  height = 40;
  width = 40;
  y = 370;
  world;

  /**
   * these parameters allow an accurate capture of the collision of  character with objects or enemies
   */
  offset_xPlus = 0;
  offset_xMinus = 0;
  offset_yPlus = 0;
  offset_yMinus = 0;

  IMAGES_WALKING = [
    "../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../assets/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../assets/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["../assets/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   *
   * @param {number} x - start position of small chicken to be added
   */
  constructor(x) {
    super().loadImage("../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x + Math.random() * 250; // current position of small chickens
    this.speed = 0.15 + Math.random() * 0.25; // speed of small chicken when moving towards the character
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.applyGravity();
  }

  /**
   * animates small chicken move left and plays animation
   */
  animate() {
    let interval_ID = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    /**
     * small chicken jump every 4 s to make the game more challenging
     */
    setInterval(() => {
      if (!this.isDead()) this.jump();
    }, 4000);

    let interval_ID2 = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(interval_ID);
        clearInterval(interval_ID2);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
