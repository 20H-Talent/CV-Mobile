const cardsContainer = document.getElementById('cards-container');

function renderCard(company) {
  const {
    logo, name, jobOffers, _id, address, website, email,
  } = company;

  const offersTemplate = (`
  <div class="alert alert-primary mt-4 mb-0 text-center" role="alert">
  ${jobOffers.length} open position${jobOffers.length > 1 ? 's' : ''}
  </div>
  `);

  const cardTemplate = (`
  <div class="card shadow m-3 p-4 animated fadeInUp"  style="width: 90%; height: auto;">
  <img class="card-img-top m-auto" src="'}${logo}" alt="${name}" style="height:150px; width:150px; border-radius:50%;object-fit:cover;" />
  <div class="card-body p-0 mt-2">
  <h5 class="card-title text-center mt-2 mb-2">${name}</h5>
  <div class="mt-4">
  <p class="card-text  d-flex align-items-center"><i class="material-icons mr-3">location_city</i>${address.city}, ${address.country}</p>
  <p class="card-text  d-flex align-items-center"><i class="material-icons mr-3">public</i>${website}</p>
  <p class="card-text  d-flex align-items-center"><i class="material-icons mr-3">mail</i>${email}</p>
  </div>
  ${jobOffers.length ? offersTemplate : ''}
  <button type="button" class="btn btn-primary mt-4"><a class="text-light" href="../html/company-profile.html?id=${_id}">More Info</a></button>
  `);

  cardsContainer.innerHTML += cardTemplate;
}

function renderErrorMessage() {
  cardsContainer.innerHTML += 'Ups algo ha fallado en el servidor';
}

function handleImgError(image) {
  image.src = 'http://cv-mobile-api.herokuapp.com/uploads/default_avatar.png';
}

function addImagesListener() {
  const images = document.querySelectorAll('img');
  images.forEach(image => image.addEventListener('error', handleImgError(image)));
}

function fetchCompanies() {
  fetch('https://cv-mobile-api.herokuapp.com/api/companies')
    .then(res => res.json())
    .then(res => res.map(company => renderCard(company)))
    .then(() => addImagesListener())
    .catch(() => renderErrorMessage());
}

window.onload = fetchCompanies();
