class Game_Load extends Phaser.State {
  init() {
    const GAME = this.game;

    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);

    GAME.add.image(0, 0, "game_load_title");

    this.loader = new Loader({ game: GAME, x: GAME.width / 2, y: (GAME.height / 8) * 7, text: "Loading ...   " + GAME.load.progress });
  }

  preload() {
    const LOAD = this.game.load;

    LOAD.image("enter_button", "assets/game/enter_button.png");
    LOAD.image("exit_button", "assets/game/exit_button.png");

    LOAD.audio("only_my_railgun.mp3", "assets/game/song/fripside/infinite_synthesis/only_my_railgun.mp3");
    LOAD.audio("senbonzakura.mp3", "assets/game/song/和樂器樂團/VOCALOID之箇中三眛/senbonzakura.mp3");

    LOAD.image("mode_button", "assets/main_scene/mode_button.png");

    LOAD.image("song_button", "assets/song_scene/song_button.png");
    LOAD.image("infinite_synthesis", "assets/song_scene/fripside/infinite_synthesis/infinite_synthesis.png");
    LOAD.image("VOCALOID之箇中三眛", "assets/song_scene/和樂器樂團/VOCALOID之箇中三眛/VOCALOID之箇中三眛.png");

    LOAD.image("level_button", "assets/level_scene/level_button.png");
  }

  create() {
    this.game.active_song = -1;
    this.game.active_level = 0;
  }

  update() {
    const GAME = this.game;

    if (GAME.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
      GAME.state.start("Main_Scene");
    }
  }
}
