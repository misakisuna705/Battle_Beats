const config = {
  game: {
    width: 480,
    height: 640
  },

  main_scene: {
    mode_buttons: {
      normal_style: {
        fill: "#008cff"
      },

      active_style: {
        fill: "#ffffff"
      }
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
    }
  },

  song_scene: {
    only_my_railgun: {
      x: 240,
      y: 480,
      text: "only my railgun\n\nfripside\n\ninfinite synthesis",
      album: "infinite_synthesis"
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
  }
};
