class Coin extends MovableObject {
  width = 120;
  height = 120;
  offset_xPlus = 20;
  offset_xMinus = 20;
  offset_yPlus = 20;
  offset_yMinus = 20;

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x) {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x + Math.random() * 2000;
    this.y = 155 + Math.random() * 200;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 350);
  }
}
