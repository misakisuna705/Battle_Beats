class Level_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const BUTTON_CONF = button_config.level_scene;
    const LEVEL_BUTTONS_CONF = BUTTON_CONF.level_buttons;
    const LEVEL_BUTTONS_LENGTH = LEVEL_BUTTONS_CONF.length;

    //==============================new==============================//

    //enter button
    const ENTER_BUTTON = (this.enter_button = new Button({ game: GAME, x: (WIDTH / 16) * 15, y: (HEIGHT / 16) * 15 }, BUTTON_CONF.enter_button));
    //exit button
    const EXIT_BUTTON = (this.exit_button = new Button({ game: GAME, x: WIDTH / 16, y: HEIGHT / 16 }, BUTTON_CONF.exit_button));
    //level button
    const LEVEL_BUTTONS = (this.level_buttons = []);

    for (let i = 0; i < LEVEL_BUTTONS_LENGTH; ++i) {
      LEVEL_BUTTONS[i] = new Button({ game: GAME, x: (WIDTH / 4) * 3, y: (HEIGHT / 8) * (i + 1), idx: i }, LEVEL_BUTTONS_CONF[i]);
    }
    const TITLE = (this.title = new Article({ game: GAME, x: WIDTH / 8, y: HEIGHT / 4 }, { text: "天梯", style: { fontSize: 64, fill: "#008cff" } }));
    //enter key
    const ENTER_KEY = (this.enter_key = KEYBOARD.addKey(KEYCODE.ENTER));
    //esc key
    const ESC_KEY = (this.esc_key = KEYBOARD.addKey(KEYCODE.ESC));
    //up key
    const UP_KEY = (this.up_key = KEYBOARD.addKey(KEYCODE.UP));
    //down key
    const DOWN_KEY = (this.down_key = KEYBOARD.addKey(KEYCODE.DOWN));

    //==============================add==============================//

    //enter button
    ADD.existing(ENTER_BUTTON);
    ADD.existing(ENTER_BUTTON.txt);
    //exit button
    ADD.existing(EXIT_BUTTON);
    ADD.existing(EXIT_BUTTON.txt);
    //level button
    for (let i = 0; i < LEVEL_BUTTONS_LENGTH; ++i) {
      ADD.existing(LEVEL_BUTTONS[i]);
      ADD.existing(LEVEL_BUTTONS[i].txt);
    }
    //title
    ADD.existing(TITLE);

    //==============================set==============================//

    LEVEL_BUTTONS[this.game.active_level].txt.setStyle(button_config.active_style);
    TITLE.visible = true;

    //==============================call==============================//

    //enter button
    ENTER_BUTTON.onInputDown.add(this.enter_scene, this);
    //exit button
    EXIT_BUTTON.onInputDown.add(this.exit_scene, this);
    //level button
    for (let i = 0; i < LEVEL_BUTTONS_LENGTH; ++i) {
      LEVEL_BUTTONS[i].onInputDown.add(this.select_level, this);
    }
    //enter key
    ENTER_KEY.onDown.add(this.enter_scene, this);
    //esc key
    ESC_KEY.onDown.add(this.exit_scene, this);
    //up key
    UP_KEY.onDown.add(this.tour_level, this);
    //down key
    DOWN_KEY.onDown.add(this.tour_level, this);

    //==============================rank==============================//

    const RANKS = (this.ranks = []);

    for (let i = 0; i < LEVEL_BUTTONS_LENGTH; ++i) {
      this.get_ranks(i).then(snapshot => {
        let arr = [];

        snapshot.forEach(shot => {
          arr.push(shot);
        });

        arr.reverse();

        const LENGTH = arr.length;

        //==============================new==============================//

        RANKS[i] = [];
        for (let j = 0; j < LENGTH; ++j) {
          RANKS[i][j] = new Article(
            { game: GAME, x: WIDTH / 8, y: (HEIGHT / 8) * (j + 3) },
            { text: arr[j].key + ": " + arr[j].val(), style: { fontSize: 64, fill: "#008cff" } }
          );

          //==============================add==============================//

          ADD.existing(RANKS[i][j]);

          //==============================set==============================//

          if (i == 0) {
            RANKS[i][j].visible = true;
          }
        }
      });
    }
  }

  enter_scene() {
    const GAME = this.game;
    const ACTIVE = GAME.songs[GAME.active_song];

    GAME.songs[GAME.active_song].stop();

    this.camera.fade(0x000000, 1000, false);

    ACTIVE.fadeOut(1000);
    ACTIVE.onFadeComplete.add(() => {
      //GAME.state.start("Game_Start");
    }, this);
  }

  exit_scene() {
    this.game.state.start("Song_Scene");
  }

  select_level(btn) {
    const GAME = this.game;
    const LEVEL_BUTTONS = this.level_buttons;
    const RANKS = this.ranks;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.normal_style);

    for (let i = 0; i < RANKS[GAME.active_level].length; ++i) {
      RANKS[GAME.active_level][i].visible = false;
    }

    GAME.active_level = btn.idx;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.active_style);

    for (let i = 0; i < RANKS[GAME.active_level].length; ++i) {
      RANKS[GAME.active_level][i].visible = true;
    }
  }

  tour_level(key) {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;
    const LEVEL_BUTTONS = this.level_buttons;
    const LENGTH = LEVEL_BUTTONS.length;
    const RANKS = this.ranks;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.normal_style);

    for (let i = 0; i < RANKS[GAME.active_level].length; ++i) {
      RANKS[GAME.active_level][i].visible = false;
    }

    switch (key.keyCode) {
      case KEYCODE.UP:
        GAME.active_level = (GAME.active_level - 1 + LENGTH) % LENGTH;
        break;

      case KEYCODE.DOWN:
        GAME.active_level = (GAME.active_level + 1) % LENGTH;
        break;

      default:
        break;
    }

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.active_style);

    for (let i = 0; i < RANKS[GAME.active_level].length; ++i) {
      RANKS[GAME.active_level][i].visible = true;
    }
  }

  get_ranks(level) {
    const DB = firebase.database();

    switch (level) {
      case 0:
        return DB.ref("/leaderboard/" + song_config[this.game.active_song].title + "/easy/")
          .orderByValue()
          .limitToLast(5)
          .once("value");
        break;

      case 1:
        return DB.ref("/leaderboard/" + song_config[this.game.active_song].title + "/normal/")
          .orderByValue()
          .limitToLast(5)
          .once("value");
        break;

      case 2:
        return DB.ref("/leaderboard/" + song_config[this.game.active_song].title + "/hard/")
          .orderByValue()
          .limitToLast(5)
          .once("value");
        break;

      default:
        break;
    }
  }
}
