const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.getElementById("nav-input");

let isFetchAllowed = true;
let loadedUsers = [];

// Initial content load from API
function fetchUsersData() {
  if (searchInput.value == '') {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users"
    }).done((data) => {
      // Show the loader while loading the content
      // showLoader();
      // Iterate over the data array and extract the info for each user in a card variable
      data.map( (user) => {
        const card = renderCard( user.name, user.username, user.email, user.company.name, user.id);
        // Add the card with the user info to the DOM
        cardsContainer.innerHTML += card;
        // Save the user inside a collections with all loaded users
        loadedUsers.push(user);
      });
      // Hide the loader after the content has loaded
      hideLoader();
    });
  }
}
// Request the users data at page loading
fetchUsersData();

// Create an html card template with the user data
function renderCard(name, userName, email, company, userId, highlight) {
  var template_cards = (
    '<div class="card shadow m-3" style="width: 90%; max-height: 450px;">' +
    '<img class="card-img-top" src="https://source.unsplash.com/random/500x300" alt="Card image cap">' +
    '<div class="card-body">' +
    '<h5 class="card-title"><b' + (highlight === 'name' ? ' class="bg-warning"' : '') + '>' + name + '</b></h5>' +
    '<p class="card-text">Username: <b' + (highlight === 'username' ? ' class="bg-warning"' : '') + '>' + userName + '</b></p>' +
    '<p class="card-text">Email: <b' + (highlight === 'email' ? ' class="bg-warning"' : '') + '>' + email + '</b></p>' +
    '<p class="card-text">Company: <b' + (highlight === 'company' ? ' class="bg-warning"' : '') + '>' + company + '</b></p>' +
    '<a href="./html/profile.html?id=' + userId + '" class="btn btn-primary">View Profile</a>' +
    '</div>' +
    '</div>'
  );
  return template_cards;
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
