// create the select option menu in HTML
function createSelectOptionHTML(){
  
  songProperties()
    .then(response =>{
      let createDiv    = document.createElement("div");
      let createSelect = document.createElement("select");
      let createBlankOption = document.createElement("option");
      createBlankOption.setAttribute("style","display:none;");

      createBlankOption.innerHTML = "Select a song";

      document.body.appendChild(createDiv);
      createDiv.appendChild(createSelect);
      createSelect.appendChild(createBlankOption);

      console.log(response.length);
      response.forEach(element => {

          let createOption = document.createElement("option");

          createOption.innerHTML = String(element);

          createSelect.setAttribute("id","selector");
          createSelect.setAttribute("onchange","selectListenerPush()");

          createDiv.setAttribute("name","selectorDiv");
          createOption.setAttribute("value",String(element));

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
