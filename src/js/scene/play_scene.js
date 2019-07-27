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
    //timer_board
    const TIMER_BOARD = (this.timer_board = new Timer_Board(
      { game: GAME, x: WIDTH / 16, y: HEIGHT / 16 },
      { text: "time: 0:00", style: { fontSize: 64, fill: "#ffffff" } }
    ));
    //score
    this.excellent_score = 300;
    this.great_score = 200;
    this.good_score = 100;
    this.bad_score = 50;
    this.miss_score = 0;
    //score_board
    this.total = 0;
    this.excellent = 0;
    this.great = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;
    this.precision = 0;
    this.combo = 0;
    //song
    const BGM = (this.bgm = GAME.sound.add(song_config[GAME.active_song].audio, 1, false));
    //timer
    const TIMER = (this.timer = this.time.create());

    //==============================add==============================//

    //target button
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      ADD.existing(TARGET_BUTTONS[i]);
    }
    //timer_board
    ADD.existing(TIMER_BOARD);

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
      //target button
      TARGET_BUTTONS[i].onInputDown.add(this.hit_note_with_btn, this);
      //target keys
      TARGET_KEYS[i].onDown.add(this.hit_note_with_key, this);
    }
    //timer_board
    TIMER.loop(
      Phaser.Timer.SECOND,
      () => {
        TIMER_BOARD.render(TIMER.seconds);
      },
      this
    );
    ////song
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

  resetButton(key, i) {
    this.target_buttons[i].frame = 0;
  }

  dispatch_beat(idx) {
    const GAME = this.game;
    const TIME = this.time;
    const BEAT = song_config[GAME.active_song].beatmap[GAME.active_level][idx];
    const X_INIT = this.x_init;
    const Y_INIT = this.y_init;
    const VX = this.vx[BEAT[0]];
    const VY = this.vy;
    const T_TARGET = this.t_target;

    switch (BEAT.length) {
      case 2:
        const NOTE = this.notes[BEAT[0]].getFirstExists(false, false, X_INIT, Y_INIT);
        const NOTE_SCALE = NOTE.scale;

        const NOTE_SX_FINAL = this.sx_final;
        const NOTE_SY_FINAL = this.sy_final;
        const NOTE_SX_INIT = 0.01;
        const NOTE_SY_INIT = NOTE_SY_FINAL / 2;
        const NOTE_DSX = (NOTE_SX_FINAL - NOTE_SX_INIT) / (T_TARGET / 50);
        const NOTE_DSY = (NOTE_SY_FINAL - NOTE_SY_INIT) / (T_TARGET / 50);

        NOTE.body.velocity.setTo(VX, VY);
        NOTE_SCALE.setTo(NOTE_DSX, NOTE_DSY);
        NOTE.target_time = BEAT[1];
        NOTE.timer = TIME.create();
        NOTE.timer.repeat(
          50,
          T_TARGET / 50,
          () => {
            NOTE_SCALE.setTo(NOTE_SCALE.x + NOTE_DSX, NOTE_SCALE.y + NOTE_DSY);
          },
          this
        );

        NOTE.timer.start();
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
        const TAIL_SCALE = TAIL.scale;

        TAIL_SCALE.setTo(1, 1);

        const TAIL_SX_FINAL = 0.1;
        const TAIL_SY_FINAL = ((VY / 1000) * (BEAT[2] - BEAT[1])) / TAIL.height / Math.cos(ANGLE[BEAT[0]]);
        const TAIL_SX_INIT = 0.01;
        const TAIL_SY_INIT = TAIL_SY_FINAL / 2;
        const TAIL_DSX = (TAIL_SX_FINAL - TAIL_SX_INIT) / (T_TARGET / 50);
        const TAIL_DSY = (TAIL_SY_FINAL - TAIL_SY_INIT) / (T_TARGET / 50);

        TAIL.rotation = ANGLE[BEAT[0]];
        TAIL.body.velocity.setTo(VX, VY);
        TAIL_SCALE.setTo(TAIL_SX_INIT, TAIL_SY_INIT);
        TAIL.timer = TIME.create();
        TAIL.timer.repeat(
          50,
          T_TARGET / 50,
          () => {
            TAIL_SCALE.setTo(TAIL_SCALE.x + TAIL_DSX, TAIL_SCALE.y + TAIL_DSY);
          },
          this
        );

        TAIL.timer.start();
        break;

      default:
        break;
    }
  }

  dph_note(index) {
    nearest_note.point = 0;

    if (BEAT.length === 3) {
      TAIL.bonus_time = BEAT[2] - TIME;

      TAIL.events.onKilled.add(() => {
        TAIL.scale_timer.stop();
      }, this);
    } else {
      nearest_note.tail = null;
    }
  }

  hit_note_with_btn(btn) {
    let NOTE = undefined;
    let t = Infinity;

    this.notes[btn.idx].getAll("exists", true).forEach(note => {
      if (note.target_time < t) {
        t = note.target_time;
        NOTE = note;
      }
    });

    if (NOTE) {
      const GAP = Math.abs(this.timer.ms - this.t_target - NOTE.target_time);

      if (GAP < 300) {
        if (GAP < 30) {
          NOTE.point = 300;
        } else if (GAP < 150) {
          NOTE.point = 200;
        } else if (GAP < 270) {
          NOTE.point = 100;
        } else {
          NOTE.point = 50;
        }

        NOTE.kill();
      } else {
        NOTE.point = 0;
      }
    }
  }

  hit_note_with_key(key) {
    const KEYCODE = Phaser.Keyboard;

    let NOTE = undefined;
    let t = Infinity;

    switch (key.keyCode) {
      case KEYCODE.D:
        this.notes[0].getAll("exists", true).forEach(note => {
          if (note.target_time < t) {
            t = note.target_time;
            NOTE = note;
          }
        });
        break;

      case KEYCODE.F:
        this.notes[1].getAll("exists", true).forEach(note => {
          if (note.target_time < t) {
            t = note.target_time;
            NOTE = note;
          }
        });
        break;

      case KEYCODE.J:
        this.notes[2].getAll("exists", true).forEach(note => {
          if (note.target_time < t) {
            t = note.target_time;
            NOTE = note;
          }
        });
        break;

      case KEYCODE.KD:
        this.notes[3].getAll("exists", true).forEach(note => {
          if (note.target_time < t) {
            t = note.target_time;
            NOTE = note;
          }
        });
        break;
    }

    if (NOTE) {
      const GAP = Math.abs(this.timer.ms - this.t_target - NOTE.target_time);

      if (GAP < 300) {
        if (GAP < 30) {
          NOTE.point = this.excellent_score;
        } else if (GAP < 150) {
          NOTE.point = this.great_score;
        } else if (GAP < 270) {
          NOTE.point = this.good_score;
        } else {
          NOTE.point = this.bad_score;
        }

        NOTE.kill();
      } else {
        NOTE.point = this.miss_score;
      }
    }
  }

  hold_tail_with_btn(btn) {}

  hold_tail_with_key(key) {}
}
