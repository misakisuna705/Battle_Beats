class Game_Load extends Phaser.State{init(){const e=this.game;e.bgv.addToWorld(-400,0,0,0,1,1),e.add.image(0,0,"game_load_title"),this.loader=new Loader({game:e,x:e.width/2,y:e.height/8*7,text:"Loading ...   "+e.load.progress})}preload(){const e=this.game.load;e.image("enter_button","assets/game/enter_button.png"),e.image("exit_button","assets/game/exit_button.png"),e.image("mode_button","assets/main_scene/mode_button.png"),e.image("infinite_synthesis","assets/general_scene/infinite_synthesis.png")}update(){const e=this.game;e.input.keyboard.justPressed(Phaser.Keyboard.ENTER)&&e.state.start("Main_Scene")}}