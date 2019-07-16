let song_config = [];
const song_size = 3;
const song_path = "assets/game/song/audio/";
const cover_path = "assets/game/song/cover/";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game(game_config.size);

    GAME.state.start(game_config.scene.game_init);
  },
  false
);
