class Song_Scene extends Phaser.State {
  init() {
    const GAME = this.game;

    //bgv
    GAME.bgv.addToWorld(0, 0, 0, 0, 1, 1);
    //bgm
    GAME.bgm.stop();
    //active
    if (GAME.active_song === -1) {
      GAME.active_song = 0;
    }
  }

  create() {
    const GAME = this.game;
    const WIDTH = GAME.width;
    const HEIGHT = GAME.height;
    const ADD = this.add;
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const ACTIVE = GAME.active_song;
    const BUTTON_CONF = button_config.song_scene;
    const SONG_BUTTONS_CONF = BUTTON_CONF.song_buttons;
    const SONG_BUTTONS_LENGTH = SONG_BUTTONS_CONF.length;
    const SONG_AUDIOS = GAME.songs;
    const SONGS_LENGTH = song_config.length;
    const NORMAL_STYLE = button_config.normal_style;

    //==============================new==============================//

    //enter button
    const ENTER_BUTTON = (this.enter_button = new Button({ game: GAME, x: (WIDTH / 16) * 15, y: (HEIGHT / 16) * 15 }, BUTTON_CONF.enter_button));
    //exit button
    const EXIT_BUTTON = (this.exit_button = new Button({ game: GAME, x: WIDTH / 16, y: HEIGHT / 16 }, BUTTON_CONF.exit_button));
    //song button
    const SONG_BUTTONS = (this.song_buttons = []);

    for (let i = 0; i < SONG_BUTTONS_LENGTH; ++i) {
      SONG_BUTTONS[i] = new Button({ game: GAME, x: (WIDTH / 8) * (i * 6 + 1), y: HEIGHT / 2, idx: i }, SONG_BUTTONS_CONF[i]);
    }
    //song cover
    //song info
    const SONG_COVERS = (this.song_covers = []);
    const SONG_INFOS = (this.song_infos = []);

    for (let i = 0; i < SONGS_LENGTH; ++i) {
      SONG_COVERS[i] = new Cover({ game: GAME, x: WIDTH / 2, y: (HEIGHT / 8) * 3 }, { key: song_config[i].cover });
      SONG_INFOS[i] = new Article({ game: GAME, x: (WIDTH / 32) * 11, y: (HEIGHT / 8) * 5 }, song_config[i].info);
    }
    //enter key
    const ENTER_KEY = (this.enter_key = KEYBOARD.addKey(KEYCODE.ENTER));
    //exit key
    const ESC_KEY = (this.esc_key = KEYBOARD.addKey(KEYCODE.ESC));
    //left key
    const LEFT_KEY = (this.left_key = KEYBOARD.addKey(KEYCODE.LEFT));
    //right key
    const RIGHT_KEY = (this.right_key = KEYBOARD.addKey(KEYCODE.RIGHT));

    //==============================add==============================//

    //enter button
    ADD.existing(ENTER_BUTTON);
    ADD.existing(ENTER_BUTTON.txt);
    //exit button
    ADD.existing(EXIT_BUTTON);
    ADD.existing(EXIT_BUTTON.txt);
    //song button
    for (let i = 0; i < SONG_BUTTONS_LENGTH; ++i) {
      ADD.existing(SONG_BUTTONS[i]);
      ADD.existing(SONG_BUTTONS[i].txt);
    }
    //song cover
    //song info
    for (let i = 0; i < SONGS_LENGTH; ++i) {
      ADD.existing(SONG_COVERS[i]);
      ADD.existing(SONG_INFOS[i]);
    }

    //==============================set==============================//

    //song cover
    //song info
    SONG_COVERS[ACTIVE].visible = true;
    SONG_INFOS[ACTIVE].visible = true;

    //==============================call==============================//

    //enter button
    ENTER_BUTTON.onInputDown.add(this.enter_scene, this);
    //exit button
    EXIT_BUTTON.onInputDown.add(this.exit_scene, this);
    //song button
    for (let i = 0; i < SONG_BUTTONS_LENGTH; ++i) {
      SONG_BUTTONS[i].onInputDown.add(this.select_song, this);
      SONG_BUTTONS[i].onInputUp.add(() => {
        SONG_BUTTONS[i].txt.setStyle(NORMAL_STYLE);
      }, this);
    }
    //song audio
    if (!SONG_AUDIOS[ACTIVE].isPlaying) {
      SONG_AUDIOS[ACTIVE].play();
    }

    //SONG_AUDIOS[ACTIVE].play();
    //let stopTime = ACTIVE_AUDIO.totalDuration;
    //ACTIVE_AUDIO.stop();
    //ACTIVE_AUDIO.addMarker(
    //"preview",
    //song_config[SONG_INFOS.active].info.PreviewTime / 1000,
    //(stopTime * 1000 - song_config[SONG_INFOS.active].info.PreviewTime) / 1000
    //);
    //ACTIVE_AUDIO.play("preview");
    //}

    //enter key
    ENTER_KEY.onDown.add(this.enter_scene, this);
    //esc key
    ESC_KEY.onDown.add(this.exit_scene, this);
    //left key
    LEFT_KEY.onDown.add(this.tour_song, this);
    LEFT_KEY.onUp.add(() => {
      SONG_BUTTONS[0].txt.setStyle(NORMAL_STYLE);
    }, this);
    //right key
    RIGHT_KEY.onDown.add(this.tour_song, this);
    RIGHT_KEY.onUp.add(() => {
      SONG_BUTTONS[1].txt.setStyle(NORMAL_STYLE);
    }, this);
  }

