function getDataLangs() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/langs"
    }).done(function (lang) {
        let textLang = "";
        var i;
        for (i = 0; i < lang.length; i++) {

            textLang +=
                '<div class="w-50 d-flex align-items-center"> ' +
                '<input type="checkbox" name="languages[]" class="languages data mr-2" id="' + lang[i].label + '"value="' + lang[i]._id + '">' +
                '<label for="' + lang[i].label + '" class="mb-0 mr-2">' + lang[i].label + '</label>' +
                '</div>';


        }
        var fromlague =
            '<label for="Laguages" class="col-4 font-weight-bold">Laguages</label>' +
            '<div class="input-group input-group-sm  font-weight-bold col-11"> '
            + textLang +
            '</div>';
        document.getElementById("substitutelangue").innerHTML = fromlague;
    });
}
function getDataSkill() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/skills"
    }).done(function (skill) {
        let textLang = "";
        let textLibrary = "";
        let textFramework = "";
        let textDatabase = "";
        let textTool = "";
        var e;
        for (e = 0; e < skill.length; e++) {
            if (skill[e].type === "language") {
                textLang +=
                    ' <option class="skills data" name="skills[]"' + ' id="' + skill[e].label + '"' + ' value="' + skill[e]._id + '">' +
                    skill[e].label +
                    '</option>'
                    ;
            } else if (skill[e].type === "library") {
                textLibrary +=
                    ' <option class="skills data"  name="skills[]"' + ' id="' + skill[e].label + '"' + ' value="' + skill[e]._id + '">' +
                    skill[e].label +
                    '</option>';
            } else if (skill[e].type === "framework") {
                textFramework +=
                    ' <option class="skills data"  name="skills[]"' + ' id="' + skill[e].label + '"' + ' value="' + skill[e]._id + '">' +
                    skill[e].label +
                    '</option>';
            } else if (skill[e].type === "database") {
                textDatabase +=
                    ' <option class="skills data"  name="skills[]"' + ' id="' + skill[e].label + '"' + ' value="' + skill[e]._id + '">' +
                    skill[e].label +
                    '</option>';
            } else if (skill[e].type === "tool") {
                textTool +=
                    ' <option class="skills data"  name="skills[]"' + ' id="' + skill[e].label + '"' + ' value="' + skill[e]._id + '">' +
                    skill[e].label +
                    '</option>';
            }

        }
        document.getElementById("skill-language").innerHTML = textLang;
        document.getElementById("skill-library").innerHTML = textLibrary;
        document.getElementById("skill-framework").innerHTML = textFramework;
        document.getElementById("skill-database").innerHTML = textDatabase;
        document.getElementById("skill-tool").innerHTML = textTool;
    });

}
getDataLangs();
getDataSkill();
var alertText = document.getElementsByClassName("alert-text");
var alertGeder = document.getElementById("gender-Alert");
var alertSkills = document.getElementById("alert-skills");
$("#send").click(function () {
    var languages = [];
    var skills = [];
    var data = document.getElementsByClassName("data");
    var profilePicture = document.getElementById("image");
    var checkboxSkil = document.getElementsByClassName("skills");
    var seletdEspe = document.getElementsByClassName("experience");
    var checkgender = document.getElementsByClassName("gender");
    var checkboxLanguages = document.getElementsByClassName("languages");
    var i;
    // it var(n,s) is because calc the "input" required that are filled
    //n is the input filled
    //s is the skill no checks

    for (i = 0; i < data.length; i++) {
        if (data[i].name == "languages[]") {
            var e;
            //here unite the language in a array 
            for (e = 0; e < checkboxLanguages.length; e++) {
                if (checkboxLanguages[e].checked) {
                    languages.push(checkboxLanguages[e].attributes.value.nodeValue);
                }
            }


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
        } else if (data[i].id == "street") {
            var street = data[i].value;
        } else if (data[i].id == "Company") {
            var company = data[i].value;
        } else if (data[i].id == "jobTitle") {
            var jobTitle = data[i].value;
        } else if (data[i].id == "website") {
            var website = data[i].value;
        } else if (data[i].id == "birthDate") {
            var birthDate = data[i].value;
        } else if (data[i].id == "Country") {
            var country = data[i].value;
        } else if (data[i].id == "zipcode") {
            var zipcode = data[i].value;
        } else if (data[i].id == "phone") {
            var phone = data[i].value;
        }
    }


    //here unite the Skill in a array
    var e;
    for (e = 0; e < checkboxSkil.length; e++) {

        if (checkboxSkil[e].selected) {

            skills.push(checkboxSkil[e].attributes.value.nodeValue);
        }
    };





    //the constructor of the data user
    function createRequestBody() {
        let usernew = {
            name: name,
            username: userName,
            email: email,
            phone: phone,
            gender: gender,
            address: {
                country: country,
                city: city,
                street: street,
                zipcode: zipcode
            },
            company: company,
            jobTitle: jobTitle,
            languages: languages,
            skills: skills,
            experience: experience,
            website: website,
            birthDate: birthDate
        }
        return usernew;
    }
    //here create the object
    var usernew = createRequestBody();
    console.log(usernew)
    fetch('https://cv-mobile-api.herokuapp.com/api/users/', {
        method: 'POST',
        body: JSON.stringify({username: 'Elon Musk',
    email: 'elonmusk@gmail.com',
    userId: 1
    }),
    headers:{"Content-Type":"application/json; chaset=utf-8"}
    })
        .then(res => res.json())
        .then(response => console.log(response))
        .catch(error => console.log(error.message));

});

