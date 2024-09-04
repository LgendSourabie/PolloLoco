class StatusCoin extends DrawableObject {
  IMAGES = [
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 0;
  /**
   * add status bar fo coin
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * set the value of status bar
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndexCoinBottle()];
    this.img = this.imageCache[path];
  }
}
