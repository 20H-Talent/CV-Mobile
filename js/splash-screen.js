
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
      `<div id="splash" class="position-absolute bg-secondary d-flex flex-column align-items-center justify-content-around"
        style="top:0; left:0; width:100vw; height:100vh; z-index:9998;">
        <img src="./assets/images/20h-logo.png" style="width:40%; height:auto; border-radius:50%;" />
        <h2 class="text-light text-center mb-5">${this._text}</h2>
        <div id="splash-loader" class="bg-secondary position-absolute" style="bottom:50px; width:80%; height:8px; border-radius:4px;">
          <div id="splash-progress" class="bg-light" style="height:100%; transition:all 50ms ease-out;"></div>
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
const splash = new SplashScreen('welcome to 20h, move your career forward', 5000).init();
