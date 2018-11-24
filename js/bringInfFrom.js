class FormHelpers {
  static createCheckbox(item) {
    return (
    `<div class="form-check mb-2" style="width:30%;">
      <input class="form-check-input" type="checkbox" value="${item._id}" id="checkbox-${item.label}">
      <label class="form-check-label" for="checkbox-${item.label}">${item.label}</label>
    </div>`);
  }

  static getCheckedCheckboxes(group) {
    const parent = document.querySelector(`#${group}-container`);
    const checkboxes = parent.querySelectorAll('input[type=checkbox]:checked');
    const checkboxesValues = [];
    checkboxes.forEach(check => checkboxesValues.push(check.value));
    return checkboxesValues;
  }

  static displayMessage(success, message) {
    const formModal = document.querySelector('#form-message');
    formModal.classList.add(success ? 'alert-success' : 'alert-danger');
    formModal.classList.add('d-flex');
    formModal.classList.remove('d-none');
    formModal.textContent = message;
    // Wait 3 seconds and reload the page
    window.setTimeout(() => {
      formModal.classList.remove('d-flex');
      formModal.classList.add('d-none');
    }, 5000);
  }
}

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

    renderSkillOptions() {
      const skillsContainer = document.querySelector('#skills-container')
      this.skills.map(skill => {
        skillsContainer.innerHTML += FormHelpers.createCheckbox(skill);
      })
    }

    renderLangOptions() {
      const langsContainer = document.querySelector('#langs-container');
      this.langs.map(lang => {
        langsContainer.innerHTML += FormHelpers.createCheckbox(lang)
      })
    }

    handleImageInput(e) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.avatarForm.querySelector('#avatar-input-img').src = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);

    }

    sendUserForm(e) {
      e.preventDefault();

      this.userData = {
        name: document.querySelector('#inputName').value,
        username: document.querySelector('#inputUsername').value,
        email: document.querySelector('#inputEmail').value,
        phone: document.querySelector('#inputPhone').value || null,
        website: document.querySelector('#inputWebsite').value || null,
        birthDate: document.querySelector('#inputBirthDate').value || null,
        address: {
          country: document.querySelector('#inputCountry').value,
          city: document.querySelector('#inputCity').value || null,
          street: document.querySelector('#inputStreet').value || null,
          zipcode: document.querySelector('#inputZip').value || null,
        },
        jobTitle: document.querySelector('#inputJobTitle').value || null,
        company: document.querySelector('#inputCompany').value || null,
        experience: document.querySelector('option:checked').value || null,
        gender: document.querySelector('input[type=radio]:checked').value || null,
        skills: FormHelpers.getCheckedCheckboxes('skills'),
        languages: FormHelpers.getCheckedCheckboxes('langs')
      }

      fetch('https://cv-mobile-api.herokuapp.com/api/users', {
        method: 'POST',
        body: JSON.stringify(this.userData),
        headers: { "Content-Type": "application/json; charset=utf-8"}
      })
      .then(res => res.json())
      .then(res => {
        this.userId = res._id;
        this.sendUserAvatar();
      })
      .catch( err => FormHelpers.displayMessage(false, err));
    }

    sendUserAvatar() {
      if (this.userId) {
        const formBody = new FormData();
        const imageInput = document.querySelector('#avatar-input').files[0];
        formBody.append('img', imageInput);

        if (imageInput) {
          fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/user/${this.userId}`, {
            method: 'POST',
            body: formBody,
          })
          .then(() => FormHelpers.displayMessage(true, 'User successfully created'))
          .catch(err => FormHelpers.displayMessage(false, err));
        }
        FormHelpers.displayMessage(true, 'User successfully created')
      }
    }

    init() {
      this.getApiInfoFrom(this.skillsURL, 'skills', this.renderSkillOptions.bind(this));
      this.getApiInfoFrom(this.langURL, 'langs', this.renderLangOptions.bind(this));
      document.querySelector('#avatar-input').addEventListener('input', this.handleImageInput.bind(this));
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