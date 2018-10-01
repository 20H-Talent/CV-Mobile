const cardsContainer = document.querySelector('#cards-container');
// const loader = document.querySelector('#loader');

// Initial content load from API
function fetchUsersData() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users"
  }).done((data) => {
    // Iterate over the data array and extract the info for each user in a card variable
    data.map( user => {
      const card = renderCard( user.name, user.username, user.email, user.company.name);
      // Add the card with the user info to the DOM
      cardsContainer.innerHTML += card;
    });
  });
}
fetchUsersData();

// Create an html card template with the user data
function renderCard(name, userName, email, company) {
  var template_cards =
    '<div class="card ml-auto mr-auto mt-2 mb-2" style="width: 18rem;">' +
      '<img class="card-img-top" src="./assets/images/user-profile.svg" alt="Card image cap">' +
      '<div class="card-body">' +
        '<h5 class="card-title">' + name + '</h5>' +
        '<p class="card-text">' + userName + '</p>' +
        '<p class="card-text">' + email + '</p>' +
        '<p class="card-text">' + company + '</p>' +
        '<a href="./profile.html" class="btn btn-primary">View Profile</a>'
      '</div>' +
    '</div>';
  return template_cards;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// function showLoader() {
//   loader.style.display = 'flex';
// }

// function hideLoader() {
//   loader.style.display = 'none';
// }

cardsContainer.addEventListener('scroll', () => {
  const containerHeight = cardsContainer.offsetHeight;

  if ((cardsContainer.scrollTop + containerHeight === cardsContainer.scrollHeight)) {
    // showLoader();
    console.log('You reached the bottom of the container.');
    // Print more users after two seconds
    sleep(3000);
    fetchUsersData();
    // hideLoader();
  }
});
