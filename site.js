
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



function getSummonerNameAsync(summonerName, region) {
    summonerName = summonerName.replace(/\s/g, "");
    let regionTrimmed = region.replace(/\d/g, "").toLowerCase();
    let summonerDetails;
  
    fetch(`https://localhost:44332/api/sjproxy?summoner=${summonerName}`, {
        method: "get"
        })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(json => {
        getSummonerData(json, regionTrimmed)
        //displaySummonerData(json, regionTrimmed)
    })
    .catch(error =>{
        console.log("Unable to retrieve summoner.")
    });

   
}

function getSummonerData(json, regionTrimmed){
    fetch(`https://localhost:44332/api/sjproxy/getSummonerRank?summonerID=${json.id}`, {
        method: "get"
    })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(rankData => {
        displaySummonerData(json, rankData, regionTrimmed)
    })
    .catch(error =>{
        console.log("unable to retrieve")
    });
}

function displaySummonerData(json, rankData, regionTrimmed){
   if(typeof json.name !== "undefined"){
        document.getElementById("profileIcon").innerHTML = `<img src='http://avatar.leagueoflegends.com/${regionTrimmed}/${json.name.toLowerCase()}.png'>`;
        document.getElementById("profileDetails").innerHTML = 
        `<p class="ProfileHeader">${json.name}</p>
        <p class="ProfileElement">${json.summonerLevel}</p>
        <p class=ProfileElement>${rankData[0].tier} ${rankData[0].rank}</p>`;
       
    }else{
        console.log("sum not found");
    }
  
   //console.log(json);
}


document.getElementById("searchBtn").addEventListener('click', ()=>{
    let summonerName = document.getElementById("summonerName").value;
    let region = document.getElementById("regionBtn").value;
    getSummonerNameAsync(summonerName, region);

});