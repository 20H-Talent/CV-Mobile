// Get the user's id from the url search parameter
const userID = window.location.search.split('=')[1];

// Get the user's info from the API with the user's id
fetch(`https://cv-mobile-api.herokuapp.com/api/users/${userID}`)
.then( res => res.json() )
.then( userData => {
  // Set image src
  userImg.src = userData.profilePicture;
  userImg.alt = userData.name + ' picture';
  // Print user's name
  document.querySelector('#name').innerHTML = userData.name;
  // Print user's job title
  document.querySelector('#jobTitle').innerHTML = userData.jobTitle;
  // Print user's username
  document.querySelector('#username').innerHTML = userData.username;
  // Print user's email
  document.querySelector('#email').innerHTML = userData.email;
  // Print user's website
  document.querySelector('#website').innerHTML = userData.website !== undefined ? userData.website : ' ';
  // Print user's username
  document.querySelector('#company').innerHTML = userData.company !== undefined ? userData.company : ' ';
  // Print user's experience
  document.querySelector('#experience').innerHTML = userData.experience !== undefined ? userData.experience : ' ';
  // Print user's langs
  document.querySelector('#langs').innerHTML = userData.languages.join(', ');
  // Print user's location
  document.querySelector('#location').innerHTML = userData.location.city + ', ' + userData.location.country;
  // Print user's skills
  document.querySelector('#skillContainer').innerHTML = createBadges(userData.skills);
});


function createBadges(skills) {
  const skillBadges = [];

  skills.forEach( skill => {
    skillBadges.push(`<h5 class="mr-2"><span class="badge badge-pill badge-success p-2">${skill}</span></h5>`);
  });

  return skillBadges.join('');
}


// Edit profile functionality
edit.addEventListener('click', openEditMode);

let editModeActive = false;

function openEditMode() {

  if (edit.innerHTML === 'edit') {
    editModeActive = true;
    edit.classList.add('d-none');
    save.classList.remove('d-none');
    cancel.classList.remove('d-none');
    document.querySelector('h2').setAttribute('contenteditable', true);
    document.querySelectorAll('p').forEach(el => el.setAttribute('contenteditable', true));
  } else {
    edit.classList.remove('text-success');
    cancel.classList.add('d-none');
    document.querySelector('h2').setAttribute('contenteditable', false);
    document.querySelectorAll('p').forEach(el => { el.setAttribute('contenteditable', false) });
    editModeActive = false;
  }
};