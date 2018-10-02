
searchInput.addEventListener("keyup", function(e) {
  const searchTerm = searchInput.value;
  const users = document.querySelectorAll('.card');

  if (searchTerm) {
    users.forEach( user => {
      const userName = user.childNodes[1].childNodes[0].childNodes[0].textContent;

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