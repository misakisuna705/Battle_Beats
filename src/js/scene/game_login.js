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
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;

    //==============================new==============================//

    //title
    const TITLE = (this.title = new Img({ game: GAME, x: WIDTH / 2, y: HEIGHT / 8 }, game_config.title));
    //login button
    const LOGIN_BUTTON = (this.login_button = new Button({ game: GAME, x: WIDTH / 2, y: (HEIGHT / 8) * 7 }, button_config.game_login.login_button));
    //enter key
    const ENTER_KEY = (this.enter_key = KEYBOARD.addKey(KEYCODE.ENTER));

    //==============================add==============================//

    //title
    ADD.existing(TITLE);
    //login button
    ADD.existing(LOGIN_BUTTON);

    //==============================call==============================//

    //login button
    LOGIN_BUTTON.onInputDown.add(this.login, this);
    //enter key
    ENTER_KEY.onDown.add(this.login, this);
    //auth
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
