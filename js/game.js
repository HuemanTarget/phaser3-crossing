// create a scene
let gameScene = new Phaser.Scene("Game");

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
  this.player = this.add.sprite(50, 180, "player");
  this.player.scale = 0.6;
  console.log(this.player);

  // create an enemy
  this.enemy1 = this.add.sprite(175, 180, "enemy");
  this.enemy1.flipX = true;
  this.enemy1.scale = 0.7;

  this.enemy2 = this.add.sprite(320, 180, "enemy");
  this.enemy2.flipX = true;
  this.enemy2.scale = 0.7;

  this.enemy3 = this.add.sprite(450, 180, "enemy");
  this.enemy3.flipX = true;
  this.enemy3.scale = 0.7;

  // create treasure chest
  this.treasure = this.add.sprite(550, 180, "treasure");
  this.treasure.scale = 0.6;
};


//update
gameScene.update = function () {
  // this.enemy1.y -= 0.5;
  if(this.enemy1.scale < 2){
    this.enemy1.scale += 0.01
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
