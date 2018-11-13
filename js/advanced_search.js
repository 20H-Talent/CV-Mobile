const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputCity = document.getElementById("city");
const inputCountry = document.getElementById("country");
const inputExperience = document.getElementById("experience");
const inputCompany = document.getElementById("company");
const inputJobTitle = document.getElementById("job-title");
// const cardsContainer = document.getElementById('cards-container');

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
    console.log(inputCountry.value);
    $("form").hide();
    $(".goback-btn").show();
    cardsContainer.classList.remove('d-none');
    renderBadgets();

    filteredUser.forEach( user => {
      cardsContainer.innerHTML += renderCards(user);

      $(".goback-btn").click(function(){
        $(".goback-btn").hide();
        $("form").show();
        cardsContainer.innerHTML = '';
        cardsContainer.classList.add('d-none');

      });
    });
  });
})


// when submit button is clicked, the form will hide and the go back button will appear


//when go back button is clicked, the form will appear and the go back button will dissapear
  

function renderCards(filteredUser) {
  const {
    name,
    username,
    jobTitle,
    company,
    email,
    languages,
    skills,
    _id,
    location,
    experience,
    profilePicture,
  } = filteredUser;
  var template_cards = (
    '<div class="card shadow m-3 p-4" style="width: 90%; height: auto;">' +
    '<img class="card-img-top m-auto" src="' + profilePicture + '" alt="' + name + ' Profile picture" style="height:150px; width:150px; border-radius:50%;">' +
    '<div class="card-body p-0 mt-2">' +
    '<h2 class="card-title text-center mb-2"><span>' + name + '</span></h2>' +
    '<h6 class="card-title text-center text-muted mb-4"><span>' + jobTitle + '</span></h6>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span>' + username + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span>' + email + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span>' + company + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">public</i> <span>' + location.city + ', ' + location.country + '</span></p>' +
    '<a href="./html/profile.html?id=' + _id + '" class="btn btn-primary mt-3">View Profile</a>' +
    '</div>' +
    '</div>'
    // '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">today</i> <span' + (highlight.includes('experience') ? ' class="bg-warning"' : '') + '>' + experience + '</span></p>' +
    // '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">translate</i> <span' + (highlight.includes('languages') ? ' class="bg-warning"' : '') + '>' + languages.join(', ') + '</span></p>' +
    // '<div class="container-fluid p-0 mt-4 d-flex flex-wrap">' + createBadges(skills) + '</div>' +
  );

  return template_cards;
}

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
    skill._id +
    '" name="' +
    skill.name +
    '"id="' +
    skill._id +
    '">' +
    '<label class="form-check-label" for="' +
    skill._id+
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
});

function renderLanguage(language) {
  var languageTemplate =
    ' <div class="form-check col-12">' +
    //Operador ternario
    '<input class="form-check-input check-lang" type="checkbox" value="' +
    language._id +
    '" id="' +
    language._id +
    '"' +
    (language.default ? "checked" : "") +
    ">" +
    '<label class="form-check-label" for="' +
    language._id +
    '">' +
    language.label +
    "</label>" +
    "</div>";
  return languageTemplate;
}

function renderBadgets() {
  var badgetTemplate = [];

  if( inputName.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputName.value + '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputUsername.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputUsername.value + '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputCity.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputCity.value + '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputCountry.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputCountry.value + '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputJobTitle.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputJobTitle.value + '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputCompany.value !== '' ) {
  badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputCompany.value+ '<i class="material-icons">cancel</i></span>') ;
  }

  if( inputExperience.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputExperience.value + '<i class="material-icons">cancel</i></span>') ;
  }

  var userBadget = badgetTemplate.join('')
  $('#badgetContainer').html(userBadget);
}


