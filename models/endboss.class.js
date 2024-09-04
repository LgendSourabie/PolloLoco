class Endboss extends MovableObject {
  width = 300;
  height = 348;
  energy = 10;
  y = 91;
  endbossHealth = 10;
  speed = 0.2;

  /**
   * these parameters allow an accurate capture of the collision of  character with endboss
   */

  offset_xPlus = 10;
  offset_xMinus = 10;
  offset_yPlus = 10;
  offset_yMinus = 10;

  IMAGES_WALKING = [
    "../assets/4_enemie_boss_chicken/1_walk/G1.png",
    "../assets/4_enemie_boss_chicken/1_walk/G2.png",
    "../assets/4_enemie_boss_chicken/1_walk/G3.png",
    "../assets/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "../assets/4_enemie_boss_chicken/3_attack/G13.png",
    "../assets/4_enemie_boss_chicken/3_attack/G14.png",
    "../assets/4_enemie_boss_chicken/3_attack/G15.png",
    "../assets/4_enemie_boss_chicken/3_attack/G16.png",
    "../assets/4_enemie_boss_chicken/3_attack/G17.png",
    "../assets/4_enemie_boss_chicken/3_attack/G18.png",
    "../assets/4_enemie_boss_chicken/3_attack/G19.png",
    "../assets/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = ["../assets/4_enemie_boss_chicken/4_hurt/G21.png", "../assets/4_enemie_boss_chicken/4_hurt/G22.png", "../assets/4_enemie_boss_chicken/4_hurt/G23.png"];

  IMAGES_DEAD = ["../assets/4_enemie_boss_chicken/5_dead/G24.png", "../assets/4_enemie_boss_chicken/5_dead/G25.png", "../assets/4_enemie_boss_chicken/5_dead/G26.png"];

  IMAGES_ALERT = [
    "../assets/4_enemie_boss_chicken/2_alert/G5.png",
    "../assets/4_enemie_boss_chicken/2_alert/G6.png",
    "../assets/4_enemie_boss_chicken/2_alert/G7.png",
    "../assets/4_enemie_boss_chicken/2_alert/G8.png",
    "../assets/4_enemie_boss_chicken/2_alert/G9.png",
    "../assets/4_enemie_boss_chicken/2_alert/G10.png",
    "../assets/4_enemie_boss_chicken/2_alert/G11.png",
    "../assets/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  world;

  /**
   *
   * @param {number} x - start position of the endboss to be added in the canvas
   */
  constructor(x) {
    super().loadImage("../assets/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.animate();
  }

  /**
   * play animation of the images of endboss
   */
  animate() {
    setInterval(() => {
      if (this.isEndbossDead()) {
        ENDBOSS_DEAD_SOUND.play();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          for (let i = 1; i < 9999; i++) window.clearInterval(i);
        }, 1000 / 25);
        WIN_SOUND.play();
        this.showGameOverWinScreen();
      } else if (this.isEndbossAttack()) {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveBossLeft();
      } else if (this.endbossHealth <= 5) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }

  isEndbossAttack() {
    return this.endbossHealth < 10 && this.endbossHealth >= 6;
  }

  /**
   * move endboss to the left
   */
  moveBossLeft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   *
   * @returns boolean true / false wether endboss should turn right
   */
  shouldTurnRight() {
    return (this.otherDirection = true);
  }

  /**
   *
   * @returns boolean true / false wether endboss should turn left
   */
  shouldTurnLeft() {
    return (this.otherDirection = false);
  }

  /**
   * display the end game screen
   */
  showGameOverWinScreen() {
    document.getElementById("game-over-win").classList.remove("d-none");
    document.getElementById("btn-try-again").classList.remove("d-none");
  }
}
