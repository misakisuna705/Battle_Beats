class Song_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;
    const CONF = config.song_scene;

    this.songs = new Songs({ game: GAME });
    this.songs.addMultiple([new Song({ game: GAME }, CONF.only_my_railgun)]);

    this.enter_button = new Button({ game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.enter_button);
    this.exit_button = new Button({ game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.exit_button);
  }

  enter_scene() {}

  exit_scene() {
    this.game.state.start("Main_Scene");
  }
}
