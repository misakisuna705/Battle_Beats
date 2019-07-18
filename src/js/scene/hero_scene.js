class Hero_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
    //active
    this.active_hero = 0;
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const SPACEBAR = KEYCODE.SPACEBAR;
    const ACTIVE = this.active_hero;
    const BUTTON_CONF = button_config.hero_scene;
    const HERO_BUTTONS_CONF = BUTTON_CONF.hero_buttons;
    const HERO_BUTTONS_LENGTH = HERO_BUTTONS_CONF.length;
    const HEROS_LENGTH = heros_config.length;
    const NORMAL_STYLE = button_config.normal_style;

    //==============================new==============================//

    //exit button
    const EXIT_BUTTON = (this.exit_button = new Button({ game: GAME, x: WIDTH / 16, y: HEIGHT / 16 }, BUTTON_CONF.exit_button));
    //hero button
    const HERO_BUTTONS = (this.hero_buttons = []);

    for (let i = 0; i < HERO_BUTTONS_LENGTH; ++i) {
      HERO_BUTTONS[i] = new Button({ game: GAME, x: (WIDTH / 8) * (i * 6 + 1), y: HEIGHT / 2, idx: i }, HERO_BUTTONS_CONF[i]);
    }
    //hero
    const HEROS = (this.heros = []);
    const HERO_INFOS = (this.hero_infos = []);

    for (let i = 0; i < HEROS_LENGTH; ++i) {
      HEROS[i] = new Hero({ game: GAME, x: WIDTH / 4, y: HEIGHT / 2, key: heros_config[i].key, keycode: SPACEBAR, idx: i });
      HERO_INFOS[i] = new Article({ game: GAME, x: (WIDTH / 8) * 3, y: (HEIGHT / 8) * 3 }, heros_config[i].info);
    }
    //exit key
    const ESC_KEY = (this.esc_key = KEYBOARD.addKey(KEYCODE.ESC));
    //left key
    const LEFT_KEY = (this.left_key = KEYBOARD.addKey(KEYCODE.LEFT));
    //right key
    const RIGHT_KEY = (this.right_key = KEYBOARD.addKey(KEYCODE.RIGHT));

    //==============================add==============================//

    //exit button
    ADD.existing(EXIT_BUTTON);
    ADD.existing(EXIT_BUTTON.txt);
    //hero button
    for (let i = 0; i < HERO_BUTTONS_LENGTH; ++i) {
      ADD.existing(HERO_BUTTONS[i]);
      ADD.existing(HERO_BUTTONS[i].txt);
    }
    //hero
    for (let i = 0; i < HEROS_LENGTH; ++i) {
      ADD.existing(HEROS[i]);
      ADD.existing(HERO_INFOS[i]);
    }

    //==============================set==============================//

    const ATKKEY = HEROS[ACTIVE].atkKey;

    //hero
    HEROS[ACTIVE].visible = true;
    HERO_INFOS[this.active_hero].visible = true;
    //key
    ATKKEY.onHoldContext = HEROS[ACTIVE];
    ATKKEY.onHoldCallback = HEROS[ACTIVE].skill;

    //==============================call==============================//

    //exit button
    EXIT_BUTTON.onInputDown.add(this.exit_scene, this);
    //hero
    for (let i = 0; i < HEROS_LENGTH; ++i) {
      HEROS[i].animations.play("idle");
    }
    //hero button
    for (let i = 0; i < HERO_BUTTONS_LENGTH; ++i) {
      HERO_BUTTONS[i].onInputDown.add(this.select_hero, this);
      HERO_BUTTONS[i].onInputUp.add(btn => {
        btn.txt.setStyle(NORMAL_STYLE);
      }, this);
    }
    //esc key
    ESC_KEY.onDown.add(this.exit_scene, this);
    //left key
    LEFT_KEY.onDown.add(this.tour_hero, this);
    LEFT_KEY.onUp.add(() => {
      for (let i = 0; i < HERO_BUTTONS_LENGTH; ++i) {
        HERO_BUTTONS[i].txt.setStyle(NORMAL_STYLE);
      }
    }, this);
    //right key
    RIGHT_KEY.onDown.add(this.tour_hero, this);
    RIGHT_KEY.onUp.add(() => {
      for (let i = 0; i < HERO_BUTTONS_LENGTH; ++i) {
        HERO_BUTTONS[i].txt.setStyle(NORMAL_STYLE);
      }
    }, this);
  }

  //==============================func==============================//

  exit_scene() {
    this.game.state.start(game_config.scene.main_scene);
  }

  select_hero(btn) {
    const HEROS = this.heros;
    const HERO_INFOS = this.hero_infos;
    const LENGTH = heros_config.length;

    //pre

    //hero
    HEROS[this.active_hero].visible = false;
    HERO_INFOS[this.active_hero].visible = false;

    //cur

    switch (btn.idx) {
      case 0:
        this.active_hero = (this.active_hero - 1 + LENGTH) % LENGTH;
        break;

      case 1:
        this.active_hero = (this.active_hero + 1) % LENGTH;
        break;

      default:
        break;
    }
    //nxt

    //hero button
    btn.txt.setStyle(button_config.active_style);
    //hero
    HEROS[this.active_hero].visible = true;
    HERO_INFOS[this.active_hero].visible = true;

    HEROS[this.active_hero].atkKey.onHoldContext = HEROS[this.active_hero];
    HEROS[this.active_hero].atkKey.onHoldCallback = HEROS[this.active_hero].skill;
  }

  tour_hero(key) {
    const KEYCODE = Phaser.Keyboard;
    const HERO_BUTTONS = this.hero_buttons;
    const HEROS = this.heros;
    const HERO_INFOS = this.hero_infos;
    const LENGTH = heros_config.length;

    //pre

    //hero
    HEROS[this.active_hero].visible = false;
    HERO_INFOS[this.active_hero].visible = false;

    //cur

    switch (key.keyCode) {
      case KEYCODE.LEFT:
        //hero button
        HERO_BUTTONS[0].txt.setStyle(button_config.active_style);
        //hero
        this.active_hero = (this.active_hero - 1 + LENGTH) % LENGTH;
        break;

      case KEYCODE.RIGHT:
        //hero button
        HERO_BUTTONS[1].txt.setStyle(button_config.active_style);
        //hero
        this.active_hero = (this.active_hero + 1) % LENGTH;
        break;

      default:
        break;
    }

    //hero
    HEROS[this.active_hero].visible = true;
    HERO_INFOS[this.active_hero].visible = true;

    HEROS[this.active_hero].atkKey.onHoldContext = HEROS[this.active_hero];
    HEROS[this.active_hero].atkKey.onHoldCallback = HEROS[this.active_hero].skill;
  }
}
