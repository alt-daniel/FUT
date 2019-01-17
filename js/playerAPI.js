function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

var pageCounter = 1;

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'https://www.easports.com/fifa/ultimate-team/api/fut/item?id=100879210';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {



        var text = JSON.parse(xhr.responseText);
        var list = text.items;

        // console.log(list[0].commonName);

        var row = document.getElementById("playerRow");


        var playerInfo = document.getElementById("playerCardIn");
        playerInfo.className = "col-12 col-md-8";
        var playerCard = document.getElementById("playerStats");
        playerCard.className = "col-12 col-md-4";
        playerCard.id= "playerCard";
        playerCard.style.width = "250px";
        playerCard.style.height = "380px";
        playerCard.style.backgroundImage = "url('img/cards_bg_e_1_5_0.png')";
        playerCard.style.backgroundSize = "250px";
        playerCard.style.backgroundPositionX = "center";

        var playerImageHolder =  document.createElement("div");
        var playerImage = new Image();
        playerImage.id = "playerImageShot";
        playerImage.src = list[0].headshot.imgUrl;
        playerImage.style.position="relative";

        var playerNameHolder= document.createElement("div");
        playerNameHolder.id= "playerName";
        playerNameHolder.innerHTML = list[0].name;

        var playerRating= document.createElement("div");
        playerRating.id= "playerRating";
        playerRating.innerHTML = list[0].rating;

        var playerPositionHolder= document.createElement("div");
        playerPositionHolder.id= "playerPosition";
        playerPositionHolder.innerHTML = list[0].position;

        var horizontalLine = document.createElement("div");
        horizontalLine.className = "regularLine";
        horizontalLine.id = "bigHorizontalLine";

        var smallHorizontalLine = document.createElement("div");
        smallHorizontalLine.className = "regularLine";
        smallHorizontalLine.id = "smallHorizontalLine";

        var verticalLine = document.createElement("div");
        verticalLine.className = "regularLine";
        verticalLine.id = "verticalLine";

        var playerStatFirstLine = document.createElement("div");
        playerStatFirstLine.className = "row";

        var attribute = list[0].attributes;

        var playerStatLeftLine = document.createElement("div");
        playerStatLeftLine.className = "col col-md-6";
        playerStatLeftLine.id = "playerStatLeftLine";
        var playerStatRightLine = document.createElement("div");
        playerStatRightLine.className = "col col-md-6";
        playerStatRightLine.id = "playerStatRightLine";

        var playerStatPAC = document.createElement("div");
        playerStatPAC.className = "playerStat";
        playerStatPAC.id = "playerCard-PAC";
        playerStatPAC.innerHTML = (attribute[0].value) + " PAC";;

        var playerStatDRI = document.createElement("div");
        playerStatDRI.className = "playerStat";
        playerStatDRI.id = "playerCard-DRI";
        playerStatDRI.innerHTML = (attribute[3].value) + " DRI";

        var playerStatSHO = document.createElement("div");
        playerStatSHO.className = "playerStat";
        playerStatSHO.id = "playerCard-SHO";
        playerStatSHO.innerHTML = (attribute[1].value) + " SHO";

        var playerStatDEF = document.createElement("div");
        playerStatDEF.className = "playerStat";
        playerStatDEF.id = "playerCard-DEF";
        playerStatDEF.innerHTML = (attribute[4].value) + " DEF";

        var playerStatPAS = document.createElement("div");
        playerStatPAS.className = "playerStat";
        playerStatPAS.id = "playerCard-PAS";
        playerStatPAS.innerHTML = (attribute[2].value) + " PAS";

        var playerStatPHY = document.createElement("div");
        playerStatPHY.className = "playerStat";
        playerStatPHY.id = "playerCard-PHY";
        playerStatPHY.innerHTML = (attribute[5].value) + " PHY";

        // playerStatDEF ,playerStatDRI, playerStatPHY
        playerStatLeftLine.append(playerStatPAC, playerStatSHO, playerStatPAS);
        playerStatRightLine.append(playerStatDRI, playerStatDEF, playerStatPHY)
        playerStatFirstLine.append(playerStatLeftLine, playerStatRightLine);

        playerCard.append(playerImageHolder, playerNameHolder, playerRating, playerPositionHolder,
            horizontalLine, smallHorizontalLine, verticalLine, playerStatFirstLine);
        playerImageHolder.appendChild(playerImage);




        //player info
        var playerNation = document.getElementById("playerNation");
        var playerNationImg = new Image();
        playerNationImg.src = list[0].nation.imageUrls.small;
        playerNationImg.style.height = "14px";
        playerNation.append(playerNationImg,  (" " + list[0].nation.name));

        var playerClub = document.getElementById("playerClub");
        var playerClubImg = new Image();
        playerClubImg.src = list[0].club.imageUrls.light.small;
        playerClubImg.style.height = "20px";
        playerClub.append(playerClubImg,  (" " + list[0].club.name));

        var playerLeague = document.getElementById("playerLeague");
        var playerLeagueImg = new Image();
        playerLeagueImg.src = list[0].league.imageUrls.light;
        playerLeagueImg.style.height = "20px";
        playerLeague.append(playerLeagueImg,  (" " + list[0].league.name));

        document.getElementById("playerNameHeader").innerHTML = list[0].name;
        document.getElementById("playerFullName").innerHTML = list[0].firstName + " " + list[0].lastName;
        document.getElementById("playerWeigth").innerHTML = list[0].weight + " kg";
        document.getElementById("playerHeight").innerHTML = list[0].height + " cm";
        document.getElementById("playerStrongFoot").innerHTML = list[0].foot;
        document.getElementById("playerWeakFoot").innerHTML = (list[0].weakFoot) + "★";
        document.getElementById("playerSkills").innerHTML = (list[0].skillMoves) + "★";
        document.getElementById("playerAtWR").innerHTML = list[0].atkWorkRate;
        document.getElementById("playerDefWR").innerHTML = list[0].defWorkRate;


        //tabelheader Stats
        document.getElementById("playerPAC").innerHTML = list[0].attributes[0].value;
        document.getElementById("playerSHO").innerHTML = list[0].attributes[1].value;
        document.getElementById("playerPAS").innerHTML = list[0].attributes[2].value;
        document.getElementById("playerDRI").innerHTML = list[0].attributes[3].value;
        document.getElementById("playerDEF").innerHTML = list[0].attributes[4].value;
        document.getElementById("playerPHY").innerHTML = list[0].attributes[5].value;

        //progressbars
        document.getElementById("progressPAC").style.width = list[0].attributes[0].value +"%";
        document.getElementById("progressSHO").style.width = list[0].attributes[1].value +"%";
        document.getElementById("progressPAS").style.width = list[0].attributes[2].value +"%";
        document.getElementById("progressDRI").style.width = list[0].attributes[3].value +"%";
        document.getElementById("progressDEF").style.width = list[0].attributes[4].value +"%";
        document.getElementById("progressPHY").style.width = list[0].attributes[5].value +"%";

        //playerStats
        document.getElementById("playerAcceleration").innerHTML = list[0].acceleration;
        document.getElementById("playerSprintSpeed").innerHTML = list[0].sprintspeed;

        document.getElementById("playerPositioning").innerHTML = list[0].positioning;
        document.getElementById("playerFinishing").innerHTML = list[0].finishing;
        document.getElementById("playerShotPower").innerHTML = list[0].shotpower;
        document.getElementById("playerLongShots").innerHTML = list[0].longshots;
        document.getElementById("playerVolleys").innerHTML = list[0].volleys;
        document.getElementById("playerPenalties").innerHTML = list[0].penalties;

        document.getElementById("playerVision").innerHTML = list[0].vision;
        document.getElementById("playerCrossing").innerHTML = list[0].crossing;
        document.getElementById("playerFKAccuracy").innerHTML = list[0].freekickaccuracy;
        document.getElementById("playerShortPassing").innerHTML = list[0].shortpassing;
        document.getElementById("playerLongPassing").innerHTML = list[0].longpassing;
        document.getElementById("playerCurve").innerHTML = list[0].curve;

        document.getElementById("playerAgility").innerHTML = list[0].agility;
        document.getElementById("playerBalance").innerHTML = list[0].balance;
        document.getElementById("playerReactions").innerHTML = list[0].reactions;
        document.getElementById("playerBallControl").innerHTML = list[0].ballcontrol;
        document.getElementById("playerDribbling").innerHTML = list[0].dribbling;
        document.getElementById("playerComposure").innerHTML = list[0].composure;

        document.getElementById("playerInterceptions").innerHTML = list[0].interceptions;
        document.getElementById("playerHeadingAccuracy").innerHTML = list[0].headingaccuracy;
        document.getElementById("playerMarking").innerHTML = list[0].marking;
        document.getElementById("playerStandingTackle").innerHTML = list[0].standingtackle;
        document.getElementById("playerSlidingTackle").innerHTML = list[0].slidingtackle;

        document.getElementById("playerJumping").innerHTML = list[0].jumping;
        document.getElementById("playerStamina").innerHTML = list[0].stamina;
        document.getElementById("playerStrength").innerHTML = list[0].strength;
        document.getElementById("playerAgression").innerHTML = list[0].aggression;

        var playerDigit = document.getElementsByClassName("playerDigit");

        for(i=0; i < playerDigit.length; i++){

            switch(true){

                case playerDigit[i].innerHTML<70:
                    playerDigit[i].style.color = "red";
                    break;
                case playerDigit[i].innerHTML<80:
                    playerDigit[i].style.color = "orange";
                    break;
                case playerDigit[i].innerHTML<90:
                    playerDigit[i].style.color = "lightgreen";
                    break;
                case playerDigit[i].innerHTML<100:
                    playerDigit[i].style.color = "darkgreen";
                    break;
                default:
                    break;

            }


        }


        document.getElementById("playerCard").appendChild(row);
        row.append(playerCard, playerInfo);

        // alert('Response from CORS request to ' + url);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    // xhr.setRequestHeader('Acces-Control-Allow-Origin', 'Content-Type');
    xhr.send();

}

