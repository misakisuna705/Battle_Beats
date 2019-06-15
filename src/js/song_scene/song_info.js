class Songs extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    this.active = this.game.active_song;
  }
}

class Song_Info extends Phaser.Image {
  constructor({ game, frame }, { x, y, key, Title, Artist, Album }) {
    super(game, x, y, key, frame);

    const GAME = this.game;

    this.anchor.setTo(0.5, 0.5);
    this.visible = false;

    this.title = new Txt({ game: GAME, x: 240, y: 420, text: Title, style: { fill: "#008cff" } });
    this.title.visible = false;

    this.artist = new Txt({ game: GAME, x: 240, y: 480, text: Artist, style: { fill: "#008cff" } });
    this.artist.visible = false;

    this.album = new Txt({ game: GAME, x: 240, y: 540, text: Album, style: { fill: "#008cff" } });
    this.album.visible = false;
  }
}
