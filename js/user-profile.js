// Get the user's id from the url search parameter
const userID = window.location.search.split('=')[1];
let originalUserInfo = '';
let editedUserInfo = {};

window.onload = fetchUserInfo(userID, renderUSerInfo);

// Get the user's info from the API with the user's id
function fetchUserInfo(id, callback) {
  fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`)
  .then( res => res.json() )
  .then( userData => {
    // Save a copy of the user info for editin mode comparison
    originalUserInfo = {...userData};
    editedUserInfo.skills = userData.skills;
    callback ? callback(originalUserInfo) : null;
  });
}

function renderUSerInfo(user) {
  // Set image src
  userImg.src = user.avatar;
  userImg.alt = user.name + ' picture';
  userImg.style.backgroundColor = '#999';
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
  let userLangs = user.languages.map(lang => lang.label)
  document.querySelector('#languages').innerHTML = userLangs.join(', ');
  // Print user's location
  document.querySelector('#address').innerHTML = user.address.city + ', ' + user.address.country;
  // Print user's skills
  document.querySelector('#skills').innerHTML = (
    '<div class="fluid-container w-100 d-flex flex-wrap" id="badgeContainer">' +
      createBadges(user.skills, false) +
    '</div>' +
    '<div class="fluid-container w-100 d-none mb-5" id="skill-search">' +
    '<input type="text" name="skill-input" id="skill-input" class="mt-3 w-100 border" />' +
    '<div class="fluid-container w-100 bg-white border"><ul class="m-0" id="skill-result"></ul></div>' +
    '</div>'
    );
}

function createBadges(skills, editMode) {
  const skillBadges = [];

  skills.forEach( skill => {
    skillBadges.push(
      '<h5 class="mr-2">' +
      '<span class="badge badge-pill badge-success py-2 px-3  badge-skill d-flex align-items-center">' +
      (editMode ? `<span data-skill="${skill._id}" onClick="removeSkill(this)"><i class="material-icons mr-2" style="font-size:1.2rem;">close</i></span>` : '') +
      `${skill.label}</span></h5>`
    );
  });

  return skillBadges.join('');
}

// Edit mode state
let editModeStatus = false;
let isDropdownOpen = false;

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
edit.addEventListener('click', toggleDropdown);

// Show profile options dropdown
function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  let options = document.querySelector('#edit-options');

  if (isDropdownOpen) {
    // Show the options of the profile
    options.classList.add('d-flex');
    options.classList.remove('d-none');
    // Add listeners to each option
    document.querySelector('#edit-btn').addEventListener('click', openEditMode)
    document.querySelector('#delete-btn').addEventListener('click', removeConfirmation)
  } else {
    // Hide the options of the profile
    options.classList.remove('d-flex');
    options.classList.add('d-none');
    // Remove the listener of the options to avoid unexpected behavior
    document.querySelector('#edit-btn').removeEventListener('click', openEditMode)
    document.querySelector('#delete-btn').removeEventListener('click', removeConfirmation)

  }

}

function changeForSelect(property, options, multiple) {
  const optionsArray = [];
  options.map( option => optionsArray.push(returnOptionElement(option, property)));

  $(`#${property}`).replaceWith(
    `<select class="w-100 user-info border" id="${property}" style="border:none; color: #05c643;" ${multiple ? 'multiple' : ''}>` +
    optionsArray.join('') +
    `</select>`
  );

  function returnOptionElement(option, property) {
    let optionTemplate = '';
    if (property === 'languages') {
      let selected = checkUserOptions(option._id, property) ? 'selected' : null;
      optionTemplate = `<option value="${option._id}" data-type="${property}" ${selected}>${option.label}</option>`;
    } else if (property === 'experience') {
      let selected = checkUserOptions(option, property) ? 'selected' : null;
      optionTemplate = `<option value="${option.label}" data-type="${property}" ${selected}>${option.label}</option>`;
    }
    return optionTemplate;
  }
}

function checkUserOptions(option, property) {
  let shouldSelected = false;
  if (property === 'languages') {
    originalUserInfo.languages.forEach( userLang => {
      if (option === userLang._id) {
        shouldSelected = true;
      }
    })
  } else if (property === 'experience') {
    originalUserInfo.experience === option.label ? shouldSelected = true : null
  }
  return shouldSelected;
}

