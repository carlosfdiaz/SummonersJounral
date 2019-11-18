
/*Hover event for region button dropdown*/
var summonerBasicData;
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
  
    fetch(`https://introvertido.me/api/sjproxy?summoner=${summonerName}`, {
        method: "get"
        })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(json => {
        getSummonerRank(json, regionTrimmed)
        //displaySummonerData(json, regionTrimmed)
    })
    .catch(error =>{
        console.log("Unable to retrieve summoner.")
    });

   
}

function getSummonerRank(json, regionTrimmed){
    fetch(`https://introvertido.me/api/sjproxy/getSummonerRank?summonerID=${json.id}`, {
        method: "get"
    })
    .then(response => {
        if(!response.ok){throw response}
        return response.json()
    })
    .then(rankData => {
        displaySummonerProfile(json, rankData, regionTrimmed)
    })
    .catch(error =>{
        let rankData = "Unranked";
        displaySummonerProfile(json, rankData, regionTrimmed)
    });
}

function displaySummonerProfile(json, rankData, regionTrimmed){
    let emblemRank;
    let emblemStr;
    document.getElementById("notFound").style.display = "none";
    if(rankData !== "Unranked"){
        emblemRank = rankData[0].tier.toLowerCase();
        emblemStr = emblemRank.charAt(0).toUpperCase() + emblemRank.slice(1);
    }

    document.getElementById("loader").style.display = "none";
    document.getElementById("resultsCol").style.display = "flex";
   if(typeof json.name !== "undefined" && rankData !== "Unranked"){
        document.getElementById("profileIcon").innerHTML = `<img src='http://ddragon.leagueoflegends.com/cdn/9.22.1/img/profileicon/${json.profileIconId}.png'>`;
        document.getElementById("profileDetails").innerHTML = 
        `<p class="ProfileHeader">${json.name}</p>
        <p class="ProfileElement">${json.summonerLevel}</p>
        <p class=ProfileElement>${rankData[0].tier} ${rankData[0].rank}</p>
        <p class="ProfileElement">Wins: ${rankData[0].wins}</p>
        <p class="ProfileElement">Losses: ${rankData[0].losses}</p>`;
        document.getElementById("rankEmblem").innerHTML = `<img src='assets/ranked-emblems/Emblem_${emblemStr}.png'>`;
    }else if(typeof json.name !== "undefined" && rankData == "Unranked"){
        document.getElementById("profileIcon").innerHTML = `<img src='http://ddragon.leagueoflegends.com/cdn/9.22.1/img/profileicon/${json.profileIconId}.png'>`;
        document.getElementById("rankEmblem").innerHTML = "";
        document.getElementById("profileDetails").innerHTML = 
        `<p class="ProfileHeader">${json.name}</p>
        <p class="ProfileElement">${json.summonerLevel}</p>
        <p class="ProfileElement">Unraked</p>`;
    }else{
        document.getElementById("resultsCol").style.display = "none";
        document.getElementById("notFound").style.display = "block";
    }
}


document.getElementById("searchBtn").addEventListener('click', ()=>{
    SearchAction();
});
document.getElementById("searchForm").onsubmit = () => {event.preventDefault()};

document.getElementById("summonerName").addEventListener("keyup",() =>{
        if(event.keyCode == 13){
            event.preventDefault(); 
            SearchAction();
        }
        
});

function SearchAction (){
    let summonerName = document.getElementById("summonerName").value;
    let region = document.getElementById("regionBtn").value;
    resultBox = document.getElementById("summoner-result");
    document.getElementById("resultsCol").style.display = "none";
    document.getElementById("notFound").style.display = "none";
    document.getElementById("loader").style.display = "inline-block";
    getSummonerNameAsync(summonerName, region);
    resultBox.style.visibility = "visible";
    resultBox.style.opacity = "1";
}