class Score_Scene extends Phaser.State {
  init() {
    //bgv
    this.game.bgv.addToWorld(0, 0, 0, 0, 1, 1);
    //score
    this.excellent = 0;
    this.great = 0;
    this.good = 0;
    this.bad = 0;
    this.miss = 0;
    this.combo = 0;
    this.total = 0;
    this.precision = 0;
    this.rank = "?";
    this.result = "?";
  }

  create() {
    const GAME = this.game;
    const ADD = this.add;

    //==============================new==============================//

    //board
    const BOARD = (this.board = new Img({ game: GAME, x: GAME.width / 2, y: GAME.height / 2 }, { key: "score_board.png" }));
    //grade
    const GRADE = (this.grade = new Grade(
      { game: GAME, x: (GAME.width / 4) * 1, y: (GAME.height / 8) * 3 },
      {
        text:
          "excellent: " +
          this.padding(this.excellent, 4) +
          "  combo: " +
          this.combo +
          "\n" +
          "great: " +
          this.padding(this.great, 4) +
          "         score: " +
          this.total +
          "\n" +
          "good: " +
          this.padding(this.good, 4) +
          "         precision: " +
          this.precision +
          "%\n" +
          "bad: " +
          this.padding(this.bad, 4) +
          "           rank: " +
          this.rank +
          "\n" +
          "miss: " +
          this.padding(this.miss, 4) +
          "         result: " +
          this.result +
          "\n",
        style: { fontSize: 64, fill: "#ffffff" }
      }
    ));
    //timer
    const TIMER = (this.timer = this.time.create());

    //==============================add==============================//

    //board
    ADD.existing(BOARD);
    //grade
    ADD.existing(GRADE);

    //==============================set==============================//

    //timer
    TIMER.repeat(
      20,
      GAME.excellent + GAME.great + GAME.good + GAME.bad + GAME.miss + GAME.combo + 4,
      () => {
        this.update_grade();
      },
      this
    );

    //==============================call==============================//

    TIMER.start();
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

  padding(str, lenght) {
    if (str.length >= lenght) return str;
    else return this.padding("0" + str, lenght);
  }

  update_grade() {
    const GAME = this.game;

    if (this.excellent === GAME.excellent) {
      if (this.great === GAME.great) {
        if (this.good === GAME.good) {
          if (this.bad === GAME.bad) {
            if (this.miss === GAME.miss) {
              if (this.combo === GAME.combo) {
                this.total = GAME.total;
                this.precision = parseInt(GAME.precision * 100);

                if (this.precision >= 90) {
                  this.rank = "S";
                  this.result = "Pass!";
                } else if (this.precision >= 85) {
                  this.rank = "A+";
                  this.result = "Pass!";
                } else if (this.precision >= 80) {
                  this.rank = "A";
                  this.result = "Pass!";
                } else if (this.precision >= 75) {
                  this.rank = "B";
                  this.result = "Pass!";
                } else if (this.precision >= 70) {
                  this.rank = "C";
                  this.result = "Pass!";
                } else if (this.precision >= 65) {
                  this.rank = "D";
                  this.result = "Pass!";
                } else if (this.precision >= 60) {
                  this.rank = "E";
                  this.result = "Pass!";
                } else {
                  this.rank = "F";
                  this.result = "Fail!";
                }
                //
              } else {
                ++this.combo;
              }
            } else {
              ++this.miss;
            }
          } else {
            ++this.bad;
          }
        } else {
          ++this.good;
        }
      } else {
        ++this.great;
      }
    } else {
      ++this.excellent;
    }

    this.grade.setText(
      "excellent: " +
        this.padding(this.excellent, 4) +
        "  combo: " +
        this.combo +
        "\n" +
        "great: " +
        this.padding(this.great, 4) +
        "         score: " +
        this.total +
        "\n" +
        "good: " +
        this.padding(this.good, 4) +
        "         precision: " +
        this.precision +
        "%\n" +
        "bad: " +
        this.padding(this.bad, 4) +
        "           rank: " +
        this.rank +
        "\n" +
        "miss: " +
        this.padding(this.miss, 4) +
        "         result: " +
        this.result +
        "\n"
    );
  }
}
