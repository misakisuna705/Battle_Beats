class Timer extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    const GAME = this.game;

    GAME.add.existing(this);
    GAME.time.events.loop(Phaser.Timer.SECOND, this.count, this);

    this.anchor.setTo(0, 0.5);

    this.second = 0;
    this.minute = 0;
  }

  count() {
    ++this.second;

    if (this.second % 60 === 0) {
      ++this.minute;
      this.second = 0;
    }

    const MINUTE = this.minute;
    const SECOND = this.second;

    if (SECOND < 10) {
      this.setText("time: " + MINUTE + ":0" + SECOND);
    } else {
      this.setText("time: " + MINUTE + ":" + SECOND);
    }
  }
}

class Score extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    const GAME = this.game;

    GAME.add.existing(this);

    this.anchor.setTo(0.5, 0.5);

    this.total_score = 0;
    this.excellent_score = 0;

    this.precision = 0;
    this.combo = 0;

    this.excellent = 0;
    this.great = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;

    this.total_score_txt = new Txt({ game: GAME, x: 240, y: 36, text: "score: 0", style: { fill: "#ffffff" } });

    this.combo_controller = new Combo(this.game);
    this.boss_controller = new Boss({ game: this.game, x: boss_config.Px, y: boss_config.Py, key: boss_config.key });
    this.boss_controller.start();
  }

  point_upgrade(point) {
    switch (point) {
      case 300:
        ++this.excellent;
        ++this.combo;
        this.combo_controller.hit(this.combo, 0);
        this.boss_controller.beAttacked(300);
        this.boss_controller.beAttacked(200);
        break;

      case 200:
        ++this.great;
        ++this.combo;
        this.combo_controller.hit(this.combo, 1);
        break;

      case 100:
        ++this.good;
        ++this.combo;
        this.combo_controller.hit(this.combo, 2);
        break;

      case 50:
        ++this.bad;
        this.combo = 0;
        this.combo_controller.hit(this.combo, 3);
        break;

      case 0:
        ++this.miss;
        this.combo = 0;
        this.combo_controller.hit(this.combo, 4);
        break;
    }

    this.total_score += point;
    this.excellent_score += 300;
    this.precision = this.total_score / this.excellent_score;

    this.total_score_txt.setText("score: " + this.total_score);
  }

  bonus_upgrade(bonus) {
    this.total_score += bonus;
    this.excellent_score += bonus;

    this.total_score_txt.setText("score: " + this.total_score);
  }
}

