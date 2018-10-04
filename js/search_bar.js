
searchInput.addEventListener("keyup", function(e) {
  const searchTerm = searchInput.value;
  const users = document.querySelectorAll('.card');

  const priorityTable = ['name', 'username', 'email', 'company'];

  // User data separated for type
  const namesArray = [];
  const usernamesArray = [];
  const emailsArray = [];
  const companiesArray = [];

  function filterByData(input, reference, store, user) {
    if (input.toLowerCase() === reference.textContent.slice(0, input.length).toLowerCase()) {
      store.push(user);
      user.classList.remove('d-none');
      reference.classList.add('bg-warning');
    }
  }

  if (searchTerm) {
    // Filter the users and store the results on the arrays above
    users.forEach( user => {
      user.classList.add('d-none');
      // Save every user data in a variable for future comparison
      const userName = user.childNodes[1].childNodes[0].childNodes[0];
      const userUsername = user.childNodes[1].childNodes[1].childNodes[1];
      const userEmail = user.childNodes[1].childNodes[2].childNodes[1];
      const userCompany = user.childNodes[1].childNodes[3].childNodes[1];

      // Filter by name
      filterByData(searchTerm, userName, namesArray, user);

      // Filter by username
      filterByData(searchTerm, userUsername, usernamesArray, user);

      // Filter by email
      filterByData(searchTerm, userEmail, emailsArray, user);

      // Filter by company
      filterByData(searchTerm, userCompany, companiesArray, user);

    });

  } else {
    users.forEach( user => user.classList.remove('d-none'));
    document.querySelectorAll('.bg-warning').forEach( element => element.classList.remove('bg-warning'));
  }

  console.log('namesArray: ', namesArray);
  console.log('usernamesArray: ', usernamesArray);
  console.log('emailsArray: ', emailsArray);
  console.log('companiesArray: ', companiesArray);
});