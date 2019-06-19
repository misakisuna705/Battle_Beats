class Play_Scene extends Phaser.State{create(){const t=this.game,e=t.time.events,s=t.active_song,n=button_config.play_scene;this.physics.startSystem(Phaser.Physics.ARCADE),this.bg=new BG({game:t,x:-300,y:-640,width:1124,height:1280,key:"bg"});const i=this.song_beatmap=song_config[s].beatmap[t.active_level],a=i.length;for(let t=0;t<a;++t)e.add(i[t][1],this.dispatch_note,this,t);const o=this.song_speed=song_config[s].info.bpm*song_config[s].info.nX;this.tails=[new Tails({game:t,enableBody:!0,index:0}),new Tails({game:t,enableBody:!0,index:1}),new Tails({game:t,enableBody:!0,index:2}),new Tails({game:t,enableBody:!0,index:3})],this.notes=[new Notes({game:t,enableBody:!0,index:0}),new Notes({game:t,enableBody:!0,index:1}),new Notes({game:t,enableBody:!0,index:2}),new Notes({game:t,enableBody:!0,index:3})],this.target_buttons=[new Button({game:t,callback:this.hit_button_0,callbackContext:this},n.target_buttons[0]),new Button({game:t,callback:this.hit_button_1,callbackContext:this},n.target_buttons[1]),new Button({game:t,callback:this.hit_button_2,callbackContext:this},n.target_buttons[2]),new Button({game:t,callback:this.hit_button_3,callbackContext:this},n.target_buttons[3])],this.song_audio=t.add.audio(song_config[s].AudioFilename,1,!1),e.add(t.height/o*1e3,this.play,this),this.timer=new Timer({game:t,x:12,y:36,text:"time: 0:00",style:{fill:"#ffffff"}})}update(){this.bg.renew()}play(){this.song_audio.play()}dispatch_note(t){const e=this.song_speed,s=button_config.play_scene,n=this.song_beatmap[t],i=n[0],a=n[1],o=s.target_buttons[i].x,h=this.notes[i].getFirstExists(!1,!1,o,0);if(h.exists=!0,h.body.velocity.y=e,h.perfect_time=a,h.point=0,3===n.length){const t=this.tails[i].getFirstExists(!1,!1,o,0);t.exists=!0,t.body.velocity.y=e,t.bonus_time=n[2]-a,t.scale.setTo(1,e*t.bonus_time/1e3/t.height*t.scale.y)}}hit_button_0(){}hit_button_1(){}hit_button_2(){}hit_button_3(){}}