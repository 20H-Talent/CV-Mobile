const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputCity = document.getElementById("city");
const inputCountry = document.getElementById("country");
const inputExperience = document.getElementById("experience");
const inputCompany = document.getElementById("company");
const inputJobTitle = document.getElementById("job-title");

//Imprimir los checkboxes de lang que están checked
function getLangFilterAdvancedSearch(user) {
  var langChecks = document.getElementsByClassName("check-lang");
  var langArr = [];
  for (var i = 0; i < langChecks.length; i++) {
    if (langChecks[i].checked == true) {
      langArr.push(langChecks[i].value);
    }
  }
  var checkUserLangs = [];
  langArr.forEach(function(lang) {
    //Comprobar que el valor está en el array del usuario
    checkUserLangs.push(user.languages.includes(lang));
  });
  if (checkUserLangs.includes(false)) {
    return false;
  } else {
    return true;
  }
}

//Imprimir los checkboxes de skill que están checked
function getSkillFilterAdvancedSearch(user) {
  var skillChecks = document.getElementsByClassName("check-skill");
  var skillArr = [];
  for (var i = 0; i < skillChecks.length; i++) {
    if (skillChecks[i].checked == true) {
      skillArr.push(skillChecks[i].value);
    }
    //Comparar los lang que están en el array con los que el array del user
  }
  var checkUserSkills = [];
  skillArr.forEach(function(skill) {
    //Comprobar que el valor está en el array del usuario
    checkUserSkills.push(user.skills.includes(skill));
  });

  if (checkUserSkills.includes(false)) {
    return false;
  } else {
    return true;
  }
}

document.getElementById("searchbtn").addEventListener("click", function(e) {
  e.preventDefault();
  //Ponemos aquí el ajax para hacer la llamada al json cada vez que le demos click al botón search y no cada vez que se inicie la pantalla

  $.ajax({
    url: "https://cv-mobile-api.herokuapp.com/api/users"
  }).done(function(data) {
    console.log(data);
    const filteredUser = data.filter(function(user) {
      // console.log(getSkillFilterAdvancedSearch(user));
      return (
        inputName.value.toLowerCase() === user.name.slice(0, inputName.value.length).toLowerCase() &&
        inputUsername.value.toLowerCase() === user.username.slice(0, inputUsername.value.length).toLowerCase() &&
        inputCity.value.toLowerCase() === user.location.city.slice(0, inputCity.value.length).toLowerCase() &&
        inputCountry.value.toLowerCase() === user.location.country.slice(0, inputCountry.value.length).toLowerCase() &&
        inputJobTitle.value.toLowerCase() === user.jobTitle.slice(0, inputJobTitle.value.length).toLowerCase() &&
        inputCompany.value.toLowerCase() === user.company.slice(0, inputCompany.value.length).toLowerCase() &&
        inputExperience.value.toLowerCase() === user.experience &&
        getSkillFilterAdvancedSearch(user) &&
        getLangFilterAdvancedSearch(user)
      );
    });
    console.log(filteredUser);
  });
});

$.ajax({
  url: "https://cv-mobile-api.herokuapp.com/api/skills"
}).done(function(data) {
  data.forEach(function(skill) {
    document.getElementById("skill_container").innerHTML += renderSkill(skill);
  });
});

function renderSkill(skill) {
  var skillTemplate =
    '<div class="form-check col-12">' +
    '<input class="form-check-input check-skill" type="checkbox" value="' +
    skill.name +
    '" name="' +
    skill.name +
    '"id="' +
    skill.name +
    '">' +
    '<label class="form-check-label" for="' +
    skill.name +
    '">' +
    skill.label +
    "</label>" +
    "</div>";
  return skillTemplate;
}

$.ajax({
  url: "https://cv-mobile-api.herokuapp.com/api/langs"
}).done(function(data) {
  data.forEach(function(language) {
    document.getElementById("langs_container").innerHTML += renderLanguage(language);
  });
  // const inputLang = document.querySelectorAll(".check-lang");
  // var langArr = [];
  // inputLang.forEach(function(lang) {
  //   if (lang.checked == true) {
  //     langArr.push(lang.value);
  //   }
  // });
});

function renderLanguage(language) {
  var languageTemplate =
    ' <div class="form-check col-12">' +
    //Operador ternario
    '<input class="form-check-input check-lang" type="checkbox" value="' +
    language.value +
    '" id="' +
    language.name +
    '"' +
    (language.default ? "checked" : "") +
    ">" +
    '<label class="form-check-label" for="' +
    language.name +
    '">' +
    language.label +
    "</label>" +
    "</div>";
  return languageTemplate;
}

// $(".submit-btn").click(function(){
//   $("main").hide();
// });