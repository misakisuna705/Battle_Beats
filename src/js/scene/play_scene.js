class Play_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
    //physic
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const SONG_CONF = song_config[GAME.active_song];
    const BEATMAP = song_config[GAME.active_song].beatmap[GAME.active_level];
    const BEATMAP_LENGTH = BEATMAP.length;
    const BUTTON_CONF = button_config.play_scene.target_buttons;
    const BUTTON_CONF_LENGTH = BUTTON_CONF.length;

    //==============================new==============================//

    //physic
    const X_INIT = (this.x_init = WIDTH / 2);
    const Y_INIT = (this.y_init = HEIGHT / 2);
    const X_TARGET = (this.x_target = []);
    const Y_TARGET = (this.y_target = (HEIGHT / 8) * 7);
    const VX = (this.vx = []);
    const VY = (this.vy = 500);
    const SX_FINAL = (this.sx_final = 1);
    const SY_FINAL = (this.sy_final = 1 - Y_INIT / HEIGHT);
    const T_TARGET = (this.t_target = ((Y_TARGET - Y_INIT) / VY) * 1000);
    //bg
    //const BG = (this.bg = new Phaser.Image(GAME, 0, 0, "bg_back.png"));
    //ADD.existing(BG);
    //tail
    const TAILS = (this.tails = []);
    //note
    const NOTES = (this.notes = []);
    //target button
    const TARGET_BUTTONS = (this.target_buttons = []);

    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      //physic
      X_TARGET[i] = (WIDTH / 5) * (i + 1);
      VX[i] = VY * ((X_TARGET[i] - X_INIT) / (Y_TARGET - Y_INIT));
      //tail
      TAILS[i] = new Tails({ game: GAME, enableBody: true, idx: i });
      //note
      NOTES[i] = new Notes({ game: GAME, enableBody: true, idx: i });
      //target button
      TARGET_BUTTONS[i] = new Button({ game: GAME, x: X_TARGET[i], y: Y_TARGET, idx: i }, BUTTON_CONF[i]);
    }
    //target keys
    const TARGET_KEYS = (this.target_keys = [
      KEYBOARD.addKey(KEYCODE.D),
      KEYBOARD.addKey(KEYCODE.F),
      KEYBOARD.addKey(KEYCODE.J),
      KEYBOARD.addKey(KEYCODE.K)
    ]);
    //total timer
    const TOTAL_TIMER = (this.total_timer = new Total_Timer(
      { game: GAME, x: WIDTH / 16, y: HEIGHT / 16 },
      { text: "time: 0:00", style: { fontSize: 64, fill: "#ffffff" } }
    ));
    //score
    this.count = 0;
    this.excellent_score = 300;
    this.great_score = 200;
    this.good_score = 100;
    this.bad_score = 50;
    this.miss_score = 0;
    //total score
    const TOTAL_SCORE = (this.total_score = new Txt(
      { game: GAME, x: WIDTH / 2, y: HEIGHT / 16 },
      { text: "score: 0", style: { fontSize: 64, fill: "#ffffff" } }
    ));
    //total precision
    const TOTAL_PRECISION = (this.total_precision = new Txt(
      { game: GAME, x: (WIDTH / 16) * 13, y: HEIGHT / 16 },
      { text: "precision:100%", style: { fontSize: 64, fill: "#ffffff" } }
    ));
    //song
    const BGM = (this.bgm = GAME.sound.add(song_config[GAME.active_song].audio, 1, false));
    //timer
    const TIMER = (this.timer = this.time.create());

    //==============================add==============================//

    //target button
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      ADD.existing(TARGET_BUTTONS[i]);
    }
    //total timer
    ADD.existing(TOTAL_TIMER);
    //total score
    ADD.existing(TOTAL_SCORE);
    //total precision
    ADD.existing(TOTAL_PRECISION);

    //==============================set==============================//

    //target button
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      TARGET_BUTTONS[i].scale.setTo(SX_FINAL, SY_FINAL);
    }

    //==============================call==============================//

    //beat
    for (let i = 0; i < BEATMAP_LENGTH; ++i) {
      TIMER.add(BEATMAP[i][1], this.dispatch_beat, this, i);
    }
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      //note
      NOTES[i].forEach(note => {
        note.events.onKilled.add(this.update_point, this);
      }, this);
      //target button
      TARGET_BUTTONS[i].onInputDown.add(this.hit_note, this);
      TARGET_BUTTONS[i].onInputDown.add(this.hold_tail, this);
      //target keys
      TARGET_KEYS[i].onDown.add(this.hit_note, this);
      TARGET_KEYS[i].onDown.add(this.hold_tail, this);
    }
    //total timer
    TIMER.loop(
      Phaser.Timer.SECOND,
      () => {
        TOTAL_TIMER.render(TIMER.seconds);
      },
      this
    );
    //song
    TIMER.add(
      T_TARGET,
      () => {
        BGM.play();
      },
      this
    );
    //timer
    TIMER.start();

    //song
    //BGM.onStop.add(() => {
    //this.score.score_upload();
    //}, this);

    //for (let i = 0; i < 4; i++) {
    //this.target_buttons[i].presskey.onUp.add(this.resetButton, this, 0, i);
    //}

    //this.score = new Score({ game: GAME, x: 240, y: 240, key: "score_board" });

    //this.senia = new HERO(120, 120, 80, 180, GAME, this, hero_config[0], Phaser.Keyboard.D, false);
    //this.seti = new HERO(120, 120, 80, 280, GAME, this, hero_config[1], Phaser.Keyboard.F, false);
    //this.rita = new HERO(100, 120, 400, 180, GAME, this, hero_config[2], Phaser.Keyboard.J, false);
    //this.hugo = new HERO(100, 120, 400, 280, GAME, this, hero_config[3], Phaser.Keyboard.K, false);

    //this.rita.scale.x *= -1;
    //this.hugo.scale.x *= -1;

    //this.senia.start();
    //this.seti.start();
    //this.rita.start();
    //this.hugo.start();
  }

  //resetButton(key, i) {
  //this.target_buttons[i].frame = 0;
  //}

  dispatch_beat(idx) {
    const GAME = this.game;
    const BEAT = song_config[GAME.active_song].beatmap[GAME.active_level][idx];
    const X_INIT = this.x_init;
    const Y_INIT = this.y_init;
    const VX = this.vx[BEAT[0]];
    const VY = this.vy;
    const T_TARGET = this.t_target;

    switch (BEAT.length) {
      case 2:
        const NOTE = this.notes[BEAT[0]].getFirstExists(false, false, X_INIT, Y_INIT);

        if (NOTE) {
          NOTE.dispatch(VX, VY, this.sx_final, this.sy_final, T_TARGET, BEAT[1]);
        }
        break;

      case 3:
        const BUTTON_CONF_LENGTH = button_config.play_scene.target_buttons.length;
        const X_TARGET = this.x_target;
        const Y_TARGET = this.y_target;
        const ANGLE = [];

        for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
          ANGLE[i] = -Math.atan((X_TARGET[i] - X_INIT) / (Y_TARGET - Y_INIT));
        }

        const TAIL = this.tails[BEAT[0]].getFirstExists(false, false, X_INIT, Y_INIT);

        if (TAIL) {
          TAIL.dispatch(VX, VY, T_TARGET, BEAT[1], BEAT[2], ANGLE[BEAT[0]]);
        }
        break;

      default:
        break;
    }
  }

  get_track(obj) {
    const KEYCODE = Phaser.Keyboard;

    let track = undefined;

    if (obj.idx != undefined) {
      track = obj.idx;
    } else {
      switch (obj.keyCode) {
        case KEYCODE.D:
          track = 0;
          break;
        case KEYCODE.F:
          track = 1;
          break;
        case KEYCODE.J:
          track = 2;
          break;
        case KEYCODE.K:
          track = 3;
          break;
      }
    }

    return track;
  }

  hit_note(obj) {
    const TRACK = this.get_track(obj);
    const NOTE = this.notes[TRACK].get_first_arrived();

    if (NOTE) {
      NOTE.set_point(this.timer.ms, this.t_target);
    }
  }

  hold_tail(obj) {
    const TRACK = this.get_track(obj);
    const TAIL = this.tails[TRACK].get_first_arrived();

    if (TAIL) {
      TAIL.set_bonus(this.timer.ms, this.t_target, obj, this.vx[TRACK], this.vy);
    }
  }

  update_point(note) {
    const GAME = this.game;

    switch (note.point) {
      case this.excellent_score:
        ++GAME.excellent;
        break;

      case this.great_score:
        ++GAME.great;
        break;

      case this.good_score:
        ++GAME.good;
        break;

      case this.bad_score:
        ++GAME.bad;
        break;

      case this.miss_score:
        ++GAME.miss;
        break;

      default:
        break;
    }

    GAME.total += note.point;
    this.count += this.excellent_score;
    GAME.precision = GAME.total / this.count;

    this.total_score.setText("score: " + GAME.total);
    //this.total_precision.setText("precision: " + (GAME.precision * 100).toFixed(2) + "%");
    this.total_precision.setText(GAME.total + " " + this.count);

    note.point = 0;
  }

  update_bonus(tail) {
    const GAME = this.game;

    GAME.total += tail.bonus;
    this.count += tail.bonus;

    this.total_score.setText("score: " + GAME.total);
    //this.total_precision.setText("precision: " + (GAME.precision * 100).toFixed(2) + "%");
    this.total_precision.setText(GAME.total + " " + this.count);
  }
}
