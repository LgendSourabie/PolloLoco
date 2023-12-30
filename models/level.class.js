class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  // level_end_x = 1890;
  level_end_x = 4000;

  constructor(enemies, clouds, bottles, coins, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}
