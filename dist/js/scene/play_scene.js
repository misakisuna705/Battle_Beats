class Play_Scene extends Phaser.State{create(){const t=this.game,e=t.time.events,i=t.active_song,s=button_config.play_scene;this.physics.startSystem(Phaser.Physics.ARCADE),this.bg_back=new BG({game:t,x:240,y:0,key:"bg_back"}),this.game.time.events.loop(20,this.bg_rotate,this),this.bg_middle=new BG({game:t,x:240,y:320,key:"bg_middle"}),this.bg_front=new BG({game:t,x:240,y:320,key:"bg_front"});const n=this.song_speed=song_config[i].info.bpm*song_config[i].info.nX;this.score=new Score({game:t,x:240,y:0,key:"target_button"}),this.tails=[new Tails({game:t,enableBody:!0,index:0}),new Tails({game:t,enableBody:!0,index:1}),new Tails({game:t,enableBody:!0,index:2}),new Tails({game:t,enableBody:!0,index:3})],this.notes=[new Notes({game:t,enableBody:!0,index:0}),new Notes({game:t,enableBody:!0,index:1}),new Notes({game:t,enableBody:!0,index:2}),new Notes({game:t,enableBody:!0,index:3})],this.target_buttons=[new Button({game:t,callback:this.hit_button_0,callbackContext:this},s.target_buttons[0]),new Button({game:t,callback:this.hit_button_1,callbackContext:this},s.target_buttons[1]),new Button({game:t,callback:this.hit_button_2,callbackContext:this},s.target_buttons[2]),new Button({game:t,callback:this.hit_button_3,callbackContext:this},s.target_buttons[3])];const a=this.song_beatmap=song_config[i].beatmap[t.active_level],o=a.length;for(let t=0;t<o;++t)e.add(a[t][1],this.dispatch_note,this,t);this.song_start_time=0,this.song_audio=t.add.audio(song_config[i].AudioFilename,1,!1),e.add(t.height/n*1e3,this.play,this),this.timer=new Timer({game:t,x:12,y:36,text:"time: 0:00",style:{fill:"#ffffff"}})}bg_rotate(){this.bg_back.angle+=5}play(){this.song_start_time=this.game.time.now,this.song_audio.play()}dispatch_note(t){const e=this.song_speed,i=button_config.play_scene,s=this.song_beatmap[t],n=s[0],a=s[1],o=i.target_buttons[n].x,l=this.notes[n].getFirstExists(!1,!1,o,0);if(l.exists=!0,l.body.velocity.y=e,l.perfect_time=a,l.point=0,3===s.length){const t=l.tail=this.tails[n].getFirstExists(!1,!1,o,0);t.exists=!0,t.body.velocity.y=e,t.bonus_time=s[2]-a,t.scale.setTo(1,1),t.scale.setTo(1,e*t.bonus_time/t.height/1e3)}else l.tail=null}hit_button_0(){let t=null,e=1/0;if(this.notes[0].getAll("exists",!0).forEach(i=>{i.perfect_time<e&&(t=i,e=i.perfect_time)}),t){const e=Math.abs(this.game.time.now-this.song_start_time-t.perfect_time);e<300&&(t.point=e<30?300:e<150?200:e<270?100:50,t.kill())}}hit_button_1(){let t=null,e=1/0;if(this.notes[1].getAll("exists",!0).forEach(i=>{i.perfect_time<e&&(t=i,e=i.perfect_time)}),t){const e=Math.abs(this.game.time.now-this.song_start_time-t.perfect_time);e<300&&(t.point=e<30?300:e<150?200:e<270?100:50,t.kill())}}hit_button_2(){let t=null,e=1/0;if(this.notes[2].getAll("exists",!0).forEach(i=>{i.perfect_time<e&&(t=i,e=i.perfect_time)}),t){const e=Math.abs(this.game.time.now-this.song_start_time-t.perfect_time);e<300&&(t.point=e<30?300:e<150?200:e<270?100:50,t.kill())}}hit_button_3(){let t=null,e=1/0;if(this.notes[3].getAll("exists",!0).forEach(i=>{i.perfect_time<e&&(t=i,e=i.perfect_time)}),t){const e=Math.abs(this.game.time.now-this.song_start_time-t.perfect_time);e<300&&(t.point=e<30?300:e<150?200:e<270?100:50,t.kill())}}}