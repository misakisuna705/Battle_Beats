class Game_Start extends Phaser.State {
  create() {
    const GAME = this.game;

    this.aaa = GAME.sound.add("railguns_shoot.mp3", 1, false);

    const VIDEO = (this.video = this.add.video("only_my_railgun.mp4"));

    VIDEO.addToWorld(-260, 0, 0, 0, 1, 1);
    VIDEO.play();

    VIDEO.onComplete.add(() => {
      //this.game.state.start("Play_Scene");
    }, this);
  }
}
