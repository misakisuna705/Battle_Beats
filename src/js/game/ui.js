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

class Img extends Phaser.Image {
  constructor({ game, x, y, frame }, { key }) {
    super(game, x, y, key, frame);

    this.anchor.setTo(0.5, 0.5);
  }
}

class Button extends Phaser.Button {
  constructor({ game, x, y, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, idx }, { key, keycode, word, form }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    const GAME = this.game;

    //==============================new==============================//

    this.txt = new Txt({ game: GAME, x: this.x, y: this.y }, { text: word, style: form });
    this.idx = idx;

    //==============================set==============================//

    this.anchor.setTo(0.5, 0.5);

    if (keycode != undefined) {
      const PRESSKEY = (this.presskey = GAME.input.keyboard.addKey(keycode));

      PRESSKEY.onDown.add(callback, callbackContext);
    }
  }
}

class Leader_Score extends Phaser.Text {
  constructor({ game, x, y, text, style }) {
    super(game, x, y, text, style);

    this.visible = false;

    this.game.add.existing(this);
  }
}
