class Character extends MovableObject {
  width = 100;
  height = 200;
  speed = 10;
  world;
  lastMovePepe = 0;

  /**
   * these parameters allow an accurate capture of the collision of  character with objects or enemies
   */

  offset_xPlus = 35;
  offset_xMinus = 35;
  offset_yPlus = 110;
  offset_yMinus = 5;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_SHORT_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_IDLE = [...this.IMAGES_SHORT_IDLE, ...this.IMAGES_LONG_IDLE, ...this.IMAGES_LONG_IDLE];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  /**
   * loads images when the character is added to canvas
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.applyGravity();
  }

  /**
   * play image animations according to the current situation
   */
  animate() {
    setInterval(() => {
      PEPE_WALKING_SOUND.pause();
      if (this.isKeyRightPressed()) {
        this.moveRight();
        this.otherDirection = false;
        PEPE_WALKING_SOUND.play();
      }
      if (this.isKeyLeftPressed()) {
        this.moveLeft();
        this.otherDirection = true;
        PEPE_WALKING_SOUND.play();
      }
      if (this.isKeyUPPressed() && !this.isAboveGround()) {
        this.jump();
        JUMP_SOUND.play();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
    this.allCharacterAnimation();
  }

  /**
   * play animation conditionally every 0.2 second
   */
  allCharacterAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.lostGame();
        this.showGameLostScreen();
      } else if (this.isHurt(1)) {
        this.playAnimation(this.IMAGES_HURT);
        this.lastMovePepe = new Date().getTime();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastMovePepe = new Date().getTime();
      } else if (this.isIdling()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }
    }, 200);
  }

  /**
   * lost game when character is dead
   */
  lostGame() {
    this.playAnimation(this.IMAGES_DEAD);
    PEPE_DEAD_SOUND.play();
    setTimeout(() => {
      for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }, 1000);
  }

  /**
   * check if key RIGHT is pressed
   */
  isKeyRightPressed() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }
  /**
   * check if key LEFT is pressed
   */
  isKeyLeftPressed() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  isKeyUPPressed() {
    return this.world.keyboard.SPACE || this.world.keyboard.UP;
  }

  /**
   * check if the character is thinking about how to get out of the dessert without being killed
   * @returns boolean - true or false
   */

  isThinking() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.D && !this.world.keyboard.SPACE;
  }

  isIdling() {
    let timepassed = new Date().getTime() - this.lastMovePepe;
    timepassed = timepassed / 2000;
    return timepassed > 1.5;
  }

  /**
   * Show the end screen when character is dead
   */
  showGameLostScreen() {
    document.getElementById("game-over-lost").classList.remove("d-none");
    document.getElementById("btn-try-again").classList.remove("d-none");
  }
}
