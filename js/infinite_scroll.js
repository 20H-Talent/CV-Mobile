const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.getElementById("nav-input");

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
          const card = renderCard(user);
          cardsContainer.innerHTML += card;
          loadedUsers.push(user);
        });
        // Add one to the current page of users for the next request if the page has 10 users
        currentUsersPage++;

      } else if (data.length < 10) {
        data.map( (user) => {
          const card = renderCard(user);
          cardsContainer.innerHTML += card;
          loadedUsers.push(user);
        });
        isFetchAllowed = false;
      }

    // Hide the loader after the content has loaded
    hideLoader();
    });
  }
}
// Request the users data at page loading
fetchUsersData();

// Create an html card template with the user data
function renderCard(user) {
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
    highlight
  } = user;

  var template_cards = (
    '<div class="card shadow m-3 p-4" style="width: 90%; height: auto;">' +
    '<img class="card-img-top m-auto" src="' + profilePicture + '" alt="' + name + ' Profile picture" style="height:150px; width:150px; border-radius:50%;">' +
    '<div class="card-body p-0 mt-2">' +
    '<h2 class="card-title text-center mb-2"><span' + (highlight ? highlight.includes('name') ? ' class="bg-warning"' : '': '') + '>' + name + '</span></h2>' +
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

function createBadges(skills) {
  const skillBadges = [];

  skills.forEach( skill => {
    skillBadges.push(`<h5 class="mr-2"><span class="badge badge-pill badge-success p-2">${skill}</span></h5>`);
  });

  return skillBadges.join('');
}

function showLoader() {
  loader.classList.remove('d-none');
}

function hideLoader() {
  // loader.style.display = 'none';
  loader.classList.add('d-none');
}

cardsContainer.addEventListener('scroll', () => {
  const containerHeight = cardsContainer.offsetHeight;

  // When the user scrolls to the bottom of the container call the function to get more users
  if ((cardsContainer.scrollTop + containerHeight === cardsContainer.scrollHeight) && isFetchAllowed) {

    showLoader();
    setTimeout(fetchUsersData, 500);

    // In production the function would be called directly
    // fetchUsersData();
  }
});

// Functionality fot the floating action button
document.querySelector('#floating-action-button').addEventListener('click', () => {
  window.location.pathname = '/html/adduser.html';
});