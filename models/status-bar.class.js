class StatusBar extends DrawableObject {
  IMAGES = [
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../assets/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * add status bar for Character
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
  /**
   * set current status bar of the character
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   *
   * @returns value to control status bar of the character
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
