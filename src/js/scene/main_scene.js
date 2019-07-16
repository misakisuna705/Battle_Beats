class Main_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
    //active
    this.active_button = 0;
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;

    const ADD = this.add;

    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;

    const ACTIVE = this.active_button;

    const BUTTON_CONF = button_config.main_scene;
    const MODE_BUTTONS_CONF = BUTTON_CONF.mode_buttons;
    const ARTICLE_CONF = article_config.main_scene;

    const LENGTH = MODE_BUTTONS_CONF.length;

    //==============================new==============================//

    //enter button
    const ENTER_BUTTON = (this.enter_button = new Button(
      { game: GAME, x: (WIDTH / 16) * 15, y: (HEIGHT / 16) * 15, callback: this.enter_scene, callbackContext: this },
      BUTTON_CONF.enter_button
    ));
    //exit button
    const EXIT_BUTTON = (this.exit_button = new Button(
      { game: GAME, x: WIDTH / 16, y: HEIGHT / 16, callback: this.exit_scene, callbackContext: this },
      BUTTON_CONF.exit_button
    ));
    //mode
    const MODE_BUTTONS = (this.mode_buttons = []);
    const MODE_ARTICLES = (this.mode_articles = []);

    for (let i = 0; i < LENGTH; ++i) {
      MODE_BUTTONS[i] = new Button(
        { game: GAME, x: (WIDTH / 4) * 3, y: (HEIGHT / 8) * (i + 1), callback: this.select_mode, idx: i },
        MODE_BUTTONS_CONF[i]
      );
      MODE_ARTICLES[i] = new Article({ game: GAME, x: WIDTH / 8, y: HEIGHT / 8 }, ARTICLE_CONF[i]);
    }
    //key
    const UP_KEY = (this.up_key = KEYBOARD.addKey(KEYCODE.UP));
    const DOWN_KEY = (this.down_key = KEYBOARD.addKey(KEYCODE.DOWN));

    //==============================add==============================//

    //enter button
    ADD.existing(ENTER_BUTTON);
    ADD.existing(ENTER_BUTTON.txt);
    //exit button
    ADD.existing(EXIT_BUTTON);
    ADD.existing(EXIT_BUTTON.txt);
    //mode
    for (let i = 0; i < LENGTH; ++i) {
      ADD.existing(MODE_BUTTONS[i]);
      ADD.existing(MODE_BUTTONS[i].txt);
      ADD.existing(MODE_ARTICLES[i]);
    }

    //==============================set==============================//

    //mode
    MODE_BUTTONS[ACTIVE].txt.setStyle(button_config.active_style);
    MODE_ARTICLES[ACTIVE].visible = true;

    //==============================call==============================//

    //key
    UP_KEY.onDown.add(this.tour_mode, this);
    DOWN_KEY.onDown.add(this.tour_mode, this);
  }

  //==============================func==============================//

  enter_scene() {
    const STATE = this.game.state;
    const SCENE_CONF = game_config.scene;

    switch (this.active_button) {
      case 0:
        //STATE.start("Song_Scene");
        break;
      case 1:
        break;

      case 2:
        break;

      default:
        STATE.start(SCENE_CONF.hero_scene);
        break;
    }
  }

  exit_scene() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.game.state.start(game_config.scene.game_login);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  select_mode() {
    const STATE = this.game.state.getCurrentState();
    const MODE_BUTTONS = STATE.mode_buttons;
    const MODE_ARTICLES = STATE.mode_articles;
    const LENGTH = MODE_BUTTONS.length;

    for (let i = 0; i < LENGTH; i++) {
      MODE_BUTTONS[i].txt.setStyle(button_config.normal_style);
      MODE_ARTICLES[i].visible = false;
    }

    const ACTIVE = (STATE.active_button = this.idx);

    MODE_BUTTONS[ACTIVE].txt.setStyle(button_config.active_style);
    MODE_ARTICLES[ACTIVE].visible = true;
  }

  tour_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_articles;
    const LENGTH = MODE_BUTTONS.length;

    MODE_BUTTONS[this.active_button].txt.setStyle(button_config.normal_style);
    MODE_ARTICLE[this.active_button].visible = false;

    switch (this.up_key.isDown) {
      case true:
        this.active_button = (this.active_button - 1 + LENGTH) % LENGTH;
        break;

      default:
        this.active_button = (this.active_button + 1) % LENGTH;
        break;
    }

    MODE_BUTTONS[this.active_button].txt.setStyle(button_config.active_style);
    MODE_ARTICLE[this.active_button].visible = true;
  }
}
