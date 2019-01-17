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
    var url = 'https://www.easports.com/fifa/ultimate-team/api/fut/item?';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {

        var pageCounter = 1;

        var text = JSON.parse(xhr.responseText);
        var list = text.items;




        var table = document.createElement("table");
        table.className = "table table-striped";
        table.id = "allPlayerTable";

        var thead= document.createElement("thead");
        thead.className= "thead";
        thead.style.color = "white";
        thead.style.backgroundColor = "black";

        var table_tr = document.createElement("tr");
        table_tr.id = "table_tr_players";

        var table_tbody = document.createElement("tbody");
        table_tbody.id = "table_tbody";




        var table_th_name = document.createElement("th");
        table_th_name.innerHTML = "name";
        var table_th_rating = document.createElement("th");
        table_th_rating.innerHTML = "Rating";
        var table_th_position = document.createElement("th");
        table_th_position.innerHTML = "Position";
        var table_th_PAC = document.createElement("th");
        table_th_PAC.innerHTML = "PAC";
        var table_th_SHO = document.createElement("th");
        table_th_SHO.innerHTML = "SHO";
        var table_th_PAS = document.createElement("th");
        table_th_PAS.innerHTML = "PAS";
        var table_th_DRI = document.createElement("th");
        table_th_DRI.innerHTML = "DRI";
        var table_th_DEF = document.createElement("th");
        table_th_DEF.innerHTML = "DEF";
        var table_th_PHY = document.createElement("th");
        table_th_PHY.innerHTML = "PHY";

        table_tr.appendChild(table_th_rating);
        table_tr.appendChild(table_th_name);
        table_tr.appendChild(table_th_position);
        table_tr.appendChild(table_th_PAC);
        table_tr.appendChild(table_th_SHO);
        table_tr.appendChild(table_th_PAS);
        table_tr.appendChild(table_th_DRI);
        table_tr.appendChild(table_th_DEF);
        table_tr.appendChild(table_th_PHY);


        table.appendChild(thead);
        thead.appendChild(table_tr);
        table.appendChild(table_tbody);

        document.getElementById("testObject").appendChild(table);


       for(var i=0; i < list.length; i++){
            console.log(list[i].firstName + " " + list[i].position + " " + list[i].rating);

           var playerRow = document.createElement("tr");
           playerRow.className = "playerRow";
           playerRow.id = "playerRowID"+i;

           var playerRating = document.createElement("td");
           playerRating.className = "playerLine";
           playerRating.id= "playerRating" + i;
           playerRating.innerHTML = list[i].rating;

           var playerName = document.createElement("td");
           var space = document.createElement("br");
           var imgClub = new Image();
           imgClub.src = list[i].club.imageUrls.light.small;
           imgClub.style.height = 25;
           var imgNation =  new Image();
           imgNation.src = list[i].nation.imageUrls.small;
           imgNation.style.height = 15;
           imgNation.style.paddingLeft = "5px";
           var imgLeague = new Image();
           imgLeague.src = list[i].league.imageUrls.light;
           imgLeague.style.height = 25;
           imgLeague.style.paddingLeft = "5px";


           playerName.className = "playerLine";
           playerName.id= "player" + i;

           if (list[i].commonName === ""){
               playerName.innerHTML = list[i].firstName + " " + list[i].lastName;
           } else{
               playerName.innerHTML = list[i].commonName;
           }

           playerName.style.fontWeight = "bold";
           playerName.append(space, imgClub, imgNation , imgLeague);


           var playerPosition = document.createElement("td");
           playerPosition.className = "playerLine";
           playerPosition.id= "playerPositionID" + i;
           playerPosition.innerHTML = list[i].position;

           //Player stats
           var playerPAC = document.createElement("td");
           playerPAC.className = "playerLine";
           playerPAC.id= "playerPositionPAC" + i;
           playerPAC.innerHTML = list[i].attributes[0].value;
           var playerSHO = document.createElement("td");
           playerSHO.className = "playerLine";
           playerSHO.id= "playerPositionSHO" + i;
           playerSHO.innerHTML = list[i].attributes[1].value;
           var playerPAS = document.createElement("td");
           playerPAS.className = "playerLine";
           playerPAS.id= "playerPositionPAS" + i;
           playerPAS.innerHTML = list[i].attributes[2].value;
           var playerDRI = document.createElement("td");
           playerDRI.className = "playerLine";
           playerDRI.id= "playerPositionDRI" + i;
           playerDRI.innerHTML = list[i].attributes[3].value;
           var playerDEF = document.createElement("td");
           playerDEF.className = "playerLine";
           playerDEF.id= "playerPositionDEF" + i;
           playerDEF.innerHTML = list[i].attributes[4].value;
           var playerPHY = document.createElement("td");
           playerPHY.className = "playerLine";
           playerPHY.id= "playerPositionPHY" + i;
           playerPHY.innerHTML = list[i].attributes[5].value;



           // End player Stats


           playerRow.append(playerRating, playerName, playerPosition, playerPAC, playerSHO, playerPAS, playerDRI,
               playerDEF, playerPHY);
           document.getElementById("table_tbody").appendChild(playerRow);





        }


        var paginaTab = document.createElement('nav');
        var paginaTab_ul = document.createElement('ul');
        paginaTab_ul.className = "pagination justify-content-end";





        var paginaTab_li_counterleft = document.createElement('li');
        paginaTab_li_counterleft.className = "page-item";
        var paginaTab_li_prev_counterleft_a = document.createElement('a');
        paginaTab_li_prev_counterleft_a.className = "page-link";
        paginaTab_li_prev_counterleft_a.innerHTML = 1;
        paginaTab_li_prev_counterleft_a.onclick = function(){filter('page=1')};
        paginaTab_li_counterleft.appendChild(paginaTab_li_prev_counterleft_a);

        var paginaTab_li_countermid = document.createElement('li');
        paginaTab_li_countermid.className = "page-item";
        var paginaTab_li_countermid_a = document.createElement('a');
        paginaTab_li_countermid_a.className = "page-link";
        paginaTab_li_countermid_a.innerHTML = 2;
        paginaTab_li_countermid_a.onclick = function(){pageTwo()};
        paginaTab_li_countermid.appendChild(paginaTab_li_countermid_a);

        var paginaTab_li_counterright = document.createElement('li');
        paginaTab_li_counterright.className = "page-item";
        var paginaTab_li_counterright_a = document.createElement('a');
        paginaTab_li_counterright_a.className = "page-link";
        paginaTab_li_counterright_a.innerHTML = 3;
        paginaTab_li_counterright_a.onclick = function(){pageThree()};
        paginaTab_li_counterright.appendChild(paginaTab_li_counterright_a);

        var paginaTab_li_counternext = document.createElement('li');
        paginaTab_li_counternext.className = "page-item";
        var paginaTab_li_counternext_a = document.createElement('a');
        paginaTab_li_counternext_a.className = "page-link";
        paginaTab_li_counternext_a.innerHTML = "next";
        paginaTab_li_counternext_a.onclick = function(){filter('page='+ (pageCounter+1))};
        paginaTab_li_counternext.appendChild(paginaTab_li_counternext_a);


        paginaTab_ul.append( paginaTab_li_counterleft, paginaTab_li_countermid, paginaTab_li_counterright, paginaTab_li_counternext);

        paginaTab.appendChild(paginaTab_ul);
        document.getElementById("testObject").appendChild(paginaTab);














        // alert('Response from CORS request to ' + url);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    // xhr.setRequestHeader('Acces-Control-Allow-Origin', 'Content-Type');
    xhr.send();

}



