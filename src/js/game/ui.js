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
    //this.setAll("anchor.y", 1);
  }
}

class Note extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.timer = undefined;
    this.target_time = undefined;
    this.point = 0;

    //this.events.onKilled.add(this.hit, this);
  }

  dispatch() {}

  //hit() {
  //this.game.state.getCurrentState().score.point_upgrade(this.point);

  //if (this.tail) {
  //this.tail.hit();
  //}
  //}
  //update_scale() {
  //const state = this.game.state.getCurrentState();
  //this.scale.x += state.note_enlarge_scale_x;
  //this.scale.y += state.note_enlarge_scale_y;
  //}
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
    //this.setAll("anchor.y", 1);
  }
}

class Tail extends Phaser.Sprite {
  constructor({ game, x, y, key, frame, idx }) {
    super(game, x, y, key, frame);

    this.mask = new Msk({ game: this.game, x: 0, y: 0 });

    this.timer;
    this.target_time = undefined;
    this.bonus_timer = undefined;
    this.bonus = 0;

    //this.ispressed = false;
    //this.decrement = ((this.game.state.getCurrentState().init_velocity_y / 1000) * 20) / this.height;
    //this.events.onKilled.add(function() {
    //console.log("kill");
    //}, this);
  }

  //hit() {
  //this.ispressed = true;

  //this.timer = this.game.time.create();

  //this.timer.repeat(
  //20,
  //this.bonus_time / 20,
  //() => {
  //if (this.ispressed) {
  //if (this.game.state.getCurrentState().target_buttons[this.index].presskey.isDown) {
  //this.body.velocity.y = 0;
  //this.body.velocity.x = 0;

  //if (this.scale.y < 0) {
  //this.scale.y = 0;
  //} else {
  //this.scale.y -= this.decrement;
  //}

  //this.game.state.getCurrentState().score.bonus_upgrade(this.bonus);
  //} else {
  //this.ispressed = false;
  //const state = this.game.state.getCurrentState();
  //this.body.velocity.y = this.game.state.getCurrentState().init_velocity_y;
  //this.body.velocity.x = this.game.state.getCurrentState().init_velocity_x[this.index];
  //}
  //}
  //},
  //this
  //);

  //this.timer.onComplete.add(() => {
  //if (this.game.state.getCurrentState().target_buttons[this.index].presskey.isDown) {
  //this.scale.y = 0;
  //console.log(this.exists);
  //console.log(this.alive);
  //console.log(this.visible);
  //this.kill();
  //}
  //});

  //this.timer.start();
  //}
  //update_scale() {
  //const state = this.game.state.getCurrentState();
  //this.scale.y += this.tail_enlarge_scale_y;
  //}
}
