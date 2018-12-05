const favContainer = document.querySelector('#fav-container');
const idUserFav = localStorage.getItem('favStorage') || [];

function fetchUserAPIData() {
  $.ajax({
    url: 'https://cv-mobile-api.herokuapp.com/api/users',
  }).done((data) => {
    data.forEach((user) => {
      // eslint-disable-next-line
      if (idUserFav.includes(user._id)) {
        // eslint-disable-next-line
        if (window.location.pathname !== '/index.html') favContainer.innerHTML += renderCards(user);
        const starIcons = document.querySelectorAll('#star-icon');
        starIcons.forEach((star) => {
          star.addEventListener('click', showStar);
        });
        stars = document.querySelectorAll('#star-icon');
        renderFav();
        // } else {
        //     cardsContainer.innerHTML = "<div class='media-body'><p>You have not save any profile</p></div>"
      }
    });
  });
}

fetchUserAPIData();

function renderCards(userFav) {
  const {
    name,
    username,
    jobTitle,
    company,
    email,
    _id,
    address,
    avatar,
  } = userFav;
  const template_cards = (
    `${'<div class="card shadow m-3 p-4 animated fadeInUp" style="width: 90%; height: auto;">'
        + '<i class="material-icons" style="width: 24px;" id="star-icon" data-id="'}${_id}">star_border</i>`
        + `<img class="card-img-top m-auto" src="${avatar}" alt="${name} Profile picture" style="height:150px; width:150px; border-radius:50%;" onerror="imgError(this)"/>`
        + '<div class="card-body p-0 mt-2">'
        + `<h2 class="card-title text-center mb-2"><span>${name}</span></h2>`
        + `<h6 class="card-title text-center text-muted mb-4"><span>${jobTitle}</span></h6>`
        + `<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span>${username}</span></p>`
        + `<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span>${email}</span></p>`
        + `<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span>${company}</span></p>`
        + `<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">public</i> <span>${address.city}, ${address.country}</span></p>`
        + `<a href="./html/profile.html?id=${_id}" class="btn btn-primary mt-3">View Profile</a>`
        + '</div>'
        + '</div>'
  );
  return template_cards;
}

function showStar(e) {
  // Global variable to save in the favourite local storage. This will try to take favStorage of the local Storage. If not, it will create an empty array
  const favUsers = JSON.parse(localStorage.getItem('favStorage')) || [];
  const selectedFavUserId = e.target.dataset.id;
  if (e.target.innerHTML === 'star') {
    e.target.innerHTML = 'star_border';
    const userIndex = favUsers.indexOf(selectedFavUserId);
    favUser = favUsers.splice(userIndex, 1);
    localStorage.setItem('favStorage', JSON.stringify(favUsers));
  } else {
    e.target.innerHTML = 'star';
    favUsers.push(selectedFavUserId);
    localStorage.setItem('favStorage', JSON.stringify(favUsers));
  }
}

// Function to render the users that have been selected as favourite
function renderFav() {
  const favUsers = localStorage.getItem('favStorage') || [];
  stars.forEach((star) => {
    if (favUsers.includes(star.dataset.id)) {
      star.innerHTML = 'star';
    }
  });
}

function imgError(image) {
  image.onerror = '';
  image.src = 'https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png';
  return true;
}
