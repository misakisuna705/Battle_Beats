let song_config = [];

firebase.initializeApp({
  apiKey: "AIzaSyA9sHPfgh4g_iCWQ4Y6Et8EQLCl78-J-FA",
  authDomain: "battle-beats.firebaseapp.com",
  databaseURL: "https://battle-beats.firebaseio.com",
  projectId: "battle-beats",
  storageBucket: "battle-beats.appspot.com",
  messagingSenderId: "403617795892",
  appId: "1:403617795892:web:f139698f3f2936fe"
});

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game(game_config.size);

    GAME.state.start(game_config.scene.game_init);
  },
  false
);
