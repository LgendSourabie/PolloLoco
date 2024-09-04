class StatusBottle extends DrawableObject {
  IMAGES = [
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * start with 0 % since no bottle collected at the beginning of the game
   */

  percentage = 0;

  /**
   * creation and actualization of the status bar
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }
  /**
   *
   * @param {number} percentage - number used to control the percentage of the status bar
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndexCoinBottle()];
    this.img = this.imageCache[path];
  }
}
