const express = require("express");
const app = express();
var audioControl = require('./audio-control');
app.listen(8080, ()=>console.log("Server laeuft"));
app.use(express.static("public"));
app.use(express.json({limit: '1000mb'}));

const filename = "audio/dadi.mp3" ;


app.post("/api",(request, response)=>{
    console.log(request.body);
    if(request.body.name == 1){
        audioControl.play(filename);
    }
    if(request.body.name == 2){
        audioControl.pause(filename);
    }
    return response.send('Received a POST HTTP method');

});
