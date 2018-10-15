const inputName = document.getElementById("name");
const inputCity = document.getElementById("city");
const inputExperience = document.getElementById("experience");

//Imprimir los checkboxes de lang que están checked
function getLangFilterAdvancedSearch() {
  var langChecks = document.getElementsByClassName("check-lang");
  var langArr = [];
  for (var i = 0; i < langChecks.length; i++) {
    if (langChecks[i].checked == true) {
        langArr.push(langChecks[i].value);
    }
  }
  console.log(langArr);
}

//Imprimir los checkboxes de skill que están checked
function getSkillFilterAdvancedSearch() {
    var skillChecks = document.getElementsByClassName("check-skill");
    var skillArr = [];
    for (var i = 0; i < skillChecks.length; i++) {
      if (skillChecks[i].checked == true) {
          skillArr.push(skillChecks[i].value);
      }
    }
    console.log(skillArr);
  }

document.getElementById("searchbtn").addEventListener("click", function(e) {
  e.preventDefault();
  //Ponemos aquí el ajax para hacer la llamada al json cada vez que le demos click al botón search y no cada vez que se inicie la pantalla

  $.ajax({
    url: "https://cv-mobile-api.herokuapp.com/api/users"
  }).done(function(data) {
    getLangFilterAdvancedSearch();
    getSkillFilterAdvancedSearch();
    const filteredUser = data.filter(function(user) {
      return (
        inputName.value.toLowerCase() ===
          user.name.slice(0, inputName.value.length).toLowerCase() &&
        inputCity.value.toLowerCase() ===
          user.location.city.slice(0, inputCity.value.length).toLowerCase() &&
        inputExperience.value.toLowerCase() ===
          user.experience.slice(0, inputExperience.value.length).toLowerCase()
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
    '<input class="form-check-input check-skill" type="checkbox" value="' + skill.name + '" name="' + skill.name + '"id="' + skill.name +'">' +
    '<label class="form-check-label" for="' + skill.name +'">' + skill.label +"</label>" + 
    "</div>";
  return skillTemplate;
}

$.ajax({
  url: "https://cv-mobile-api.herokuapp.com/api/langs"
}).done(function(data) {
  data.forEach(function(language) {
    document.getElementById("langs_containers").innerHTML += renderLanguage(
      language
    );
  });
  const inputLang = document.querySelectorAll(".check-lang");
  var langArr = [];
  inputLang.forEach(function(lang) {
    if (lang.checked == true) {
      langArr.push(lang.value);
    }
  });
  //Necesitamos que nos enseñe cada valor que esté checked en la consola. Para ello necesitamos:
  //Iterar con un forEach langArr
  //Array.include

  // langArr.forEach();
  //     console.log(langArr.includes());
  //console.log(langArr);
});

function renderLanguage(language) {
  var languageTemplate =
    ' <div class="form-check col-12">' +
    //Operador ternario
    '<input class="form-check-input check-lang" type="checkbox" value="' + language.label + '" id="' + language.name + '"' + (language.default ? "checked" : "") + ">" +
    '<label class="form-check-label" for="' + language.name + '">' + language.label + "</label>" +

    "</div>";
  return languageTemplate;
}
/*
<div class="form-check col-12">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheckGerman">
    <label class="form-check-label" for="defaultCheckGerman">German</label>
          </div> */
