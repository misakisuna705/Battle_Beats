class Main_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const BUTTON_CONF = button_config.main_scene;
    const ARTICLE_CONF = article_config.main_scene;

    this.enter_button = new Button(
      { game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.enter_button
    );

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );

    const MODE_BUTTONS = (this.mode_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_mode, nxt_callback: this.choose_nxt_mode, callbackContext: this },
      BUTTON_CONF.mode_buttons
    ));

    const NORMAL_STYLE = MODE_BUTTONS.normal_style;

    MODE_BUTTONS.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_general_mode, callbackContext: this, form: { fill: MODE_BUTTONS.active_style.fill } },
        BUTTON_CONF.general_mode_button
      ),
      new Button({ game: GAME, callback: this.choose_story_mode, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.story_mode_button),
      new Button({ game: GAME, callback: this.choose_method_button, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.method_button),
      new Button({ game: GAME, callback: this.choose_npc_button, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.npc_button)
    ]);

    this.mode_article = [
      new Article({ game: GAME }, ARTICLE_CONF.general_mode_article),
      new Article({ game: GAME }, ARTICLE_CONF.story_mode_article),
      new Article({ game: GAME }, ARTICLE_CONF.method_article),
      new Article({ game: GAME }, ARTICLE_CONF.npc_article)
    ];

    this.mode_article[0].visible = true;
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

      case 3:
        GAME.state.start("NPC_Scene");
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
        this.game.state.start("Game_Login");
      })
      .catch(error => {
        alert(error.message);
      });
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

  choose_npc_button() {
    const MODE_BUTTONS = this.mode_buttons;
    const MODE_ARTICLE = this.mode_article;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.normal_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = false;

    MODE_BUTTONS.active = 3;

    MODE_BUTTONS.getAt(MODE_BUTTONS.active).text.setStyle(MODE_BUTTONS.active_style);
    MODE_ARTICLE[MODE_BUTTONS.active].visible = true;
  }
}
