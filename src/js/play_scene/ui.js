class Score extends Phaser.Image {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.boss_controller = new Boss({ game: this.game, x: boss_config.Px, y: boss_config.Py, key: boss_config.key });
    this.boss_controller.start();
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
