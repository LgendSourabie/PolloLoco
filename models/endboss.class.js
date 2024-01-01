class Endboss extends MovableObject {
  width = 300;
  height = 348;
  energy = 10;
  y = 135;
  endbossHealth = 10;

  win_sound = new Audio("audios/win.mp3");

  offset_xPlus = 10;
  offset_xMinus = 10;
  offset_yPlus = 10;
  offset_yMinus = 10;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];

  IMAGES_DEAD = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  world;
  constructor(x) {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isEndbossDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          for (let i = 1; i < 9999; i++) window.clearInterval(i);
        }, 1000 / 60);
        this.win_sound.play();
        this.showGameOverWinScreen();
      } else if (this.endbossHealth !== 10) {
        this.playAnimation(this.IMAGES_WALKING);
        setInterval(() => {
          this.moveLeft();
        }, 1000 / 60);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }

  showGameOverWinScreen() {
    document.getElementById("game-over-win").classList.remove("d-none");
    document.getElementById("btn-try-again").classList.remove("d-none");
  }
}
