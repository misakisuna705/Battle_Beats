class Txt extends Phaser.Text {
  constructor({ game, x, y }, { text, style }) {
    super(game, x, y, text, style);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Article extends Phaser.Text {
  constructor({ game, x, y }, { text, style }) {
    super(game, x, y, text, style);

    this.visible = false;
  }
}

class Total_Timer extends Phaser.Text {
  constructor({ game, x, y }, { text, style }) {
    super(game, x, y, text, style);

    this.anchor.setTo(0, 0.5);
  }

  render(seconds) {
    let str;

    if (seconds % 60 < 10) {
      str = ":0";
    } else {
      str = ":";
    }

    this.setText("time: " + parseInt(seconds / 60) + str + (parseInt(seconds) % 60));
  }
}

class Msk extends Phaser.Graphics {
  constructor({ game, x, y }) {
    super(game, x, y);

    const GAME = this.game;

    this.beginFill(0xffffff);
    this.drawRect(0, GAME.height / 2 + 30, GAME.width, GAME.height / 2 - 30);
  }
}

class Img extends Phaser.Image {
  constructor({ game, x, y, frame }, { key }) {
    super(game, x, y, key, frame);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Cover extends Phaser.Image {
  constructor({ game, x, y, frame }, { key }) {
    super(game, x, y, key, frame);

    this.anchor.setTo(0.5, 0.5);

    this.visible = false;
  }
}

class Button extends Phaser.Button {
  constructor({ game, x, y, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, idx }, { key, word, form }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    const GAME = this.game;

    //==============================new==============================//

    this.txt = new Txt({ game: GAME, x: this.x, y: this.y }, { text: word, style: form });
    this.idx = idx;

    //==============================set==============================//

    this.anchor.setTo(0.5, 0.5);
  }
}

class Notes extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, idx }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, idx);

    //==============================new==============================//

    for (let i = 0; i < 25; ++i) {
      this.add(new Note({ game: this.game, key: "note", idx: idx }));
    }

    //==============================set==============================//

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 0.5);
  }

  get_first_arrived() {
    let time = Infinity;
    let note = undefined;

    this.getAll("exists", true).forEach(child => {
      if (child.target_time < time) {
        time = child.target_time;
        note = child;
      }
    });

    return note;
  }
}

class Note extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.timer = undefined;
    this.target_time = undefined;
    this.point = 0;
  }

  dispatch(vx, vy, SX_FINAL, SY_FINAL, t_target, target_time) {
    const SCALE = this.scale;
    const SX_INIT = 0.01;
    const SY_INIT = SY_FINAL / 2;
    const DSX = (SX_FINAL - SX_INIT) / (t_target / 50);
    const DSY = (SY_FINAL - SY_INIT) / (t_target / 50);

    this.body.velocity.setTo(vx, vy);
    SCALE.setTo(DSX, DSY);
    this.target_time = target_time;

    const TIMER = (this.timer = this.game.time.create());

    TIMER.repeat(
      50,
      t_target / 50,
      () => {
        SCALE.setTo(SCALE.x + DSX, SCALE.y + DSY);
      },
      this
    );

    TIMER.start();
  }

  set_point(time, t_target) {
    const GAP = Math.abs(time - t_target - this.target_time);

    if (GAP < 300) {
      if (GAP < 30) {
        this.point = 300;
      } else if (GAP < 150) {
        this.point = 200;
      } else if (GAP < 270) {
        this.point = 100;
      } else {
        this.point = 50;
      }

      this.kill();
    } else {
      this.point = 0;
    }
  }
}

class Tails extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, idx }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, idx);

    for (let i = 0; i < 25; ++i) {
      this.add(new Tail({ game: this.game, key: "tail", idx }));
    }

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 1);
  }

  get_first_arrived() {
    let time = Infinity;
    let tail = undefined;

    this.getAll("exists", true).forEach(child => {
      if (child.target_time < time) {
        time = child.target_time;
        tail = child;
      }
    });

    return tail;
  }
}

class Tail extends Phaser.Sprite {
  constructor({ game, x, y, key, frame, idx }) {
    super(game, x, y, key, frame);

    this.mask = new Msk({ game: this.game, x: 0, y: 0 });

    this.timer = undefined;
    this.target_time = undefined;
    this.bonus_timer = undefined;
    this.bonus = 0;
  }

  dispatch(vx, vy, t_target, arrive_time, leave_time, angle) {
    const SCALE = this.scale;

    SCALE.setTo(1, 1);

    const SX_FINAL = 0.1;
    const SY_FINAL = ((vy / 1000) * (leave_time - arrive_time)) / this.height / Math.cos(angle);
    const SX_INIT = 0.01;
    const SY_INIT = SY_FINAL / 2;
    const DSX = (SX_FINAL - SX_INIT) / (t_target / 50);
    const DSY = (SY_FINAL - SY_INIT) / (t_target / 50);

    this.rotation = angle;
    this.body.velocity.setTo(vx, vy);
    SCALE.setTo(SX_INIT, SY_INIT);
    this.target_time = arrive_time;
    this.bonus_time = leave_time - arrive_time;

    const TIMER = (this.timer = this.game.time.create());

    TIMER.repeat(
      50,
      t_target / 50,
      () => {
        SCALE.setTo(SCALE.x + DSX, SCALE.y + DSY);
      },
      this
    );

    TIMER.start();
  }

  set_bonus(time, t_target, obj, vx, vy) {
    const GAP = Math.abs(time - t_target - this.target_time);

    if (GAP < 300) {
      if (GAP < 30) {
        this.bonus = 300 / 10;
      } else if (GAP < 150) {
        this.bonus = 200 / 10;
      } else if (GAP < 270) {
        this.bonus = 100 / 10;
      } else {
        this.bonus = 50 / 10;
      }

      const DSY = this.scale.y / (this.bonus_time / 50);
      this.scale.y -= DSY;

      this.bonus_timer = this.game.time.create();

      this.bonus_timer.repeat(
        50,
        this.bonus_time / 50,
        () => {
          let isDown = undefined;

          if (obj.input != undefined) {
            isDown = obj.input.pointerDown();
          } else {
            isDown = obj.isDown;
          }

          switch (isDown === true) {
            case true:
              this.body.velocity.setTo(0, 0);

              if (this.scale.y < 0) {
                this.scale.y = 0;
              } else {
                this.scale.y -= DSY;
              }

              this.game.state.getCurrentState().update_bonus(this);
              break;

            case false:
              this.body.velocity.setTo(vx, vy);
              break;

            default:
              break;
          }
        },
        this
      );

      this.bonus_timer.onComplete.add(() => {
        this.bonus = 0;
        this.kill();
      });

      this.bonus_timer.start();
    } else {
      this.bonus = 0;
    }
  }
}
