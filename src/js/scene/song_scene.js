class Song_Scene extends Phaser.State {
  init() {
    const GAME = this.game;

    GAME.bgm.stop();
    GAME.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
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

    this.song_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_song, nxt_callback: this.choose_nxt_song, callbackContext: this },
      BUTTON_CONF.song_buttons
    );

    this.song_buttons.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_pre_song, callbackContext: this, form: { fill: this.song_buttons.normal_style.fill } },
        BUTTON_CONF.left_song_button
      ),

      new Button(
        { game: GAME, callback: this.choose_nxt_song, callbackContext: this, form: { fill: this.song_buttons.normal_style.fill } },
        BUTTON_CONF.right_song_button
      )
    ]);

    if (this.game.active_song === -1) {
      this.game.active_song = 0;
    }

    this.song_infos = new Songs({ game: GAME });
    for (let i = 0; i < song_size; ++i) {
      this.song_infos.add(new Song_Info({ game: this.game }, song_config[i].info));
    }

    if (!this.game.song_audios) {
      this.game.song_audios = [];
      for (let i = 0; i < song_size; i++) {
        this.game.song_audios[i] = GAME.add.audio(song_config[i].AudioFilename, 1, true);
      }
    }

    this.song_infos.getAt(this.game.active_song).visible = true;
    this.song_infos.getAt(this.game.active_song).title.visible = true;
    this.song_infos.getAt(this.game.active_song).artist.visible = true;
    this.song_infos.getAt(this.game.active_song).album.visible = true;

    if (!this.game.song_audios[this.game.active_song].isPlaying) {
      this.game.song_audios[this.game.active_song].play();
    }
  }

  enter_scene() {
    this.game.state.start("Level_Scene");
  }

  exit_scene() {
    const GAME = this.game;
    const SONG_INFOS = this.song_infos;

    this.game.song_audios[this.game.active_song].stop();

    GAME.bgm.play();
    GAME.state.start("Main_Scene");
  }

  choose_pre_song() {
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;
    const SONG_AUDIOS = this.game.song_audios;
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

    this.game.active_song = SONG_INFOS.active;
  }

  choose_nxt_song() {
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;
    const SONG_AUDIOS = this.game.song_audios;

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

    this.game.active_song = SONG_INFOS.active;
  }
}
