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

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  console.log(req.body.sampleLength);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('audio/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
    // uploadStorage(sampleFile);
    let test = 'audio/'+sampleFile.name;
    uploadStorage(sampleFile)


  });
});


function uploadStorage(file){
    // Identifier
    let idForUploadStorage = Object.keys(store.data).length;
    let FileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    
    store.set(String(FileNameWithoutExtension)); 
    store.set(String(FileNameWithoutExtension)+".time"," String(ou)"); 
    store.set(String(FileNameWithoutExtension)+".name", String(file.name)); 
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
