class Login extends Phaser.Button {
  constructor({ game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame }) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo(0.5, 0.5);

    this.game.add.existing(this);

    this.onInputDown.add(this.login, this);
  }

  login() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {})
      .catch(error => {
        alert(error.message);
      });
  }
}
