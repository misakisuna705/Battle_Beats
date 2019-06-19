class Play_Scene extends Phaser.State {
  create() {
    const GAME = this.game;
    const ACTIVE_SONG = GAME.active_song;
    const BUTTON_CONF = button_config.play_scene;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.bg = new BG({ game: this.game, x: -300, y: -640, width: 1124, height: 1280, key: "bg" });

    this.song_beatmap = song_config[ACTIVE_SONG].beatmap[GAME.active_level];
    for (let i = 0; i < this.song_beatmap.length; ++i) {
      this.game.time.events.add(this.song_beatmap[i][1], this.dispatch_note, this, i);
    }

    this.song_speed = song_config[ACTIVE_SONG].info.bpm * song_config[ACTIVE_SONG].info.nX;

    this.score = new Score({ game: this.game, x: 240, y: 0, key: "target_button" });

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
    GAME.time.events.add((GAME.height / this.song_speed) * 1000, this.play, this);

    //this.timer = new Timer({ game: GAME });
  }

  update() {
    this.bg.renew();
  }

  play() {
    this.song_audio.play();
  }

  dispatch_note(index) {
    const NOTE = this.notes[this.song_beatmap[index][0]].getFirstExists(
      false,
      false,
      button_config.play_scene.target_buttons[this.song_beatmap[index][0]].x,
      0
    );

    NOTE.exists = true;
    NOTE.body.velocity.y = this.song_speed;
    NOTE.perfect_timing = this.song_beatmap[index][0];
    NOTE.point = 0;

    if (this.song_beatmap[index].length === 3) {
      const TAIL = this.tails[this.song_beatmap[index][0]].getFirstExists(
        false,
        false,
        button_config.play_scene.target_buttons[this.song_beatmap[index][0]].x,
        0
      );

      TAIL.exists = true;
      TAIL.body.velocity.y = this.song_speed;
      TAIL.bonus_time = this.song_beatmap[index][2] - this.song_beatmap[index][1];
      TAIL.scale.setTo(1, ((this.song_speed * TAIL.bonus_time) / 1000 / TAIL.height) * TAIL.scale.y);
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
