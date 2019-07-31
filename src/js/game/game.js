class Game extends Phaser.Game {
  constructor({ width, height, renderer, parent, state, transparent, antialias, physicsConfig }) {
    super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

    const STATE = this.state;
    const SCENE_CONFIG = game_config.scene;

    STATE.add(SCENE_CONFIG.game_init, new Game_Init());
    STATE.add(SCENE_CONFIG.game_load, new Game_Load());
    STATE.add(SCENE_CONFIG.game_login, new Game_Login());
    STATE.add(SCENE_CONFIG.main_scene, new Main_Scene());
    STATE.add(SCENE_CONFIG.hero_scene, new Hero_Scene());
    //general mode
    STATE.add(SCENE_CONFIG.song_scene, new Song_Scene());
    STATE.add(SCENE_CONFIG.level_scene, new Level_Scene());
    STATE.add(SCENE_CONFIG.game_start, new Game_Start());
    STATE.add(SCENE_CONFIG.play_scene, new Play_Scene());
    STATE.add(SCENE_CONFIG.score_scene, new Score_Scene());
  }
}
