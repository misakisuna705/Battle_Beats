class Game extends Phaser.Game{constructor({width:e,height:a,renderer:n,parent:d,state:t,transparent:s,antialias:c,physicsConfig:i}){super(e,a,n,d,t,s,c,i);const o=this.state;o.add("Game_Login",new Game_Login),o.add("Game_Load",new Game_Load),o.add("Main_Scene",new Main_Scene),o.add("Song_Scene",new Song_Scene),o.add("Play_Scene",new Play_Scene)}}