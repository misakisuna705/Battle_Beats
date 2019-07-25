class Game_Init extends Phaser.State {
  init() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  preload() {
    const LOAD = this.game.load;

    const TITLE_CONFIG = game_config.title.key;
    const BGV_CONFIG = game_config.bgv;
    const BGM_CONFIG = game_config.bgm;

    const LOADER_CONFIG = game_config.loader;
    const LOADER_BG_CONFIG = LOADER_CONFIG.bg.key;
    const LOADER_PROGRESS_CONFIG = LOADER_CONFIG.progress;

    const ASSETS_CONFIG = game_config.assets;
    const GAME_ASSETS_CONFIG = ASSETS_CONFIG.game;
    const GAME_LOAD_ASSETS_CONFIG = ASSETS_CONFIG.game_load;

    //==============================load==============================//

    //game

    //bgv
    LOAD.video(BGV_CONFIG, GAME_ASSETS_CONFIG + BGV_CONFIG);
    //title
    LOAD.image(TITLE_CONFIG, GAME_ASSETS_CONFIG + TITLE_CONFIG);
    //bgm
    LOAD.audio(BGM_CONFIG, GAME_ASSETS_CONFIG + BGM_CONFIG);

    //game_load

    //loader
    LOAD.image(LOADER_BG_CONFIG, GAME_LOAD_ASSETS_CONFIG + LOADER_BG_CONFIG);
    LOAD.image(LOADER_PROGRESS_CONFIG, GAME_LOAD_ASSETS_CONFIG + LOADER_PROGRESS_CONFIG);
  }

  create() {
    const GAME = this.game;

    //==============================new==============================//

    //bgv
    const BGV = (GAME.bgv = new Phaser.Video(GAME, game_config.bgv));
    //bgm
    const BGM = (GAME.bgm = GAME.sound.add(game_config.bgm, 1, true));
    //song
    GAME.songs = [];
    //active song
    GAME.active_song = -1;
    //active level
    GAME.active_level = 0;

    //==============================call==============================//

    //bgv
    BGV.play(true);
    //bgm
    BGM.play();

    GAME.state.start(game_config.scene.game_load);
  }
}
