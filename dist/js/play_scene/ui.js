class Timer extends Phaser.Text{constructor({game:t,x:s,y:e,text:i,style:o}){super(t,s,e,i,o);const h=this.game;h.add.existing(this),h.time.events.loop(Phaser.Timer.SECOND,this.count,this),this.anchor.setTo(0,.5),this.second=0,this.minute=0}count(){++this.second,this.second%60==0&&(++this.minute,this.second=0);const t=this.minute,s=this.second;s<10?this.setText("time: "+t+":0"+s):this.setText("time: "+t+":"+s)}}class Score extends Phaser.Image{constructor({game:t,x:s,y:e,key:i,frame:o}){super(t,s,e,i,o);const h=this.game;this.visible=!1,this.anchor.setTo(.5,.5),this.total_score=0,this.excellent_score=0,this.precision=0,this.combo=0,this.excellent=0,this.great=0,this.good=0,this.bad=0,this.miss=0,this.total_score_txt=new Txt({game:h,x:240,y:36,text:"score: 0",style:{fill:"#ffffff"}}),this.combo_controller=new Combo(this.game),this.boss_controller=new Boss({game:this.game,x:boss_config.Px,y:boss_config.Py,key:boss_config.key}),this.boss_controller.start(),h.add.existing(this),this.hit_info=[],this.overall_info=[];for(let t=0;t<5;++t)this.hit_info[t]=new Article({game:h,x:this.x-180,y:this.y-80+40*t},scoreboard_config.hit_info[t]),this.overall_info[t]=new Article({game:h,x:this.x-20,y:this.y-80+40*t},scoreboard_config.overall_info[t])}point_upgrade(t){switch(t){case 300:++this.excellent,++this.combo,this.combo_controller.hit(this.combo,0),this.boss_controller.beAttacked(300);break;case 200:++this.great,++this.combo,this.combo_controller.hit(this.combo,1),this.boss_controller.beAttacked(200);break;case 100:++this.good,++this.combo,this.combo_controller.hit(this.combo,2);break;case 50:++this.bad,this.combo=0,this.combo_controller.hit(this.combo,3);break;case 0:++this.miss,this.combo=0,this.combo_controller.hit(this.combo,4)}this.total_score+=t,this.excellent_score+=300,this.precision=this.total_score/this.excellent_score,this.total_score_txt.setText("score: "+this.total_score)}bonus_upgrade(t){this.total_score+=t,this.excellent_score+=t,this.total_score_txt.setText("score: "+this.total_score)}score_upload(){let t,s=song_config[this.game.active_song].info.Title;switch(this.game.active_level){case 0:t="easy";break;case 1:t="normal";break;case 2:t="hard"}console.log(s),console.log(t),console.log(this.total_score),leader_board.push_score(s,t,this.total_score).then(()=>{this.score_show()}).catch(t=>{console.log(t),this.score_show()})}score_show(){this.visible=!0;for(let t=0;t<5;++t){switch(t){case 0:this.hit_info[t].setText("excellent: "+this.excellent),this.overall_info[t].setText("combo: "+this.combo);break;case 1:this.hit_info[t].setText("great: "+this.great),this.overall_info[t].setText("score: "+this.total_score);break;case 2:this.hit_info[t].setText("good: "+this.good),this.overall_info[t].setText("precision: "+(100*this.precision).toFixed(2)+"%");break;case 3:this.hit_info[t].setText("bad: "+this.bad),this.overall_info[t].setText("rank: ");break;default:this.hit_info[t].setText("miss: "+this.miss),this.overall_info[t].setText("result: ")}this.hit_info[t].visible=!0,this.overall_info[t].visible=!0}}}class Combo{constructor(t){try{if(this.x=combo_config.Px,this.y=combo_config.Py,this.prevState=-1,this.states=[],combo_config.state.length<5)throw"state's image not enough,we need five image";combo_config.state.forEach(s=>{let e=new Phaser.Image(t,0,0,s);t.add.existing(e),e.visible=!1,e.anchor.set(.5,.5),e.y=this.y+e.height/2,e.x=this.x,this.states.push(e)}),this.numbers=[],this.num_tweens=[];for(let s=0;s<4;s++){let s=new Phaser.Image(t,0,0,combo_config.number);t.add.existing(s),s.visible=!1,s.y=this.y-s.height/2,s.anchor.set(.5,.5);let e=t.add.tween(s.scale).to({x:1.5,y:1.5},30,Phaser.Easing.Linear.None);this.num_tweens.push(e),this.numbers.push(s)}}catch(t){console.log(t)}}hit(t,s){let e=0,i=String(t),o=i.length,h=this.numbers[0].width/2;switch(o){case 1:let t=this.numbers[0];t.visible=!0,t.frame=parseInt(i[0]),t.x=this.x,this.num_tweens[0].yoyo(!0).start();for(let t=1;t<4;t++)this.numbers[t].visible=!1;break;case 2:e=this.x-h/2;for(let t=0;t<2;t++){let s=this.numbers[t];s.visible=!0,s.frame=parseInt(i[t]),s.x=e,e+=h,this.num_tweens[t].yoyo(!0).start()}for(let t=2;t<4;t++)this.numbers[t].visible=!1;break;case 3:e=this.x-h;for(let t=0;t<3;t++){let s=this.numbers[t];s.visible=!0,s.frame=parseInt(i[t]),s.x=e,e+=h,this.num_tweens[t].yoyo(!0).start()}this.numbers[3].visible=!1;break;case 4:e=this.x-h/2-h;for(let t=0;t<4;t++){let s=this.numbers[t];s.visible=!0,s.frame=parseInt(i[t]),s.x=e,e+=h,this.num_tweens[t].yoyo(!0).start()}}if(-1==this.prevState){this.states[s].visible=!0,this.prevState=s}else{this.states[s].visible=!0,s!=this.prevState&&(this.states[this.prevState].visible=!1),this.prevState=s}}}class Boss extends Phaser.Sprite{constructor({game:t,x:s,y:e,key:i,frame:o}){super(t,s,e,i,o),this.maxHealth=boss_config.hp,this.setHealth(boss_config.hp),this.scale.setTo(boss_config.Sx/this.width,boss_config.Sy/this.height),this.anchor.setTo(.5,.5),null!=boss_config.idle&&null!=boss_config.idle?(this.ani_idle=this.animations.add("idle",boss_config.idle[0],boss_config.idle[1],!0),this.haveIdle=!0):this.haveIdle=!1,null!=boss_config.back&&null!=boss_config.back?(this.ani_back=this.animations.add("back",boss_config.back[0],boss_config.back[1]),this.haveIdle&&this.ani_back.onComplete.add(this.idle,this,0),this.haveBack=!0):this.haveBack=!1,null!=boss_config.dead&&null!=boss_config.dead?(this.ani_dead=this.animations.add("dead",boss_config.dead[0],boss_config.dead[1]),this.haveDead=!0,this.ani_dead.onComplete.add(this.kill,this,0)):this.haveDead=!1}start(){try{this.game.add.existing(this),this.haveIdle&&this.animations.play("idle")}catch(t){console.log(t)}}beAttacked(t){this.health>0&&(this.health=this.health-t,this.health<=0?this.haveDead?this.ani_dead.play():this.kill():this.ani_back.isPlaying||this.ani_back.play())}idle(){this.haveIdle&&this.ani_idle.play()}}