class Game_Load extends Phaser.State {
  init() {
    const GAME = this.game;

    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);

    GAME.add.image(0, 0, "game_load_title");

    this.loader = new Loader({ game: GAME, x: GAME.width / 2, y: (GAME.height / 8) * 7, text: "Loading ...   " + GAME.load.progress });
  }

  preload() {
    const LOAD = this.game.load;

    for (let i = 0; i < song_size; ++i) {
      LOAD.image(song_config[i].info.key, cover_path + song_config[i].info.key);
      LOAD.audio(song_config[i].AudioFilename, song_path + song_config[i].AudioFilename);
    }

    LOAD.image("enter_button", "assets/game/enter_button.png");
    LOAD.image("exit_button", "assets/game/exit_button.png");
    LOAD.image("mode_button", "assets/main_scene/mode_button.png");
    LOAD.image("song_button", "assets/song_scene/song_button.png");
    LOAD.image("level_button", "assets/level_scene/level_button.png");
    LOAD.video("only_my_railgun.mp4", "assets/game_start/only_my_railgun.mp4");
    LOAD.image("bg", "assets/play_scene/bg.png");
    LOAD.image("target_button", "assets/play_scene/target_button.png");
    LOAD.image("note", "assets/play_scene/note.png");
    LOAD.image("tail", "assets/play_scene/tail.png");
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
