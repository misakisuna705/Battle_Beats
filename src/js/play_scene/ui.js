class BG extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, key, frame }) {
    super(game, x, y, width, height, key, frame);

    this.game.add.existing(this);
  }

  renew() {
    this.tilePosition.y += 2;
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
    this.perfect_score = 0;

    this.precision = 0;
    this.combo = 0;

    this.pefect = 0;
    this.great = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;

    this.total_score_txt = new Txt({ game: GAME, x: 240, y: 36, text: "score: 0", style: { fill: "#ffffff" } });
  }

  point_upgrade(point) {
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
        break;
    }

    this.total_score += point;
    this.perfect_score += 300;
    this.precision = this.total_score / this.perfect_score;

    this.total_score_txt.setText("score: " + this.total_score);
  }

  bonus_upgrade(bonus) {
    this.total_score += bonus;
    this.perfect_score += bonus;

    this.total_score_txt.setText("score: " + this.total_score);
  }
}