function openEditMode() {
  toggleDropdown();
  changeEditModeStatus();
  // Enable to cancel the edits made
  cancel.addEventListener('click', closeEditMode);
  // Save profile changes functionality
  save.addEventListener('click', saveProfileChanges);

  // Replace experience and languages for inputs of type select
  let experienceOptions = [
    {
      value: "- 1 year",
      label: "- 1 year"
    },
    {
      value: "1 - 3 years",
      label: "1 - 3 years"
    },
    {
      value: "3 - 5 years",
      label: "3 - 5 years"
    },
    {
      value: "+ 5 years",
      label: "+ 5 years"
    }
  ]
  changeForSelect('experience', experienceOptions, false);

  // Get all available languages from the api to create the select input dynamically
  fetch(`https://cv-mobile-api.herokuapp.com/api/langs`)
  .then( res => res.json() ).then(langs => {
    // Transform languages text into a select
    changeForSelect('languages', langs, true);
    // Make text input based editable
    document.querySelectorAll('.user-info').forEach(el => {
      el.addEventListener('input', handleTextChange);

      if (el.id !== 'experience' && el.id !== 'languages') {
        el.setAttribute('contenteditable', true);
      }
    });
  });


  // Render a file input on top of the user's image
  toggleFileUploader();
  renderSkillsEditMode(originalUserInfo.skills);
  toggleSkillSearch('show');
};

function renderSkillsEditMode(skills) {
  return document.querySelector('#badgeContainer').innerHTML = createBadges(skills, true);
}

// Render an input type file over the user's avatar when edit mode is active
function toggleFileUploader() {
  document.querySelector('#profileBackdrop').classList.toggle('d-none');
  document.querySelector('#profileBackdrop').classList.toggle('d-flex');
  document.querySelector('#pictureLabel').classList.toggle('d-none');
  document.querySelector('#pictureLabel').classList.toggle('d-flex');
}

function toggleSkillSearch(order) {
  let skillSearch = document.querySelector('#skill-search');
  if (typeof order === 'string' && order === 'show') {
    skillSearch.classList.remove('d-none');
    document.querySelector('#skill-input').addEventListener('input', handleSkillSearch);
  } else if (typeof order === 'string' && order === 'hide') {
    skillSearch.classList.add('d-none');
    document.querySelector('#skill-input').removeEventListener('input', handleSkillSearch);
  } else {
    return 'Parameter not valid';
  }
}

function handleSkillSearch(e) {
  // grab the value to search
  let searchTerm = e.target.value.toLowerCase();
  let size = searchTerm.length;
  // fetch the skills from the server
  if (size > 0) {
    fetch('https://cv-mobile-api.herokuapp.com/api/skills')
    .then( response => response.json() )
    .then( response => {
      let serverSkills = response.slice(0);
      // filter the skills by name
      let filteredSkills = serverSkills.filter( skill => skill.label.toLowerCase().slice(0, size) === searchTerm.toLowerCase() );
      // render the coincidences in the #skill-result container
      if (filteredSkills.length > 0) {
        document.querySelector('#skill-result').innerHTML = '';
        filteredSkills.forEach( (skill, index) => document.querySelector('#skill-result').appendChild(skillResultTemplate(skill, index)) )
      } else {
        document.querySelector('#skill-result').innerHTML = '';
      }
    });
  } else {
    document.querySelector('#skill-result').innerHTML = '';
  }
}

function skillResultTemplate(skill, order) {
  let listItem = document.createElement('li');
  listItem.classList = `skill-result fluid-container d-flex p-2 bg-light border`;
  listItem.innerHTML = skill.label;
  listItem.dataset.value = skill._id;
  listItem.dataset.label = skill.label;
  listItem.dataset.type = skill.type;
  listItem.dataset.bg = order % 2 === 0 ? 'even' : 'odd';
  listItem.style.cursor = 'pointer';

  listItem.addEventListener('click', addNewSkill);
  listItem.addEventListener('mouseenter', addResultHover);
  listItem.addEventListener('mouseleave', removeResultHover);

  return listItem;
}

function addResultHover(e) {
  let target = e.target;

  target.classList.add('bg-success')
  target.classList.add('text-white')
  target.classList.remove('bg-light')
}

