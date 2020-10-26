
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
            createSelect.setAttribute("onchange","selectListener()");
  
            createDiv.setAttribute("name","selectorDiv");
            createOption.setAttribute("value",String(element));
  
            document.body.appendChild(createDiv);
            createDiv.appendChild(createSelect);
            createSelect.appendChild(createOption);
            
        });         
      });
  }
  
  function selectListener(){
    let selectorID = document.getElementById("selector");
    let selectorResult = selectorID.options[selectorID.selectedIndex].value;
    console.log(selectorResult);
  }
  
  createSelectOptionHTML();
