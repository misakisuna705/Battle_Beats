class Play_Scene extends Phaser.State {
  create() {
    //this.bg = new Play_Scene_Background({ game: this.game, x: -260, y: -640, key: "bg", frame: 1 });
    this.bg = new Img({ game: this.game, x: -300, y: -640, key: "bg" });
  }

  update() {
    //this.bg.renew();
  }
}

class Play_Scene_Background extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, key, frame }) {
    super(game, x, y, width, height, key, frame);

    //this.x = -260;
    //this.y = HEIGHT * -1;
    //this.y = 0;
    //
    //this.width = 1087;
    //this.height = HEIGHT * 2;

    this.game.add.existing(this);
  }

  renew() {
    this.tilePosition += 4;
  }
}

class Img extends Phaser.Image {
  constructor({ game, frame, x, y, key }) {
    super(game, x, y, key, frame);

    this.game.add.existing(this);

    //this.anchor.setTo(0.5, 0.5);
  }
}
