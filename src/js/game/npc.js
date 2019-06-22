let debug = false;

class HERO extends Phaser.Sprite {
  constructor(Sx, Sy, Px, Py, game, callbackContext, config, keycode, debug = false, frame) {
    super(game, Px, Py, config.frame, frame);

    this.info = new Txt({ game: this.game, x: 240, y: 480, text: config.info, style: { fill: "#008cff" } });

    try {
      this.callbackContext = callbackContext;
      this.debug = debug;
      this.anchor.set(0.5, 0.5);
      this.scale.set(Sx / this.width, Sy / this.height);

      //add animations
      if (config.idle != null && config.idle != undefined) {
        //add idle
        this.animations.add("idle", config.idle[0], config.idle[1], true);
        this.haveIdle = true;
      } else {
        this.haveIdle = false;
      }

      if (config.ar != null && config.ar != undefined) {
        //add ar
        this.animations.add("ar", config.ar[0], config.ar[1], false).onComplete.add(this.idle, this, 0);
        this.haveAr = true;
      } else {
        this.haveAr = false;
      }

      if (config.atk != null && config.atk != undefined) {
        //add attcak
        this.atkSize = config.atk.length;

        let i = 0;
        config.atk.forEach(a => {
          if (this.haveAr) {
            this.animations.add("atk" + i, a[0], a[1], false).onComplete.add(this.ar, this, 0);
          } else if (this.haveIdle) {
            this.animations.add("atk" + i, a[0], a[1], false).onComplete.add(this.idle, this, 0);
          } else {
            this.animations.add("atk" + i, a[0], a[1], false);
          }

          i++;
        });

        if (keycode != undefined) {
          this.atkKey = this.game.input.keyboard.addKey(keycode);
          this.atkKey.onDown.add(this.attack, this, 0);
        }

        this.haveAtk = true;
      } else {
        this.haveAtk = false;
      }

      if (config.skill != null && config.skill != undefined) {
        this.skillSize = config.skill[0].length;
        this.skillFirstFrame = config.skill[0][0];

        show_debug(config.frame + " skill's first frame " + this.skillFirstFrame, this.debug);

        this.atkKey.onHoldContext = this;
        this.atkKey.onHoldCallback = this.skill;

        if (this.haveAr) {
          this.animations.add("skill", config.skill[0], config.skill[1], false).onComplete.add(this.ar, this, 0);
        } else if (this.haveIdle) {
          this.animations.add("skill", config.skill[0], config.skill[1], false).onComplete.add(this.idle, this, 0);
        } else {
          this.animations.add("skill", config.skill[0], config.skill[1], false);
        }

        this.haveSkill = true;
        this.holdPrevTime = 0;
        this.skillSpeed = config.skillSpeed;
        this.holdCount = 0;
      } else {
        this.haveSkill = false;
      }

      this.idx = -1; //atk index
    } catch (e) {
      console.log(e);
    }
  }
}

HERO.prototype.start = function() {
  try {
    //console.log(this);
    this.game.add.existing(this);

    show_debug("Senia start", this.debug);

    if (this.haveIdle) {
      this.animations.play("idle");
    }
  } catch (e) {
    console.log(e);
  }
};

HERO.prototype.attack = function() {
  try {
    if (!this.visible) return;

    this.holdPrevTime = this.game.time.now;

    if (this.haveAr && this.haveIdle) {
      let isIdle = this.animations.getAnimation("idle").isPlaying;
      let isAr = this.animations.getAnimation("ar").isPlaying;

      if (isIdle || isAr) {
        this.idx = (this.idx + 1) % this.atkSize;
        show_debug("hero attack! " + this.idx, this.debug);
        this.animations.play("atk" + this.idx);
      }
    } else if (this.haveAr) {
      let isAr = this.animations.getAnimation("ar").isPlaying;

      if (isAr) {
        this.idx = (this.idx + 1) % this.atkSize;
        show_debug("hero attack! " + this.idx, this.debug);
        this.animations.play("atk" + this.idx);
      }
    } else if (this.haveIdle) {
      let isIdle = this.animations.getAnimation("idle").isPlaying;

      if (isIdle) {
        this.idx = (this.idx + 1) % this.atkSize;
        show_debug("hero attack! " + this.idx, this.debug);
        this.animations.play("atk" + this.idx);
      }
    } else {
      v.idx = (this.idx + 1) % this.atkSize;
      show_debug("hero attack! " + this.idx, this.debug);
      this.animations.play("atk" + this.idx);
    }
  } catch (e) {
    console.log(e);
  }
};

HERO.prototype.idle = function() {
  if (!this.visible) return;
  show_debug("hero idle!", this.debug);
  this.animations.play("idle");
};

HERO.prototype.ar = function() {
  if (!this.visible) return;
  show_debug("hero ar!", this.debug);
  this.animations.play("ar");
};

HERO.prototype.skill = function() {
  if (this.haveSkill) {
    let skill = this.animations.getAnimation("skill");
    let curTime = this.game.time.now;
    let sub = curTime - this.holdPrevTime;

    if (sub > 500) {
      if (this.holdCount >= 12) {
        this.holdCount = 0;
        if (!skill.isPlaying) skill.play();
      } else {
        this.holdCount = this.holdCount + this.skillSpeed;
      }
    }
  }
};

function show_debug(str, debug) {
  if (debug) {
    console.log(str);
  }
}
