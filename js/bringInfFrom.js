function hello() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/langs"
    }).done(function (lang) {
        var text1 = "";
        var i;
        for (i = 0; i < lang.length; i++) {
            text1 += ' <input type="checkbox" name="languages" class="languages data mr-1" id="' + lang[i].label + '"><p class="mb-0 mr-2">' + lang[i].label + "</p><br>";
        }
        var fromlague = '<label for="Laguages" class="w-100">Laguages</label>' + text1;
        document.getElementById("substitutelangue").innerHTML = fromlague;
    });

    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/skills"
    }).done(function (skill) {
        var text2 = "";
        var e;
        for (e = 0; e < skill.length; e++) {
            text2 += ' <input type="checkbox" name="skills"' + ' id="' + skill[e].name + '"' + ' class="skills data mr-1"><p class="mb-0 mr-2">' + skill[e].label + "</p><br>";
        }
        var fromskill = ' <label for="skills" class="w-100">Skills</label><br>' + text2;
        document.getElementById("substituteskill").innerHTML = fromskill;
    });

}
hello();
function old() {
    var data = document.getElementsByClassName("data");
    var data1 = document.getElementsByClassName("order1");
    var data2 = document.getElementsByClassName("order2");
    var img = document.getElementById("image");
    var dataLocal = document.getElementsByClassName("location");
    var checkboxSkil = document.getElementsByClassName("skills");
    var seletdEspe = document.getElementsByClassName("experience");
    var checkgender = document.getElementsByClassName("gender");
    var checkboxLanguages = document.getElementsByClassName("languages");
    var compileold = '{';
    var i;
    for (i = 0; i < data.length; i++) {
        //it is sorted by order of the file API
        if (data[i].name == "languages") {
            var compileLang = '"languages":[';
            var e;
            for (e = 0; e < checkboxLanguages.length; e++) {
                if (checkboxLanguages[e].checked) {
                    compileLang += '"' + checkboxLanguages[e].attributes.id.nodeValue + '"';
                }
            }
            compileLang += '],';
        } else if (data[i].name == "skills") {
            var compileCheck = '"skills":[ ';
            var e;
            for (e = 0; e < checkboxSkil.length; e++) {
                if (checkboxSkil[e].checked) {
                    compileCheck += '"' + checkboxSkil[e].attributes.id.nodeValue + '"';
                }
            };
            compileCheck += "],";
        }else if(data[i].classList=="form-control order1 data border border-info"){
            var e;
            var compileData1 ="";
            for(e=0;e<data1.length;e++){
                compileData1 += '"'+ data1[e].name +'":"'+data1[e].value +'",';
            }
        }else if(data[i].classList=="gender data"){
            var e;
            var gender = "";
            for(e=0;e<checkgender.length;e++){
                if(checkgender[e].checked){
                    gender +='"gender":"'+ checkgender[e].attributes.id.nodeValue+'",';
                }
            }
        }else if(data[i].classList=="form-control data location border border-info"){
            var e;
            var location ='"location":[';
            for(e=0;e<dataLocal.length;e++)
            location +='"'+dataLocal[e].name+'":"'+dataLocal[e].value+'"';
            if(e==dataLocal.length-1){
            }else{
                location +=',';
            }
            location += ']';
        }else if(data[i].classList=="form-control order2 data border border-info"){
            var e;
            var compileData2 ="";
            for(e=0;e<data2.length;e++){
                compileData2 += '"'+ data2[e].name +'":"'+data2[e].value +'",';
            }
        }else if(data[i].id=="Experience"){
            var e;
            var experience='';
            for(e=0;e<seletdEspe.length;e++){
                if(seletdEspe[e].selected){
                    experience +='"experience":"'+ seletdEspe[e].value+'"';
                }
            }
        }
    }

    compileold += compileLang+compileCheck+compileData1+gender+location+compileData2+experience+ '}';
    console.log(compileold)
};
    //  user  += datatext[i].value; 
    //  console.log(user)
    // var endComCheck = [ compileCheck];
    //   console.log(endComCheck)

/*
{"languages":["spanish","english"]
,"skills":["html","jquery","css"]
,"_id":"5bbccbb633daa000153cc81a"
,"name":"Maria Naranjo"
,"username":"marianaranjo"
,"email":"maria@gmail.com"
,"gender":"female"
,"location":{"city":"London","state":"London","country":"United Kingdom"}
,"company":"Hoeger LLC"
,"website":"marianaran.net"
,"birthDate":"2000-02-05T00:00:00.000Z"
,"experience":"1 year"
,"profilePicture":"https://cv-mobile-api.herokuapp.com/uploads/2018-10-09T15:39:34.379Z500_16.jpeg"
,"__v":0}
*/