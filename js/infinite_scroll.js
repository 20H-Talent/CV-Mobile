const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.getElementById("nav-input");


// Request the users data at page loading
window.onload = fetchUsersData;

// State variables to control activation of infinite scroll, page of users to request and store of all users requested
let isFetchAllowed = true;
let currentUsersPage = 1;
let loadedUsers = [];

// Initial content load from API
function fetchUsersData() {
  if (searchInput.value == '') {
    $.ajax({
      url: `https://cv-mobile-api.herokuapp.com/api/users/pages/${currentUsersPage}`
    }).done((data) => {
      if (data.length === 10) {
        data.map( (user) => {
          user.highlight = [];
          checkIfUserIsNew(user) ? user.newUser = true : user.newUser = false;
          const card = renderCard(user);
          cardsContainer.innerHTML += card;
          loadedUsers.push(user);
        });
        // Add one to the current page of users for the next request if the page has 10 users
        currentUsersPage++;

      } else if (data.length < 10) {

        if (data[0]._id !== loadedUsers[loadedUsers.length - 1]._id) {
          data.map( (user) => {
            checkIfUserIsNew(user) ? user.newUser = true : user.newUser = false;
            const card = renderCard(user);
            cardsContainer.innerHTML += card;
            loadedUsers.push(user);
          });
          isFetchAllowed = false;
        }
      }
      const starIcons = document.querySelectorAll("#star-icon");
      starIcons.forEach(function(star){
        star.addEventListener("click", showStar);
      });
    // Hide the loader after the content has loaded
    hideLoader();
    });
  }
}


function showStar(e) {
  //Variable global para guardar el local storage de favoritos.Lo que va a hacer es intentar coger el favStorage del local Storage. Sino, nos dará un array vacío
  let favUsers = JSON.parse(localStorage.getItem('favStorage')) || []
  const selectedFavUserId = e.target.dataset.id
  if (e.target.innerHTML === 'star'){
    e.target.innerHTML = 'star_border';
  } else {
    e.target.innerHTML = 'star';
    favUsers.push(selectedFavUserId);
    localStorage.setItem('favStorage', JSON.stringify(favUsers));
  }
};


// Function to check if a user has registered for 5 days or less
function checkIfUserIsNew(user) {
  const fiveDaysToMiliseconds = 432000164;
  const result = Date.now() - user.registeredDate;
  if (result < fiveDaysToMiliseconds) {
    return true;
  }
}

// Create an html card template with the user data
function renderCard(user) {
  const { name, username, jobTitle, company, email, _id, location, profilePicture, highlight, newUser } = user;

  var template_cards = (
    '<div class="card shadow m-3 p-4" style="width: 90%; height: auto;">' +
    '<i class="material-icons" id="star-icon" data-id="' + _id + '">star_border</i>' +
    '<img class="card-img-top m-auto" src="' + profilePicture + '" alt="' + name + ' Profile picture" style="height:150px; width:150px; border-radius:50%;">' +
    '<div class="card-body p-0 mt-2">' +
    '<h2 class="card-title text-center mb-2">' +
      '<span' + (highlight ? highlight.includes('name') ? ' class="bg-warning d-flex justify-content-center"' : ' class="d-flex justify-content-center"': '') + '>' + name + '</span>' +
      (newUser ? ' <span class="badge badge-success px-2 py-1 ml-3 my-auto position-absolute" style="font-size:0.8rem; top:10px; right: 10px;">NEW</span>' : '') +
    '</h2>' +
    '<h6 class="card-title text-center text-muted mb-4"><span' + (highlight ? highlight.includes('jobTitle') ? ' class="bg-warning"' : '': '') + '>' + jobTitle + '</span></h6>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span' + (highlight ? highlight.includes('username') ? ' class="bg-warning"' : '' : '') + '>' + username + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span' + (highlight ? highlight.includes('email') ? ' class="bg-warning"' : '' : '') + '>' + email + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span' + (highlight ? highlight.includes('company') ? ' class="bg-warning"' : '' : '') + '>' + company + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">public</i> <span' + (highlight ? highlight.includes('location') ? ' class="bg-warning"' : '' : '') + '>' + location.city + ', ' + location.country + '</span></p>' +
    '<a href="./html/profile.html?id=' + _id + '" class="btn btn-primary mt-3">View Profile</a>' +
    '</div>' +
    '</div>'
  );

  return template_cards;
}

// Handle img error loading resources from a bad endpoint
function imgError(image) {
  image.onerror = "";
  image.src = "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png";
  console.warn('User avatar has been deleted from the server. We have changed it for the default avatar image');
  return true;
}

function createBadges(skills) {
  const skillBadges = [];

  skills.forEach( skill => {
    skillBadges.push(`<h5 class="mr-2"><span class="badge badge-pill badge-success p-2">${skill}</span></h5>`);
  });

  return skillBadges.join('');
}

// Loader functions
function showLoader() {
  loader.classList.remove('d-none');
}

function hideLoader() {
  // loader.style.display = 'none';
  loader.classList.add('d-none');
}

// Infinite scroll functionality
cardsContainer.addEventListener('scroll', () => {
  const containerHeight = cardsContainer.offsetHeight;

  // When the user scrolls to the bottom of the container call the function to get more users
  if ((cardsContainer.scrollTop + containerHeight === cardsContainer.scrollHeight) && isFetchAllowed) {
    showLoader();
    setTimeout(fetchUsersData, 500);
  }
});


// Functionality fot the floating action button
document.querySelector('#floating-action-button').addEventListener('click', function () {
  let pathPieces = window.location.pathname.split('/');
  pathPieces[pathPieces.length - 1] = '/html/adduser.html';

  window.location.pathname = pathPieces.join('');
});

