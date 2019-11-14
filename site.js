
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



function getSummonerAsync(sumName, region) {
    // fetch(`https://introvertido.me/api/sjproxy?summoner=${sumName}`, {
    //     method: "get"
    //     })
    // .then(response => response.json())
    // .then(data =>{
    //     console.log(data)
    // });
    sumName = sumName.replace(/\s/g, "");
    let regionTrimmed = region.replace(/\d/g, "").toLowerCase();

  
    fetch(`https://localhost:44332/api/sjproxy?summoner=${sumName}`, {
        method: "get"
        })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(json => {
        displaySummonerData(json, regionTrimmed)
    })
    .catch(error =>{
        console.log("Unable to retrieve summoner.")
    });
    
}

function displaySummonerData(json, regionTrimmed){
   if(typeof json.name !== "undefined"){
        document.getElementById("profileIcon").innerHTML = `<img src='http://avatar.leagueoflegends.com/${regionTrimmed}/${json.name.toLowerCase()}.png'>`;
        document.getElementById("profileName").innerHTML = `<span>${json.name}</span>`;
    }else{
        console.log("sum not found");
    }
  
   //console.log(json);
}


document.getElementById("searchBtn").addEventListener('click', ()=>{
    let sumName = document.getElementById("sumName").value;
    let region = document.getElementById("regionBtn").value;
    getSummonerAsync(sumName, region);

});