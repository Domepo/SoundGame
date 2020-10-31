// API config
// fetch button and text data

async function AudioControl(state){
    // get the button data for play pause and stop
    // get the return of selector.js
    const selectorResult = await selectListenerPush();
    await fetch("/audio-controll",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ButtonState: state,
                SelectedSong: selectorResult
            })
        })
        .catch((err)=>console.log(err));
    };

async function FilesInDirectory(){
    // get all uploaded files
    const response = await fetch("/dir",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        })
    const responseArray = await response.json();
    const responseFiles = responseArray.files;
    return responseFiles;
};

const eachFileInDirectory = FilesInDirectory()
// get the latest file in the directoryPath -> ./app.js
.then(response =>{
        let ShowDirectoryElement = document.getElementById("showdirectory");
        console.log(response.length+" files are Uploaded");

        if(response[1] === undefined){
            ShowDirectoryElement.innerHTML ="Upload your file";
        }else{
        ShowDirectoryElement.innerHTML = response[1];
        }
    });


// get data from song-properties.json
async function songProperties(){
    const response = await fetch("/dir/json",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        })
    const responseArray = await response.json();
    return responseArray;
};

const songPropertiesProm = songProperties()
.then(response =>{
        console.log(response);
        return response;
});
