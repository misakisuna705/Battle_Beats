class Main_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const CONF = config.main_scene;

    this.enter_button = new Button({ game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.enter_button);
    this.exit_button = new Button({ game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.exit_button);

    this.mode_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_mode, nxt_callback: this.choose_nxt_mode, callbackContext: this },
      CONF.mode_buttons
    );

    this.mode_buttons.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_general_mode, callbackContext: this, form: { fill: this.mode_buttons.active_style.fill } },
        CONF.general_mode_button
      ),

      new Button(
        { game: GAME, callback: this.choose_story_mode, callbackContext: this, form: { fill: this.mode_buttons.normal_style.fill } },
        CONF.story_mode_button
      ),

      new Button(
        { game: GAME, callback: this.choose_method_button, callbackContext: this, form: { fill: this.mode_buttons.normal_style.fill } },
        CONF.method_button
      )
    ]);

    this.mode_article = [
      new Article({ game: GAME }, CONF.general_mode_article),
      new Article({ game: GAME }, CONF.story_mode_article),
      new Article({ game: GAME }, CONF.method_article)
    ];

    this.mode_article[0].visible = true;
  }

  choose_pre_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;
    const LENGTH = MODE_BUTTONS.length;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = (MODE_BUTTONS.active - 1 + LENGTH) % LENGTH;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_nxt_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = (MODE_BUTTONS.active + 1) % MODE_BUTTONS.length;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_general_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 0;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_story_mode() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 1;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  choose_method_button() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 2;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }

  enter_scene() {
    const GAME = this.game;

    switch (this.mode_buttons.active) {
      case 0:
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
