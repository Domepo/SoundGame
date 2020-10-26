// create the select option menu in HTML
function createSelectOptionHTML(){
  
    songProperties()
      .then(response =>{
        let createDiv    = document.createElement("div");
        let createSelect = document.createElement("select");
  
        console.log(response.length);
        response.forEach(element => {
  
            let createOption = document.createElement("option");
  
            createOption.innerHTML = String(element);
  
            createSelect.setAttribute("id","selector");
            createSelect.setAttribute("onchange","selectListenerPush()");
  
            createDiv.setAttribute("name","selectorDiv");
            createOption.setAttribute("value",String(element));
  
            document.body.appendChild(createDiv);
            createDiv.appendChild(createSelect);
            createSelect.appendChild(createOption);
            
        });         
      });
  }
  
// Push the menu value via api
async function selectListenerPush(){
    let selectorID = document.getElementById("selector");
    let selectorResult = selectorID.options[selectorID.selectedIndex].value;
    await fetch("/dir/json/return",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: selectorResult
            })
        })
        .catch((err)=>console.log(err));
};
    
createSelectOptionHTML();
