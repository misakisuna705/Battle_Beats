class Only_My_Railgun extends Phaser.Button {
  constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo(0.5, 0.5);
    this.onInputDown.add(this.change_state, this);

    this.game.add.existing(this);

    this.name = game.add.text(this.x, this.y, "Only My Railgun", { fill: "#ffffff" });
    this.name.anchor.setTo(0.5, 0.5);

    this.album = new Img({ game: this.game, x: 120, y: 80, key: "infinite_synthesis" });

    this.tags = [
      new Txt({ game: this.game, x: 120, y: 300, text: "infinite synthesis", style: { fill: "#ffffff" } }),
      new Txt({ game: this.game, x: 120, y: 360, text: "fripside", style: { fill: "#ffffff" } })
    ];

    this.album.visible = true;
    for (let i = 0; i < 2; i++) {
      this.tags[i].visible = true;
    }
  }

  change_state() {}
}

class Song_1 extends Phaser.Button {
  constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo(0.5, 0.5);
    this.onInputDown.add(this.change_state, this);

    this.game.add.existing(this);

    this.text = game.add.text(this.x, this.y, "Song_1", { fill: "#008cff" });
    this.text.anchor.setTo(0.5, 0.5);

    this.contents = [
      new Txt({ game: this.game, x: 80, y: 120, text: "專輯封面1", style: { fill: "#ffffff" } }),
      new Txt({ game: this.game, x: 80, y: 150, text: "專輯1", style: { fill: "#ffffff" } }),
      new Txt({ game: this.game, x: 80, y: 180, text: "歌手1", style: { fill: "#ffffff" } })
    ];
  }

  change_state() {}
}

class Song_2 extends Phaser.Button {
  constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo(0.5, 0.5);

    this.game.add.existing(this);

    this.text = game.add.text(this.x, this.y, "Song_2", { fill: "#008cff" });
    this.text.anchor.setTo(0.5, 0.5);

    this.contents = [
      new Txt({ game: this.game, x: 80, y: 120, text: "專輯封面2", style: { fill: "#ffffff" } }),
      new Txt({ game: this.game, x: 80, y: 150, text: "專輯2", style: { fill: "#ffffff" } }),
      new Txt({ game: this.game, x: 80, y: 180, text: "歌手2", style: { fill: "#ffffff" } })
    ];
  }
}
