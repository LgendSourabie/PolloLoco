let level1;

/**
 * Arrays of objects that are used in the game
 */
function initLevel() {
  level1 = new Level(
    [
      new SmallChicken(950),
      new Chicken(1000),
      new SmallChicken(1100),
      new Chicken(1300),
      new SmallChicken(1250),
      new Chicken(1400),
      new SmallChicken(2 * 950),
      new Chicken(2 * 1000),
      new SmallChicken(2 * 1100),
      new Chicken(2 * 1300),
      new SmallChicken(2 * 1250),
      new Chicken(2 * 1400),
      new SmallChicken(3 * 950),
      new Chicken(3 * 1000),
      new SmallChicken(3 * 1100),
      new Chicken(3 * 1300),
      new SmallChicken(3 * 1250),
      new Chicken(3 * 1400),
      new SmallChicken(4 * 950),
      new Chicken(4 * 1000),
      new SmallChicken(4 * 1100),
      new Chicken(4 * 1300),
      new SmallChicken(4 * 1250),
      new Chicken(4 * 1400),
      new Endboss(5600),
    ],
    [
      new Cloud("img/5_background/layers/4_clouds/1.png", 1100),
      new Cloud("img/5_background/layers/4_clouds/2.png", 1400),
      new Cloud("img/5_background/layers/4_clouds/1.png", 2000),
      new Cloud("img/5_background/layers/4_clouds/2.png", 2500),
      new Cloud("img/5_background/layers/4_clouds/1.png", 3 * 1100),
      new Cloud("img/5_background/layers/4_clouds/2.png", 2 * 1400),
      new Cloud("img/5_background/layers/4_clouds/1.png", 3 * 2000),
      new Cloud("img/5_background/layers/4_clouds/2.png", 2 * 2500),
      new Cloud("img/5_background/layers/4_clouds/1.png", 4 * 2000),
      new Cloud("img/5_background/layers/4_clouds/2.png", 3.5 * 2500),
    ],
    [
      new Bottle(100),
      new Bottle(300),
      new Bottle(550),
      new Bottle(1150),
      new Bottle(1250),
      new Bottle(1950),
      new Bottle(2500),
      new Bottle(3000),
      new Bottle(3250),
      new Bottle(3500),
    ],
    [new Coin(400), new Coin(450), new Coin(500), new Coin(700), new Coin(850), new Coin(1000), new Coin(1500), new Coin(1700), new Coin(2000), new Coin(2250)],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 2 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 3 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 3 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 3 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 4 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 4 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 4 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 4 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 5 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 5 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 5 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 5 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 6 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 6 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 6 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 6 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 7 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 7 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 7 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 7 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 8 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 8 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 8 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 8 * 719),

      new BackgroundObject("img/5_background/layers/air.png", 9 * 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 9 * 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 9 * 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 9 * 719),
    ]
  );
}
