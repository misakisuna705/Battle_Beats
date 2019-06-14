class Song_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;

    this.songs = new Songs({ game: GAME });

    this.songs.addMultiple([
      new Song(
        { game: GAME, x: GAME.width / 2, y: (GAME.height / 4) * 3, text: "only my railgun\n\nfripside\n\ninfinite synthesis" },
        {
          album: "infinite_synthesis"
        }
      )
    ]);

    this.enter_button = new Button(
      { game: GAME, x: 444, y: 604, key: "enter_button", callback: this.enter_scene, callbackContext: this },
      { word: "確認", form: { fill: "#008cff" }, keycode: KEYCODE.ENTER }
    );

    this.exit_button = new Button(
      { game: GAME, x: 36, y: 36, key: "exit_button", callback: this.exit_scene, callbackContext: this },
      { word: "返回", form: { fill: "#008cff" }, keycode: KEYCODE.ESC }
    );
  }

  enter_scene() {}

  exit_scene() {
    this.game.state.start("Main_Scene");
  }
}
