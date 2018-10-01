const cardsContainer = document.querySelector('#cards-container');
// const loader = document.querySelector('#loader');

let loadingCount = 0;

// Initial content load from API
$.ajax({
  url: "https://jsonplaceholder.typicode.com/users"
}).done(function(data) {
  // Iterate over the data array and extract the info for each user in a card variable
  data.map( user => {
    const card = renderCard( user.name, user.username, user.email, user.company.name);
    // Add the card with the user info to the DOM
    cardsContainer.innerHTML += card;
  });
});

function renderCard(name, userName, email, company) {
  var template_cards =
    '<div class="card" style="width: 18rem;">' +
      '<div class="card-body">' +
        '<h5 class="card-title">' + name + '</h5>' +
        '<p class="card-text">' + userName + '</p>' +
        '<p class="card-text">' + email + '</p>' +
        '<p class="card-text">' + company + '</p>' +
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

const createBox = function() {
  cardsContainer.innerHTML += '<div class="box blue">' + loadingCount + '</div>';
}

function showLoader() {
  loader.style.transform = 'translate(-50%, -250%)'
  // loader.style.opacity = 0.7;
}

function hideLoader() {
  loader.style.transform = 'translate(-50%, 0)'
  // loader.style.opacity = 0;
}

cardsContainer.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  if ((cardsContainer.scrollTop + windowHeight === cardsContainer.scrollHeight) && loadingCount < 10) {

    console.log('loader.');
    showLoader();
    console.log('wait for content.');
    sleep(3000);
    console.log('adding content.');
    createBox();
    console.log('removing loader.');
    // hideLoader();


    // update the loading count
    loadingCount++;
  }
});
