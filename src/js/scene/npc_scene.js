class NPC_Scene extends Phaser.State {
  create() {
    const GAME = this.game;
    this.idx = 0;
    const BUTTON_CONF = button_config.song_scene;

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );

    this.npc_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_song, nxt_callback: this.choose_nxt_song, callbackContext: this },
      BUTTON_CONF.song_buttons
    );

    this.npc_buttons.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_pre_song, callbackContext: this, form: { fill: this.npc_buttons.normal_style.fill } },
        BUTTON_CONF.left_song_button
      ),

      new Button(
        { game: GAME, callback: this.choose_nxt_song, callbackContext: this, form: { fill: this.npc_buttons.normal_style.fill } },
        BUTTON_CONF.right_song_button
      )
    ]);

    this.npc_infos = [];

    npcs_config.forEach(n => {
      let i = this.npc_infos.push(new HERO(200, 200, this.game.width / 2, this.game.height / 2, GAME, this, n, Phaser.Keyboard.D, false));

      this.npc_infos[i - 1].start();
      this.npc_infos[i - 1].visible = false;
    });
  }
  exit_scene() {
    const GAME = this.game;

    GAME.bgm.play();
    GAME.state.start("Main_Scene");
  }

  choose_pre_song() {
    const heros = this.npc_infos;
    let curHero = heros[this.idx];
    curHero.visible = false;

    if (this.idx - 1 < 0) {
      this.idx = heros.length - 1;
      var nextHero = heros[this.idx];
    } else {
      this.idx = this.idx - 1;
      var nextHero = heros[this.idx];
    }
    nextHero.visible = true;
    nextHero.atkKey.onHoldContext = nextHero;
    nextHero.atkKey.onHoldCallback = nextHero.skill;
  }

  choose_nxt_song() {
    const heros = this.npc_infos;
    let curHero = heros[this.idx];
    curHero.visible = false;

    if (this.idx + 1 >= heros.length) {
      this.idx = 0;
      var nextHero = heros[this.idx];
    } else {
      this.idx = this.idx + 1;
      var nextHero = heros[this.idx];
    }
    nextHero.visible = true;
    nextHero.atkKey.onHoldContext = nextHero;
    nextHero.atkKey.onHoldCallback = nextHero.skill;
  }
}
