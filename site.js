
/*Hover event for region button dropdown*/
document.getElementById("regionBtn").addEventListener("mouseover",()=>{

    document.getElementById("dropdownCont").style.visibility = "visible";
    
});

/*Replace Region on Region button*/
function replaceRegion(regionId) {
    let regionBtn = document.getElementById("regionBtn");
    let region = document.getElementById(regionId).textContent;
    regionBtn.textContent = region;
    regionBtn.setAttribute("value", regionId);
    /*After clicking on a Region hide the dropdown*/
    document.getElementById("dropdownCont").style.visibility = "hidden";
}

/*Add click listener to the elements in the Region Dropdown*/
var dropdownContChildren = document.getElementById("dropdownCont").children;
for(let i = 0; i<dropdownContChildren.length; i++){
    dropdownContChildren[i].addEventListener('click', ()=>{
        replaceRegion(dropdownContChildren[i].id);
    });
}



function getSummonerAsync(sumName) {
    // fetch(`https://introvertido.me/api/sjproxy?summoner=${sumName}`, {
    //     method: "get"
    //     })
    // .then(response => response.json())
    // .then(data =>{
    //     console.log(data)
    // });
  
    fetch(`https://localhost:44332/api/sjproxy?summoner=${sumName}`, {
        method: "get"
        })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(json => {
        displaySummonerData(json)
    })
    .catch(error =>{
        console.log("Unable to retrieve summoner.")
    });
    
}

function displaySummonerData(json){
   document.getElementById("summoner-name-display").innerHTML = `<span>${json.name}</span>`;
   //console.log(json);
}


document.getElementById("searchBtn").addEventListener('click', ()=>{
    let sumName = document.getElementById("sumName").value;
    getSummonerAsync(sumName);

});