class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  level_end_x = 5600;
  /**
   *Represents the objects in the world (here desert)
   * @constructor
   * @param {Array} enemies - chickens in the desert including endboss
   * @param {Array} clouds - moving cloud in the world
   * @param {Array} bottles - bottles on the ground which can be collected for killing enemies
   * @param {Array} coins - precious metals to become rich after winning
   * @param {Array} backgroundObjects - background objects in the world
   */

  constructor(enemies, clouds, bottles, coins, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}
