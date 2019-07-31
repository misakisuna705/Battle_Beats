class Score_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
  }

  create() {
    const GAME = this.game;
    const ADD = this.add;

    //==============================new==============================//

    const BOARD = (this.board = new Img({ game: GAME, x: GAME.width / 2, y: GAME.height / 2 }, { key: "score_board.png" }));
    const GRADE = (this.grade = new Grade(
      { game: GAME, x: GAME.width / 2, y: GAME.height / 2 },
      {
        text:
          "excellent: 0             combo: 0\n" +
          "great: 0                 score: 0\n" +
          "good: 0                  precision: 0\n" +
          "bad: 0                   rank: F\n" +
          "miss: 0                  result: Fail\n",
        style: { fontSize: 64, fill: "#ffffff" }
      }
    ));

    //==============================add==============================//

    ADD.existing(BOARD);
    ADD.existing(GRADE);
  }

  shutdown() {
    const GAME = this.game;

    //active song
    GAME.active_song = -1;
    //active level
    GAME.active_level = 0;
    //score
    GAME.total = 0;
    GAME.excellent = 0;
    GAME.great = 0;
    GAME.good = 0;
    GAME.bad = 0;
    GAME.miss = 0;
    GAME.precision = 0;
    GAME.combo = 0;
  }
}
