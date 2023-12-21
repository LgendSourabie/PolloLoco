class ThrowableObject extends MovableObject {
  constructor() {
    // super();
    super().loadImage("../img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = 100;
    this.y = 100;
    // this.loadImage();
  }

  trow(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
  }
}
