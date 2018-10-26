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
var alertText = document.getElementsByClassName("alert-text");
var alertGeder = document.getElementById("gender-Alert");
var alertSkills = document.getElementById("alert-skills");
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
    //n is the input filled
    var n = 0;
    //s is the skill no checks
    var s = 0;
    for (i = 0; i < alertText.length; i++) {
        alertText[i].classList.add("d-none")
    }
    alertGeder.classList.add("d-none");
    alertSkills.classList.add("d-none")
    for (i = 0; i < required.length; i++) {
        if (required[i].value == "") {
            alertText[i].classList.remove("d-none");
        } else {
            n++;
        }
    }
    //if the two gender check are false the alert
    if (checkgender[0].checked == false && checkgender[1].checked == false) {
        alertGeder.classList.remove("d-none")
    } else {
        n++;
    }
    for (i = 0; i < checkboxSkil.length; i++) {
        if (checkboxSkil[i].checked == false) {
            s++;
        }
    }
    if (s == checkboxSkil.length) {
        alertSkills.classList.remove("d-none")
    }
    //if there is no checks of the Skill activated sum one to change the result
    if (!(s == checkboxSkil.length)) {
        n++;
    }
    // the  9 because are the obligatory questions ,the question of Gender value two
    if (n == 9) {
        for (i = 0; i < data.length; i++) {
            if (data[i].name == "languages") {
                languages = [];
                var e;
                //here unite the language in a array 
                for (e = 0; e < checkboxLanguages.length; e++) {
                    if (checkboxLanguages[e].checked) {
                        languages.push(checkboxLanguages[e].attributes.id.nodeValue);
                    }
                }

            } else if (data[i].name == "skills") {
                var skills = [];
                var e;
                //here unite the Skill in a array
                for (e = 0; e < checkboxSkil.length; e++) {
                    if (checkboxSkil[e].checked) {
                        skills.push(checkboxSkil[e].attributes.id.nodeValue);
                    }
                };
                //here take the check active the gender
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
        //the constructor of the data user
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
        //here create the object
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




