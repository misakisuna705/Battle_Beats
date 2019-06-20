class Game_Load extends Phaser.State {
  init() {
    const GAME = this.game;

    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);

    GAME.add.image(0, 0, "game_load_title");

    this.loader = new Loader({ game: GAME, x: GAME.width / 2, y: (GAME.height / 8) * 7, text: "Loading ...   " + GAME.load.progress });
  }

  preload() {
    const LOAD = this.game.load;

    //game

    LOAD.image("enter_button", "assets/game/enter_button.png");
    LOAD.image("exit_button", "assets/game/exit_button.png");

    //song

    for (let i = 0; i < song_size; ++i) {
      LOAD.image(song_config[i].info.key, cover_path + song_config[i].info.key);
      LOAD.audio(song_config[i].AudioFilename, song_path + song_config[i].AudioFilename);
    }

    //npc

    LOAD.spritesheet("Senia", "assets/game/npc/senia.png", 500, 500);
    LOAD.spritesheet("Seti", "assets/game/npc/seti.png", 500, 600);
    LOAD.spritesheet("Rita", "assets/game/npc/rita.png", 500, 500);
    LOAD.spritesheet("Hugo", "assets/game/npc/hugo.png", 500, 500);

    //main scene

    LOAD.image("mode_button", "assets/main_scene/mode_button.png");

    //song scene

    LOAD.image("song_button", "assets/song_scene/song_button.png");

    //level_scene

    LOAD.image("level_button", "assets/level_scene/level_button.png");

    //game start

    LOAD.video("only_my_railgun.mp4", "assets/game_start/only_my_railgun.mp4");

    //play scene

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
