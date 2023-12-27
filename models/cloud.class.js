class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor(image) {
    super().loadImage(image);
    this.x = 150 + Math.random() * 900;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
