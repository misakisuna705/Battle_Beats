const button_config = {
  game_login: {
    login_button: {
      x: 240,
      y: 560,
      key: "login_button",
      keycode: Phaser.Keyboard.ENTER
    }
  },

  main_scene: {
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
      word: "劇情模式"
    },

    method_button: {
      x: 360,
      y: 240,
      key: "mode_button",
      word: "玩法說明"
    },

    npc_button: {
      x: 360,
      y: 300,
      key: "mode_button",
      word: "角色圖鑑"
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
    }
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

  play_scene: {
    target_buttons: [
      {
        x: 96,
        y: 640,
        key: "target_button",
        keycode: Phaser.Keyboard.D
      },

      {
        x: 192,
        y: 640,
        key: "target_button",
        keycode: Phaser.Keyboard.F
      },

      {
        x: 288,
        y: 640,
        key: "target_button",
        keycode: Phaser.Keyboard.J
      },

      {
        x: 384,
        y: 640,
        key: "target_button",
        keycode: Phaser.Keyboard.K
      }
    ]
  }
};
