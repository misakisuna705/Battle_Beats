class Play_Scene extends Phaser.State{create(){this.bg=new Img({game:this.game,x:-300,y:-640,key:"bg"})}update(){}}class Play_Scene_Background extends Phaser.TileSprite{constructor({game:e,x:s,y:t,width:a,height:i,key:g,frame:r}){super(e,s,t,a,i,g,r),this.game.add.existing(this)}renew(){this.tilePosition+=4}}class Img extends Phaser.Image{constructor({game:e,frame:s,x:t,y:a,key:i}){super(e,t,a,i,s),this.game.add.existing(this)}}