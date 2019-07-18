const button_config = {
  normal_style: {
    fontSize: 64,
    fill: "#008cff"
  },

  active_style: {
    fontSize: 64,
    fill: "#ffffff"
  },

  game_login: {
    login_button: {
      key: "login_button.png"
    }
  },

  main_scene: {
    enter_button: {
      key: "enter_button",
      word: "確認",
      form: { fontSize: 64, fill: "#008cff" }
    },

    exit_button: {
      key: "exit_button",
      word: "登出",
      form: { fontSize: 64, fill: "#008cff" }
    },

    mode_buttons: [
      {
        key: "mode_button",
        word: "一般模式",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "mode_button",
        word: "劇情模式",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "mode_button",
        word: "玩法說明",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "mode_button",
        word: "角色圖鑑",
        form: { fontSize: 64, fill: "#008cff" }
      }
    ]
  },

  hero_scene: {
    //enter_button: {
    //x: 444,
    //y: 604,
    //key: "enter_button",
    //word: "確認",
    //keycode: Phaser.Keyboard.ENTER
    //},

    exit_button: {
      key: "exit_button",
      word: "返回",
      form: { fontSize: 64, fill: "#008cff" }
    },

    hero_buttons: [
      {
        key: "song_button",
        word: "上一位",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "song_button",
        word: "下一位",
        form: { fontSize: 64, fill: "#008cff" }
      }
    ]
  },

  song_scene: {
    enter_button: {
      key: "enter_button",
      word: "確認",
      form: { fontSize: 64, fill: "#008cff" }
    },

    exit_button: {
      key: "exit_button",
      word: "返回",
      form: { fontSize: 64, fill: "#008cff" }
    },

    song_buttons: [
      {
        key: "song_button",
        word: "上一首",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "song_button",
        word: "下一首",
        form: { fontSize: 64, fill: "#008cff" }
      }
    ]
  },

  level_scene: {
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

    level_buttons: {
      normal_style: {
        fill: "#008cff"
      },
      active_style: {
        fill: "#ffffff"
      },

      pre_keycode: Phaser.Keyboard.UP,
      nxt_keycode: Phaser.Keyboard.DOWN
    },

    easy_level_button: {
      x: 360,
      y: 120,
      key: "mode_button",
      word: "簡單"
    },

    normal_level_button: {
      x: 360,
      y: 180,
      key: "mode_button",
      word: "一般"
    },

    hard_level_button: {
      x: 360,
      y: 240,
      key: "mode_button",
      word: "困難"
    }
  },

  game_start: {
    skip_button: {
      x: 444,
      y: 36,
      key: "enter_button",
      word: "跳過",
      keycode: Phaser.Keyboard.SPACEBAR
    }
  },

  play_scene: {
    target_buttons: [
      {
        x: 96,
        y: 560,
        key: "target_button",
        keycode: Phaser.Keyboard.D
      },

      {
        x: 192,
        y: 560,
        key: "target_button",
        keycode: Phaser.Keyboard.F
      },

      {
        x: 288,
        y: 560,
        key: "target_button",
        keycode: Phaser.Keyboard.J
      },

      {
        x: 384,
        y: 560,
        key: "target_button",
        keycode: Phaser.Keyboard.K
      }
    ]
  }
};
