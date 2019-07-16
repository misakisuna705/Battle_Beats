class Game_Login extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;

    //==============================new==============================//

    //title
    const TITLE = (this.title = new Img({ game: GAME, x: WIDTH / 2, y: HEIGHT / 8 }, game_config.title));
    //login button
    const LOAGING_BUTTON = (this.login_button = new Button(
      { game: GAME, x: WIDTH / 2, y: (HEIGHT / 8) * 7, callback: this.login, callbackContext: this },
      button_config.game_login.login_button
    ));

    //==============================add==============================//

    //title
    ADD.existing(TITLE);
    //login button
    ADD.existing(LOAGING_BUTTON);

    //==============================call==============================//

    firebase.auth().onAuthStateChanged(user => {
      //if (user) {
      GAME.state.start(game_config.scene.main_scene);
      //}
    });
  }

  //==============================func==============================//

  login() {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {})
      .catch(error => {
        alert(error.message);
      });
  }
}
