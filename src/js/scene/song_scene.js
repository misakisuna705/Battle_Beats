class Song_Scene extends Phaser.State {
  init() {
    const GAME = this.game;

    if (GAME.active_song === -1) {
      GAME.active_song = 0;
    }

    GAME.bgm.stop();
    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const ACTIVE_SONG = GAME.active_song;

    const KEYCODE = Phaser.Keyboard;
    const BUTTON_CONF = button_config.song_scene;

    this.enter_button = new Button(
      { game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.enter_button
    );

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );

    const SONG_BUTTONS = (this.song_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_song, nxt_callback: this.choose_nxt_song, callbackContext: this },
      BUTTON_CONF.song_buttons
    ));

    const NORMAL_STYLE = SONG_BUTTONS.normal_style;

    SONG_BUTTONS.addMultiple([
      new Button({ game: GAME, callback: this.choose_pre_song, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.left_song_button),
      new Button({ game: GAME, callback: this.choose_nxt_song, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.right_song_button)
    ]);

    const SONG_INFOS = (this.song_infos = new Songs({ game: GAME }));

    for (let i = 0; i < song_size; ++i) {
      SONG_INFOS.add(new Song_Info({ game: GAME }, song_config[i].info));
    }

    if (!GAME.song_audios) {
      GAME.song_audios = [];
      for (let i = 0; i < song_size; i++) {
        GAME.song_audios[i] = GAME.add.audio(song_config[i].AudioFilename, 1, true);
      }
    }

    SONG_INFOS.getAt(ACTIVE_SONG).visible = true;
    SONG_INFOS.getAt(ACTIVE_SONG).title.visible = true;
    SONG_INFOS.getAt(ACTIVE_SONG).artist.visible = true;
    SONG_INFOS.getAt(ACTIVE_SONG).album.visible = true;

    const ACTIVE_AUDIO = GAME.song_audios[ACTIVE_SONG];

    if (!ACTIVE_AUDIO.isPlaying) {
      ACTIVE_AUDIO.play();
    }
  }

  enter_scene() {
    this.game.state.start("Level_Scene");
  }

  exit_scene() {
    const GAME = this.game;
    const SONG_INFOS = this.song_infos;

    GAME.song_audios[GAME.active_song].stop();

    GAME.bgm.play();
    GAME.state.start("Main_Scene");
  }

  choose_pre_song() {
    const GAME = this.game;
    const SONG_AUDIOS = GAME.song_audios;
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;
    const LENGTH = SONG_INFOS.length;

    SONG_BUTTONS.getAt(SONG_BUTTONS.active).text.setStyle(SONG_BUTTONS.normal_style);
    SONG_BUTTONS.active = 0;
    SONG_BUTTONS.getAt(0).text.setStyle(SONG_BUTTONS.active_style);

    SONG_INFOS.getAt(SONG_INFOS.active).visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = false;

    SONG_AUDIOS[SONG_INFOS.active].stop();

    SONG_INFOS.active = (SONG_INFOS.active - 1 + LENGTH) % LENGTH;

    SONG_AUDIOS[SONG_INFOS.active].play();

    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;

    GAME.active_song = SONG_INFOS.active;
  }

  choose_nxt_song() {
    const GAME = this.game;
    const SONG_AUDIOS = GAME.song_audios;
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;

    SONG_BUTTONS.getAt(SONG_BUTTONS.active).text.setStyle(SONG_BUTTONS.normal_style);
    SONG_BUTTONS.active = 1;
    SONG_BUTTONS.getAt(1).text.setStyle(SONG_BUTTONS.active_style);

    SONG_INFOS.getAt(SONG_INFOS.active).visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = false;

    SONG_AUDIOS[SONG_INFOS.active].stop();

    SONG_INFOS.active = (SONG_INFOS.active + 1) % SONG_INFOS.length;

    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;

    SONG_AUDIOS[SONG_INFOS.active].play();

    GAME.active_song = SONG_INFOS.active;
  }
}
