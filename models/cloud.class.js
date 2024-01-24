class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  /**
   *
   * @param {string} image - path of the image to be displayed
   * @param {number} x - start position of the image to be add in canvas
   */
  constructor(image, x) {
    super().loadImage(image);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  /**
   *  play animation of clouds in the sky - moving to the left
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
