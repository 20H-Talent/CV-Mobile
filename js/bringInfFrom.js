function hello() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/langs"
    }).done(function (lang) {
        var text1 = "";
        var i;
        for (i = 0; i < lang.length; i++) {
            text1 += '<div class="w-50 d-flex align-items-center"> <input type="checkbox" name="languages" class="languages data mr-2" id="' + lang[i].label + '"><p class="mb-0 mr-2">' + lang[i].label + "</p></div>";
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
            text2 += '<div class="w-50 d-flex align-items-center"> <input type="checkbox" name="skills"' + ' id="' + skill[e].name + '"' + ' class="skills data mr-2 "><p class="mb-0 mr-2">' + skill[e].label + "</p></div>";
        }
        var fromskill = text2;
        document.getElementById("substituteskill").innerHTML = fromskill;
    });

}
hello();

$("#send").click(function () {
    var data = document.getElementsByClassName("data");
    var country = document.getElementById("Country");
    var required = document.getElementsByClassName("required");
    var profilePicture = document.getElementById("image");
    var checkboxSkil = document.getElementsByClassName("skills");
    var seletdEspe = document.getElementsByClassName("experience");
    var checkgender = document.getElementsByClassName("gender");
    var checkboxLanguages = document.getElementsByClassName("languages");
    var i;
    // it var(n,s) is because calc the "input" required that are filled
    var n = 0;
    var s = 0;
    for (i = 0; i < required.length; i++) {
        if (required[i].value == "") {
            alert('it is required ' + required[i].id);
        } else {
            n++;
        }
    }
    if (checkgender[0].checked == false && checkgender[1].checked == false) {
        alert("Please indicate your gender");
    } else {
        n++;
    }
    //the -1 's because you have to remove the profilePicture of the list
    for (i = 0; i < checkboxSkil.length; i++) {
        if (checkboxSkil[i].checked == false) {
            s++;
        }
        if (s == checkboxSkil.length) {
            alert("Please indicate you skill");
        }
    }
    console.log(n);

    console.log(s);
    if (!(s == checkboxSkil.length)) {
        n++;
    }
    console.log(n);
    if (n == 10) {
        alert("a funcionado");
        for (i = 0; i < data.length; i++) {
            if (data[i].name == "languages") {
                languages = [];
                var e;
                for (e = 0; e < checkboxLanguages.length; e++) {
                    if (checkboxLanguages[e].checked) {
                        languages.push(checkboxLanguages[e].attributes.id.nodeValue);
                    }
                }

            } else if (data[i].name == "skills") {
                var skills = [];
                var e;
                for (e = 0; e < checkboxSkil.length; e++) {
                    if (checkboxSkil[e].checked) {
                        skills.push(checkboxSkil[e].attributes.id.nodeValue);
                    }
                };
            } else if (data[i].classList == "gender data  mr-1 ") {
                var e;
                for (e = 0; e < checkgender.length; e++) {
                    if (checkgender[e].checked) {
                        var gender = checkgender[e].attributes.id.nodeValue;
                    }
                }
            } else if (data[i].id == "Experience") {
                var e;
                var experience = '';
                for (e = 0; e < seletdEspe.length; e++) {
                    if (seletdEspe[e].selected) {
                        experience += seletdEspe[e].value;
                    }
                }
            } else if (data[i].id == "Name") {
                var name = data[i].value;
            } else if (data[i].id == "userName") {
                var userName = data[i].value;
            } else if (data[i].id == "email") {
                var email = data[i].value;
            } else if (data[i].id == "city") {
                var city = data[i].value;
            } else if (data[i].id == "state") {
                var state = data[i].value;
            } else if (data[i].id == "Company") {
                var company = data[i].value;
            } else if (data[i].id == "jobTitle") {
                var jobTitle = data[i].value;
            } else if (data[i].id == "website") {
                var website = data[i].value;
            } else if (data[i].id == "birthDate") {
                var birthDate = data[i].value;
            }
        }
        function createRequestBody() {
            let formData = new FormData();

            formData.append('name', name);
            formData.append('username', userName);
            formData.append('email', email);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('country', country.value);
            formData.append('website', website);
            formData.append('jobTitle', jobTitle);
            formData.append('languages', JSON.stringify(languages));
            formData.append('skills', JSON.stringify(skills));
            formData.append('company', company);
            formData.append('experience', experience);
            formData.append('birthDate', birthDate);
            formData.append('profilePicture', profilePicture.files[0]);

            return formData;
        }
        var usernew = createRequestBody();
        console.log(usernew)
        fetch('https://cv-mobile-api.herokuapp.com/api/users', {
            method: 'POST',
            body: usernew
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }
});





/*function createRequestBody() {
  let formData = new FormData();
  
 
  return formData;
}*/