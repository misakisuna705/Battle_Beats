window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game(config.game);

    GAME.state.start("Game_Login");
  },
  false
);
