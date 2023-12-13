class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.2;
    }, 1000 / 60);
  }
}
