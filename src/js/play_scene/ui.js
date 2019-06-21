class BG extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
  }
}

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
  }

  point_upgrade(point) {
    switch (point) {
      case 300:
        ++this.excellent;
        ++this.combo;
        this.combo_controller.hit(this.combo, 0);
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
