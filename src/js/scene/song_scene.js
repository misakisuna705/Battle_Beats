class Song_Scene extends Phaser.State {
  create() {
    const GAME = this.game;

    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);

    this.button = [
      new Only_My_Railgun({ game: this.game, x: 360, y: 120, key: "button" }),
      new Song_1({ game: this.game, x: 360, y: 180, key: "button" }),
      new Song_2({ game: this.game, x: 360, y: 240, key: "button" })
    ];
  }

  update() {}
}
