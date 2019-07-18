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

    //==============================set==============================//

    LEVEL_BUTTONS[this.game.active_level].txt.setStyle(button_config.active_style);

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

    //const LEVEL_BUTTONS = (this.level_buttons = new Buttons(
    //{ game: GAME, pre_callback: this.choose_pre_level, nxt_callback: this.choose_nxt_level, callbackContext: this },
    //BUTTON_CONF.level_buttons
    //));

    //const NORMAL_STYLE = LEVEL_BUTTONS.normal_style;

    //LEVEL_BUTTONS.addMultiple([
    //new Button(
    //{ game: GAME, callback: this.choose_easy_level, callbackContext: this, form: LEVEL_BUTTONS.active_style },
    //BUTTON_CONF.easy_level_button
    //),
    //new Button({ game: GAME, callback: this.choose_normal_level, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.normal_level_button),
    //new Button({ game: GAME, callback: this.choose_hard_level, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.hard_level_button)
    //]);

    //new Leader_Score({ game: this.game, x: 40, y: 100, text: "天梯", style: { fill: "#008cff", fontSize: 24 } });

    //this.easy_infos = [];
    //this.easy_leaderboard = [];
    //leader_board.get_scores(song_config[this.game.active_song].info.Title, "easy").then(snapshot => {
    //snapshot.forEach(s => {
    //this.easy_infos.push(s);
    //});

    //this.easy_infos.sort((l, r) => {
    //return r.val() - l.val();
    //});

    //for (let i = 0; i < this.easy_infos.length; i++) {
    //this.easy_leaderboard[i] = new Leader_Score({
    //game: this.game,
    //x: 40,
    //y: 120 + i * 40,
    //text: this.easy_infos[i].key + ": " + this.easy_infos[i].val(),
    //style: { fill: "#008cff", fontSize: 24 }
    //});
    //this.easy_leaderboard[i].visible = true;
    //}
    //});

    //this.normal_infos = [];
    //this.normal_leaderboard = [];
    //leader_board.get_scores(song_config[this.game.active_song].info.Title, "normal").then(snapshot => {
    //snapshot.forEach(s => {
    //this.normal_infos.push(s);
    //});

    //this.normal_infos.sort((l, r) => {
    //return r.val() - l.val();
    //});

    //for (let i = 0; i < this.normal_infos.length; i++) {
    //this.normal_leaderboard[i] = new Leader_Score({
    //game: this.game,
    //x: 40,
    //y: 120 + i * 40,
    //text: this.normal_infos[i].key + ": " + this.normal_infos[i].val(),
    //style: { fill: "#008cff", fontSize: 24 }
    //});
    //}
    //});

    //this.hard_infos = [];
    //this.hard_leaderboard = [];
    //leader_board.get_scores(song_config[this.game.active_song].info.Title, "hard").then(snapshot => {
    //snapshot.forEach(s => {
    //this.hard_infos.push(s);
    //});

    //this.hard_infos.sort((l, r) => {
    //return r.val() - l.val();
    //});

    //for (let i = 0; i < this.hard_infos.length; i++) {
    //this.hard_leaderboard[i] = new Leader_Score({
    //game: this.game,
    //x: 40,
    //y: 120 + i * 40,
    //text: this.hard_infos[i].key + ": " + this.hard_infos[i].val(),
    //style: { fill: "#008cff", fontSize: 24 }
    //});
    //}
    //});

    //this.infos = [this.easy_leaderboard, this.normal_leaderboard, this.hard_leaderboard];
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
    const LENGTH = LEVEL_BUTTONS.length;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.normal_style);

    GAME.active_level = btn.idx;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.active_style);
  }

  tour_level(key) {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;
    const LEVEL_BUTTONS = this.level_buttons;
    const LENGTH = LEVEL_BUTTONS.length;

    LEVEL_BUTTONS[GAME.active_level].txt.setStyle(button_config.normal_style);

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
  }

  choose_pre_level() {
    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }
  }

  choose_nxt_level() {
    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }
  }

  choose_easy_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 0;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }

    this.game.active_level = LEVEL_BUTTONS.active;
  }

  choose_normal_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 1;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }

    this.game.active_level = LEVEL_BUTTONS.active;
  }

  choose_hard_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 2;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }

    this.game.active_level = LEVEL_BUTTONS.active;
  }
}
