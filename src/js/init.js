window.addEventListener(
  "DOMContentLoaded",
  () => {
    firebase.initializeApp(config.firebase);

    const GAME = new Game(config.game);
    GAME.state.start("Game_Login");
  },
  false
);
