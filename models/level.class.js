class Level {
  enemies;
  clouds;
  backgroundObjects;
  // level_end_x = 1890;
  level_end_x = 5500;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
