// Get the user's id from the url search parameter
const userID = window.location.search.split('=')[1];
let currentUserInfo = '';
// Get the user's info from the API with the user's id
fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`)
.then( res => res.json() )
.then( userData => {
  // Save a copy of the user info for editin mode comparison
  currentUserInfo = {...userData};
  renderUSerInfo(userData);
});

function renderUSerInfo(user) {
  // Set image src
  userImg.src = user.profilePicture;
  userImg.alt = user.name + ' picture';
  // Print user's name
  document.querySelector('#name').innerHTML = user.name;
  // Print user's job title
  document.querySelector('#jobTitle').innerHTML = user.jobTitle;
  // Print user's username
  document.querySelector('#username').innerHTML = user.username;
  // Print user's email
  document.querySelector('#email').innerHTML = user.email;
  // Print user's website
  document.querySelector('#website').innerHTML = user.website !== undefined ? user.website : ' ';
  // Print user's username
  document.querySelector('#company').innerHTML = user.company !== undefined ? user.company : ' ';
  // Print user's experience
  $('#experience').replaceWith(`<p class="m-0 w-100 user-info" id="experience"></p>`);
  document.querySelector('#experience').innerHTML = user.experience !== undefined ? user.experience : ' ';
  // Print user's langs
  $('#languages').replaceWith(`<p class="m-0 w-100 user-info" id="languages"></p>`);
  document.querySelector('#languages').innerHTML = user.languages.join(', ');
  // Print user's location
  document.querySelector('#location').innerHTML = user.location.city + ', ' + user.location.country;
  // Print user's skills
  document.querySelector('#skills').innerHTML = createBadges(user.skills);
}


function createBadges(skills) {
  const skillBadges = [];

  skills.forEach( skill => {
    skillBadges.push(`<h5 class="mr-2"><span class="badge badge-pill badge-secondary p-2">${skill}</span></h5>`);
  });

  return skillBadges.join('');
}


// Edit mode state
let editModeStatus = false;
// Change interface icons on edit mode status
function changeEditModeStatus() {
  editModeStatus = !editModeStatus;
  if (editModeStatus) {
    edit.classList.add('d-none');
    save.classList.remove('d-none');
    cancel.classList.remove('d-none');
  } else {
    edit.classList.remove('d-none');
    save.classList.add('d-none');
    cancel.classList.add('d-none');
  }
}
// Edit profile functionality
edit.addEventListener('click', openEditMode);

function changeForSelect(property, options, multiple) {
  const optionsArray = [];

  if (property === 'experience') {
    options.map( option => optionsArray.push(returnOptionElement(option)));
  } else {
    options.map( option => optionsArray.push(returnOptionElement(option.label)));
  }

  $(`#${property}`).replaceWith(
    `<select class="w-100 user-info" id="${property}" style="border:none; color: #05c643;" ${multiple ? 'multiple' : ''}>` +
    optionsArray.join('') +
    `</select>`
  );

  function returnOptionElement(option) {
    return `<option value="${option}" ${currentUserInfo[property].includes(option) ? 'selected' : ''}>${option}</option>`;
  }
}

function openEditMode() {
  changeEditModeStatus();
  // Enable to cancel the edits made
  cancel.addEventListener('click', closeEditMode);
  // Save profile changes functionality
  save.addEventListener('click', saveProfileChanges);
  // Replace experience and languages for inputs of type select
  changeForSelect('experience', ["- 1 year", "1 - 3 years", "3 - 5 years", "+ 5 years"], false);
  // Get all available languages from the api to create the select input dynamically
  fetch(`https://cv-mobile-api.herokuapp.com/api/langs`)
  .then( res => res.json() ).then(langs => {
    changeForSelect('languages', langs, true);
    // Make text input based editable
    document.querySelectorAll('.user-info').forEach(el => {
      el.addEventListener('input', handleTextChange);

      if (el.id !== 'experience' && el.id !== 'languages') {
        el.setAttribute('contenteditable', true);
      }
    });
  });
};

// Close edit mode and return user info to the initial state
function closeEditMode() {
  if (editModeStatus) {
    changeEditModeStatus();
    document.querySelectorAll('.user-info').forEach(el => {
      el.setAttribute('contenteditable', false);
      el.classList.remove('edited');
    });
    renderUSerInfo(currentUserInfo);
  }
}

// Grab the changed info and send it to the API
function saveProfileChanges() {
  if (editModeStatus) {
    changeEditModeStatus();
    document.querySelectorAll('.edited').forEach( el => {
      switch (el.id) {
        case 'location':
          currentUserInfo[el.id] = {
            city: el.textContent.split(', ')[0],
            country: el.textContent.split(', ')[1],
            state: currentUserInfo.location.state
          }
          break;

        default:
          currentUserInfo[el.id] = $(el).val() || $(el).html();
          break;
      }
    });

    let formData = new FormData();

    formData.append('name', currentUserInfo.name);
    formData.append('username', currentUserInfo.username);
    formData.append('jobTitle', currentUserInfo.jobTitle);
    formData.append('email', currentUserInfo.email);
    formData.append('website', currentUserInfo.website);
    formData.append('city', currentUserInfo.location.city);
    formData.append('state', currentUserInfo.location.state);
    formData.append('country', currentUserInfo.location.country);
    formData.append('languages', currentUserInfo.languages.join(', '));
    formData.append('skills', currentUserInfo.skills.join(', '));
    formData.append('company', currentUserInfo.company);
    formData.append('experience', currentUserInfo.experience);
    formData.append('birthDate', '1986-02-25T00:00:00.000Z');
    formData.append('gender', 'male');
    formData.append('profilePicture', currentUserInfo.profilePicture);

    // Send the data to the server
    fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`, {
      method: 'PUT',
      body: formData
    }).then( res => res.json())
    .then( jsonRes => {
      console.log(jsonRes);
      closeEditMode();
    });
  }
}

// Handle user's info content changes
function handleTextChange(e) {

  if (editModeStatus) {
    const targetName = e.target.id;
    const targetContent = $(this).val() || e.target.textContent;

    switch (targetName) {
      case 'languages':
        // Comprobar que el array que los idiomas es igual que un array a partir del string actual
        const checkArr = [];
        targetContent.forEach( el => currentUserInfo.languages.includes(el) ? checkArr.push(true) : checkArr.push(false));

        if (checkArr.length !== currentUserInfo.languages.length || checkArr.includes(false)) {
          e.target.classList.add('edited');
          e.target.style.color = '#f28202';
        } else {
          e.target.classList.remove('edited');
          e.target.style.color = '#05c643';
        }
        break;

      case 'location':
        const modifiedLocation = {
          city: targetContent.split(', ')[0],
          country: targetContent.split(', ')[1],
          state: currentUserInfo.location.state
        }
        if (currentUserInfo.location.city === modifiedLocation.city && currentUserInfo.location.country === modifiedLocation.country) {
          e.target.classList.remove('edited');
        } else {
          e.target.classList.add('edited');
        }
        break;

      case 'experience':
        if (currentUserInfo.experience !== this.value) {
          e.target.classList.add('edited');
          e.target.style.color = '#f28202';
        } else {
          e.target.classList.remove('edited');
          e.target.style.color = '#05c643';
        }

        break;

      default:
        if (currentUserInfo[targetName] !== targetContent) {
          // Change the text color when the info has changed from the initial data
          e.target.classList.add('edited');
        } else {
          // Change the text color back to green when the info is equal to the initial data
          e.target.classList.remove('edited');
        }
        break;
    }
  }
}