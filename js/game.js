// create a scene
let gameScene = new Phaser.Scene("Game");

gameScene.init = function () {
  // player speed
  this.playerSpeed = 3;
  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 5;

  this.enemyMinY = 80;
  this.enemyMaxY = 280;
};

// load assets
gameScene.preload = function () {
  // load images
  this.load.image("background", "assets/background.png");
  this.load.image("player", "assets/player.png");
  this.load.image("enemy", "assets/dragon.png");
  this.load.image("treasure", "assets/treasure.png");
};

// called once after preload ends
gameScene.create = function () {
  //create bg sprite
  let bg = this.add.sprite(0, 0, "background");

  // change origin to top left corner
  // bg.setOrigin(0, 0);

  // move background to middle of canvas
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;

  bg.setPosition(gameW / 2, gameH / 2);

  // create player
  this.player = this.add.sprite(50, gameH / 2, "player");
  this.player.scale = 0.6;
  console.log(this.player);

  // create an enemy
  this.enemy = this.add.sprite(150, gameH / 2, "enemy");
  this.enemy.flipX = true;
  this.enemy.scale = 0.7;

  // set the enemy speed
  let dir = Math.random() < 0.5 ? 1 : -1;
  let speed =
    this.enemyMinSpeed +
    Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
  this.enemy.speed = dir * speed;
  console.log(speed);
  // this.enemy2 = this.add.sprite(320, 180, "enemy");
  // this.enemy2.flipX = true;
  // this.enemy2.scale = 0.7;

  // this.enemy3 = this.add.sprite(450, 180, "enemy");
  // this.enemy3.flipX = true;
  // this.enemy3.scale = 0.7;

  // create treasure chest
  this.treasure = this.add.sprite(gameW - 80, gameH / 2, "treasure");
  this.treasure.scale = 0.6;
};

//update
gameScene.update = function () {
  // this.enemy1.y -= 0.5;

  // check for active input
  if (this.input.activePointer.isDown) {
    // player walks
    this.player.x += this.playerSpeed;
  }

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.treasure.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log("reached the goal");

    // restart the scene
    this.scene.restart();
    return;
  }

  // enemy movement
  this.enemy.y += this.enemy.speed;

  let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
  let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

  if (conditionUp || conditionDown) {
    this.enemy.speed *= -1;
  }
};

// set config of game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
};

// create a new game and pass the config
let game = new Phaser.Game(config);
