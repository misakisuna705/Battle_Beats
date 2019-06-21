class Notes extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, index }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, index);

    for (let i = 0; i < 25; ++i) {
      this.add(new Note({ game: this.game, key: "note", index: index }));
    }

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 1);
  }
}

class Note extends Phaser.Sprite {
  constructor({ game, x, y, key, frame, index }) {
    super(game, x, y, key, frame);

    this.index = index;
    this.perfect_time = 0;
    this.point = 0;
    this.tail = null;

    this.events.onKilled.add(this.hit, this);
  }

  hit() {
    this.game.state.getCurrentState().score.point_upgrade(this.point);

    if (this.tail) {
      this.tail.hit();
    }
  }
}

class Tails extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType, index }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType, index);

    for (let i = 0; i < 25; ++i) {
      this.add(new Tail({ game: this.game, key: "tail", index }));
    }

    this.setAll("exists", false);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 1);
  }
}

class Tail extends Phaser.Sprite {
  constructor({ game, x, y, key, frame, index }) {
    super(game, x, y, key, frame);

    this.index = index;
    this.ispressed = false;
    this.timer = null;
    this.bonus = 2;
    this.bonus_time = 0;
    this.decrement = ((this.game.state.getCurrentState().song_speed / 1000) * 20) / this.height;
  }

  hit() {
    this.ispressed = true;

    this.timer = this.game.time.create();

    this.timer.repeat(
      20,
      this.bonus_time / 20,
      () => {
        if (this.ispressed) {
          if (this.game.state.getCurrentState().target_buttons[this.index].presskey.isDown) {
            this.body.velocity.y = 0;

            if (this.scale.y < 0) {
              this.scale.y = 0;
            } else {
              this.scale.y -= this.decrement;
            }

            this.game.state.getCurrentState().score.bonus_upgrade(this.bonus);
          } else {
            this.ispressed = false;
            this.body.velocity.y = this.game.state.getCurrentState().song_speed;
          }
        }
      },
      this
    );

    this.timer.onComplete.add(() => {
      if (this.game.state.getCurrentState().target_buttons[this.index].presskey.isDown) {
        this.scale.y = 0;
      }
    });

    this.timer.start();
  }
}
