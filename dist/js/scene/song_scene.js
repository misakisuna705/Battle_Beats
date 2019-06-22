class Song_Scene extends Phaser.State{init(){const t=this.game;-1===t.active_song&&(t.active_song=0),t.bgm.stop(),t.bgv.addToWorld(-400,0,0,0,1,1)}create(){const t=this.game,e=t.active_song,i=(Phaser.Keyboard,button_config.song_scene);this.enter_button=new Button({game:t,callback:this.enter_scene,callbackContext:this,form:{fill:"#008cff"}},i.enter_button),this.exit_button=new Button({game:t,callback:this.exit_scene,callbackContext:this,form:{fill:"#008cff"}},i.exit_button);const s=this.song_buttons=new Buttons({game:t,pre_callback:this.choose_pre_song,nxt_callback:this.choose_nxt_song,callbackContext:this},i.song_buttons),a=s.normal_style;s.addMultiple([new Button({game:t,callback:this.choose_pre_song,callbackContext:this,form:a},i.left_song_button),new Button({game:t,callback:this.choose_nxt_song,callbackContext:this,form:a},i.right_song_button)]);const o=this.song_infos=new Songs({game:t});for(let e=0;e<song_size;++e)o.add(new Song_Info({game:t},song_config[e].info));if(!t.song_audios){t.song_audios=[];for(let e=0;e<song_size;e++)t.song_audios[e]=t.add.audio(song_config[e].AudioFilename,1,!0)}o.getAt(e).visible=!0,o.getAt(e).title.visible=!0,o.getAt(e).artist.visible=!0,o.getAt(e).album.visible=!0;const n=t.song_audios[e];n.isPlaying||n.play()}enter_scene(){this.game.state.start("Level_Scene")}exit_scene(){const t=this.game;this.song_infos;t.song_audios[t.active_song].stop(),t.bgm.play(),t.state.start("Main_Scene")}choose_pre_song(){const t=this.game,e=t.song_audios,i=this.song_buttons,s=this.song_infos,a=s.length;i.getAt(i.active).text.setStyle(i.normal_style),i.active=0,i.getAt(0).text.setStyle(i.active_style),s.getAt(s.active).visible=!1,s.getAt(s.active).title.visible=!1,s.getAt(s.active).artist.visible=!1,s.getAt(s.active).album.visible=!1,e[s.active].stop(),s.active=(s.active-1+a)%a,e[s.active].play(),s.getAt(s.active).visible=!0,s.getAt(s.active).title.visible=!0,s.getAt(s.active).artist.visible=!0,s.getAt(s.active).album.visible=!0,t.active_song=s.active}choose_nxt_song(){const t=this.game,e=t.song_audios,i=this.song_buttons,s=this.song_infos;i.getAt(i.active).text.setStyle(i.normal_style),i.active=1,i.getAt(1).text.setStyle(i.active_style),s.getAt(s.active).visible=!1,s.getAt(s.active).title.visible=!1,s.getAt(s.active).artist.visible=!1,s.getAt(s.active).album.visible=!1,e[s.active].stop(),s.active=(s.active+1)%s.length,s.getAt(s.active).visible=!0,s.getAt(s.active).title.visible=!0,s.getAt(s.active).artist.visible=!0,s.getAt(s.active).album.visible=!0,e[s.active].play(),t.active_song=s.active}}