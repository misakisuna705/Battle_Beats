class Level_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
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

    new Leader_Score({ game: this.game, x: 40, y: 100, text: "天梯", style: { fill: "#008cff", fontSize: 24 } });

    this.easy_infos = [];
    this.easy_leaderboard = [];
    leader_board.get_scores(song_config[this.game.active_song].info.Title, "easy").then(snapshot => {
      snapshot.forEach(s => {
        this.easy_infos.push(s);
      });

      this.easy_infos.sort((l, r) => {
        return r.val() - l.val();
      });

      for (let i = 0; i < this.easy_infos.length; i++) {
        this.easy_leaderboard[i] = new Leader_Score({
          game: this.game,
          x: 40,
          y: 120 + i * 40,
          text: this.easy_infos[i].key + ": " + this.easy_infos[i].val(),
          style: { fill: "#008cff", fontSize: 24 }
        });
        this.easy_leaderboard[i].visible = true;
      }
    });

    this.normal_infos = [];
    this.normal_leaderboard = [];
    leader_board.get_scores(song_config[this.game.active_song].info.Title, "normal").then(snapshot => {
      snapshot.forEach(s => {
        this.normal_infos.push(s);
      });

      this.normal_infos.sort((l, r) => {
        return r.val() - l.val();
      });

      for (let i = 0; i < this.normal_infos.length; i++) {
        this.normal_leaderboard[i] = new Leader_Score({
          game: this.game,
          x: 40,
          y: 120 + i * 40,
          text: this.normal_infos[i].key + ": " + this.normal_infos[i].val(),
          style: { fill: "#008cff", fontSize: 24 }
        });
      }
    });

    this.hard_infos = [];
    this.hard_leaderboard = [];
    leader_board.get_scores(song_config[this.game.active_song].info.Title, "hard").then(snapshot => {
      snapshot.forEach(s => {
        this.hard_infos.push(s);
      });

      this.hard_infos.sort((l, r) => {
        return r.val() - l.val();
      });

      for (let i = 0; i < this.hard_infos.length; i++) {
        this.hard_leaderboard[i] = new Leader_Score({
          game: this.game,
          x: 40,
          y: 120 + i * 40,
          text: this.hard_infos[i].key + ": " + this.hard_infos[i].val(),
          style: { fill: "#008cff", fontSize: 24 }
        });
      }
    });

    this.infos = [this.easy_leaderboard, this.normal_leaderboard, this.hard_leaderboard];
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

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = (LEVEL_BUTTONS.active - 1 + LENGTH) % LENGTH;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }

    this.game.active_level = LEVEL_BUTTONS.active;
  }

  choose_nxt_level() {
    const LEVEL_BUTTONS = this.level_buttons;

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = false;
    }

    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.normal_style);
    LEVEL_BUTTONS.active = (LEVEL_BUTTONS.active + 1) % LEVEL_BUTTONS.length;
    LEVEL_BUTTONS.getAt(LEVEL_BUTTONS.active).text.setStyle(LEVEL_BUTTONS.active_style);

    for (let i = 0; i < this.infos[LEVEL_BUTTONS.active].length; i++) {
      this.infos[LEVEL_BUTTONS.active][i].visible = true;
    }

    this.game.active_level = LEVEL_BUTTONS.active;
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
