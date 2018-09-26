// function fetchUsers() {
//   fetch('https://jsonplaceholder.typicode.com/users')
//   .then( (response) => response.json())
//   .then( (jsonResponse) => console.log(jsonResponse));
// }
let loadingCount = 0;

function createBoxes(num) {
  const loader = document.querySelector('#loader');
  loader.classList.toggle('hide');
  setTimeout(() => {
    for (let i = 0; i < num; i++) {
      container.innerHTML += '<div class="box blue">' + (i + 1) + '</div>';
    }
    console.log('Has llegado al final del contenido');
    hasLoaded = true;
    loader.classList.toggle('hide');
  }, 2000);
}

const container = document.querySelector('.container');
container.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  if ((container.scrollTop + windowHeight === container.scrollHeight) && !hasLoaded) {
    createBoxes(10);
  }
});
