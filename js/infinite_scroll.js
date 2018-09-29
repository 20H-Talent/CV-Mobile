const boxContainer = document.querySelector('.box-container');
const loader = document.querySelector('#loader');

let loadingCount = 0;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

const createBox = function() {
  boxContainer.innerHTML += '<div class="box blue">' + loadingCount + '</div>';
}

function showLoader() {
  loader.style.transform = 'translate(-50%, -250%)'
  // loader.style.opacity = 0.7;
}

function hideLoader() {
  loader.style.transform = 'translate(-50%, 0)'
  // loader.style.opacity = 0;
}

boxContainer.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  if ((boxContainer.scrollTop + windowHeight === boxContainer.scrollHeight) && loadingCount < 10) {

    console.log('loader.');
    showLoader();
    console.log('wait for content.');
    sleep(3000);
    console.log('adding content.');
    createBox();
    console.log('removing loader.');
    // hideLoader();


    // update the loading count
    loadingCount++;
  }
});
