class Song_Scene extends Phaser.State {
  init() {
    this.game.bgm.stop();
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
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

    this.song_infos = new Song_Infos({ game: GAME });

    this.song_infos.addMultiple([
      new Song_Info({ game: this.game }, only_my_railgun_config.info, only_my_railgun_config.audio),
      new Song_Info({ game: this.game }, senbonzakura_config.info, senbonzakura_config.audio)
    ]);

    this.song_infos.getAt(0).visible = true;
    this.song_infos.getAt(0).title.visible = true;
    this.song_infos.getAt(0).artist.visible = true;
    this.song_infos.getAt(0).album.visible = true;
    this.song_infos.getAt(0).audio.play();
  }

  enter_scene() {
    this.game.state.start("Level_Scene");
  }

  exit_scene() {
    const GAME = this.game;
    const SONG_INFOS = this.song_infos;

    SONG_INFOS.getAt(SONG_INFOS.active).audio.stop();
    GAME.bgm.play();

    GAME.state.start("Main_Scene");
  }

  choose_pre_song() {
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
    SONG_INFOS.getAt(SONG_INFOS.active).audio.stop();

    SONG_INFOS.active = (SONG_INFOS.active - 1 + LENGTH) % LENGTH;
    this.game.active_song = SONG_INFOS.active;

    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).audio.play();
  }

  choose_nxt_song() {
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;

    SONG_BUTTONS.getAt(SONG_BUTTONS.active).text.setStyle(SONG_BUTTONS.normal_style);
    SONG_BUTTONS.active = 1;
    SONG_BUTTONS.getAt(1).text.setStyle(SONG_BUTTONS.active_style);

    SONG_INFOS.getAt(SONG_INFOS.active).visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).audio.stop();

    SONG_INFOS.active = (SONG_INFOS.active + 1) % SONG_INFOS.length;
    this.game.active_song = SONG_INFOS.active;

    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).title.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).artist.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).audio.play();
  }
}
