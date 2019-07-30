class Score extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.boss_controller = new Boss({ game: this.game, x: boss_config.Px, y: boss_config.Py, key: boss_config.key });
    this.boss_controller.start();

    this.hit_info = [];
    this.overall_info = [];
    for (let i = 0; i < 5; ++i) {
      this.hit_info[i] = new Article({ game: GAME, x: this.x - 180, y: this.y - 80 + 40 * i }, scoreboard_config.hit_info[i]);
      this.overall_info[i] = new Article({ game: GAME, x: this.x - 20, y: this.y - 80 + 40 * i }, scoreboard_config.overall_info[i]);
    }
  }

  point_upgrade(point) {
    switch (point) {
      case 300:
        this.boss_controller.beAttacked(300);
        break;

      case 200:
        this.boss_controller.beAttacked(200);
        break;

      case 100:
        break;

      case 50:
        break;

      case 0:
        break;
    }
  }

  score_upload() {
    let song = song_config[this.game.active_song].info.Title;

    let level;

    switch (this.game.active_level) {
      case 0:
        level = "easy";
        break;

      case 1:
        level = "normal";
        break;

      case 2:
        level = "hard";
        break;
    }

    console.log(song);
    console.log(level);
    console.log(this.total_score);

    leader_board
      .push_score(song, level, this.total_score)
      .then(() => {
        this.score_show();
      })
      .catch(e => {
        console.log(e);
        this.score_show();
      });
  }

  score_show() {
    this.visible = true;

    for (let i = 0; i < 5; ++i) {
      switch (i) {
        case 0:
          this.hit_info[i].setText("excellent: " + this.excellent);
          this.overall_info[i].setText("combo: " + this.combo);
          break;

        case 1:
          this.hit_info[i].setText("great: " + this.great);
          this.overall_info[i].setText("score: " + this.total_score);
          break;

        case 2:
          this.hit_info[i].setText("good: " + this.good);
          this.overall_info[i].setText("precision: " + (this.precision * 100).toFixed(2) + "%");
          break;

        case 3:
          this.hit_info[i].setText("bad: " + this.bad);
          this.overall_info[i].setText("rank: ");
          break;

        default:
          this.hit_info[i].setText("miss: " + this.miss);
          this.overall_info[i].setText("result: ");
          break;
      }

      this.hit_info[i].visible = true;
      this.overall_info[i].visible = true;
    }

    this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(() => {
      this.game.bgm.play();
      this.game.state.start("Main_Scene");
    }, this);
  }
}

class Boss extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.maxHealth = boss_config.hp;
    this.setHealth(boss_config.hp);
    this.scale.setTo(boss_config.Sx / this.width, boss_config.Sy / this.height);
    this.anchor.setTo(0.5, 0.5);
    //this.animations.add('atk'+i,a[0],a[1],false).onComplete.add(this.ar,this,0);
    if (boss_config.idle != null && boss_config.idle != undefined) {
      this.ani_idle = this.animations.add("idle", boss_config.idle[0], boss_config.idle[1], true);
      this.haveIdle = true;
    } else {
      this.haveIdle = false;
    }

    if (boss_config.back != null && boss_config.back != undefined) {
      this.ani_back = this.animations.add("back", boss_config.back[0], boss_config.back[1]);
      if (this.haveIdle) this.ani_back.onComplete.add(this.idle, this, 0);
      this.haveBack = true;
    } else {
      this.haveBack = false;
    }

    if (boss_config.dead != null && boss_config.dead != undefined) {
      this.ani_dead = this.animations.add("dead", boss_config.dead[0], boss_config.dead[1]);
      this.haveDead = true;
      this.ani_dead.onComplete.add(this.kill, this, 0);
    } else {
      this.haveDead = false;
    }
  }

  start() {
    try {
      this.game.add.existing(this);
      if (this.haveIdle) {
        this.animations.play("idle");
      }
    } catch (e) {
      console.log(e);
    }
  }

  beAttacked(x) {
    if (this.health > 0) {
      this.health = this.health - x;
      if (this.health <= 0) {
        if (this.haveDead) {
          this.ani_dead.play();
        } else {
          this.kill();
        }
      } else {
        if (!this.ani_back.isPlaying) this.ani_back.play();
      }
    }
  }

  idle() {
    if (this.haveIdle) {
      this.ani_idle.play();
    }
  }
}
