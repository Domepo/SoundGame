// import packages
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const audioControl = require('./modules/audio-control');

// run express server
app.listen(8080, ()=>console.log("server is running"));
// public directory for index.html
app.use(express.static("public"));
app.use(express.json({limit: '10mb'}));

// fileUpload config
app.use(fileUpload());
const store = require('data-store')({ path: process.cwd() + '/song-properties.json' });

const filename = "audio/dadi.mp3" ;

// get the button state
app.post("/api",(request, response)=>{
    let HTMLbuttonState = request.body.name;
    if(HTMLbuttonState == 1){
        audioControl.play(filename);
        console.log("Play");
    }
    if(HTMLbuttonState == 2){
        audioControl.pause(filename);
        console.log("Pause");
    }
    // if you return nothing, you`ll have 
    // perfomance issues and some errors
    return response.send("something");

});

// Upload file
app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let HTMLfileUpload = req.files.HTMLfileUpload;
  let refrainTimeSeconds = req.body.refrainTimeSeconds;
  let refrainTimeMinutes = req.body.refrainTimeMinutes;

  HTMLfileUpload.mv('audio/'+HTMLfileUpload.name, function(err) {
  // audio directory with all the song files
    if (err){
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
    // Store the Song-properties in the JSON file
    uploadStorage(HTMLfileUpload,refrainTimeSeconds,refrainTimeMinutes)
  });
});


function uploadStorage(file,seconds,minutes){
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



// read the directory for the HTML output
const directoryPath = path.join(__dirname,"audio");

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    app.post("/dir",(request, response)=>{
      response.send({files});
  });
});
