class Play_Scene extends Phaser.State {
  init() {
    const GAME = this.game;

    this.song_beatmap = song_config[GAME.active_song].beatmap[GAME.active_level];
  }

  create() {
    const GAME = this.game;
    const EVENTS = GAME.time.events;
    const ACTIVE_SONG = GAME.active_song;
    const BUTTON_CONF = button_config.play_scene;
    const VELOCITY_Y = (this.init_velocity_y = song_config[ACTIVE_SONG].info.bpm * song_config[ACTIVE_SONG].info.nX);

    const velocity_ratio = 10; // the ratio of the initial velocity and the destination velocity

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.bg_back = new Img({ game: GAME }, { x: 240, y: -20, key: "bg_back" });
    this.game.time.events.loop(30, this.bg_rotate, this);
    this.bg_middle = new Img({ game: GAME }, { x: 240, y: 320, key: "bg_middle" });
    this.bg_front = new Img({ game: GAME }, { x: 240, y: 320, key: "bg_front" });

    this.track_start_height = 120;
    this.track_start_width = 220;
    this.track_end_height = BUTTON_CONF.target_buttons[0].y;
    this.track_length = this.track_end_height - this.track_start_height;

    this.pass_through_time = (this.track_length / VELOCITY_Y) * 1000;

    this.note_init_scale_x = this.track_start_width / (this.game.width * (1 - (this.game.height - this.track_end_height) / this.game.height));
    this.note_init_scale_y = 0.1;
    this.tail_init_scale_x = 0.2;

    this.note_enlarge_scale_x = ((1 - this.note_init_scale_x) / this.pass_through_time) * 20;
    this.note_enlarge_scale_y = (1 - this.note_init_scale_y) / (this.pass_through_time / 20);

    this.dispatch_points = [];
    this.init_velocity_x = [];
    this.acceleration_x = [];
    for (let i = 0; i < 4; i++) {
      this.dispatch_points[i] = ((2 * i + 1) / 8) * this.track_start_width + (this.game.width - this.track_start_width) / 2;
      this.init_velocity_x[i] = ((BUTTON_CONF.target_buttons[i].x - this.dispatch_points[i]) / this.track_length) * VELOCITY_Y;
    }

    this.tail_angle = [
      Math.atan((this.dispatch_points[0] - BUTTON_CONF.target_buttons[0].x) / this.track_length),
      Math.atan((this.dispatch_points[1] - BUTTON_CONF.target_buttons[1].x) / this.track_length),
      -Math.atan((this.dispatch_points[1] - BUTTON_CONF.target_buttons[1].x) / this.track_length),
      -Math.atan((this.dispatch_points[0] - BUTTON_CONF.target_buttons[0].x) / this.track_length)
    ];

    this.tails = [
      new Tails({ game: GAME, enableBody: true, index: 0 }),
      new Tails({ game: GAME, enableBody: true, index: 1 }),
      new Tails({ game: GAME, enableBody: true, index: 2 }),
      new Tails({ game: GAME, enableBody: true, index: 3 })
    ];

    this.notes = [
      new Notes({ game: GAME, enableBody: true, index: 0 }),
      new Notes({ game: GAME, enableBody: true, index: 1 }),
      new Notes({ game: GAME, enableBody: true, index: 2 }),
      new Notes({ game: GAME, enableBody: true, index: 3 })
    ];

    this.target_buttons = [
      new Button({ game: GAME, callback: this.hit_button_0, callbackContext: this }, BUTTON_CONF.target_buttons[0]),
      new Button({ game: GAME, callback: this.hit_button_1, callbackContext: this }, BUTTON_CONF.target_buttons[1]),
      new Button({ game: GAME, callback: this.hit_button_2, callbackContext: this }, BUTTON_CONF.target_buttons[2]),
      new Button({ game: GAME, callback: this.hit_button_3, callbackContext: this }, BUTTON_CONF.target_buttons[3])
    ];

    for (let i = 0; i < 4; i++) {
      this.target_buttons[i].presskey.onUp.add(this.resetButton, this, 0, i);
    }

    const BEATMAP = this.song_beatmap;
    const LENGTH = BEATMAP.length;

    for (let i = 0; i < LENGTH; ++i) {
      EVENTS.add(BEATMAP[i][1], this.dispatch_note, this, i);
    }

    this.song_start_time = 0;
    this.song_audio = GAME.add.audio(song_config[ACTIVE_SONG].AudioFilename, 1, false);
    EVENTS.add(this.pass_through_time, this.play, this);

    this.timer = new Timer({ game: GAME, x: 12, y: 36, text: "time: 0:00", style: { fill: "#ffffff" } });

    this.senia = new HERO(120, 120, 80, 180, GAME, this, hero_config[0], Phaser.Keyboard.D, false);
    this.seti = new HERO(120, 120, 80, 280, GAME, this, hero_config[1], Phaser.Keyboard.F, false);
    this.rita = new HERO(100, 120, 400, 180, GAME, this, hero_config[2], Phaser.Keyboard.J, false);
    this.hugo = new HERO(100, 120, 400, 280, GAME, this, hero_config[3], Phaser.Keyboard.K, false);

    this.rita.scale.x *= -1;
    this.hugo.scale.x *= -1;

    this.senia.start();
    this.seti.start();
    this.rita.start();
    this.hugo.start();

    this.score = new Score({ game: GAME, x: 240, y: 240, key: "score_board" });
  }

  resetButton(key, i) {
    this.target_buttons[i].frame = 0;
  }

  bg_rotate() {
    this.bg_back.angle += 1;
  }

  play() {
    this.song_start_time = this.game.time.now;
    this.song_audio.play();

    this.song_audio.onStop.add(() => {
      this.score.score_upload();
    }, this);
  }

  dispatch_note(index) {
    const VELOCITY_Y = this.init_velocity_y;
    const BUTTON_CONF = button_config.play_scene;
    const BEAT = this.song_beatmap[index];
    const TRACK = BEAT[0];
    const TIME = BEAT[1];
    const POS = this.dispatch_points[TRACK];
    const nearest_note = this.notes[TRACK].getFirstExists(false, false, POS, this.track_start_height);

    nearest_note.exists = true;

    nearest_note.body.velocity.y = VELOCITY_Y;
    nearest_note.body.velocity.x = this.init_velocity_x[TRACK];

    nearest_note.perfect_time = TIME;
    nearest_note.point = 0;

    nearest_note.scale.setTo(this.note_init_scale_x, this.note_init_scale_y);
    nearest_note.scale_timer = this.game.time.create();
    nearest_note.scale_timer.repeat(20, this.pass_through_time / 20, nearest_note.update_scale, nearest_note);
    nearest_note.scale_timer.start();

    if (BEAT.length === 3) {
      const TAIL = (nearest_note.tail = this.tails[TRACK].getFirstExists(false, false, POS, this.track_start_height - 10));

      TAIL.exists = true;
      TAIL.bonus_time = BEAT[2] - TIME;

      TAIL.body.velocity.x = this.init_velocity_x[TRACK];
      TAIL.body.velocity.y = VELOCITY_Y;
      TAIL.rotation = this.tail_angle[TRACK];

      TAIL.H = (this.init_velocity_y * TAIL.bonus_time) / 1000;
      TAIL.scale.setTo(1, 1);
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
