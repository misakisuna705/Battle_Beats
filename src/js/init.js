let song_config = [];
const song_size = 3;
const song_path = "assets/game/song/audio/";
const cover_path = "assets/game/song/cover/";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game(game_config);

    GAME.state.start("Game_Login");
  },
  false
);
