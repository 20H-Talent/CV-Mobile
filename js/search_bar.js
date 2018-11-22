const navInput = document.querySelector('input[name="search-term"]');
navInput.addEventListener('keyup', (e) => {
  const searchTerm = searchInput.value;

  // User data separated for type
  const filteredResults = {
    name: [],
    jobTitle: [],
    username: [],
    email: [],
    company: [],
  };

  function filterByData(input, reference, store, user, coincidence) {
    if (reference && reference.toLowerCase().includes(input.toLowerCase())) {
      user.highlight.includes(coincidence) ? '' : user.highlight.push(coincidence);
      store.push(user);
    } else {
      const position = user.highlight.indexOf(coincidence);
      user.highlight.includes(coincidence) && position !== -1 ? user.highlight.splice(position, 1) : '';
    }
  }

  function renderFilteredResults() {
    const userArray = [];

    for (key in filteredResults) {
      filteredResults[key].forEach((user) => {
        if (userArray.indexOf(user) == -1) {
          userArray.push(user);
        }
      });
    }

    userArray.forEach((user) => {
      const card = renderCard(user);
      cardsContainer.innerHTML += card;
    });
  }

  if (searchTerm) {
    // Avoid infinite scroll from fetching more users while searching
    isFetchAllowed = false;
    // Empty the cardsContainer to show only the users that were succesfully found
    cardsContainer.innerHTML = '';

    // Filter the users and store the results on the arrays above
    loadedUsers.forEach((user) => {
      // Save user data inside an object for future comparison
      const userData = {
        name: user.name,
        jobTitle: user.jobTitle,
        username: user.username,
        email: user.email,
        company: user.company,
      };

      // Grab each userData property and filter it into the searchResult object
      for (const dataType in userData) {
        filterByData(searchTerm, userData[dataType], filteredResults[dataType], user, dataType);
      }
    });

    // Once the users have been filtered render them into the DOM
    renderFilteredResults();
  } else {
    // Allow infinite scroll again
    isFetchAllowed = true;
    // Empty the cardContainer with the filtered Results
    cardsContainer.innerHTML = '';
    // Render the default users loaded with the initial ajax call and render them into the DOM again
    loadedUsers.forEach((user) => {
      user.highlight = [];
      const card = renderCard(user);
      cardsContainer.innerHTML += card;
    });
  }
});

// Compress the navbar after submiting the search form
const navForm = document.querySelector('#nav-form');
navForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Change navbarList properties to hide it
  const navbarList = document.querySelector('.navbar-collapse');
  navbarList.classList.remove('show');
});
