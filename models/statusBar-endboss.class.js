class StatusEndboss extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 10;
  /**
   * Add status bar for the endboss
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 410;
    this.y = 5;
    this.width = 200;
    this.height = 60;
    this.setPercentage(10);
  }

  /**
   * set percentage for the status bar
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * control current value of status bar
   */
  resolveImageIndex() {
    if (this.percentage === 10) {
      return 5;
    } else if (this.percentage >= 8) {
      return 4;
    } else if (this.percentage >= 6) {
      return 3;
    } else if (this.percentage >= 4) {
      return 2;
    } else if (this.percentage >= 2) {
      return 1;
    } else {
      return 0;
    }
  }
}
