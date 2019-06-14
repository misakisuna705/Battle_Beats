class Main_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;

    this.mode_buttons = new Buttons({ game: GAME, normal_style: { fill: "#008cff" }, active_style: { fill: "#ffffff" } });

    this.mode_buttons.add_button([
      new Button(
        { game: GAME, x: 360, y: 120, key: "mode_button", callback: this.choose_general_mode, callbackContext: this },
        { word: "一般模式", form: { fill: this.mode_buttons.active_style.fill } }
      ),

      new Button(
        { game: GAME, x: 360, y: 180, key: "mode_button", callback: this.choose_story_mode, callbackContext: this },
        { word: "故事模式", form: { fill: this.mode_buttons.normal_style.fill } }
      ),

      new Button(
        { game: GAME, x: 360, y: 240, key: "mode_button", callback: this.choose_method_button, callbackContext: this },
        { word: "玩法說明", form: { fill: this.mode_buttons.normal_style.fill } }
      )
    ]);

    this.mode_article = [
      new Article({
        game: GAME,
        x: 80,
        y: 120,
        text: "aaa\n" + "aaa\n" + "aaa\n" + "aaa",
        style: { fill: "#008cff" }
      }),

      new Article({
        game: GAME,
        x: 80,
        y: 120,
        text: "bbb\n" + "bbb\n" + "bbb\n" + "bbb",
        style: { fill: "#008cff" }
      }),

      new Article({
        game: GAME,
        x: 80,
        y: 120,
        text: "ccc\n" + "ccc\n" + "ccc\n" + "ccc",
        style: { fill: "#008cff" }
      })
    ];

    this.mode_article[0].visible = true;

    this.enter_button = new Button(
      { game: GAME, x: 444, y: 604, key: "enter_button", callback: this.enter_scene, callbackContext: this },
      { word: "確認", form: { fill: "#008cff" }, keycode: KEYCODE.ENTER }
    );

    this.exit_button = new Button(
      { game: GAME, x: 36, y: 36, key: "exit_button", callback: this.exit_scene, callbackContext: this },
      { word: "登出", form: { fill: "#008cff" }, keycode: KEYCODE.ESC }
    );
  }

  choose_general_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const NORMAL_STYLE = this.mode_buttons.normal_style;
    const ACTIVE_STYLE = this.mode_buttons.active_style;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(NORMAL_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 0;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(ACTIVE_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_story_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const NORMAL_STYLE = this.mode_buttons.normal_style;
    const ACTIVE_STYLE = this.mode_buttons.active_style;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(NORMAL_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 1;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(ACTIVE_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_method_button() {
    const MODE_BUTTONS = this.mode_buttons;
    const NORMAL_STYLE = this.mode_buttons.normal_style;
    const ACTIVE_STYLE = this.mode_buttons.active_style;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(NORMAL_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 2;

    MODE_BUTTONS.btns[MODE_BUTTONS.active].text.setStyle(ACTIVE_STYLE);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  enter_scene() {
    const GAME = this.game;

    switch (this.mode_buttons.active) {
      case 0:
        GAME.bgm.stop();
        GAME.state.start("Song_Scene");
        break;

      case 1:
        break;

      case 2:
        break;

      default:
        break;
    }
  }

  exit_scene() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.game.bgm.stop();
        this.game.state.start("Game_Login");
      })
      .catch(error => {
        alert(error.message);
      });
  }
}
