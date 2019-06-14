class Loader extends Phaser.Text {
  constructor({ game, x, y, text, style }, load) {
    super(game, x, y, text, style);

    this.anchor.setTo(0.5, 0.5);
    this.setStyle({ fill: "white" });

    this.game.add.existing(this);

    this.loop();
  }

  loop() {
    const LOAD = this.game.load;

    LOAD.onFileComplete.add((progress, cacheKey, success, totalLoaded, totalFiles) => {
      this.setText("Loading ...   " + progress + "% ( " + totalLoaded + " / " + totalFiles + " )");
    }, this);

    LOAD.onLoadComplete.add(() => {
      this.setText("Press enter to start");
    }, this);
  }
}
