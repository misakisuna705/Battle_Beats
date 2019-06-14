class Song_Infos extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    this.active = 0;
  }
}

class Song_Info extends Phaser.Text {
  constructor({ game }, { x, y, text, style, album }) {
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.setStyle({ fill: "#008cff" });
    this.visible = false;

    this.album = new Img({ game: game, x: game.width / 2, y: (game.height / 16) * 5, key: album });
    this.album.visible = false;
  }
}
