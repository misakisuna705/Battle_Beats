const game_config = {
  title: {
    key: "title.png"
  },

  bgv: "bgv.mp4",
  bgm: "bgm.mp3",

  size: {
    width: 1920,
    height: 1080
  },

  scene: {
    game_init: "Game_Init",
    game_login: "Game_Login",
    game_load: "Game_Load",
    main_scene: "Main_Scene",
    hero_scene: "Hero_Scene",
    song_scene: "Song_Scene",
    level_scene: "Level_Scene",
    game_start: "game_start",
    play_scene: "Play_Scene"
  },

  loader: {
    rate: {
      text: "Loading ...   ",
      style: { fill: "white" }
    },

    bg: {
      key: "bg.png"
    },

    progress: "progress.png"
  },

  assets: {
    game: "assets/game/",
    game_load: "assets/game_load/",

    song: {
      cover: "assets/game/song/cover/",
      audio: "assets/game/song/audio/"
    }
  },

  firebase: {
    apiKey: "AIzaSyA9sHPfgh4g_iCWQ4Y6Et8EQLCl78-J-FA",
    authDomain: "battle-beats.firebaseapp.com",
    databaseURL: "https://battle-beats.firebaseio.com",
    projectId: "battle-beats",
    storageBucket: "battle-beats.appspot.com",
    messagingSenderId: "403617795892",
    appId: "1:403617795892:web:f139698f3f2936fe"
  }
};

firebase.initializeApp(game_config.firebase);
