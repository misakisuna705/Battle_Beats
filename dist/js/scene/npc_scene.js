class NPC_Scene extends Phaser.State{init(){this.game.bgv.addToWorld(-400,0,0,0,1,1)}create(){const t=this.game,i=button_config.npc_scene;this.exit_button=new Button({game:t,callback:this.exit_scene,callbackContext:this,form:{fill:"#008cff"}},i.exit_button);const s=(this.npc_buttons=new Buttons({game:t,pre_callback:this.choose_pre_npc,nxt_callback:this.choose_nxt_npc,callbackContext:this},i.npc_buttons)).normal_style;this.npc_buttons.addMultiple([new Button({game:t,callback:this.choose_pre_npc,callbackContext:this,form:s},i.left_npc_button),new Button({game:t,callback:this.choose_nxt_npc,callbackContext:this,form:s},i.right_npc_button)]),this.npcs=[],npcs_config.forEach(i=>{const s=this.npcs.push(new HERO(300,300,240,150,t,this,i,Phaser.Keyboard.D,!1));this.npcs[s-1].start(),this.npcs[s-1].visible=!1,this.npcs[s-1].info.visible=!1});this.idx=0;const e=this.npcs[this.idx],n=e.atkKey;e.visible=!0,e.info.visible=!0,n.onHoldContext=e,n.onHoldCallback=e.skill}exit_scene(){this.game.state.start("Main_Scene")}choose_pre_npc(){const t=this.npc_buttons,i=this.npcs,s=i.length;t.getAt(t.active).text.setStyle(t.normal_style),t.active=0,t.getAt(0).text.setStyle(t.active_style),i[this.idx].visible=!1,i[this.idx].info.visible=!1,this.idx=(this.idx-1+s)%s,i[this.idx].visible=!0,i[this.idx].info.visible=!0,i[this.idx].atkKey.onHoldContext=i[this.idx],i[this.idx].atkKey.onHoldCallback=i[this.idx].skill}choose_nxt_npc(){const t=this.npc_buttons,i=this.npcs;t.getAt(t.active).text.setStyle(t.normal_style),t.active=1,t.getAt(1).text.setStyle(t.active_style),i[this.idx].visible=!1,i[this.idx].info.visible=!1,this.idx=(this.idx+1)%i.length,i[this.idx].visible=!0,i[this.idx].info.visible=!0,i[this.idx].atkKey.onHoldContext=i[this.idx],i[this.idx].atkKey.onHoldCallback=i[this.idx].skill}}