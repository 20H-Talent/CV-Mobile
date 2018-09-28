const boxContainer = document.querySelector('.box-container');
const loader = document.querySelector('#loader');

let loadingCount = 0;

function sleep(milliseconds, callback) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      console.log('hola')
      callback();
      break;
    }
  }
}

const createBox = function() {
  boxContainer.innerHTML += '<div class="box blue">' + loadingCount + '</div>';
  hideLoader();
}

function showLoader() {
  loader.classList.add('loading');
  // loader.style.opacity = 0.7;
}

function hideLoader() {
  loader.classList.remove('loading');
  // loader.style.opacity = 0;
}

boxContainer.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  if ((boxContainer.scrollTop + windowHeight === boxContainer.scrollHeight) && loadingCount < 10) {

    showLoader();
    // console.log('wait for content.');
    sleep(3000);
    createBox();
    // console.log();
    // createBox();
    // load more content


    // update the loading count
    loadingCount++;
  }
});
