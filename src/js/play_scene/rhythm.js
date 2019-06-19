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
  }
}

class Note extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    //this.events.onKilled.add(this.game.state.getCurrentState().score.upgrade, this, 0, this.point);

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
    this.setAll("anchor.y", 1);
  }
}

class Tail extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.bonus_time = 0;
  }
}
