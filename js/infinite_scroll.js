
const container = document.querySelector('.container');
let loadingCount = 0;

function sleep(milliseconds, callback) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      return callback();
    }
  }
}

function createBox() {
    container.innerHTML += '<div class="box blue">' + loadingCount + '</div>';
}

container.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  if ((container.scrollTop + windowHeight === container.scrollHeight) && loadingCount < 10) {
    sleep(2000, createBox());
    loadingCount++;
    console.log('this is the bottom');
  }
});
