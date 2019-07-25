class Play_Scene extends Phaser.State {
  init() {
    const GAME = this.game;

    //bgv
    GAME.bgv.addToWorld(0, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;
    const SONG_CONF = song_config[GAME.active_song];
    const BEATMAP = song_config[GAME.active_song].beatmap[GAME.active_level];
    const BEATMAP_LENGTH = BEATMAP.length;
    const BUTTON_CONF = button_config.play_scene.target_buttons;
    const BUTTON_CONF_LENGTH = BUTTON_CONF.length;

    const TAILS = (this.tails = []);
    const NOTES = (this.notes = []);
    const TARGET_BUTTONS = (this.target_buttons = []);

    const X_INIT = (this.x_init = []);
    const Y_INIT = (this.y_init = HEIGHT / 2 + 60);
    const X_TARGET = (this.x_target = []);
    const Y_TARGET = (this.y_target = (HEIGHT / 8) * 7);
    const VX_INIT = (this.vx_init = []);
    const VY_INIT = (this.vy_init = 500);
    const SX_FINAL = (this.sx_final = 1);
    const SY_FINAL = (this.sy_final = 1 - Y_INIT / HEIGHT);
    const T_TARGET = (this.t_target = ((Y_TARGET - Y_INIT) / VY_INIT) * 1000);
    const T_FINAL = (this.t_final = ((HEIGHT - Y_INIT) / VY_INIT) * 1000);
    const DT = (this.dt = T_FINAL / 50);
    const DSX = (this.dsx = SX_FINAL / DT);
    const DSY = (this.dsy = SY_FINAL / DT);
    const SLOPE = (this.slope = []);
    const ANGLE = (this.angle = []);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    //==============================new==============================//

    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      X_INIT[i] = WIDTH / 2 - 45 + i * 30;
      X_TARGET[i] = (WIDTH / 5) * (i + 1);
      SLOPE[i] = (X_TARGET[i] - X_INIT[i]) / (Y_TARGET - Y_INIT);
      VX_INIT[i] = VY_INIT * SLOPE[i];
      ANGLE[i] = -Math.atan(SLOPE[i]);
      //tail
      TAILS[i] = new Tails({ game: GAME, enableBody: true, idx: i });
      //note
      NOTES[i] = new Notes({ game: GAME, enableBody: true, idx: i });
      //target button
      TARGET_BUTTONS[i] = new Button({ game: GAME, x: X_TARGET[i], y: Y_TARGET }, BUTTON_CONF[i]);
    }
    //timer
    const TIMER = (this.timer = this.time.create());
    //song
    const BGM = (this.bgm = GAME.sound.add(song_config[GAME.active_song].audio, 1, false));

    //==============================add==============================//

    //target button
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      ADD.existing(TARGET_BUTTONS[i]);
    }

    //==============================set==============================//

    //const velocity_ratio = 10; // the ratio of the initial velocity and the destination velocity

    //==============================call==============================//

    //beatmap
    for (let i = 0; i < BEATMAP_LENGTH; ++i) {
      TIMER.add(BEATMAP[i][1], this.dispatch_note, this, i);
    }
    //target button
    for (let i = 0; i < BUTTON_CONF_LENGTH; ++i) {
      TARGET_BUTTONS[i].onInputDown.add(this.hit_target, this);
    }
    //song
    TIMER.add(
      T_TARGET,
      () => {
        //this.song_start_time = this.game.time.now;
        BGM.play();

        //this.song_audio.onStop.add(() => {
        //this.score.score_upload();
        //}, this);
      },
      this
    );

    //EVENTS.add(this.pass_through_time, this.play, this);

    TIMER.start();

    //for (let i = 0; i < 4; i++) {
    //this.target_buttons[i].presskey.onUp.add(this.resetButton, this, 0, i);
    //}

    //this.acceleration_x = [];

    //this.song_start_time = 0;

    //this.timer = new Timer({ game: GAME, x: 12, y: 36, text: "time: 0:00", style: { fill: "#ffffff" } });

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

    //this.score = new Score({ game: GAME, x: 240, y: 240, key: "score_board" });
  }

  resetButton(key, i) {
    this.target_buttons[i].frame = 0;
  }

  //bg_rotate() {
  //this.bg_back.angle += 1;
  //}

  play() {
    this.song_start_time = this.game.time.now;
    this.song_audio.play();

    this.song_audio.onStop.add(() => {
      this.score.score_upload();
    }, this);
  }

  dispatch_note(idx) {
    const GAME = this.game;
    const BEAT = song_config[GAME.active_song].beatmap[GAME.active_level][idx];
    const X_INIT = this.x_init[BEAT[0]];
    const Y_INIT = this.y_init;
    const VX_INIT = this.vx_init[BEAT[0]];
    const VY_INIT = this.vy_init;
    const DT = this.dt;
    const DSX = this.dsx;
    const DSY = this.dsy;

    switch (BEAT.length) {
      case 2:
        const NOTE = this.notes[BEAT[0]].getFirstExists(false, false, X_INIT, Y_INIT);

        NOTE.body.velocity.setTo(VX_INIT, VY_INIT);
        NOTE.scale.setTo(DSX, DSY);
        NOTE.timer = this.time.create();
        NOTE.timer.repeat(
          50,
          DT,
          () => {
            NOTE.scale.x += DSX;
            NOTE.scale.y += DSY;
          },
          this
        );

        NOTE.timer.start();
        break;

      case 3:
        const TAIL = this.tails[BEAT[0]].getFirstExists(false, false, X_INIT, Y_INIT);

        //TAIL.body.velocity.setTo(0, this.vy_init);
        //TAIL.scale.setTo(1, ((TAIL.body.velocity.y / 1000) * (BEAT[2] - BEAT[1])) / TAIL.height);

        TAIL.body.velocity.setTo(VX_INIT, VY_INIT);
        TAIL.rotation = this.angle[BEAT[0]];
        TAIL.scale.setTo(1, 1);
        TAIL.scale.setTo(1, ((TAIL.body.velocity.y / 1000) * (BEAT[2] - BEAT[1])) / TAIL.height / Math.cos(this.angle[BEAT[0]]));

        break;

      default:
        break;
    }
  }

  dph_note(index) {
    const VELOCITY_Y = this.init_velocity_y;
    const BUTTON_CONF = button_config.play_scene;
    const BEAT = this.song_beatmap[index];
    const TRACK = BEAT[0];
    const TIME = BEAT[1];
    const POS = this.dispatch_beat_points[TRACK];
    const nearest_note = this.notes[TRACK].getFirstExists(false, false, this.X_INIT[BEAT[0]], this.Y_INIT);

    //nearest_note.exists = true;

    //nearest_note.body.velocity.y = VELOCITY_Y;
    //nearest_note.body.velocity.x = this.init_velocity_x[TRACK];

    //nearest_note.perfect_time = TIME;
    nearest_note.point = 0;

    //nearest_note.scale.setTo(this.note_init_scale_x, this.note_init_scale_y);
    //nearest_note.scale_timer = this.game.time.create();
    //nearest_note.scale_timer.repeat(20, this.pass_through_time / 20, nearest_note.update_scale, nearest_note);
    //nearest_note.scale_timer.start();

    if (BEAT.length === 3) {
      //const TAIL = (nearest_note.tail = this.tails[TRACK].getFirstExists(false, false, POS, this.track_start_height - 10));

      //TAIL.exists = true;
      TAIL.bonus_time = BEAT[2] - TIME;

      //TAIL.body.velocity.x = this.init_velocity_x[TRACK];
      //TAIL.body.velocity.y = VELOCITY_Y;
      TAIL.rotation = this.tail_angle[TRACK];

      TAIL.H = (this.init_velocity_y * TAIL.bonus_time) / 1000;
      //TAIL.scale.setTo(1, 1);
      TAIL.tail_enlarge_scale_y = (TAIL.H / TAIL.height / this.pass_through_time) * 20;
      TAIL.scale.setTo(this.tail_init_scale_x, 0);

      TAIL.scale_timer = this.game.time.create();
      TAIL.scale_timer.repeat(20, this.pass_through_time / 20, TAIL.update_scale, TAIL);
      TAIL.scale_timer.start();

      TAIL.events.onKilled.add(() => {
        TAIL.scale_timer.stop();
      }, this);
    } else {
      nearest_note.tail = null;
    }
  }

  hit_target() {}

  hit_button_0() {
    let nearest_note = null;
    let nearest_time = Infinity;

    this.target_buttons[0].frame = 1;

    this.notes[0].getAll("exists", true).forEach(note => {
      if (note.perfect_time < nearest_time) {
        nearest_note = note;
        nearest_time = note.perfect_time;
      }
    });

    if (nearest_note) {
      const GAP_TIME = Math.abs(this.game.time.now - this.song_start_time - nearest_note.perfect_time);

      if (GAP_TIME < 300) {
        if (GAP_TIME < 30) {
          nearest_note.point = 300;
        } else if (GAP_TIME < 150) {
          nearest_note.point = 200;
        } else if (GAP_TIME < 270) {
          nearest_note.point = 100;
        } else {
          nearest_note.point = 50;
        }

        nearest_note.kill();
      }
    }
  }

  hit_button_1() {
    let nearest_note = null;
    let nearest_time = Infinity;

    this.target_buttons[1].frame = 1;

    this.notes[1].getAll("exists", true).forEach(note => {
      if (note.perfect_time < nearest_time) {
        nearest_note = note;
        nearest_time = note.perfect_time;
      }
    });

    if (nearest_note) {
      const GAP_TIME = Math.abs(this.game.time.now - this.song_start_time - nearest_note.perfect_time);

      if (GAP_TIME < 300) {
        if (GAP_TIME < 30) {
          nearest_note.point = 300;
        } else if (GAP_TIME < 150) {
          nearest_note.point = 200;
        } else if (GAP_TIME < 270) {
          nearest_note.point = 100;
        } else {
          nearest_note.point = 50;
        }

        nearest_note.kill();
      }
    }
  }

  hit_button_2() {
    let nearest_note = null;
    let nearest_time = Infinity;

    this.target_buttons[2].frame = 1;

    this.notes[2].getAll("exists", true).forEach(note => {
      if (note.perfect_time < nearest_time) {
        nearest_note = note;
        nearest_time = note.perfect_time;
      }
    });

    if (nearest_note) {
      const GAP_TIME = Math.abs(this.game.time.now - this.song_start_time - nearest_note.perfect_time);

      if (GAP_TIME < 300) {
        if (GAP_TIME < 30) {
          nearest_note.point = 300;
        } else if (GAP_TIME < 150) {
          nearest_note.point = 200;
        } else if (GAP_TIME < 270) {
          nearest_note.point = 100;
        } else {
          nearest_note.point = 50;
        }

        nearest_note.kill();
      }
    }
  }

  hit_button_3() {
    let nearest_note = null;
    let nearest_time = Infinity;

    this.target_buttons[3].frame = 1;

    this.notes[3].getAll("exists", true).forEach(note => {
      if (note.perfect_time < nearest_time) {
        nearest_note = note;
        nearest_time = note.perfect_time;
      }
    });

    if (nearest_note) {
      const GAP_TIME = Math.abs(this.game.time.now - this.song_start_time - nearest_note.perfect_time);

      if (GAP_TIME < 300) {
        if (GAP_TIME < 30) {
          nearest_note.point = 300;
        } else if (GAP_TIME < 150) {
          nearest_note.point = 200;
        } else if (GAP_TIME < 270) {
          nearest_note.point = 100;
        } else {
          nearest_note.point = 50;
        }

        nearest_note.kill();
      }
    }
  }
}
