class Game_Load extends Phaser.State {
  init() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const LOAD = GAME.load;
    const LOADER_CONFIG = game_config.loader;
    const ADD = this.add;
    const BGV = GAME.bgv;
    const BGM = GAME.bgm;

    //==============================new==============================//

    //title
    const TITLE = (this.title = new Img({ game: GAME, x: WIDTH / 2, y: HEIGHT / 8 }, game_config.title));
    //loader
    const LOADING_RATE = (this.loading_rate = new Txt({ game: GAME, x: WIDTH / 2, y: (HEIGHT / 4) * 3 }, LOADER_CONFIG.rate));
    const LOADING_BG = (this.loading_bg = new Img({ game: GAME, x: WIDTH / 2, y: (HEIGHT / 8) * 7 }, LOADER_CONFIG.bg));
    const LOADING_PROGRESS = (this.loading_status = new Phaser.Sprite(
      GAME,
      LOADING_BG.x - LOADING_BG.width / 2,
      LOADING_BG.y - LOADING_BG.height / 2,
      LOADER_CONFIG.progress
    ));

    //==============================add==============================//

    //bgv
    BGV.addToWorld(0, 0, 0, 0, 1, 1);
    //title
    ADD.existing(TITLE);
    //loader
    ADD.existing(LOADING_RATE);
    ADD.existing(LOADING_BG);
    ADD.existing(LOADING_PROGRESS);

    //==============================call==============================//

    //bgv
    BGV.play(true);
    //loader
    LOAD.onFileComplete.add((progress, cacheKey, success, loaded, total) => {
      LOADING_RATE.setText("Loading ...   " + progress + "% ( " + loaded + " / " + total + " )");
    }, this);
    LOAD.onLoadComplete.add(() => {
      GAME.state.start(game_config.scene.game_login);
    }, this);
    //bgm
    BGM.play();
  }

  preload() {
    const LOAD = this.game.load;

    LOAD.setPreloadSprite(this.loading_status);

    //==============================load==============================//

    //game
    LOAD.image("mask.png", "assets/game/mask.png");
    LOAD.image("enter_button", "assets/game/button/enter_button.png");
    LOAD.image("exit_button", "assets/game/button/exit_button.png");
    //song
    for (let i = 0; i < song_size; ++i) {
      LOAD.image(song_config[i].info.key, cover_path + song_config[i].info.key);
      LOAD.audio(song_config[i].AudioFilename, song_path + song_config[i].AudioFilename);
    }
    //hero
    LOAD.spritesheet("Senia", "assets/game/hero/senia.png", 500, 500);
    LOAD.spritesheet("Seti", "assets/game/hero/seti.png", 500, 600);
    LOAD.spritesheet("Rita", "assets/game/hero/rita.png", 500, 500);
    LOAD.spritesheet("Hugo", "assets/game/hero/hugo.png", 500, 500);
    LOAD.spritesheet("Slime", "assets/game/hero/slime.png", 500, 500);
    //game login
    LOAD.image("login_button.png", "assets/game_login/login_button.png");
    //main scene
    LOAD.image("mode_button", "assets/main_scene/mode_button.png");
    //hero scene
    LOAD.image("hero_button", "assets/hero_scene/hero_button.png");
    //song scene
    LOAD.image("song_button", "assets/song_scene/song_button.png");
    //level_scene
    LOAD.image("level_button", "assets/level_scene/level_button.png");
    //game start
    LOAD.video("only_my_railgun.mp4", "assets/game_start/only_my_railgun.mp4");
    //play scene
    LOAD.image("bg_front", "assets/play_scene/bg/bg_front.png");
    LOAD.image("bg_middle", "assets/play_scene/bg/bg_middle.png");
    LOAD.image("bg_back", "assets/play_scene/bg/bg_back.png");

    LOAD.spritesheet("target_button", "assets/play_scene/target_button.png", 100, 50, 2);
    LOAD.image("note", "assets/play_scene/note.png");
    LOAD.image("tail", "assets/play_scene/tail.png");

    LOAD.image("excellent", "assets/play_scene/precision/excellent.png");
    LOAD.image("great", "assets/play_scene/precision/great.png");
    LOAD.image("good", "assets/play_scene/precision/good.png");
    LOAD.image("bad", "assets/play_scene/precision/bad.png");
    LOAD.image("miss", "assets/play_scene/precision/miss.png");
    LOAD.spritesheet("number", "assets/play_scene/combo/number.png", 74, 81);

    LOAD.image("score_board", "assets/play_scene/score/score_board.png");
  }
}
