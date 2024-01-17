class ThrowableObject extends MovableObject {
  sound_bottle = new Audio("audios/throw.mp3");
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, otherDirection) {
    super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.otherDirection = otherDirection;
    this.loadImages(this.IMAGES_ROTATION);
    this.throw();
  }

  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.lastInteraction = new Date().getTime();
    this.sound_bottle.play();
    document.getElementById("volume-high").addEventListener("click", () => (this.sound_bottle.muted = true));
    setInterval(() => {
      this.x += 14;
      this.animate();
    }, 12);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 200);
  }
}
