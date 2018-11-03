// node-fetch required to be able to live test the code with quokka.js
const fetch = require('node-fetch');

// Render a form inside an accordion dynamically from the surveys stored into the api
// 1 - Connect to the api and get the surveys
// 2 - Render an accordion that will hold the forms
// 2 - Render a form component for each survey inside the accordion
// 3 - Render the correct type of input for each form element


const surveysURL = 'https://cv-mobile-api.herokuapp.com/api/surveys';
const container = document.querySelector('.main-container');

class SurveysPage {
  constructor(url) {
    this._url = url;
    this._surveys;
  }

  get surveys() {
    return this._surveys;
  }

  get numOfSurveys() {
    return this._surveys.length;
  }

  getDataFromApi(url) {
    fetch(url)
      .then( res => res.json())
      .then( data => {
        this._surveys = data;
        this.renderAccordion(this._surveys);
      })
      .catch( err => console.log(err.message));
  }

  renderAccordion(surveysArr) {
    // console.log(surveysArr);
  }

  init() {
    this.getDataFromApi(this._url);
  }
}

class SurveyForm {
  constructor(header, elements) {
    this._header = header,
    this._header = elements
  }

  renderHeader(header) {}
  renderInput(element) {}
  renderForm() {}
}



// Initialization of the page's functionality
let pageHandler = new SurveysPage(surveysURL);
window.onload = pageHandler.init();

// Export functions for unit testing
module.exports = {
  SurveysPage: SurveysPage,
  SurveyForm: SurveyForm
}