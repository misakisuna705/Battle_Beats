class Play_Scene extends Phaser.State {
  init() {
    alert(song_config[this.game.active_song].beatmap[this.game.active_level]);
  }
}
