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
      key: "enter_button",
      word: "確認",
      form: { fontSize: 64, fill: "#008cff" }
    },

    exit_button: {
      key: "exit_button",
      word: "返回",
      form: { fontSize: 64, fill: "#008cff" }
    },

    level_buttons: [
      {
        key: "mode_button",
        word: "簡單",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "mode_button",
        word: "一般",
        form: { fontSize: 64, fill: "#008cff" }
      },

      {
        key: "mode_button",
        word: "困難",
        form: { fontSize: 64, fill: "#008cff" }
      }
    ]
  },

  //game_start: {
  //skip_button: {
  //x: 444,
  //y: 36,
  //key: "enter_button",
  //word: "跳過",
  //keycode: Phaser.Keyboard.SPACEBAR
  //}
  //},

  play_scene: {
    target_buttons: [{ key: "target_button" }, { key: "target_button" }, { key: "target_button" }, { key: "target_button" }]
  }
};
