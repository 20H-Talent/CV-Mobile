
class SplashScreen {
  constructor(text, time) {
    this._text = text;
    this._time = time;
  }

  // Handles time changes for the timeout function
  set time(number) {
    if (typeof number === 'number' && number > 1000) {
      return this._time = number;
    } else {
      console.log('time could not be changed to this value. Try adding a value bigger than 1000 miliseconds.')
    }
  }

  get lastConnection() {
    return this._lastConnection;
  }

  // This function returns the timestamp for the last connection of the user
  checkLastConnection() {
    let browserConnection = parseInt(localStorage.getItem('lastConnection'));
    let test = String(browserConnection)

    if (test === 'NaN') {
      this._lastConnection = false;
    } else {
      this._lastConnection = browserConnection;
    }

    localStorage.setItem('lastConnection', String(Date.now()));
  }

  // Compares the last connection timestamp with the actual timestamp and returns true or false if the splash should be rendered
  shouldRenderSplashScreen() {

    if (this._lastConnection === false) {
      return true;
    }

    const minDifference = 7200000;
    const currentDifference = Date.now() - this._lastConnection;

    if ( currentDifference < minDifference) {
      // Dont show the splash screen
      return false;
    } else {
      // Show the splash screen
      return true;
    }
  }


  // TODO: create an html template for the splash screen to show the 20h logo and render the text passed to it;
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
    if (this.shouldRenderSplashScreen()) {
      // let splashContainer = document.createElement('div');
      let splashContainer = this.splashTemplate();
      // Add the splash over the container
      document.body.innerHTML += splashContainer;
      // Activate the loader
      this.renderSplashLoader();
      // Hide the splashContainer after the timer ends
      this.hideSplashScreen();
    }
  }

  renderSplashLoader() {
    let timeFragment = this._time / 50;
    let currentProgress = 0;

    let progressInterval = setInterval(increaseLoader, timeFragment);

    function increaseLoader() {

      if (currentProgress <= 98) {
        document.querySelector('#splash-progress').style.width = `${currentProgress}%`;
        currentProgress += 2;
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
    this.checkLastConnection();
    this.renderSplashScreen();
  }

}

// Create an instance of the SplashScreen and call init on declare to make its properties unavailable through the console
const splash = new SplashScreen('welcome to 20h, move your career forward', 5000).init();
