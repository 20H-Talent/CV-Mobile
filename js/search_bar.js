
searchInput.addEventListener("keyup", function(e) {
  const users = document.querySelectorAll('.card');
  // const users = [...loadedUsers];
  const searchTerm = searchInput.value;

  // User data separated for type
  const searchResult = {
    byName: [],
    byUsername: [],
    byEmail: [],
    byCompany: []
  }

  function filterByData(input, reference, store, user) {
    if (input.toLowerCase() === reference.textContent.slice(0, input.length).toLowerCase()) {
      reference.classList.add('bg-warning');
      store.push(user);
    }
  }

  function renderCategoryOfFilteredUsers(category) {
    // Render inside the cardContainer the users passed into this function
    category.forEach(user => {
      // ISSUE - Saved the card in a variable because the browser didn't render the card properly
      const userCard = (
        '<div class="card shadow m-3 filtered" style="width: 90%; height: 60%;">' +
        user.innerHTML +
        '</div>'
      );
      cardsContainer.innerHTML += userCard;
    });
  }

  if (searchTerm) {
    // Avoid infinite scroll from fetching more users while searching
    isFetchAllowed = false;
    // Empty the cardsContainer to show only the users that were succesfully found
    cardsContainer.innerHTML = '';
    // Filter the users and store the results on the arrays above
    users.forEach( user => {
      // user.classList.add('d-none');
      // Save user data inside an object for future comparison
      const userData = {
        name: user.childNodes[1].childNodes[0].childNodes[0],
        username: user.childNodes[1].childNodes[1].childNodes[1],
        email: user.childNodes[1].childNodes[2].childNodes[1],
        company: user.childNodes[1].childNodes[3].childNodes[1]
      }

      // const userName = user.childNodes[1].childNodes[0].childNodes[0];
      // const userUsername = user.childNodes[1].childNodes[1].childNodes[1];
      // const userEmail = user.childNodes[1].childNodes[2].childNodes[1];
      // const userCompany = user.childNodes[1].childNodes[3].childNodes[1];

      // Filter by name
      filterByData(searchTerm, userName, searchResult.byName, user);

      // Filter by username
      filterByData(searchTerm, userUsername, searchResult.byUsername, user);

      // Filter by email
      filterByData(searchTerm, userEmail, searchResult.byEmail, user);

      // Filter by company
      filterByData(searchTerm, userCompany, searchResult.byCompany, user);

    });

    // Once the users have been filtered render them into the DOM
    for (let key in searchResult) {
      renderCategoryOfFilteredUsers(searchResult[key]);
    }

  } else {
    // Allow infinite scroll again
    isFetchAllowed = true;
    // Empty the cardContainer with the filtered Results
    cardsContainer.innerHTML = '';
    // Render the default users loaded with the initial ajax call
    loadedUsers.forEach(user => cardsContainer.innerHTML += user);
    // users.forEach( user => user.classList.remove('d-none'));
    // document.querySelectorAll('.bg-warning').forEach( element => element.classList.remove('bg-warning'));
  }

  // console.log(searchResult);
});