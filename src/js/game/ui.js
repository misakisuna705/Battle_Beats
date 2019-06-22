class Txt extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Img extends Phaser.Image {
  constructor({ game, frame }, { x, y, key }) {
    super(game, x, y, key, frame);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Buttons extends Phaser.Group {
  constructor(
    { game, parent, name, addToStage, enableBody, physicsBodyType, pre_callback, nxt_callback, callbackContext },
    { normal_style, active_style, pre_keycode, nxt_keycode }
  ) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    const KEYBOARD = game.input.keyboard;

    this.normal_style = normal_style;
    this.active_style = active_style;

    this.active = 0;

    KEYBOARD.addKey(pre_keycode).onDown.add(pre_callback, callbackContext);
    KEYBOARD.addKey(nxt_keycode).onDown.add(nxt_callback, callbackContext);
  }
}

class Button extends Phaser.Button {
  constructor({ game, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, form }, { x, y, key, word, keycode }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    const GAME = this.game;

    GAME.add.existing(this);

    this.anchor.setTo(0.5, 0.5);

    if (keycode != undefined) {
      const PRESSKEY = (this.presskey = GAME.input.keyboard.addKey(keycode));

      PRESSKEY.onDown.add(callback, callbackContext);
    }

    this.text = new Txt({ game: GAME, x: this.x, y: this.y, text: word, style: form });
  }
}

class Article extends Phaser.Text {
  constructor({ game }, { x, y, text, style }) {
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.visible = false;
  }
}
