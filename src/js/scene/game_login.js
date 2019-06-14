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
    const CONF = config.game_login;

    //GAME.bgv = new Game_Load_Bgv({ game: GAME, key: "game_load_bgv" });
    const BGV = (GAME.bgv = GAME.add.video("game_load_bgv"));
    BGV.addToWorld(-400, 0, 0, 0, 1, 1);
    BGV.play(true);

    //GAME.bgm = new Game_Load_Bgm({ game: GAME, key: "game_load_bgm", volume: 0.5, loop: true });
    const BGM = (GAME.bgm = GAME.add.audio("game_load_bgm", 1, true));
    BGM.play();

    GAME.add.image(0, 0, "game_load_title");

    this.login_button = new Button({ game: GAME, callback: this.login, callbackContext: this }, CONF.login_button);

    this.enter_scene();
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

  enter_scene() {
    firebase.auth().onAuthStateChanged(user => {
      //if (user) {
      this.game.state.start("Game_Load");
      //}
    });
  }
}
