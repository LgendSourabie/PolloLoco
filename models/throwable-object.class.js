class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "../assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../assets/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   *
   * @param {number} x - x coordinate of the current bottle that is added to the game
   * @param {number} y - y coordinate of the current bottle that is added to the game
   * @param {*} otherDirection - specify the direction
   */
  constructor(x, y, otherDirection) {
    super().loadImage("../assets/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.otherDirection = otherDirection;
    this.loadImages(this.IMAGES_ROTATION);
    this.throw();
  }
  /**
   * use to enable bottle throws
   */

  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.lastInteraction = new Date().getTime();
    BOTTLE_SOUND.play();
    setInterval(() => {
      this.x += 14;
      this.animate();
    }, 12);
  }

  /**
   * play the animation of the bottle by going through all images
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 200);
  }
}
