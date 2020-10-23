// API config
// fetch button and text data

async function AudioControl(state){
    // get the button data for play pause and stop
    await fetch("/api",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: state
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
    // get the latest file in the directoryPath -> ./index.js
    .then(response =>{
            let ShowDirectoryElement = document.getElementById("showdirectory");
            console.log(response.length+"files are Uploaded");
            ShowDirectoryElement.innerHTML = response[1];
    });
