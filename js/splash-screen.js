
class SplashScreen {
  constructor(text, time) {
    this._text = text;
    this._time = time;
  }

  checkUserSession() {
    if (sessionStorage.getItem('activeSession')) {
      this._shouldRender = false;
    } else {
      sessionStorage.setItem('activeSession', 'true');
      this._shouldRender = true;
    }
  }

  splashTemplate() {
    return (
      `<div id="splash" class="position-absolute d-flex flex-column align-items-center justify-content-around"
        style="top:0; left:0; width:100vw; height:100vh; z-index:9990;">
        <img src="./assets/images/splash-img.jpg" class="position-absolute" style="width:100%; height:100%; object-fit:cover; filter:brightness(50%); z-index:9991;" />
        <img src="./assets/images/20h-logo.png" style="width:40%; height:auto; border-radius:50%; z-index:9994;" />
        <h2 class="text-white text-center mb-4" style="z-index: 9992">${this._text}</h2>
        <div id="splash-loader" class="bg-secondary position-absolute" style="bottom:50px; width:70%; height:8px; border-radius:4px; z-index: 9993;">
          <div id="splash-progress" class="bg-light" style="height:100%; transition:all 50ms ease-out; border-radius:4px;"></div>
        </div>
      </div>`);
  }

  renderSplashScreen() {
    if (this._shouldRender) {
      document.body.innerHTML += this.splashTemplate();;

      this.renderSplashLoader();
      this.hideSplashScreen();
    }
  }

  renderSplashLoader() {
    let timeFragment = this._time / 100;
    let currentProgress = 0;

    let progressInterval = setInterval(increaseLoader, timeFragment);

    function increaseLoader() {
      if (currentProgress <= 99) {
        currentProgress += 1;
        document.querySelector('#splash-progress').style.width = `${currentProgress}%`;
      } else {
        console.log('page loaded');
        clearInterval(progressInterval);
      }
    }
  }

  hideSplashScreen() {
    setTimeout( () => {
      document.querySelector('#splash').remove();
    }, this._time);
  }

  init() {
    this.checkUserSession();
    this.renderSplashScreen();
  }

}

// Create an instance of the SplashScreen and call init on declare to make its properties unavailable through the console
const splash = new SplashScreen('Trust. Passion. Talent.', 10000).init();
