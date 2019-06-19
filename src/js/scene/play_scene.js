class Play_Scene extends Phaser.State {
  create() {
    const GAME = this.game;
    const EVENTS = GAME.time.events;
    const ACTIVE_SONG = GAME.active_song;
    const BUTTON_CONF = button_config.play_scene;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.bg = new BG({ game: GAME, x: -300, y: -640, width: 1124, height: 1280, key: "bg" });

    const BEATMAP = (this.song_beatmap = song_config[ACTIVE_SONG].beatmap[GAME.active_level]);
    const LENGTH = BEATMAP.length;

    for (let i = 0; i < LENGTH; ++i) {
      EVENTS.add(BEATMAP[i][1], this.dispatch_note, this, i);
    }

    const SPEED = (this.song_speed = song_config[ACTIVE_SONG].info.bpm * song_config[ACTIVE_SONG].info.nX);

    //this.score = new Score({ game: GAME, x: 240, y: 0, key: "target_button" });

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

    this.song_audio = GAME.add.audio(song_config[ACTIVE_SONG].AudioFilename, 1, false);
    EVENTS.add((GAME.height / SPEED) * 1000, this.play, this);

    //this.timer = new Timer({ game: GAME });
  }

  update() {
    this.bg.renew();
  }

  play() {
    this.song_audio.play();
  }

  dispatch_note(index) {
    const SPEED = this.song_speed;
    const BUTTON_CONF = button_config.play_scene;
    const BEAT = this.song_beatmap[index];
    const TRACK = BEAT[0];
    const TIME = BEAT[1];
    const POS = BUTTON_CONF.target_buttons[TRACK].x;
    const NOTE = this.notes[TRACK].getFirstExists(false, false, POS, 0);

    NOTE.exists = true;
    NOTE.body.velocity.y = SPEED;
    NOTE.perfect_time = TIME;
    NOTE.point = 0;

    if (BEAT.length === 3) {
      const TAIL = this.tails[TRACK].getFirstExists(false, false, POS, 0);

      TAIL.exists = true;
      TAIL.body.velocity.y = SPEED;
      TAIL.bonus_time = BEAT[2] - TIME;
      TAIL.scale.setTo(1, ((SPEED * TAIL.bonus_time) / 1000 / TAIL.height) * TAIL.scale.y);
    }
  }

  hit_button_0() {
    //const NOTE = this.notes[0].getFirstExists(true);
    //if (NOTE) {
    //const GAP_TIME = Math.abs(this.game.time.now - NOTE.perfect_time);
    //if (GAP_TIME < 1000) {
    //if (GAP_TIME < 100) {
    //NOTE.point = 300;
    //} else if (GAP_TIME < 250) {
    //NOTE.point = 200;
    //} else if (GAP_TIME < 500) {
    //NOTE.point = 100;
    //} else {
    //NOTE.point = 50;
    //}
    //NOTE.kill();
    //}
    //}
    //console.log(NOTE.point);
  }

  hit_button_1() {
    //const NOTE = this.notes[1].getFirstExists(true);
    //if (NOTE) {
    //const GAP_TIME = Math.abs(this.game.time.now - NOTE.perfect_time);
    //if (GAP_TIME < 1000) {
    //if (GAP_TIME < 100) {
    //NOTE.point = 300;
    //} else if (GAP_TIME < 250) {
    //NOTE.point = 200;
    //} else if (GAP_TIME < 500) {
    //NOTE.point = 100;
    //} else {
    //NOTE.point = 50;
    //}
    //NOTE.kill();
    //}
    //}
    //console.log(NOTE.point);
  }

  hit_button_2() {
    //const NOTE = this.notes[2].getFirstExists(true);
    //if (NOTE) {
    //const GAP_TIME = Math.abs(this.game.time.now - NOTE.perfect_time);
    //if (GAP_TIME < 1000) {
    //if (GAP_TIME < 100) {
    //NOTE.point = 300;
    //} else if (GAP_TIME < 250) {
    //NOTE.point = 200;
    //} else if (GAP_TIME < 500) {
    //NOTE.point = 100;
    //} else {
    //NOTE.point = 50;
    //}
    //NOTE.kill();
    //}
    //}
    //console.log(NOTE.point);
  }

  hit_button_3() {
    //const NOTE = this.notes[3].getFirstExists(true);
    //if (NOTE) {
    //const GAP_TIME = Math.abs(this.game.time.now - NOTE.perfect_time);
    //if (GAP_TIME < 1000) {
    //if (GAP_TIME < 100) {
    //NOTE.point = 300;
    //} else if (GAP_TIME < 250) {
    //NOTE.point = 200;
    //} else if (GAP_TIME < 500) {
    //NOTE.point = 100;
    //} else {
    //NOTE.point = 50;
    //}
    //NOTE.kill();
    //}
    //}
    //console.log(NOTE.point);
  }

  //hit_target_button() {
  //const NOTE = this.notes.getFirstExists(false);

  //NOTE.exists = true;
  //alert(NOTE);

  //if (NOTE) {
  //const GAP_TIME = Math.abs(this.game.time.now - NOTE.perfect_time);
  //if (GAP_TIME < 1000) {
  //if (GAP_TIME < 100) {
  //NOTE.point = 300;
  //} else if (GAP_TIME < 250) {
  //NOTE.point = 200;
  //} else if (GAP_TIME < 500) {
  //NOTE.point = 100;
  //} else {
  //NOTE.point = 50;
  //}
  //NOTE.kill();
  //}
  //}
  //}
}
