class Endboss extends MovableObject {
  width = 300;
  height = 348;
  y = 135;
  IMAGES_WALKING = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  world;
  constructor() {
    super().loadImage("../img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 3000;
    // this.x = 4500;
    // this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
    // this.moveLeft();
  }

  animate() {
    // setInterval(() => {
    //   this.moveLeft();
    // }, 500 / 60);

    let i = 0;
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
      // if (this.character.x > 2220 && this.character.x < 3000) {

      //   this.playAnimation(this.IMAGES_ALERT);
      // } else if (this.character.x > 3000) {

      //   this.playAnimation(this.IMAGES_WALKING);
      // }
      // i++;
      // if (world.character.x > 2200) {
      //   i = 0;
      // }
    }, 250);
  }
}
