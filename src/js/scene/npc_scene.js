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

    const NPC_BUTTONS = (this.npc_buttons = new Buttons(
      { game: GAME, pre_callback: this.choose_pre_npc, nxt_callback: this.choose_nxt_npc, callbackContext: this },
      BUTTON_CONF.npc_buttons
    ));

    const NORMAL_STYLE = NPC_BUTTONS.normal_style;

    this.npc_buttons.addMultiple([
      new Button({ game: GAME, callback: this.choose_pre_npc, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.left_npc_button),
      new Button({ game: GAME, callback: this.choose_nxt_npc, callbackContext: this, form: NORMAL_STYLE }, BUTTON_CONF.right_npc_button)
    ]);

    this.npcs = [];
    hero_config.forEach(config => {
      const I = this.npcs.push(new HERO(300, 300, 240, 150, GAME, this, config, Phaser.Keyboard.D, false));

      this.npcs[I - 1].start();
      this.npcs[I - 1].visible = false;
    });

    const INDEX = (this.idx = 0);
    const NPC = this.npcs[this.idx];
    const ATKKEY = NPC.atkKey;

    NPC.visible = true;
    NPC.info.visible = true;
    ATKKEY.onHoldContext = NPC;
    ATKKEY.onHoldCallback = NPC.skill;
  }

  exit_scene() {
    this.game.state.start("Main_Scene");
  }

  choose_pre_npc() {
    const NPC_BUTTONS = this.npc_buttons;
    const NPCS = this.npcs;
    const LENGTH = NPCS.length;

    NPC_BUTTONS.getAt(NPC_BUTTONS.active).text.setStyle(NPC_BUTTONS.normal_style);
    NPC_BUTTONS.active = 0;
    NPC_BUTTONS.getAt(0).text.setStyle(NPC_BUTTONS.active_style);

    NPCS[this.idx].visible = false;
    NPCS[this.idx].info.visible = false;

    this.idx = (this.idx - 1 + LENGTH) % LENGTH;

    NPCS[this.idx].visible = true;
    NPCS[this.idx].info.visible = true;
    NPCS[this.idx].atkKey.onHoldContext = NPCS[this.idx];
    NPCS[this.idx].atkKey.onHoldCallback = NPCS[this.idx].skill;
  }

  choose_nxt_npc() {
    const NPC_BUTTONS = this.npc_buttons;
    const NPCS = this.npcs;

    NPC_BUTTONS.getAt(NPC_BUTTONS.active).text.setStyle(NPC_BUTTONS.normal_style);
    NPC_BUTTONS.active = 1;
    NPC_BUTTONS.getAt(1).text.setStyle(NPC_BUTTONS.active_style);

    NPCS[this.idx].visible = false;
    NPCS[this.idx].info.visible = false;

    this.idx = (this.idx + 1) % NPCS.length;

    NPCS[this.idx].visible = true;
    NPCS[this.idx].info.visible = true;
    NPCS[this.idx].atkKey.onHoldContext = NPCS[this.idx];
    NPCS[this.idx].atkKey.onHoldCallback = NPCS[this.idx].skill;
  }
}
