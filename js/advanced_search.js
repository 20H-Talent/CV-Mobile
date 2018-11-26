const inputName = document.getElementById("name");
const inputUsername = document.getElementById("username");
const inputCity = document.getElementById("city");
const inputCountry = document.getElementById("country");
const inputExperience = document.getElementById("experience");
const inputCompany = document.getElementById("company");
const inputJobTitle = document.getElementById("job-title");
const inputSkills = document.getElementsByClassName("check-skill");
const inputLangs = document.getElementsByClassName("check-lang");

// Imprimir los checkboxes de lang que están checked
function getLangFilterAdvancedSearch(user) {
  const langChecks = document.getElementsByClassName("check-lang");
  const langArr = [];
  for (let i = 0; i < langChecks.length; i++) {
    if (langChecks[i].checked == true) {
      langArr.push(langChecks[i].value);
    }
  }
  const checkUserLangs = [];
  langArr.forEach((lang) => {
    // Comprobar que el valor está en el array del usuario
    checkUserLangs.push(user.languages.includes(lang));
  });
  if (checkUserLangs.includes(false)) {
    return false;
  }
  return true;
}

// Imprimir los checkboxes de skill que están checked
function getSkillFilterAdvancedSearch(user) {
  const skillChecks = document.getElementsByClassName("check-skill");
  const skillArr = [];
  for (let i = 0; i < skillChecks.length; i++) {
    if (skillChecks[i].checked == true) {
      skillArr.push(skillChecks[i].value);
    }
  }
  const checkUserSkills = [];
  skillArr.forEach((skill) => {
    // Comprobar que el valor está en el array del usuario
    checkUserSkills.push(user.skills.includes(skill));
  });

  if (checkUserSkills.includes(false)) {
    return false;
  }
  return true;
}

document.getElementById("searchbtn").addEventListener("click", (e) => {
  e.preventDefault();
  // Ponemos aquí el ajax para hacer la llamada al json cada vez que le demos click al botón search y no cada vez que se inicie la pantalla

  $.ajax({
    url: "https://cv-mobile-api.herokuapp.com/api/users"
  }).done((data) => {
    const filteredUser = data.filter((user) => {
      // console.log('istrue',inputExperience.value === user.experience)
      const checkArray = [];

        if (inputName.value.length > 0) {
          inputName.value.toLowerCase() === user.name.slice(0, inputName.value.length).toLowerCase()
            ? checkArray.push(true)
            : checkArray.push(false);
        } else {
          checkArray.push(true);
        }

        if (inputUsername.value.length > 0) {
          inputUsername.value.toLowerCase() === user.username.slice(0, inputUsername.value.length).toLowerCase()
          ? checkArray.push(true)
          : checkArray.push(false);
        }

        if (inputCity.value.length > 0) {
          inputCity.value.toLowerCase() === user.address.city.slice(0, inputCity.value.length).toLowerCase()
          ? checkArray.push(true)
          : checkArray.push(false);
        }

        if (inputCountry.value.length > 0) {
          inputCountry.value.toLowerCase() === user.address.country.slice(0, inputCountry.value.length).toLowerCase()
          ? checkArray.push(true)
          : checkArray.push(false);
        }

        if (inputJobTitle.value.length > 0 && !user.jobTitle) {
          false
        } else if (inputJobTitle.value.length > 0 && user.jobTitle) {
            inputJobTitle.value.toLowerCase() === user.jobTitle.slice(0, inputJobTitle.value.length).toLowerCase()
            ? checkArray.push(true)
            : checkArray.push(false);
          } 

        if (inputCompany.value.length > 0 && !user.company) {
          false
        } else if (inputCompany.value.length > 0) {
          inputCompany.value.toLowerCase() === user.company.slice(0, inputCompany.value.length).toLowerCase()
          ? checkArray.push(true)
          : checkArray.push(false);
          }

        if (inputExperience.value.length > 0 && inputExperience.value !== 'Choose an option') {
          inputExperience.value.toLowerCase() === user.experience.toLowerCase()
          ? checkArray.push(true)
          : checkArray.push(false);
        }

        if (getSkillFilterAdvancedSearch(user)){
          checkArray.push(true)
        } else {
          checkArray.push(false)
        }
        
        if (getLangFilterAdvancedSearch(user)) {
          checkArray.push(true)
        } else {
          checkArray.push(false)
        }
        
        if (checkArray.includes(false)) {
          return false;
        } else {
          return true;
        }
        console.log(checkArray);


    });
    $("form").hide();
    $(".goback-btn").show();
    cardsContainer.classList.remove('d-none');
    renderBadgets();

    const cancelIcon = document.querySelectorAll(".cancelIcon");
    cancelIcon.forEach(function(cancel){
      cancel.addEventListener("click", deleteBadge);
    });

    filteredUser.forEach( user => {
      cardsContainer.innerHTML += renderCards(user);

      $(".goback-btn").click(function(){
        $(".goback-btn").hide();
        $("form").show();
        cardsContainer.innerHTML = '';
        cardsContainer.classList.add('d-none');
        let badges = document.querySelectorAll('.badge');
        badges.forEach(function(badge){
          badge.remove();
        let inputs = document.querySelectorAll('input');
        inputs.forEach(function(input){
          input.value = ''
        })
        let checkboxes = document.querySelectorAll('.check');
        checkboxes.forEach(function(checkbox){
          checkbox.checked = false;
        })
        })
      });
    });
  });
})


