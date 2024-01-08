class Bottle extends DrawableObject {
  width = 100;
  height = 80;
  index = Math.trunc(Math.random() * 2);

  offset_xPlus = 15;
  offset_xMinus = 20;
  offset_yPlus = 15;
  offset_yMinus = 5;
  IMAGES = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  /**
   *
   * @param {integer} x : position of the bottle on the ground
   */
  constructor(x) {
    super().loadImage(this.IMAGES[this.index]);
    this.x = x + Math.random() * 2000;
    this.y = 340;
  }
}
