class Game_Login extends Phaser.State{init(){this.game.device.desktop||(this.game.scale.scaleMode=Phaser.ScaleManager.EXACT_FIT)}preload(){const a=this.game.load;a.image("game_load_title","assets/game_load/title.png"),a.image("login_button","assets/game_load/google.png"),a.audio("game_load_bgm","assets/game_load/victory.mp3"),a.video("game_load_bgv","assets/game_load/bgv.mp4")}create(){const a=this.game;a.bgm||(a.bgm=a.sound.add("game_load_bgm",1,!0)),a.bgm.isPlaying||a.bgm.play();const e=a.bgv=a.add.video("game_load_bgv");e.addToWorld(-400,0,0,0,1,1),e.play(!0),this.login_button=new Button({game:a,callback:this.login,callbackContext:this},button_config.game_login.login_button),a.add.image(0,0,"game_load_title"),this.enter_scene()}login(){firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider).then(a=>{}).catch(a=>{alert(a.message)})}enter_scene(){firebase.auth().onAuthStateChanged(a=>{this.game.state.start("Game_Load")})}}