class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /**
   *
   * @param {string} imagePath - path of the background image to be shown
   * @param {number} x - current position of background object specified with imagePath
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