function removeResultHover(e) {
  let target = e.target;

  target.classList.remove('bg-success')
  target.classList.remove('text-white')
  target.classList.add('bg-light')
}

function addNewSkill(e) {
  const skillValue = e.target.dataset.value;
  let isSkillRepeated = false;
  let skillToAdd = {
    _id: skillValue,
    label: e.target.dataset.label,
    type: e.target.dataset.type
  }
  editedUserInfo.skills.forEach(skill => {
    if (skillValue === skill._id){
      isSkillRepeated = true;
    }
  });

  if (!isSkillRepeated) {
    editedUserInfo.skills !== undefined
    ? editedUserInfo.skills.push(skillToAdd)
    : editedUserInfo.skills = [skillToAdd];
    renderSkillsEditMode(editedUserInfo.skills)
  } else {
    console.warn('[ERROR]: the user already has that skill.');
  }
}

function removeSkill(element) {
  const valuetoRemove = element.dataset.skill;
  const { skills } = originalUserInfo;
  let skillIndex = skills.indexOf(valuetoRemove);
  skills.splice( skillIndex, 1);

  editedUserInfo.skills = skills
  renderSkillsEditMode(skills);
}

// Close edit mode and return user info to the initial state
function closeEditMode() {
  loader.classList.add('d-none');
  if (editModeStatus) {
    changeEditModeStatus();
    document.querySelectorAll('.user-info').forEach(el => {
      el.setAttribute('contenteditable', false);
      el.classList.remove('edited');
      el.style.color = '';
    });

    toggleFileUploader();
    fetchUserInfo(userID, renderUSerInfo)
  }
}

// Grab the changed info and send it to the API
function saveProfileChanges() {
  if (editModeStatus) {
    document.querySelectorAll('.edited').forEach( el => {
      switch (el.id) {
        case 'address':
          editedUserInfo[el.id] = {
            city: el.textContent.split(', ')[0],
            country: el.textContent.split(', ')[1],
            street: originalUserInfo.address.street,
            zipcode: originalUserInfo.address.zipcode
          }
          break;

        default:
          editedUserInfo[el.id] = $(el).val() || $(el).html();
          break;
      }
    });

    // Send the data to the server
    fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`, {
      method: 'PUT',
      body: JSON.stringify(editedUserInfo),
      headers: { "Content-Type": "application/json; charset=utf-8"}
    }).then( res => res.json())
      .then( updatedUser => {
        originalUserInfo = {...updatedUser};
        sendNewPicture();
        closeEditMode();
      });
    }
  }

  function sendNewPicture() {
    const imageInput = document.querySelector('#picture-input');
    let imageData = new FormData();
    imageData.append('img', imageInput.files[0]);
    fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/user/${userID}`, {
      method: 'POST',
      body: imageData,
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

function removeConfirmation() {
  // Hide the users options
  toggleDropdown();
  // Show the context menu
  loader.classList.remove('d-none');
  // Confirm delete of user
  $('#delete-confirm').on('click', removeUser);
  // Cancel delete action
  $('#delete-cancel').on('click', () => {
    loader.classList.add('d-none');
  });
}

function removeUser() {
    fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`, {
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(response => {
      console.log(response);
      window.location.pathname = '/index.html';
    });
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
        targetContent.forEach( el => originalUserInfo.languages.includes(el) ? checkArr.push(true) : checkArr.push(false));

        if (checkArr.length !== originalUserInfo.languages.length || checkArr.includes(false)) {
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
          state: originalUserInfo.location.state
        }
        if (originalUserInfo.location.city === modifiedLocation.city && originalUserInfo.location.country === modifiedLocation.country) {
          e.target.classList.remove('edited');
        } else {
          e.target.classList.add('edited');
        }
        break;

      case 'experience':
        if (originalUserInfo.experience !== this.value) {
          e.target.classList.add('edited');
          e.target.style.color = '#f28202';
        } else {
          e.target.classList.remove('edited');
          e.target.style.color = '#05c643';
        }

        break;

      default:
        if (originalUserInfo[targetName] !== targetContent) {
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

function handleImageError(image) {
  image.onerror = "";
  image.src = "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png";
  return true;
}