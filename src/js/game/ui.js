class Txt extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Img extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Button extends Phaser.Button {
  constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }, { word, form, keycode }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    const GAME = this.game;

    GAME.add.existing(this);

    this.anchor.setTo(0.5, 0.5);

    if (keycode != undefined) {
      GAME.input.keyboard.addKey(keycode).onDown.add(callback, callbackContext);
    }

    this.onInputDown.add(callback, callbackContext);

    this.text = new Txt({ game: GAME, x: this.x, y: this.y, text: word, style: form });
  }
}

class Buttons {
  constructor({ game, normal_style, active_style }) {
    const KEYBOARD = game.input.keyboard;
    const KEYCODE = Phaser.Keyboard;

    this.game = game;

    this.normal_style = normal_style;
    this.active_style = active_style;

    this.btns = [];

    this.enable = true;

    this.active = 0;

    this.length = 0;

    this.UP = KEYBOARD.addKey(KEYCODE.UP);
    this.DOWN = KEYBOARD.addKey(KEYCODE.DOWN);

    this.UP.onDown.add(this.move_up, this);
    this.DOWN.onDown.add(this.move_down, this);
  }

  add_button(btns) {
    this.btns = btns;
    this.length = btns.length;
  }

  move_up() {
    if (this.enable) {
      this.btns[this.active].text.setStyle(this.normal_style);
      this.game.state.getCurrentState().mode_article[this.active].visible = false;

      this.active = (this.active - 1 + this.length) % this.length;

      this.btns[this.active].text.setStyle(this.active_style);
      this.game.state.getCurrentState().mode_article[this.active].visible = true;
    }
  }

  move_down() {
    if (this.enable) {
      this.btns[this.active].text.setStyle(this.normal_style);
      this.game.state.getCurrentState().mode_article[this.active].visible = false;

      this.active = (this.active + 1) % this.length;

      this.btns[this.active].text.setStyle(this.active_style);
      this.game.state.getCurrentState().mode_article[this.active].visible = true;
    }
  }
}

class Article extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.visible = false;
    this.game.add.existing(this);
  }
}
