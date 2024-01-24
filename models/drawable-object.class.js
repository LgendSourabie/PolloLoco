class DrawableObject {
  img;
  currentImage = 0;
  imageCache = {};
  x = 120;
  y = 220;
  height = 150;
  width = 100;

  /**
   * load single image to be displayed the canvas
   * @param {string} path - of single image to be drawn
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * draw images in the canvas according to coordinates
   * @param {object} ctx - 2D context object
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * load images in an array to be displayed in the canvas
   * @param {array} arr - of images of status bar to be displayed according to percentage
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   *
   * @returns the percentage to display on the status bar
   */

  resolveImageIndexCoinBottle() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
