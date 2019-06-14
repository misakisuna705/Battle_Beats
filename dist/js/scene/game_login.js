class Game_Login extends Phaser.State{init(){this.game.device.desktop||(this.game.scale.scaleMode=Phaser.ScaleManager.EXACT_FIT)}preload(){const a=this.game.load;a.image("game_load_title","assets/game_load/title.png"),a.image("login_button","assets/game_load/google.png"),a.audio("game_load_bgm","assets/game_load/victory.mp3"),a.video("game_load_bgv","assets/game_load/bgv.mp4")}create(){const a=this.game,e=a.bgv=a.add.video("game_load_bgv");e.addToWorld(-400,0,0,0,1,1),e.play(!0),(a.bgm=a.add.audio("game_load_bgm",1,!0)).play(),a.add.image(0,0,"game_load_title"),this.login=new Login({game:a,x:a.width/2,y:a.height/8*7,key:"login_button"}),this.renew()}renew(){firebase.auth().onAuthStateChanged(a=>{a&&this.game.state.start("Game_Load")})}}