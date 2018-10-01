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
  var template_cards = (
    '<div class="card shadow m-3" style="width: 90%;">' +
    '<img class="card-img-top" src="https://source.unsplash.com/random/500x300" alt="Card image cap">' +
    '<div class="card-body">' +
    '<h5 class="card-title"><b>' + name + '</b></h5>' +
    '<p class="card-text">Username: <b>' + userName + '</b></p>' +
    '<p class="card-text">Email: <b>' + email + '</b></p>' +
    '<p class="card-text">Company: <b>' + company + '</b></p>' +
    '<a href="./html/profile.html" class="btn btn-primary">View Profile</a>' +
    '</div>' +
    '</div>'
  );
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
