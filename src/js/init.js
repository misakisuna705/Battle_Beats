//let song_config = [];

window.addEventListener(
  "DOMContentLoaded",
  () => {
    firebase.initializeApp(firebase_config);

    const GAME = new Game(game_config);
    GAME.state.start("Phaser_Load");
  },
  false
);
