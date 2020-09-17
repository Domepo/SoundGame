const express = require("express");
const app = express();
app.listen(8080, ()=>console.log("Server laeuft"));
app.use(express.static("public"));
app.use(express.json({limit: '1000mb'}));

app.post("/api",(request, response)=>{
    console.log(request.body);
    return response.send('Received a POST HTTP method');
});

