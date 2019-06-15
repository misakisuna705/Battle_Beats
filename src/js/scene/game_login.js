class Game_Login extends Phaser.State {
  create() {
    this.login_button = new Button({ game: this.game, callback: this.login, callbackContext: this }, button_config.game_login.login_button);

    this.enter_scene();
  }

  login() {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {})
      .catch(error => {
        alert(error.message);
      });
  }

  enter_scene() {
    firebase.auth().onAuthStateChanged(user => {
      //if (user) {
      this.game.state.start("Game_Load");
      //}
    });
  }
}
