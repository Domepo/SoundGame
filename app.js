// import packages
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const audioControl = require('./modules/audio-control');
const { request } = require("http");
const { response } = require("express");
const { resolve } = require("path");

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
app.post("/audio-controll",(request, response)=>{
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
app.post('/upload', function(request, response) {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.');
  }
  let HTMLfileUpload = request.files.HTMLfileUpload;
  let refrainTimeSeconds = request.body.refrainTimeSeconds;
  let refrainTimeMinutes = request.body.refrainTimeMinutes;

  HTMLfileUpload.mv('audio/'+HTMLfileUpload.name, function(err) {
  // audio directory with all the song files
    if (err){
      return response.status(500).send(err);
    }
    response.send('File uploaded!');
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

// read every name of songs in song-properties.json 
fs.readFile('song-properties.json', (err, data) => {
  if (err) {
    return console.log('Unable to read JSON: ' + err);
    } 
    let jsonData = JSON.parse(data);
    let NameOfSongsInJson = (Object.keys(jsonData));
    let allNameOfSongsInJsonWithExtansion = [];

    NameOfSongsInJson.forEach(element => {
      let extansionPath = jsonData[element].name;
      allNameOfSongsInJsonWithExtansion.push(extansionPath);
    });

    app.post("/dir/json",(request, response)=>{
      response.send(allNameOfSongsInJsonWithExtansion);
    })
});

// get the select menu value


app.post("/dir/json/return",(request, response)=>{

  let HTMLbuttonStatea = request.body.name;
  let audioFile = "audio/"+HTMLbuttonStatea;
      // get the button state
  console.log(audioFile);
  response.send("something");

});
