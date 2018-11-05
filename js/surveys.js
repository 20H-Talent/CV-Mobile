class SurveysPage {
  constructor() {
    this._url = 'https://cv-mobile-api.herokuapp.com/api/surveys';
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
        this.renderPage();
      })
      .catch( err => console.log(err.message));
  }

  generatePageStructure() {
    let pageStructure = (`
        <div class="container w-100">
          <h5 class="pt-4 pb-2">List of surveys</h5>
        </div>
        <div class="container w-100">
          ${this.generateAccordion(this._surveys)}
        </div>
    `);

    return pageStructure;
  }

  generateAccordion(surveysArr) {
    let formCards = [];
    let orderedSurveys = surveysArr.sort( (a, b) => {
      if (a.header.endDate > b.header.endDate) return 1;
      if (a.header.endDate < b.header.endDate) return -1;
      return 0;
    });

    orderedSurveys.forEach( (survey, index) => {
      if (survey.header.endDate > Date.now()) {
        formCards.push(this.generateFormCard(survey, index));
      }
    })

    let accordionTemplate = `<div class="accordion mb-4" id="accordion-surveys">${formCards.join('')}</div>`;

    return accordionTemplate;
  }

  generateFormCard(survey, index) {
    let inputArray = [];
    survey.elements.forEach( element => inputArray.push(this.generateInput(element)));

    let randomId = Math.floor(Math.random() * 5000);

    let formTemplate = (
      `<div class="card shadow">
        <div class="card-header" id="form-header-${randomId}">
          <h5 class="mb-0">
            <button class="btn btn-link w-100 d-flex" style="text-decoration:none;" type="button" data-toggle="collapse" data-target="#collapse-${randomId}" aria-expanded="true" aria-controls="collapse-${randomId}">
              <span>${survey.header.title}</span><span class="ml-auto ${(this.checkFormFinish(survey.header.endDate) ? 'text-danger' : '')}">${this.convertTimestampToDate(survey.header.endDate)}</span>
            </button>
          </h5>
        </div>

        <div id="collapse-${randomId}" class="collapse" aria-labelledby="form-header-${randomId}" data-parent="#accordion-surveys">
        <div class="alert alert-info rounded-0" style="font-size:0.9rem;" role="alert">

          <p class="m-0">${survey.header.description}</p>
        </div>
          <div class="card-body">
            <form>
              ${inputArray.join('')}
              <div class="fluid-container pt-4">
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>`
    );

    return formTemplate;
  }

  generateInput(input) {
    let inputTemplate;

    switch (input.type) {
      case 'text':
        let randomTextID = this.generateRandomId();

        inputTemplate = (`
          <div class="form-group">
            <label for="input-text-${randomTextID}">${input.title}</label>
            <input type="text" class="form-control" id="input-text-${randomTextID}" aria-describedby="textHelp" >
          </div>
        `);
        break;

      case 'number':
        let randomNumberID = this.generateRandomId();

        inputTemplate = (`
        <div class="form-group">
          <label for="input-number-${randomNumberID}">${input.title}</label>
          <input type="text" class="form-control" id="input-number-${randomNumberID}" aria-describedby="textHelp" >
        </div>
      `);
        break;

      case 'select':
        let selectOptions = [];
        input.values.forEach( value => selectOptions.push(`<option value="${value}">${value}</option>`));
        let randomSelectID = this.generateRandomId();

        inputTemplate = (`
        <div class="form-group">
          <label for="input-select-${randomSelectID}">${input.title}</label>
          <select class="form-control" id="input-select-${randomSelectID}">
          ${selectOptions.join('')}
          </select>
        </div>
      `);
        break;
      case 'checkbox':
        let checkboxOptions = [];
        input.values.forEach( value => {
          let randomID = this.generateRandomId();

          checkboxOptions.push((`
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${value}" id="input-checkbox-${randomID}">
            <label class="form-check-label" for="input-checkbox-${randomID}">${value}</label>
          </div>
          `))
        });

        inputTemplate = (`
          <div class="form-group">
            <label>${input.title}</label>
            ${checkboxOptions.join('')}
          </div>
        `);
        break;
      case 'radio':
        let radioOptions = [];

        input.values.forEach( value => {
          let randomID = this.generateRandomId();

          radioOptions.push((`
          <div class="form-check">
            <input class="form-radio-input" type="radio" name="¿?" value="${value}" id="input-radio-${randomID}">
            <label class="form-radio-label" for="input-radio-${randomID}">${value}</label>
          </div>
          `))
        });

        inputTemplate = (`
          <div class="form-group">
            <label>${input.title}</label>
            ${radioOptions.join('')}
          </div>
        `);
        break;

      default:
        break;
    }

    return inputTemplate;
  }

  generateRandomId() {
    let randomId = Math.floor(Math.random() * 5000);
    return randomId;
  }

  checkFormFinish(date) {
    let timeLimit = 172800000;
    if (date - Date.now() < timeLimit) {
      return true;
    } else {
      return false;
    }
  }

  convertTimestampToDate(timestamp) {
    let fullDate = new Date(timestamp);
    let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
    let stringDay = fullDate.getDate().toString();

    if (stringDay[stringDay.length - 1] == 1) {
      stringDay += 'st';
    } else if (stringDay[stringDay.length - 1] == 2) {
      stringDay += 'nd';
    } else if (stringDay[stringDay.length - 1] == 3) {
      stringDay += 'rd';
    } else {
      stringDay += 'th';
    }

    return `${stringDay} ${monthArr[fullDate.getMonth()]}`;
  }

  sendFormData(e) {
    e.preventDefault();
    const form = e.target;
    const inputsList = {
      text: [],
      number: [],
      select: [],
      checkbox: [],
      radio: []
    };

    for (let key in inputsList) {
      if (key === 'select') {
        form.querySelectorAll(key).forEach( input => inputsList[key].push({name: input.name, value: input.value}));
      } else {
        form.querySelectorAll(`[type="${key}"]`).forEach( input => inputsList[key].push({name: input.name, value: input.value}));
      }
    }

    console.log(inputsList);
  }

  renderPage() {
    document.querySelector('.main-container').innerHTML = this.generatePageStructure();
    document.querySelectorAll('form').forEach( form => form.addEventListener('submit', this.sendFormData));
  }

  init() {
    this.getDataFromApi(this._url);
  }
}

// Initialization of the page's functionality
window.onload = new SurveysPage().init();
