class Game_Login extends Phaser.State {
  init() {
    if (!this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    }
  }

  preload() {
    const LOAD = this.game.load;

    LOAD.image("game_load_title", "assets/game_load/title.png");
    LOAD.image("login_button", "assets/game_load/google.png");
    LOAD.audio("game_load_bgm", "assets/game_load/victory.mp3");
    LOAD.video("game_load_bgv", "assets/game_load/bgv.mp4");
  }

  create() {
    const GAME = this.game;

    //bgm

    if (!GAME.bgm) {
      GAME.bgm = GAME.sound.add("game_load_bgm", 1, true);
    }

    if (!GAME.bgm.isPlaying) {
      GAME.bgm.play();
    }

    //bgv

    const BGV = (GAME.bgv = GAME.add.video("game_load_bgv"));

    BGV.addToWorld(-400, 0, 0, 0, 1, 1);
    BGV.play(true);

    //login button

    this.login_button = new Button({ game: GAME, callback: this.login, callbackContext: this }, button_config.game_login.login_button);

    //title

    GAME.add.image(0, 0, "game_load_title");

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
