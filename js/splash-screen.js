
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
      `<div id="splash" class="position-absolute bg-secondary d-flex align-items-center justify-content-center"
        style="top:0; left:0; width:100vw; height:100vh; z-index:9998;">
        <h2 class="position-absolute" style="z-index:9999; top:0;">${this._text}</h2>
      </div>`);
  }

  render() {

    if (this.shouldRenderSplashScreen()) {

      // let splashContainer = document.createElement('div');
      let splashContainer = this.splashTemplate();

      // Add the splash over the container
      document.body.innerHTML += splashContainer;
      this.hideSplashScreen();
    }
  }

  hideSplashScreen() {
    setTimeout( () => {
      document.querySelector('#splash').remove();
    }, this._time);
  }

  init() {
    this.checkLastConnection();
    this.render();
  }

}

// Create an instance of the SplashScreen and call init on declare to make its properties unavailable through the console
const splash = new SplashScreen('welcome to 20h', 5000).init();
