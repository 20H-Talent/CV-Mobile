
searchInput.addEventListener("keyup", function(e) {
  const searchTerm = searchInput.value;

  // User data separated for type
  const filteredResults = {
    name: [],
    username: [],
    email: [],
    company: []
  }

  function filterByData(input, reference, store, user) {
    if (input.toLowerCase() === reference.slice(0, input.length).toLowerCase()) {
      store.push(user);
    }
  }

  function renderCategoryOfFilteredUsers(category, categoryName) {
    category.forEach( (user) => {
      const card = renderCard( user.name, user.username, user.email, user.company.name, user.id, categoryName);
      cardsContainer.innerHTML += card;
    })
  }

  if (searchTerm) {
    // Avoid infinite scroll from fetching more users while searching
    isFetchAllowed = false;
    // Empty the cardsContainer to show only the users that were succesfully found
    cardsContainer.innerHTML = '';

    // Filter the users and store the results on the arrays above
    loadedUsers.forEach( user => {
      // Save user data inside an object for future comparison
      const userData = {
        name: user.name,
        username: user.username,
        email: user.email,
        company: user.company.name
      }

      // Grab each userData property and filter it into the searchResult object
      for (let dataType in userData) {
        filterByData(searchTerm, userData[dataType], filteredResults[dataType], user);
      }
    });

    // Once the users have been filtered render them into the DOM
    for (let category in filteredResults) {
      renderCategoryOfFilteredUsers(filteredResults[category], category);
    }

  } else {
    // Allow infinite scroll again
    isFetchAllowed = true;
    // Empty the cardContainer with the filtered Results
    cardsContainer.innerHTML = '';
    // Render the default users loaded with the initial ajax call and render them into the DOM again
    loadedUsers.forEach((user, index) => {
      const card = renderCard( user.name, user.username, user.email, user.company.name, index);
      cardsContainer.innerHTML += card;
    });
  }
});