  //==============================func==============================//

  enter_scene() {
    this.game.state.start(game_config.scene.level_scene);
  }

  exit_scene() {
    const GAME = this.game;

    GAME.songs[GAME.active_song].stop();
    GAME.active_song = -1;
    GAME.bgm.play();

    GAME.state.start(game_config.scene.main_scene);
  }

  select_song(btn) {
    const GAME = this.game;
    const SONG_COVERS = this.song_covers;
    const SONG_INFOS = this.song_infos;
    const SONG_AUDIOS = GAME.songs;
    const LENGTH = song_config.length;

    //song cover
    //song info
    //song audio

    //pre
    SONG_COVERS[GAME.active_song].visible = false;
    SONG_INFOS[GAME.active_song].visible = false;
    SONG_AUDIOS[GAME.active_song].stop();
    //cur
    switch (btn.idx) {
      case 0:
        GAME.active_song = (GAME.active_song - 1 + LENGTH) % LENGTH;
        break;

      case 1:
        GAME.active_song = (GAME.active_song + 1) % LENGTH;
        break;

      default:
        break;
    }
    //nxt
    SONG_COVERS[GAME.active_song].visible = true;
    SONG_INFOS[GAME.active_song].visible = true;
    SONG_AUDIOS[GAME.active_song].play();

    //song button
    btn.txt.setStyle(button_config.active_style);
  }

  tour_song(key) {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;
    const SONG_BUTTONS = this.song_buttons;
    const SONG_COVERS = this.song_covers;
    const SONG_INFOS = this.song_infos;
    const SONG_AUDIOS = GAME.songs;
    const LENGTH = song_config.length;

    //pre

    //song cover
    //song info
    //song audio
    SONG_COVERS[GAME.active_song].visible = false;
    SONG_INFOS[GAME.active_song].visible = false;
    SONG_AUDIOS[GAME.active_song].stop();

    //cur

    //song button
    switch (key.keyCode) {
      case KEYCODE.LEFT:
        SONG_BUTTONS[0].txt.setStyle(button_config.active_style);
        GAME.active_song = (GAME.active_song - 1 + LENGTH) % LENGTH;
        break;

      case KEYCODE.RIGHT:
        SONG_BUTTONS[1].txt.setStyle(button_config.active_style);
        GAME.active_song = (GAME.active_song + 1) % LENGTH;
        break;

      default:
    }

    //nxt

    //song cover
    //song info
    //song audio
    SONG_COVERS[GAME.active_song].visible = true;
    SONG_INFOS[GAME.active_song].visible = true;
    SONG_AUDIOS[GAME.active_song].play();
  }
}
