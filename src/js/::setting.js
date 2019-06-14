//class Setting extends Phaser.Button {
//constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }) {
//super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

//this.onInputDown.add(this.setting_scene, this);

//this.shadow = new Shadow({ game: this.game, x: game.width / 2, y: game.height / 2, key: "shadow" });
//this.board = new Board({ game: this.game, x: game.width / 2, y: 180, key: "board" });
//}

//setting_scene() {
//const GAME = this.game;
//const SHADOW = this.shadow;
//const BOARD = this.board;

//SHADOW.visible = !SHADOW.visible;
//BOARD.visible = !BOARD.visible;
//GAME.paused = !GAME.paused;
//}
//}

//class Shadow extends Phaser.Image {
//constructor({ game, x, y, key, frame }) {
//super(game, x, y, key, frame);

//this.anchor.setTo(0.5, 0.5);
//this.visible = false;
//}
//}

//class Board extends Phaser.Image {
//constructor({ game, x, y, key, frame }) {
//super(game, x, y, key, frame);

//this.anchor.setTo(0.5, 0.5);
//this.visible = false;

//this.contents = [
//new Txt({ game: GAME, x: WIDTH / 2, y: 170, text: "遊戲說明" }),
//new Txt({ game: GAME, x: WIDTH / 2, y: 245, text: "重新開始" }),
//new Txt({ game: GAME, x: WIDTH / 2, y: 320, text: "回主畫面" })
//];
//}
//}

//class Txt extends Phaser.Text {
//constructor({ game, x, y, text, style }) {
//super(game, x, y, text, style);

//this.anchor.setTo(0.5, 0.5);
//this.visible = false;

//this.game.add.existing(this);
//}
//}
