class NPC_Scene extends Phaser.State {
  init() {
    this.game.bgv.addToWorld(-400, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const BUTTON_CONF = button_config.npc_scene;

    this.exit_button = new Button(
      { game: GAME, callback: this.exit_scene, callbackContext: this, form: { fill: "#008cff" } },
      BUTTON_CONF.exit_button
    );

    this.npc_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_npc, nxt_callback: this.choose_nxt_npc, callbackContext: this },
      BUTTON_CONF.npc_buttons
    );

    this.npc_buttons.addMultiple([
      new Button(
        { game: GAME, callback: this.choose_pre_npc, callbackContext: this, form: { fill: this.npc_buttons.normal_style.fill } },
        BUTTON_CONF.left_npc_button
      ),

      new Button(
        { game: GAME, callback: this.choose_nxt_npc, callbackContext: this, form: { fill: this.npc_buttons.normal_style.fill } },
        BUTTON_CONF.right_npc_button
      )
    ]);

    this.npcs = [];
    npcs_config.forEach(config => {
      const I = this.npcs.push(new HERO(300, 300, 240, 150, GAME, this, config, Phaser.Keyboard.D, false));

      this.npcs[I - 1].start();
      this.npcs[I - 1].visible = false;
      this.npcs[I - 1].info.visible = false;
    });

    this.idx = 0;
    this.npcs[this.idx].visible = true;
    this.npcs[this.idx].info.visible = true;
    this.npcs[this.idx].atkKey.onHoldContext = this.npcs[this.idx];
    this.npcs[this.idx].atkKey.onHoldCallback = this.npcs[this.idx].skill;
  }

  exit_scene() {
    this.game.state.start("Main_Scene");
  }

  choose_pre_npc() {
    const NPCS = this.npcs;
    const LENGTH = NPCS.length;

    NPCS[this.idx].visible = false;
    NPCS[this.idx].info.visible = false;

    this.idx = (this.idx - 1 + LENGTH) % LENGTH;

    NPCS[this.idx].visible = true;
    NPCS[this.idx].info.visible = true;
    NPCS[this.idx].atkKey.onHoldContext = NPCS[this.idx];
    NPCS[this.idx].atkKey.onHoldCallback = NPCS[this.idx].skill;
  }

  choose_nxt_npc() {
    const NPCS = this.npcs;

    NPCS[this.idx].visible = false;
    NPCS[this.idx].info.visible = false;

    this.idx = (this.idx + 1) % NPCS.length;

    NPCS[this.idx].visible = true;
    NPCS[this.idx].info.visible = true;
    NPCS[this.idx].atkKey.onHoldContext = NPCS[this.idx];
    NPCS[this.idx].atkKey.onHoldCallback = NPCS[this.idx].skill;
  }
}
