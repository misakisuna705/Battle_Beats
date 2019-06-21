class Play_Scene extends Phaser.State {
  create() {
    const GAME = this.game;
    const EVENTS = GAME.time.events;
    const ACTIVE_SONG = GAME.active_song;
    const BUTTON_CONF = button_config.play_scene;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.bg_back = new BG({ game: GAME, x: 240, y: 0, key: "bg_back" });
    this.game.time.events.loop(20, this.bg_rotate, this);
    this.bg_middle = new BG({ game: GAME, x: 240, y: 320, key: "bg_middle" });
    this.bg_front = new BG({ game: GAME, x: 240, y: 320, key: "bg_front" });

    const SPEED = (this.song_speed = song_config[ACTIVE_SONG].info.bpm * song_config[ACTIVE_SONG].info.nX);

    this.score = new Score({ game: GAME, x: 240, y: 0, key: "target_button" });

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

    const BEATMAP = (this.song_beatmap = song_config[ACTIVE_SONG].beatmap[GAME.active_level]);
    const LENGTH = BEATMAP.length;

    for (let i = 0; i < LENGTH; ++i) {
      EVENTS.add(BEATMAP[i][1], this.dispatch_note, this, i);
    }

    this.song_start_time = 0;
    this.song_audio = GAME.add.audio(song_config[ACTIVE_SONG].AudioFilename, 1, false);
    EVENTS.add((GAME.height / SPEED) * 1000, this.play, this);

    this.timer = new Timer({ game: GAME, x: 12, y: 36, text: "time: 0:00", style: { fill: "#ffffff" } });
  }

  bg_rotate() {
    this.bg_back.angle += 5;
  }

  play() {
    this.song_start_time = this.game.time.now;
    this.song_audio.play();
  }

  dispatch_note(index) {
    const SPEED = this.song_speed;
    const BUTTON_CONF = button_config.play_scene;
    const BEAT = this.song_beatmap[index];
    const TRACK = BEAT[0];
    const TIME = BEAT[1];
    const POS = BUTTON_CONF.target_buttons[TRACK].x;
    const nearest_note = this.notes[TRACK].getFirstExists(false, false, POS, 0);

    nearest_note.exists = true;
    nearest_note.body.velocity.y = SPEED;
    nearest_note.perfect_time = TIME;
    nearest_note.point = 0;

    if (BEAT.length === 3) {
      const TAIL = (nearest_note.tail = this.tails[TRACK].getFirstExists(false, false, POS, 0));

      TAIL.exists = true;
      TAIL.body.velocity.y = SPEED;
      TAIL.bonus_time = BEAT[2] - TIME;

      TAIL.scale.setTo(1, 1);
      TAIL.scale.setTo(1, (SPEED * TAIL.bonus_time) / TAIL.height / 1000);
    } else {
      nearest_note.tail = null;
    }
  }

  hit_button_0() {
    let nearest_note = null;
    let nearest_time = Infinity;

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
