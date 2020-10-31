// MPG123 modules
var mpg = require('mpg123');
var player = new mpg.MpgPlayer();


module.exports = {

    play: function (filename) {
      player.play(filename);
    },
    pause: function (filename) {
      player.pause(filename);
    },
    stop: function (filename) {
      player.stop(filename);
    },
    cmd: function (filename,frames) {
      player.play(filename);
      player._cmd("JUMP "+frames);
    }
  };
// mpg123 -k 2231 alane.mp3
