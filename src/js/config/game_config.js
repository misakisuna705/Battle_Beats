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
  }
};
