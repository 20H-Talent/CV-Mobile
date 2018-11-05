

const email = document.getElementById("email");
const phone = document.getElementById("phone");
const city = document.getElementById("city");

const name = document.getElementById("Name");
const country = document.getElementById("Country");
const street = document.getElementById("street");

const website = document.getElementById("website");
const employees = document.getElementById("employees");
const logoURL = document.getElementById("logoURL");

const CIF = document.getElementById("CIF");
const bio = document.getElementById("bio");
const zipcode = document.getElementById("zipcode");



$("form").on("submit",function () {
        var companyNew = createRequestBody();
        console.log(companyNew);
        fetch('https://cv-mobile-api.herokuapp.com/api/company', {
            method: 'POST',
            body: companyNew
        })
            .then(res => res.json())
            .then(response => console.log(response));

        compiErrorData.classList.add("d-none");
    
});

function createRequestBody() {
    let formData = new FormData();
    console.log(name.value);

    formData.append('CIF', CIF.value);
    formData.append('bio', bio.value);
    formData.append('name', name.value);
    formData.append('city', city.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('street', street.value);
    formData.append('country', country.value);
    formData.append('zipcode', zipcode.value);
    formData.append('website', website.value);
    formData.append('logoURL', logoURL.files[0]);
    formData.append('employees', employees.value);

    return formData;
}

