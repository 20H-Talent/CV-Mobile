class AddUserForm {
    constructor(form, avatarForm, skillsURL, langURL, defSkills, defLangs) {
      this.form = form;
      this.avatarForm = avatarForm;
      this.skillsURL = skillsURL;
      this.langURL = langURL;
      this.skills = defSkills;
      this.langs = defLangs;
      this.userData = {};
    }

    getApiInfoFrom(url, store, callback) {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        if (store === 'skills') {
          this.skills = res;
        }
        this.langs  = res;
      })
      .then(() => callback())
    }

    createCheckbox(item) {
      return (
      `<div class="form-check mb-2" style="width:30%;">
        <input class="form-check-input" type="checkbox" value="${item._id}" id="checkbox-${item.label}">
        <label class="form-check-label" for="checkbox-${item.label}">${item.label}</label>
      </div>`);
    }

    renderSkillOptions() {
      const skillsContainer = document.querySelector('#skills-container')
      this.skills.map(skill => {
        skillsContainer.innerHTML += this.createCheckbox(skill);
      })
    }

    renderLangOptions() {
      const langsContainer = document.querySelector('#langs-container');
      this.langs.map(lang => {
        langsContainer.innerHTML += this.createCheckbox(lang)
      })
    }

    getCheckedCheckboxes(group) {
      const parent = document.querySelector(`#${group}-container`);
      const checkboxes = parent.querySelectorAll('input[type=checkbox]:checked');
      const checkboxesValues = [];
      checkboxes.forEach(check => checkboxesValues.push(check.value));
      return checkboxesValues;
    }

    sendUserForm(e) {
      e.preventDefault();

      this.userData = {
        name: document.querySelector('#inputName').value,
        username: document.querySelector('#inputUsername').value,
        email: document.querySelector('#inputEmail').value,
        phone: document.querySelector('#inputPhone').value,
        website: document.querySelector('#inputWebsite').value,
        birthDate: document.querySelector('#inputBirthDate').value,
        address: {
          country: document.querySelector('#inputCountry').value,
          city: document.querySelector('#inputCity').value,
          street: document.querySelector('#inputStreet').value,
          zipcode: document.querySelector('#inputZip').value,
        },
        jobTitle: document.querySelector('#inputJobTitle').value,
        company: document.querySelector('#inputCompany').value,
        experience: document.querySelector('option:checked').value,
        gender: document.querySelector('input[type=radio]:checked').value,
        skills: this.getCheckedCheckboxes('skills'),
        languages: this.getCheckedCheckboxes('langs')
      }

      fetch('https://cv-mobile-api.herokuapp.com/api/users', {
        method: 'POST',
        body: JSON.stringify(this.userData),
        headers: { "Content-Type": "application/json; charset=utf-8"}
      })
      .then(res => res.json())
      .then(res => { this.sendUserAvatar(res._id) })
      .catch( err => console.log(err));
    }

    sendUserAvatar(userID) {
      const formBody = new FormData();
      formBody.append('img', document.querySelector('#avatar-input').files[0]);

      fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/user/${userID}`, {
        method: 'POST',
        body: formBody,
      })
      .then(() => console.log('sent successfuly'))
      .catch(err => console.log(err))
    }

    init() {
      this.getApiInfoFrom(this.skillsURL, 'skills', this.renderSkillOptions.bind(this));
      this.getApiInfoFrom(this.langURL, 'langs', this.renderLangOptions.bind(this));
    }
}

// Resources for the form constructor
const skillsURL = 'https://cv-mobile-api.herokuapp.com/api/skills';
const langsURL = 'https://cv-mobile-api.herokuapp.com/api/langs';
const userForm = document.querySelector('#user-form')
const avatarForm = document.querySelector('#avatar-form')


// Creating a form instance and initialiting it
const formController = new AddUserForm(userForm, avatarForm, skillsURL, langsURL, [], []);
window.onload = formController.init();
userForm.addEventListener('submit', formController.sendUserForm.bind(formController))