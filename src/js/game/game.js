class Game extends Phaser.Game {
  constructor({ width, height, renderer, parent, state, transparent, antialias, physicsConfig }) {
    super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

    const STATE = this.state;

    STATE.add("Game_Login", new Game_Login());
    STATE.add("Game_Load", new Game_Load());
    STATE.add("Main_Scene", new Main_Scene());
    STATE.add("Song_Scene", new Song_Scene());
    STATE.add("Level_Scene", new Level_Scene());
    STATE.add("Play_Scene", new Play_Scene());
  }
}
