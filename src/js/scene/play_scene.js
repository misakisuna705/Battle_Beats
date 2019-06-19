class Play_Scene extends Phaser.State {
  create() {
    //this.bg = new Play_Scene_Background({ game: this.game, x: -260, y: -640, key: "bg", frame: 1 });
    //this.bg = new Img({ game: this.game, x: -300, y: -640, key: "bg" });

    const GAME = this.game;
    const ACTIVE_SONG = GAME.active_song;
    const BUTTON_CONF = button_config.play_scene;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.song_beatmap = song_config[ACTIVE_SONG].beatmap[GAME.active_level];
    for (let i = 0; i < this.song_beatmap.length; ++i) {
      this.game.time.events.add(this.song_beatmap[i][1], this.dispatch_note, this, i);
    }

    this.song_speed = song_config[ACTIVE_SONG].info.bpm * song_config[ACTIVE_SONG].info.nX;

    this.score = new Score({ game: this.game, x: 240, y: 0, key: "target_button" });

    this.notes = [
      new Notes({ game: GAME, enableBody: true, index: 0 }),
      new Notes({ game: GAME, enableBody: true, index: 1 }),
      new Notes({ game: GAME, enableBody: true, index: 2 }),
      new Notes({ game: GAME, enableBody: true, index: 3 })
    ];

    //this.tails = [
    //new Tails({ game: GAME, enableBody: true, index: 0 }),
    //new Tails({ game: GAME, enableBody: true, index: 1 }),
    //new Tails({ game: GAME, enableBody: true, index: 2 }),
    //new Tails({ game: GAME, enableBody: true, index: 3 })
    //];

    this.target_buttons = [
      new Button({ game: GAME, callback: this.hit_target_button, callbackContext: this }, BUTTON_CONF.target_buttons[0]),
      new Button({ game: GAME, callback: this.hit_target_button, callbackContext: this }, BUTTON_CONF.target_buttons[1]),
      new Button({ game: GAME, callback: this.hit_target_button, callbackContext: this }, BUTTON_CONF.target_buttons[2]),
      new Button({ game: GAME, callback: this.hit_target_button, callbackContext: this }, BUTTON_CONF.target_buttons[3])
    ];

    this.song_audio = GAME.add.audio(song_config[ACTIVE_SONG].AudioFilename, 1, false);
    GAME.time.events.add((GAME.height / this.song_speed) * 1000, this.play, this);

    //this.timer = new Timer({ game: GAME });
  }

  update() {
    //this.bg.renew();
  }

  play() {
    this.song_audio.play();
  }

  dispatch_note(index) {
    const NOTES = this.notes[this.song_beatmap[index][0]].getFirstExists(
      false,
      false,
      button_config.play_scene.target_buttons[this.song_beatmap[index][0]].x,
      0
    );

    NOTES.exists = true;
    NOTES.body.velocity.y = this.song_speed;
    NOTES.perfect_timing = this.song_beatmap[index][0];

    //if (note.note_tail != null) note.note_tail.body.velocity.y = this.state.falling_speed;
  }

  hit_target_button() {
    //const NOTES = this.notes.getFirstExists(false);
    //NOTES.exists = true;
    //alert(NOTES);
    //if (NOTES) {
    //const GAP_TIME = Math.abs(this.game.time.now - NOTES.perfect_time);
    //if (GAP_TIME < 1000) {
    //if (GAP_TIME < 100) {
    //NOTES.point = 300;
    //} else if (GAP_TIME < 250) {
    //NOTES.point = 200;
    //} else if (GAP_TIME < 500) {
    //NOTES.point = 100;
    //} else {
    //NOTES.point = 50;
    //}
    //NOTES.kill();
    //}
    //}
  }
}

class Notes extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, index }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, index);

    for (let i = 0; i < 25; ++i) {
      this.add(
        new Note({
          game: this.game,
          x: button_config.play_scene.target_buttons[index].x,
          y: 0,
          key: "note"
        })
      );
    }

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 0.5);
    this.setAll("x", button_config.play_scene.target_buttons[index].x);
    this.setAll("y", 0);
  }
}

class Note extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.events.onKilled.add(this.game.state.getCurrentState().score.upgrade, this, 0, this.point);

    this.perfect_time = 0;
    this.point = 0;
  }
}

class Tails extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, index }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, index);

    for (let i = 0; i < 25; ++i) {
      this.add(
        new Tail({
          game: this.game,
          x: button_config.play_scene.target_buttons[index].x,
          y: 0,
          key: "tail"
        })
      );
    }

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 0.5);
    this.setAll("x", button_config.play_scene.target_buttons[index].x);
    this.setAll("y", 0);
  }
}

//class Tail extends Phaser.Sprite {
//constructor(game, state, note_info, half_note_height) {
//super(game, state.column_x[note_info[0]], -half_note_height, "note_tail");

//this.half_note_height;
//this.col = note_info[0];
//this.bonus_time = note_info[2] - note_info[1];
//this.shorten_scale = state.normal_falling_speed / 50 / this.height;
//this.anchor.setTo(0.5, 1);
//this.scale.setTo(1, (state.normal_falling_speed * this.bonus_time) / 1000 / this.height);
//this.alive = true;
//}
//}

class Score extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    //this.game.add.existing(this);

    //this.anchor.setTo(0.5, 0);
    //this.fixedToCamera = true;
    //this.setStyle({ fill: "white", font: "18px Arial" });
    //this.setText("score: 0");

    this.total_score = 0;
    this.perfect_score = 0;

    this.precision = 0;
    this.combo = 0;

    this.pefect = 0;
    this.great = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;
  }

  upgrade(point) {
    //const score = this.game.score;

    switch (point) {
      case 300:
        ++this.perfect;
        ++this.combo;
        break;

      case 200:
        ++this.great;
        ++this.combo;
        break;

      case 100:
        ++this.good;
        ++this.combo;
        break;

      case 50:
        ++this.bad;
        this.combo = 0;
        break;

      default:
        ++this.miss;
        this.combo = 0;
        //this.game.state.getCurrentState().note_btn[this.col].note_queue.pop();
        break;
    }

    this.total_score += point;
    this.perfect_score += 300;
    this.precision = this.total_score / this.perfect_score;
  }
}

//class Timer extends Phaser.Time {
//constructor({ game }) {
//super(game);

//this.game.time.events.loop(Phaser.Timer.SECOND, this.count, this);

//this.counter = 0;
//this.content = new Txt({ game: this.game, x: 50, y: 30, text: "time: 0", style: { font: "18px Arial", fill: "#ffffff" } });
//this.content.visible = true;
//}

//count() {
//const COUNTER = ++this.counter;
//this.content.setText("time: " + COUNTER);
//}
//}

//class Play_Scene_Background extends Phaser.TileSprite {
//constructor({ game, x, y, width, height, key, frame }) {
//super(game, x, y, width, height, key, frame);

//this.x = -260;
//this.y = HEIGHT * -1;
//this.y = 0;
//
//this.width = 1087;
//this.height = HEIGHT * 2;

//this.game.add.existing(this);
//}

//renew() {
//this.tilePosition += 4;
//}
//}

//class Img extends Phaser.Image {
//constructor({ game, frame, x, y, key }) {
//super(game, x, y, key, frame);

//this.game.add.existing(this);

//this.anchor.setTo(0.5, 0.5);
//}
//}
