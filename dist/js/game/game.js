class Game extends Phaser.Game{constructor({width:e,height:a,renderer:n,parent:d,state:t,transparent:s,antialias:_,physicsConfig:c}){super(e,a,n,d,t,s,_,c);const r=this.state;r.add("Game_Login",new Game_Login),r.add("Game_Load",new Game_Load),r.add("Main_Scene",new Main_Scene),r.add("Song_Scene",new Song_Scene),r.add("Level_Scene",new Level_Scene),r.add("Game_Start",new Game_Start),r.add("Play_Scene",new Play_Scene)}}