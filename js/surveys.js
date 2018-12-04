class SurveysPage {
  constructor() {
    this._url = 'https://cv-mobile-api.herokuapp.com/api/surveys';
    this._surveys = [];
  }

  get surveys() {
    return this._surveys;
  }

  set surveys(data) {
    this._surveys = data;
  }

  get numOfSurveys() {
    return this._surveys.length;
  }

  getDataFromApi(url) {
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.surveys = data;
        this.renderPage();
      })
      .catch(err => console.log(err.message));
  }

  generatePageStructure() {
    const pageStructure = (`
        <div class="container w-100">
          <h4 class="pt-5 pb-4 pl-2">Available surveys</h4>
          <p class="d-flex" style="font-size:0.9rem; padding: 0 35px;"><span>Title</span><span class="ml-auto text-right">End date</span></p>
        </div>
        <div class="container w-100">
          ${this.generateAccordion(this.surveys)}
        </div>
    `);

    return pageStructure;
  }

  generateAccordion(surveysArr) {
    const formCards = [];
    const orderedSurveys = surveysArr.sort((a, b) => {
      if (a.header.endDate > b.header.endDate) return 1;
      if (a.header.endDate < b.header.endDate) return -1;
      return 0;
    });

    orderedSurveys.forEach((survey, index) => {
      const surveyDate = new Date(survey.header.endDate).getTime();
      if (surveyDate > Date.now()) {
        formCards.push(this.generateFormCard(survey, index));
      }
    });

    const accordionTemplate = `<div class="accordion mb-4" id="accordion-surveys">${formCards.join('')}</div>`;

    return accordionTemplate;
  }

  generateFormCard(survey) {
    const inputArray = [];
    survey.elements.forEach(element => inputArray.push(this.generateInput(element)));

    const randomId = Math.floor(Math.random() * 5000);

    const formTemplate = (
      `<div class="card shadow">
        <div class="card-header" id="form-header-${randomId}">
          <h5 class="mb-0">
            <button class="btn btn-link w-100 d-flex" style="text-decoration:none;" type="button" data-toggle="collapse" data-target="#collapse-${randomId}" aria-expanded="true" aria-controls="collapse-${randomId}">
              <span style="max-width:60%; overflow: hidden;">${survey.header.title}</span><span class="ml-auto ${(this.checkFormFinish(survey.header.endDate) ? 'text-danger' : '')}">${this.convertTimestampToDate(survey.header.endDate)}</span>
            </button>
          </h5>
        </div>

        <div id="collapse-${randomId}" class="collapse" aria-labelledby="form-header-${randomId}" data-parent="#accordion-surveys">
        <div class="alert alert-info rounded-0" style="font-size:0.9rem;" role="alert">

          <p class="m-0">${survey.header.description}</p>
        </div>
          <div class="card-body">
            <form id="${survey._id}">
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
    const selectOptions = [];
    const checkboxOptions = [];
    const radioOptions = [];
    // Generate an id for the case select
    const randomSelectID = this.generateRandomId();

    switch (input.type) {
    case 'select':

      input.values.forEach(value => selectOptions.push(`<option value="${value.value}">${value.label}</option>`));

      inputTemplate = (`
        <div class="form-group">
          <label for="input-select-${randomSelectID}">${input.label}</label>
          <select class="form-control" name="${input.name}" id="input-select-${randomSelectID}">
          ${selectOptions.join('')}
          </select>
        </div>
      `);
      break;
    case 'checkbox':
      input.values.forEach((value) => {
        const randomID = this.generateRandomId();

        checkboxOptions.push((`
          <div class="form-check" id="group-checkbox-${randomID}">
            <input class="form-check-input" type="checkbox" name="${input.name}" value="${value.value}" id="input-checkbox-${randomID}">
            <label class="form-check-label" for="input-checkbox-${randomID}">${value.label}</label>
          </div>
          `));
      });

      inputTemplate = (`
          <div class="form-group">
            <label>${input.label}</label>
            ${checkboxOptions.join('')}
          </div>
        `);
      break;
    case 'radio':
      input.values.forEach((value) => {
        const randomID = this.generateRandomId();

        radioOptions.push((`
          <div class="form-check" id="group-radio-${randomID}">
            <input class="form-radio-input" type="radio" name="${input.name}" value="${value.value}" id="input-radio-${randomID}">
            <label class="form-radio-label" for="input-radio-${randomID}">${value.label}</label>
          </div>
          `));
      });

      inputTemplate = (`
          <div class="form-group">
            <label>${input.label}</label>
            ${radioOptions.join('')}
          </div>
        `);
      break;

    default:
      break;
    }

    return inputTemplate;
  }

  static generateRandomId() {
    const randomId = Math.floor(Math.random() * 5000);
    return randomId;
  }

  static checkFormFinish(date) {
    const timeLimit = 172800000;
    if (date - Date.now() < timeLimit) {
      return true;
    }
    return false;
  }

  static convertTimestampToDate(timestamp) {
    const fullDate = new Date(timestamp);
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
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

  static sendFormData(e) {
    e.preventDefault();
    const form = e.target;
    const inputsList = {
      select: [],
      checkbox: [],
      radio: [],
    };

    Object.keys(inputsList).forEach((key) => {
      switch (key) {
      case 'select':
        form.querySelectorAll(key).forEach((input) => {
          const question = document.querySelector(`label[for="${input.id}"]`).textContent;
          inputsList[key].push({ question, answer: input.value });
        });
        break;
      case 'checkbox':
        form.querySelectorAll(`[type="${key}"]`).forEach((input) => {
          const inputParent = input.parentNode.parentNode;
          const question = inputParent.querySelector('label').textContent;
          if (input.checked) inputsList[key].push({ question, answer: input.value });
        });
        break;
      case 'radio':
        form.querySelectorAll(`[type="${key}"]`).forEach((input) => {
          const inputParent = input.parentNode.parentNode;
          const question = inputParent.querySelector('label').textContent;
          if (input.checked) inputsList[key].push({ question, answer: input.value });
        });
        break;
      default:
        break;
      }
    });


    const { select, checkbox, radio } = inputsList;
    const allAnswers = [...select, ...checkbox, ...radio];

    const formData = {
      questions: allAnswers.map(answer => answer.question),
      answers: allAnswers.map(answer => answer.answer),
    };

    fetch(`https://cv-mobile-api.herokuapp.com/api/summaries/${form.id}`, {
      body: JSON.stringify(formData),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      // Success message
      window.location.reload();
    }).catch(err => console.log(err));
  }

  renderPage() {
    document.querySelector('.main-container').innerHTML = this.generatePageStructure();
    document.querySelectorAll('form').forEach(form => form.addEventListener('submit', this.sendFormData));
  }

  init() {
    this.getDataFromApi(this._url);
  }
}

// Initialization of the page's functionality
window.onload = new SurveysPage().init();
