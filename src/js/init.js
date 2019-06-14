window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game({ width: 480, height: 640 });

    GAME.state.start("Game_Login");
  },
  false
);
