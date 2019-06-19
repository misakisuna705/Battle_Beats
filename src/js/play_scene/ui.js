class BG extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, key, frame }) {
    super(game, x, y, width, height, key, frame);

    this.game.add.existing(this);
  }

  renew() {
    this.tilePosition.y += 2;
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