class Combo {
  constructor(game) {
    try {
      this.x = combo_config.Px;
      this.y = combo_config.Py;
      this.prevState = -1;
      this.states = [];

      if (combo_config.state.length < 5) {
        throw "state's image not enough,we need five image";
      } else {
        combo_config.state.forEach(key => {
          let s = new Phaser.Image(game, 0, 0, key);

          game.add.existing(s);

          s.visible = false;
          s.anchor.set(0.5, 0.5);
          s.y = this.y + s.height / 2;
          s.x = this.x;

          this.states.push(s);
        });
      }

      this.numbers = [];

      this.num_tweens = [];

      for (let i = 0; i < 4; i++) {
        let tmp = new Phaser.Image(game, 0, 0, combo_config.number);

        game.add.existing(tmp);

        tmp.visible = false;
        tmp.y = this.y - tmp.height / 2;
        tmp.anchor.set(0.5, 0.5);

        let tw = game.add.tween(tmp.scale).to({ x: 1.5, y: 1.5 }, 30, Phaser.Easing.Linear.None);

        this.num_tweens.push(tw);
        this.numbers.push(tmp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  hit(combo, state) {
    let firstX = 0;
    let c = String(combo);
    let l = c.length;
    let dx = this.numbers[0].width / 2;

    switch (l) {
      case 1:
        let n0 = this.numbers[0];

        n0.visible = true;
        n0.frame = parseInt(c[0]);
        n0.x = this.x;

        this.num_tweens[0].yoyo(true).start();

        for (let i = 1; i < 4; i++) {
          this.numbers[i].visible = false;
        }
        break;

      case 2:
        firstX = this.x - dx / 2;

        for (let i = 0; i < 2; i++) {
          let ni = this.numbers[i];

          ni.visible = true;
          ni.frame = parseInt(c[i]);
          ni.x = firstX;
          firstX = firstX + dx;

          this.num_tweens[i].yoyo(true).start();
        }

        for (let i = 2; i < 4; i++) {
          this.numbers[i].visible = false;
        }
        break;

      case 3:
        firstX = this.x - dx;

        for (let i = 0; i < 3; i++) {
          let ni = this.numbers[i];

          ni.visible = true;
          ni.frame = parseInt(c[i]);
          ni.x = firstX;

          firstX = firstX + dx;

          this.num_tweens[i].yoyo(true).start();
        }

        this.numbers[3].visible = false;
        break;

      case 4:
        firstX = this.x - dx / 2 - dx;

        for (let i = 0; i < 4; i++) {
          let ni = this.numbers[i];

          ni.visible = true;
          ni.frame = parseInt(c[i]);
          ni.x = firstX;

          firstX = firstX + dx;

          this.num_tweens[i].yoyo(true).start();
        }
    }

    if (this.prevState == -1) {
      let s = this.states[state];

      s.visible = true;

      this.prevState = state;
    } else {
      let s = this.states[state];

      s.visible = true;

      if (state != this.prevState) {
        this.states[this.prevState].visible = false;
      }

      this.prevState = state;
    }
  }
}

class Score_Board extends Phaser.Image {
  constructor({ game, frame }, { x, y, key }) {
    super(game, x, y, key, frame);

    const GAME = this.game;

    GAME.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.visible = false;

    this.hit_info = [];
    this.overall_info = [];

    for (let i = 0; i < 5; ++i) {
      this.hit_info[i] = new Article({ game: GAME, x: this.x - 180, y: this.y - 80 + 40 * i }, scoreboard_config.hit_info[i]);
      this.overall_info[i] = new Article({ game: GAME, x: this.x, y: this.y - 80 + 40 * i }, scoreboard_config.overall_info[i]);
    }
  }

  upload_score() {}

  show() {
    this.visible = true;

    for (let i = 0; i < 5; ++i) {
      this.hit_info[i].visible = true;
      this.overall_info[i].visible = true;
    }
  }
}

class Boss extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.maxHealth = this.hp;
    this.setHealth(boss_config.hp);
    this.scale.setTo(boss_config.Sx / this.width, boss_config.Sy / this.height);
    this.anchor.setTo(0.5, 0.5);
    //this.animations.add('atk'+i,a[0],a[1],false).onComplete.add(this.ar,this,0);
    if (boss_config.idle != null && boss_config.idle != undefined) {
      this.ani_idle = this.animations.add("idle", boss_config.idle[0], boss_config.idle[1], true);
      this.haveIdle = true;
    } else {
      this.haveIdle = false;
    }
    if (boss_config.back != null && boss_config.back != undefined) {
      this.ani_back = this.animations.add("back", boss_config.back[0], boss_config.back[1]);
      if (this.haveIdle) this.ani_back.onComplete.add(this.idle, this, 0);
      this.haveBack = true;
    } else {
      this.haveBack = false;
    }
    if (boss_config.dead != null && boss_config.dead != undefined) {
      this.ani_dead = this.animations.add("dead", boss_config.dead[0], boss_config.dead[1]);
      this.haveDead = true;
      this.ani_dead.onComplete.add(this.kill, this, 0);
    } else {
      this.haveDead = false;
    }
  }

  start() {
    try {
      //console.log(this);
      this.game.add.existing(this);
      if (this.haveIdle) {
        this.animations.play("idle");
      }
    } catch (e) {
      console.log(e);
    }
  }
  beAttacked(x) {
    if (this.health > 0) {
      this.health = this.health - x;
      if (this.health <= 0) {
        if (this.haveDead) {
          this.ani_dead.play();
        } else {
          this.kill();
        }
      } else {
        if (!this.ani_back.isPlaying) this.ani_back.play();
      }
    }
  }
  idle() {
    if (this.haveIdle) {
      this.ani_idle.play();
    }
  }
}
