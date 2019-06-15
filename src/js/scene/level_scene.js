class Level_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const BUTTON_CONF = button_config.level_scene;

    this.enter_button = new Button(
      { game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.enter_button
    );

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );
  }

  enter_scene() {
    this.game.state.start("Play_Scene");
  }

  exit_scene() {
    this.game.state.start("Song_Scene");
  }
}
