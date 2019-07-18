let song_config = [];

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game(game_config.size);

    GAME.state.start(game_config.scene.game_init);
  },
  false
);
