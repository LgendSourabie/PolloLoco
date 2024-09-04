class Bottle extends DrawableObject {
  width = 100;
  height = 80;
  /**
   * random index for a random selection of image in the IMAGES (at line 11) array
   */
  index = Math.trunc(Math.random() * 2);

  /**
   * these parameters allow an accurate capture of the collision of  character with objects or checkCollisionsBottleEnemies
   */

  offset_xPlus = 15;
  offset_xMinus = 20;
  offset_yPlus = 15;
  offset_yMinus = 5;
  IMAGES = ["../assets/6_salsa_bottle/1_salsa_bottle_on_ground.png", "../assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  /**
   *
   * @param {number} x : position of the bottle on the ground
   */

  constructor(x) {
    super().loadImage(this.IMAGES[this.index]);
    this.x = x + Math.random() * 2000;
    this.y = 340;
  }
}
