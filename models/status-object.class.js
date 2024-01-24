class StatusObject extends DrawableObject {
  width = 200;
  height = 60;
  percentage = 100;

  /**
   * set status bar level
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   *
   * @returns value to control the status bar
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 70) {
      return 4;
    } else if (this.percentage > 50) {
      return 3;
    } else if (this.percentage > 30) {
      return 2;
    } else if (this.percentage > 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
