class Level_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const BUTTON_CONF = button_config.level_scene;

    this.enter_button = new Button(
      { game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.enter_button
    );

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );

    const LEVEL_BUTTONS = (this.level_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_level, nxt_callback: this.choose_nxt_level, callbackContext: this },
      BUTTON_CONF.level_buttons
    ));

    const NORMAL_STYLE = LEVEL_BUTTONS.normal_style;

    LEVEL_BUTTONS.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_easy_level, callbackContext: this, form: LEVEL_BUTTONS.active_style },
        BUTTON_CONF.easy_level_button
      ),
      new Button({ game: GAME, callback: this.choose_normal_level, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.normal_level_button),
      new Button({ game: GAME, callback: this.choose_hard_level, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.hard_level_button)
    ]);

    this.show_leaderboard();
  }

  show_leaderboard() {
    //new Leader_Score({ game: this.game, x: 40, y: 100, text: "天梯", style: { fill: "#008cff", fontSize: 24 } });
    //let song = song_config[this.game.active_song].info.Title;
    //let level;
    //switch (this.game.active_level) {
    //case 0:
    //level = "easy";
    //break;
    //case 1:
    //level = "normal";
    //break;
    //case 2:
    //level = "hard";
    //break;
    //}
    //let infos = [];
    //leader_board.get_scores(song, level).then(snapshot => {
    //snapshot.forEach(s => {
    //infos.push(s);
    //});
    //infos.sort((l, r) => {
    //return r.val() - l.val();
    //});
    //for (let no = 1; no <= infos.length; no++) {
    //let info = infos[no - 1];
    //new Leader_Score({ game: this.game, x: 40, y: 120 + no * 40, text: info.key + ": " + info.val(), style: { fill: "#008cff", fontSize: 24 } });
    //}
    //});
  }

  enter_scene() {
    const GAME = this.game;
    const ACTIVE_AUDIO = GAME.song_audios[GAME.active_song];

    this.camera.fade(0x000000, 1000, false);

    ACTIVE_AUDIO.fadeOut(1000);
    ACTIVE_AUDIO.onFadeComplete.add(() => {
      GAME.state.start("Game_Start");
    }, this);
  }

  exit_scene() {
    this.game.state.start("Song_Scene");
  }

  choose_pre_level() {
    const LEVEL_BUTTONS = this.level_buttons;
    const LENGTH = LEVEL_BUTTONS.length;

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = (LEVEL_BUTTONS.active - 1 + LENGTH) % LENGTH;
    this.game.active_level = LEVEL_BUTTONS.active;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);
  }

  choose_nxt_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = (LEVEL_BUTTONS.active + 1) % LEVEL_BUTTONS.length;
    this.game.active_level = LEVEL_BUTTONS.active;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);
  }

  choose_easy_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 0;
    this.game.active_level = LEVEL_BUTTONS.active;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);
  }

  choose_normal_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 1;
    this.game.active_level = LEVEL_BUTTONS.active;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);
  }

  choose_hard_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = 2;
    this.game.active_level = LEVEL_BUTTONS.active;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);
  }
}
