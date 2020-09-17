var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();
 
player.pitch(1);
player.volume(100);

module.exports = {

    play: function (filename) {
      player.play(filename);
    },
    pause: function (filename) {
      player.pause(filename);
    }
  };
