
searchInput.addEventListener("keyup", function(e) {
  const searchTerm = searchInput.value;
  const users = document.querySelectorAll('.card');

  if (searchTerm) {
    users.forEach( user => {
      // Save every user data in a variable for future comparison
      const userName = user.childNodes[1].childNodes[0].childNodes[0].textContent;
      const userUsername = user.childNodes[1].childNodes[1].childNodes[1].textContent;
      const userEmail = user.childNodes[1].childNodes[2].childNodes[1].textContent;
      const userCompany = user.childNodes[1].childNodes[3].childNodes[1].textContent;

      // comparar el searchTerm con la misma cantidad de caracteres del nombre del usuario
      if (searchTerm.toLowerCase() !== userName.slice(0, searchTerm.length).toLowerCase()) {
        user.classList.add('d-none');
      } else {
        user.classList.remove('d-none');
      }
    });
  } else {
    users.forEach( user => user.classList.remove('d-none'));
  }
});