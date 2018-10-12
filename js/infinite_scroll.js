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
          const card = renderCard(user);
          cardsContainer.innerHTML += card;
          loadedUsers.push(user);
        });
        // Add one to the current page of users for the next request if the page has 10 users
        currentUsersPage++;

      } else if (data.length < 10) {

        if (data[0]._id !== loadedUsers[loadedUsers.length - 1]._id) {
          data.map( (user) => {
            const card = renderCard(user);
            cardsContainer.innerHTML += card;
            loadedUsers.push(user);
          });
          isFetchAllowed = false;
        }
      }

    // Hide the loader after the content has loaded
    hideLoader();
    });
  }
}
// Request the users data at page loading
fetchUsersData();

// Create an html card template with the user data
function renderCard(user, highlight) {
  const {
    name,
    username,
    company,
    email,
    languages,
    skills,
    _id,
    location,
    experience,
    profilePicture,
  } = user;

  var template_cards = (
    '<div class="card shadow m-3" style="width: 90%; height: auto;">' +
    '<img class="card-img-top" src="' + profilePicture + '" alt="' + name + ' Profile picture">' +
    '<div class="card-body">' +
    '<h3 class="card-title"><span' + (highlight === 'name' ? ' class="bg-warning"' : '') + '>' + name + '</span></h3>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span' + (highlight === 'username' ? ' class="bg-warning"' : '') + '>' + username + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span' + (highlight === 'email' ? ' class="bg-warning"' : '') + '>' + email + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span' + (highlight === 'company' ? ' class="bg-warning"' : '') + '>' + company + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">today</i> <span' + (highlight === 'experience' ? ' class="bg-warning"' : '') + '>' + experience + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">translate</i> <span' + (highlight === 'languages' ? ' class="bg-warning"' : '') + '>' + languages.join(', ') + '</span></p>' +
    '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">location_city</i> <span' + (highlight === 'location' ? ' class="bg-warning"' : '') + '>' + location.city + ', ' + location.country + '</span></p>' +
    '<div class="container-fluid p-0 mt-4 d-flex flex-wrap">' + createBadges(skills) + '</div>' +
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
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
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
