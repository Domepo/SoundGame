const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');


var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();



var audioControl = require('./audio-control');

app.listen(8080, ()=>console.log("Server laeuft"));
app.use(express.static("public"));
app.use(express.json({limit: '10mb'}));

app.use(fileUpload());
const store = require('data-store')({ path: process.cwd() + '/foo.json' });
const filename = "audio/dadi.mp3" ;

app.post("/api",(request, response)=>{
    console.log(request.body);
    if(request.body.name == 1){
        audioControl.play(filename);
    }
    if(request.body.name == 2){
        audioControl.pause(filename);
    }
    return response.send('Return only for purpose lol');

});

// Upload Form
app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile;
  let refrainTimeSeconds = req.body.refrainTimeSeconds;
  let refrainTimeMinutes = req.body.refrainTimeMinutes;

  sampleFile.mv('audio/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
    uploadStorage(sampleFile,refrainTimeSeconds,refrainTimeMinutes)


  });
});


function uploadStorage(file,seconds,minutes){
    // Identifier
    let FileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    
    store.set(String(FileNameWithoutExtension)); 
    store.set(String(FileNameWithoutExtension)+".refrainDrop"); 
    store.set(String(FileNameWithoutExtension)+".refrainDrop.Minutes", String(minutes)); 
    store.set(String(FileNameWithoutExtension)+".refrainDrop.Seconds", String(seconds)); 
    store.set(String(FileNameWithoutExtension)+".refrainDrop.ResolutionDuration",String(resultionCalculator(seconds,minutes)));
    store.set(String(FileNameWithoutExtension)+".name", String(file.name)); 
}
function resultionCalculator(seconds,minutes){
  // One frame = 0.026 seconds
  // We use the default 44khz audio sequenze
  let defaultFrameLentgh = 0.026;
  let totalSeconds       = (minutes * 60) + seconds;
  let totalFrame         = Math.round(totalSeconds / defaultFrameLentgh);
  return totalFrame;
}

// Search in dic
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname,"audio");

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        console.log(file); 
    });
    app.post("/dir",(request, response)=>{
      response.send({files});
  });
});
