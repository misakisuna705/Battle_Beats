class Song_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const KEYCODE = Phaser.Keyboard;
    const CONF = config.song_scene;

    this.enter_button = new Button({ game: GAME, callback: this.enter_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.enter_button);
    this.exit_button = new Button({ game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } }, CONF.exit_button);

    this.song_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_song, nxt_callback: this.choose_nxt_song, callbackContext: this },
      CONF.song_buttons
    );

    this.song_buttons.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_pre_song, callbackContext: this, form: { fill: this.song_buttons.normal_style.fill } },
        CONF.left_song_button
      ),

      new Button(
        { game: GAME, callback: this.choose_nxt_song, callbackContext: this, form: { fill: this.song_buttons.normal_style.fill } },
        CONF.right_song_button
      )
    ]);

    this.song_infos = new Song_Infos({ game: GAME });
    this.song_infos.addMultiple([new Song_Info({ game: GAME }, CONF.only_my_railgun), new Song_Info({ game: GAME }, CONF.senbonzakura)]);
    this.song_infos.getAt(0).visible = true;
    this.song_infos.getAt(0).album.visible = true;
  }

  choose_pre_song() {
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;
    const LENGTH = SONG_INFOS.length;

    SONG_BUTTONS.getAt(SONG_BUTTONS.active).text.setStyle(SONG_BUTTONS.normal_style);
    SONG_BUTTONS.active = 0;
    SONG_BUTTONS.getAt(0).text.setStyle(SONG_BUTTONS.active_style);

    SONG_INFOS.getAt(SONG_INFOS.active).visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = false;
    SONG_INFOS.active = (SONG_INFOS.active - 1 + LENGTH) % LENGTH;
    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;
  }

  choose_nxt_song() {
    const SONG_BUTTONS = this.song_buttons;
    const SONG_INFOS = this.song_infos;

    SONG_BUTTONS.getAt(SONG_BUTTONS.active).text.setStyle(SONG_BUTTONS.normal_style);
    SONG_BUTTONS.active = 1;
    SONG_BUTTONS.getAt(1).text.setStyle(SONG_BUTTONS.active_style);

    SONG_INFOS.getAt(SONG_INFOS.active).visible = false;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = false;
    SONG_INFOS.active = (SONG_INFOS.active + 1) % SONG_INFOS.length;
    SONG_INFOS.getAt(SONG_INFOS.active).visible = true;
    SONG_INFOS.getAt(SONG_INFOS.active).album.visible = true;
  }

  enter_scene() {}

  exit_scene() {
    this.game.state.start("Main_Scene");
  }
}
