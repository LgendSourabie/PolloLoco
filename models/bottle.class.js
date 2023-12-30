class Bottle extends DrawableObject {
  width = 100;
  height = 80;
  index = Math.trunc(Math.random() * 2);

  offset_xPlus = 10;
  offset_xMinus = 10;
  offset_yPlus = 10;
  offset_yMinus = 10;
  IMAGES = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor(x) {
    super().loadImage(this.IMAGES[this.index]);
    this.x = x + Math.random() * 2000;
    this.y = 380;
  }
}
