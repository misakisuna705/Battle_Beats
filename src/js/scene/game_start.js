class Game_Start extends Phaser.State {
  create() {
    const GAME = this.game;
    const VIDEO = (this.video = this.add.video("only_my_railgun.mp4"));
    const BUTTON_CONF = button_config.game_start;

    VIDEO.addToWorld(-300, 0, 0, 0, 1, 1);
    VIDEO.play();
    VIDEO.onComplete.add(() => {
      GAME.state.start("Play_Scene");
    }, this);

    this.skip_button = new Button(
      { game: GAME, callback: this.skip_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.skip_button
    );
  }

  skip_scene() {
    this.video.stop();
    this.game.state.start("Play_Scene");
  }
}
