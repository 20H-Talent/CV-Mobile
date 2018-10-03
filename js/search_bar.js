
searchInput.addEventListener("keyup", function(e) {
  const searchTerm = searchInput.value;
  const users = document.querySelectorAll('.card');

  const priorityTable = ['name', 'username', 'email', 'company'];

  // User data separated for type
  const namesArray = [];
  const usernamesArray = [];
  const emailsArray = [];
  const companiesArray = [];

  function filterByData(data, reference, store) {
    if (data.toLowerCase() !== reference.slice(0, data.length).toLowerCase()) {
      store.push(null);
    } else {
      store.push(reference);
    }
  }

  if (searchTerm) {
    // Filter the users and store the results on the arrays above
    users.forEach( user => {
      // Save every user data in a variable for future comparison
      const userName = user.childNodes[1].childNodes[0].childNodes[0].textContent;
      const userUsername = user.childNodes[1].childNodes[1].childNodes[1].textContent;
      const userEmail = user.childNodes[1].childNodes[2].childNodes[1].textContent;
      const userCompany = user.childNodes[1].childNodes[3].childNodes[1].textContent;

      // Filter by name
      filterByData(searchTerm, userName, namesArray);

      // Filter by username
      filterByData(searchTerm, userUsername, usernamesArray);

      // Filter by email
      filterByData(searchTerm, userEmail, emailsArray);

      // Filter by company
      filterByData(searchTerm, userCompany, companiesArray);

    });

    // Once the data is separated its iterated by priority to show the correct users
    // Check if there is at least one value that is not null inside the array
    console.log('names: ', namesArray);
    console.log('usernames: ', usernamesArray);
    console.log('emails: ', emailsArray);
    console.log('companies: ', companiesArray);

  } else {
    users.forEach( user => user.classList.remove('d-none'));
  }
});