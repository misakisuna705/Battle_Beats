const config = {
  firebase: {
    apiKey: "AIzaSyA9sHPfgh4g_iCWQ4Y6Et8EQLCl78-J-FA",
    authDomain: "battle-beats.firebaseapp.com",
    databaseURL: "https://battle-beats.firebaseio.com",
    projectId: "battle-beats",
    storageBucket: "battle-beats.appspot.com",
    messagingSenderId: "403617795892",
    appId: "1:403617795892:web:f139698f3f2936fe"
  },

  game: {
    width: 480,
    height: 640
  },

  game_login: {
    login_button: {
      x: 240,
      y: 560,
      key: "login_button",
      keycode: Phaser.Keyboard.ENTER
    }
  },

  main_scene: {
    mode_buttons: {
      normal_style: {
        fill: "#008cff"
      },
      active_style: {
        fill: "#ffffff"
      },

      pre_keycode: Phaser.Keyboard.UP,
      nxt_keycode: Phaser.Keyboard.DOWN
    },

    general_mode_button: {
      x: 360,
      y: 120,
      key: "mode_button",
      word: "一般模式"
    },

    story_mode_button: {
      x: 360,
      y: 180,
      key: "mode_button",
      word: "故事模式"
    },

    method_button: {
      x: 360,
      y: 240,
      key: "mode_button",
      word: "玩法說明"
    },

    enter_button: {
      x: 444,
      y: 604,
      key: "enter_button",
      word: "確認",
      keycode: Phaser.Keyboard.ENTER
    },

    exit_button: {
      x: 36,
      y: 36,
      key: "exit_button",
      word: "登出",
      keycode: Phaser.Keyboard.ESC
    },

    general_mode_article: {
      x: 80,
      y: 120,
      text: "aaa\n" + "aaa\n" + "aaa\n" + "aaa",
      style: { fill: "#008cff" }
    },

    story_mode_article: {
      x: 80,
      y: 120,
      text: "bbb\n" + "bbb\n" + "bbb\n" + "bbb",
      style: { fill: "#008cff" }
    },

    method_article: {
      x: 80,
      y: 120,
      text: "ccc\n" + "ccc\n" + "ccc\n" + "ccc",
      style: { fill: "#008cff" }
    }
  },

  song_scene: {
    song_buttons: {
      normal_style: {
        fill: "#008cff"
      },
      active_style: {
        fill: "#ffffff"
      },

      pre_keycode: Phaser.Keyboard.LEFT,
      nxt_keycode: Phaser.Keyboard.RIGHT
    },

    left_song_button: {
      x: 48,
      y: 180,
      key: "song_button",
      word: "上一首"
    },

    right_song_button: {
      x: 432,
      y: 180,
      key: "song_button",
      word: "下一首"
    },

    enter_button: {
      x: 444,
      y: 604,
      key: "enter_button",
      word: "確認",
      keycode: Phaser.Keyboard.ENTER
    },

    exit_button: {
      x: 36,
      y: 36,
      key: "exit_button",
      word: "返回",
      keycode: Phaser.Keyboard.ESC
    },

    only_my_railgun: {
      x: 240,
      y: 480,
      text: "only my railgun\n\nfripside\n\ninfinite synthesis",
      album: "infinite_synthesis"
    },

    senbonzakura: {
      x: 240,
      y: 480,
      text: "千本櫻\n\n和樂器樂團\n\nVOCALOID之箇中三眛",
      album: "VOCALOID之箇中三眛"
    }
  }
};