// when submit button is clicked, the form will hide and the go back button will appear


// when go back button is clicked, the form will appear and the go back button will dissapear
  

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
    address,
    experience,
    profilePicture,
  } = filteredUser;
  const template_cards = (
    '<div class="card shadow m-3 p-4" style="width: 90%; height: auto;">' +
    '<img class="card-img-top m-auto" src="' + profilePicture + '" alt="' + name + ' Profile picture" style="height:150px; width:150px; border-radius:50%;">' +
    '<div class="card-body p-0 mt-2">' +
    '<h2 class="card-title text-center mb-2"><span>' + name + '</span></h2>' +
    '<h6 class="card-title text-center text-muted mb-4"><span>' + jobTitle + '</span></h6>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span>' + username + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span>' + email + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span>' + company + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">public</i> <span>' + address.city + ', ' + address.country + '</span></p>' +
    '<a href="./profile.html?id=' + _id + '" class="btn btn-primary mt-3">View Profile</a>' +
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
}).done((data) => {
  data.forEach((skill) => {
    document.getElementById("skill_container").innerHTML += renderSkill(skill);
  });
});

function renderSkill(skill) {
  const skillTemplate =
    '<div class="form-check col-12">' +
    '<input class="form-check-input check-skill check" type="checkbox" value="' +
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
}).done((data) => {
  data.forEach((language) => {
    document.getElementById("langs_container").innerHTML += renderLanguage(language);
  });
});

function renderLanguage(language) {
  const languageTemplate =
    ' <div class="form-check col-12">' +
    '<input class="form-check-input check-lang check" type="checkbox" value="' +
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

function deleteBadge(e) {
  const inputTarget = e.target.dataset.input;
  
  e.target.parentElement.remove();

  switch (inputTarget){
    case 'name' :
      inputName.value = '';
      break;
    case 'username' :
      inputUsername.value = '';
      break;
    case 'city' :
      inputCity.value = '';
      break;
    case 'country' :
      inputCountry.value = '';
    case 'jobTitle' :
      inputJobTitle.value = '';
      break;
    case 'company' :
      inputCompany.value = '';
      break;
    case 'experience' :
      inputExperience.value = '';
      break;
    case 'skills' :
    let skillsCopy = [...inputSkills];
    skillsCopy.forEach(function(skill){
      if (skill.id == e.target.dataset.id){
        skill.checked = false;
      }
        
      });
      break;
    case  'langs' :
    let langsCopy = [...inputLangs];
      langsCopy.forEach(function(lang){
        if (lang.id == e.target.dataset.id ){
          lang.checked = false;
        }
      });
  }
    cardsContainer.innerHTML = '';
    $( "#searchbtn" ).trigger( "click")
    };
//}

function renderBadgets() {
  var badgetTemplate = [];

  if( inputName.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center" >' + inputName.value + '<i class="material-icons cancelIcon" data-input="name">cancel</i></span>') ;
  }

  if( inputUsername.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center" >' + inputUsername.value + '<i class="material-icons cancelIcon" data-input="username">cancel</i></span>') ;
  }

  if( inputCity.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center" >' + inputCity.value + '<i class="material-icons cancelIcon" data-input="city">cancel</i></span>') ;
  }

  if( inputCountry.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center" >' + inputCountry.value + '<i class="material-icons cancelIcon" data-input="country">cancel</i></span>') ;
  }

  if( inputJobTitle.value !== '' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputJobTitle.value + '<i class="material-icons cancelIcon" data-input="jobTitle">cancel</i></span>') ;
  }

  if( inputCompany.value !== '' ) {
  badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center" >' + inputCompany.value+ '<i class="material-icons cancelIcon" data-input="company">cancel</i></span>') ;
  }

  if( inputExperience.value !== '' && inputExperience.value !== 'Choose an option' ) {
    badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + inputExperience.value + '<i class="material-icons cancelIcon" data-input="experience">cancel</i></span>') ;
  }
  // Esto copia los contenidos de inputSkill dentro de un array nuevecito mi hermano.
  // Y por eso no se puede hacer un forEach en un NodeList
  let skillsCopy = [...inputSkills];
  skillsCopy.forEach(function(skill){
    if (skill.checked) {
      badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + skill.nextSibling.textContent + '<i class="material-icons cancelIcon" data-input="skills" data-id="' + skill.id + '">cancel</i></span>') ;
    }
  });

  let langsCopy = [...inputLangs];
  langsCopy.forEach(function(lang){
    if (lang.checked) {
      badgetTemplate.push('<span class="badge badge-pill badge-info justify-content-center">' + lang.nextSibling.textContent + '<i class="material-icons cancelIcon" data-input="langs" data-id="' + lang.id + '">cancel</i></span>') ;
    }
  });


  var userBadget = badgetTemplate.join('')
  $('#badgetContainer').html(userBadget);
}
