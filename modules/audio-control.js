// MPG123 modules
var mpg = require('mpg123');
var player = new mpg.MpgPlayer();


module.exports = {

    play: function (filename) {
      player.play(filename);
    },
    pause: function (filename) {
      player.pause(filename);
    }
  };