function filter(modifier) {
    // This is a sample server that supports CORS.
    var url = 'https://www.easports.com/fifa/ultimate-team/api/fut/item?' + modifier + "";

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {

        //Console en tabel leegmaken
        console.clear();
        document.getElementById("testObject").innerHTML = "";

        var text = JSON.parse(xhr.responseText);
        var list = text.items;




        var table = document.createElement("table");
        table.className = "table";
        table.id = "allPlayerTable";

        var thead= document.createElement("thead");
        thead.className= "thead";
        thead.style.color = "white";
        thead.style.backgroundColor = "black";

        var table_tr = document.createElement("tr");
        table_tr.id = "table_tr_players";

        var table_th_name = document.createElement("th");
        table_th_name.innerHTML = "name";
        var table_th_rating = document.createElement("th");
        table_th_rating.innerHTML = "Rating";
        var table_th_position = document.createElement("th");
        table_th_position.innerHTML = "Position";
        var table_th_PAC = document.createElement("th");
        table_th_PAC.innerHTML = "PAC";
        var table_th_SHO = document.createElement("th");
        table_th_SHO.innerHTML = "SHO";
        var table_th_PAS = document.createElement("th");
        table_th_PAS.innerHTML = "PAS";
        var table_th_DRI = document.createElement("th");
        table_th_DRI.innerHTML = "DRI";
        var table_th_DEF = document.createElement("th");
        table_th_DEF.innerHTML = "DEF";
        var table_th_PHY = document.createElement("th");
        table_th_PHY.innerHTML = "PHY";

        table_tr.appendChild(table_th_rating);
        table_tr.appendChild(table_th_name);
        table_tr.appendChild(table_th_position);
        table_tr.appendChild(table_th_PAC);
        table_tr.appendChild(table_th_SHO);
        table_tr.appendChild(table_th_PAS);
        table_tr.appendChild(table_th_DRI);
        table_tr.appendChild(table_th_DEF);
        table_tr.appendChild(table_th_PHY);

        table.appendChild(thead);
        thead.appendChild(table_tr);

        document.getElementById("testObject").appendChild(table);


        for(var i=0; i < list.length; i++){
            console.log(list[i].firstName + " " + list[i].position + " " + list[i].rating);

            var playerRow = document.createElement("tr");
            playerRow.className = "playerRow";
            playerRow.id = "playerRowID"+i;

            var playerRating = document.createElement("td");
            playerRating.className = "playerLine";
            playerRating.id= "playerRating" + i;
            playerRating.innerHTML = list[i].rating;

            var playerName = document.createElement("td");
            var space = document.createElement("br");
            var imgClub = new Image();
            imgClub.src = list[i].club.imageUrls.light.small;
            imgClub.style.height = 25;
            var imgNation =  new Image();
            imgNation.src = list[i].nation.imageUrls.small;
            imgNation.style.height = 15;
            imgNation.style.paddingLeft = "5px";
            var imgLeague = new Image();
            imgLeague.src = list[i].league.imageUrls.light;
            imgLeague.style.height = 25;
            imgLeague.style.paddingLeft = "5px";


            playerName.className = "playerLine";
            playerName.id= "player" + i;
            if (list[i].commonName === ""){
                playerName.innerHTML = list[i].firstName + " " + list[i].lastName;
            } else{
                playerName.innerHTML = list[i].commonName;
            }
            playerName.append(space, imgClub, imgNation , imgLeague);


            var playerPosition = document.createElement("td");
            playerPosition.className = "playerLine";
            playerPosition.id= "playerPositionID" + i;
            playerPosition.innerHTML = list[i].position;

            //Player stats
            var playerPAC = document.createElement("td");
            playerPAC.className = "playerLine";
            playerPAC.id= "playerPositionPAC" + i;
            playerPAC.innerHTML = list[i].attributes[0].value;
            var playerSHO = document.createElement("td");
            playerSHO.className = "playerLine";
            playerSHO.id= "playerPositionSHO" + i;
            playerSHO.innerHTML = list[i].attributes[1].value;
            var playerPAS = document.createElement("td");
            playerPAS.className = "playerLine";
            playerPAS.id= "playerPositionPAS" + i;
            playerPAS.innerHTML = list[i].attributes[2].value;
            var playerDRI = document.createElement("td");
            playerDRI.className = "playerLine";
            playerDRI.id= "playerPositionDRI" + i;
            playerDRI.innerHTML = list[i].attributes[3].value;
            var playerDEF = document.createElement("td");
            playerDEF.className = "playerLine";
            playerDEF.id= "playerPositionDEF" + i;
            playerDEF.innerHTML = list[i].attributes[4].value;
            var playerPHY = document.createElement("td");
            playerPHY.className = "playerLine";
            playerPHY.id= "playerPositionPHY" + i;
            playerPHY.innerHTML = list[i].attributes[5].value;



            // End player Stats


            playerRow.append(playerRating, playerName, playerPosition, playerPAC, playerSHO, playerPAS, playerDRI,
                playerDEF, playerPHY);
            document.getElementById("allPlayerTable").appendChild(playerRow);

        }



        var paginaTab = document.createElement('nav');
        var paginaTab_ul = document.createElement('ul');
        paginaTab_ul.className = "pagination justify-content-end";
        paginaTab_ul.id = "paginaTab";

        var paginaTab_li_prev = document.createElement('li');
        paginaTab_li_prev.className = "page-item";
        var paginaTab_li_prev_a = document.createElement('a');
        paginaTab_li_prev_a.className = "page-link";
        paginaTab_li_prev_a.innerHTML = "Previous";
        paginaTab_li_prev_a.onclick = function(){pagedown()};
        paginaTab_li_prev.appendChild(paginaTab_li_prev_a);



        var paginaTab_li_counterleft = document.createElement('li');
        paginaTab_li_counterleft.className = "page-item";
        var paginaTab_li_prev_counterleft_a = document.createElement('a');
        paginaTab_li_prev_counterleft_a.className = "page-link";
        paginaTab_li_prev_counterleft_a.innerHTML = (pageCounter-1);
        paginaTab_li_prev_counterleft_a.onclick = function(){pagedown()};
        paginaTab_li_counterleft.appendChild(paginaTab_li_prev_counterleft_a);

        var paginaTab_li_countermid = document.createElement('li');
        paginaTab_li_countermid.className = "page-item";
        var paginaTab_li_countermid_a = document.createElement('a');
        paginaTab_li_countermid_a.className = "page-link";
        paginaTab_li_countermid_a.innerHTML = (pageCounter);
        // paginaTab_li_countermid_a.onclick = function(){filter()('page='+(pageCounter))};
        paginaTab_li_countermid.appendChild(paginaTab_li_countermid_a);

        var paginaTab_li_counterright = document.createElement('li');
        paginaTab_li_counterright.className = "page-item";
        var paginaTab_li_counterright_a = document.createElement('a');
        paginaTab_li_counterright_a.className = "page-link";
        paginaTab_li_counterright_a.innerHTML = (pageCounter+1);
        paginaTab_li_counterright_a.onclick = function(){pageup()};
        paginaTab_li_counterright.appendChild(paginaTab_li_counterright_a);

        var paginaTab_li_counternext = document.createElement('li');
        paginaTab_li_counternext.className = "page-item";
        var paginaTab_li_counternext_a = document.createElement('a');
        paginaTab_li_counternext_a.className = "page-link";
        paginaTab_li_counternext_a.innerHTML = "next";
        paginaTab_li_counternext_a.onclick = function(){pageup()};
        paginaTab_li_counternext.appendChild(paginaTab_li_counternext_a);


        paginaTab_ul.append(paginaTab_li_prev, paginaTab_li_counterleft, paginaTab_li_countermid, paginaTab_li_counterright, paginaTab_li_counternext);

        paginaTab.appendChild(paginaTab_ul);
        document.getElementById("testObject").appendChild(paginaTab);





        // alert('Response from CORS request to ' + url);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    // xhr.setRequestHeader('Acces-Control-Allow-Origin', 'Content-Type');
    xhr.send();

}

function filterPosition(modifier) {
    // This is a sample server that supports CORS.
    var url = 'https://www.easports.com/fifa/ultimate-team/api/fut/item?' + modifier;

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {

        //Console en tabel leegmaken
        console.clear();
        document.getElementById("testObject").innerHTML = "";

        var text = JSON.parse(xhr.responseText);
        var list = text.items;




        var table = document.createElement("table");
        table.className = "table";
        table.id = "allPlayerTable";

        var thead= document.createElement("thead");
        thead.className= "thead";
        thead.style.color = "white";
        thead.style.backgroundColor = "black";

        var table_tr = document.createElement("tr");
        table_tr.id = "table_tr_players";

        var table_th_name = document.createElement("th");
        table_th_name.innerHTML = "name";
        var table_th_rating = document.createElement("th");
        table_th_rating.innerHTML = "Rating";
        var table_th_position = document.createElement("th");
        table_th_position.innerHTML = "Position";
        var table_th_PAC = document.createElement("th");
        table_th_PAC.innerHTML = "PAC";
        var table_th_SHO = document.createElement("th");
        table_th_SHO.innerHTML = "SHO";
        var table_th_PAS = document.createElement("th");
        table_th_PAS.innerHTML = "PAS";
        var table_th_DRI = document.createElement("th");
        table_th_DRI.innerHTML = "DRI";
        var table_th_DEF = document.createElement("th");
        table_th_DEF.innerHTML = "DEF";
        var table_th_PHY = document.createElement("th");
        table_th_PHY.innerHTML = "PHY";

        table_tr.appendChild(table_th_rating);
        table_tr.appendChild(table_th_name);
        table_tr.appendChild(table_th_position);
        table_tr.appendChild(table_th_PAC);
        table_tr.appendChild(table_th_SHO);
        table_tr.appendChild(table_th_PAS);
        table_tr.appendChild(table_th_DRI);
        table_tr.appendChild(table_th_DEF);
        table_tr.appendChild(table_th_PHY);

        table.appendChild(thead);
        thead.appendChild(table_tr);

        document.getElementById("testObject").appendChild(table);


        for(var i=0; i < list.length; i++){
            console.log(list[i].firstName + " " + list[i].position + " " + list[i].rating);

            var playerRow = document.createElement("tr");
            playerRow.className = "playerRow";
            playerRow.id = "playerRowID"+i;

            var playerRating = document.createElement("td");
            playerRating.className = "playerLine";
            playerRating.id= "playerRating" + i;
            playerRating.innerHTML = list[i].rating;

            var playerName = document.createElement("td");
            var space = document.createElement("br");
            var imgClub = new Image();
            imgClub.src = list[i].club.imageUrls.light.small;
            imgClub.style.height = 25;
            var imgNation =  new Image();
            imgNation.src = list[i].nation.imageUrls.small;
            imgNation.style.height = 15;
            imgNation.style.paddingLeft = "5px";
            var imgLeague = new Image();
            imgLeague.src = list[i].league.imageUrls.light;
            imgLeague.style.height = 25;
            imgLeague.style.paddingLeft = "5px";


            playerName.className = "playerLine";
            playerName.id= "player" + i;
            if (list[i].commonName === ""){
                playerName.innerHTML = list[i].firstName + " " + list[i].lastName;
            } else{
                playerName.innerHTML = list[i].commonName;
            }
            playerName.append(space, imgClub, imgNation , imgLeague);


            var playerPosition = document.createElement("td");
            playerPosition.className = "playerLine";
            playerPosition.id= "playerPositionID" + i;
            playerPosition.innerHTML = list[i].position;

            //Player stats
            var playerPAC = document.createElement("td");
            playerPAC.className = "playerLine";
            playerPAC.id= "playerPositionPAC" + i;
            playerPAC.innerHTML = list[i].attributes[0].value;
            var playerSHO = document.createElement("td");
            playerSHO.className = "playerLine";
            playerSHO.id= "playerPositionSHO" + i;
            playerSHO.innerHTML = list[i].attributes[1].value;
            var playerPAS = document.createElement("td");
            playerPAS.className = "playerLine";
            playerPAS.id= "playerPositionPAS" + i;
            playerPAS.innerHTML = list[i].attributes[2].value;
            var playerDRI = document.createElement("td");
            playerDRI.className = "playerLine";
            playerDRI.id= "playerPositionDRI" + i;
            playerDRI.innerHTML = list[i].attributes[3].value;
            var playerDEF = document.createElement("td");
            playerDEF.className = "playerLine";
            playerDEF.id= "playerPositionDEF" + i;
            playerDEF.innerHTML = list[i].attributes[4].value;
            var playerPHY = document.createElement("td");
            playerPHY.className = "playerLine";
            playerPHY.id= "playerPositionPHY" + i;
            playerPHY.innerHTML = list[i].attributes[5].value;



            // End player Stats


            playerRow.append(playerRating, playerName, playerPosition, playerPAC, playerSHO, playerPAS, playerDRI,
                playerDEF, playerPHY);
            document.getElementById("allPlayerTable").appendChild(playerRow);

        }



        var paginaTab = document.createElement('nav');
        var paginaTab_ul = document.createElement('ul');
        paginaTab_ul.className = "pagination justify-content-end";
        paginaTab_ul.id = "paginaTab";

        var paginaTab_li_prev = document.createElement('li');
        paginaTab_li_prev.className = "page-item";
        var paginaTab_li_prev_a = document.createElement('a');
        paginaTab_li_prev_a.className = "page-link";
        paginaTab_li_prev_a.innerHTML = "Previous";
        paginaTab_li_prev_a.onclick = function(){pagedown()};
        paginaTab_li_prev.appendChild(paginaTab_li_prev_a);



        var paginaTab_li_counterleft = document.createElement('li');
        paginaTab_li_counterleft.className = "page-item";
        var paginaTab_li_prev_counterleft_a = document.createElement('a');
        paginaTab_li_prev_counterleft_a.className = "page-link";
        paginaTab_li_prev_counterleft_a.innerHTML = (pageCounter-1);
        paginaTab_li_prev_counterleft_a.onclick = function(){pagedown()};
        paginaTab_li_counterleft.appendChild(paginaTab_li_prev_counterleft_a);

        var paginaTab_li_countermid = document.createElement('li');
        paginaTab_li_countermid.className = "page-item";
        var paginaTab_li_countermid_a = document.createElement('a');
        paginaTab_li_countermid_a.className = "page-link";
        paginaTab_li_countermid_a.innerHTML = (pageCounter);
        // paginaTab_li_countermid_a.onclick = function(){filter()('page='+(pageCounter))};
        paginaTab_li_countermid.appendChild(paginaTab_li_countermid_a);

        var paginaTab_li_counterright = document.createElement('li');
        paginaTab_li_counterright.className = "page-item";
        var paginaTab_li_counterright_a = document.createElement('a');
        paginaTab_li_counterright_a.className = "page-link";
        paginaTab_li_counterright_a.innerHTML = (pageCounter+1);
        paginaTab_li_counterright_a.onclick = function(){pageup()};
        paginaTab_li_counterright.appendChild(paginaTab_li_counterright_a);

        var paginaTab_li_counternext = document.createElement('li');
        paginaTab_li_counternext.className = "page-item";
        var paginaTab_li_counternext_a = document.createElement('a');
        paginaTab_li_counternext_a.className = "page-link";
        paginaTab_li_counternext_a.innerHTML = "next";
        paginaTab_li_counternext_a.onclick = function(){pageup()};
        paginaTab_li_counternext.appendChild(paginaTab_li_counternext_a);


        paginaTab_ul.append(paginaTab_li_prev, paginaTab_li_counterleft, paginaTab_li_countermid, paginaTab_li_counterright, paginaTab_li_counternext);

        paginaTab.appendChild(paginaTab_ul);
        document.getElementById("testObject").appendChild(paginaTab);





        // alert('Response from CORS request to ' + url);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    // xhr.setRequestHeader('Acces-Control-Allow-Origin', 'Content-Type');
    xhr.send();

}

function pageup() {
    pageCounter++;
    filter('&page='+pageCounter);
    window.scrollTo(0,0);
}

function pagedown() {

    if (pageCounter <= 2){
        document.getElementById("paginaTab").children[0].style.display = "none";
        document.getElementById("paginaTab").children[1].style.display = "none"
    }
    if (pageCounter >1){
        pageCounter=pageCounter-1;
        filter('&page='+pageCounter);
    }
}

function pageTwo(){
    pageCounter = 2;
    filter('page=2');
}

function pageThree() {
    pageCounter = 3;
    filter('page=3');

}



    // xhr.send();
    //
    // function loadPlayers() {
    //     controlList = JSON.parse(xhr.responseText);
    //     var players =controlList.items;
    //
    //     console.log(players);
    // }

