const userID = window.location.search.split('=')[1];
var email = document.getElementById("email");
var website = document.getElementById("website");
var works = document.getElementById("works");
var phone = document.getElementById("phone");
var locatiFull = document.getElementById("location");
var country = document.getElementById("location-country");
var city = document.getElementById("location-city");
var street = document.getElementById("location-street");

var liLocatiFull = document.getElementById("li-location");
var liCountry = document.getElementById("li-location-country");
var liCity = document.getElementById("li-location-city");
var liStreet = document.getElementById("li-location-street");
var dataf = "";


function dataCompany(userID) {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/company/" + userID
    }).done(function (data) {
        fillData(data);
        dataf = data;
        console.log(dataf);
    });
}

function fillData(data) {
    document.getElementById("name").innerHTML = data.name;
    email.innerHTML = data.email;
    website.innerHTML = data.website;
    works.innerHTML = data.employees;
    phone.innerHTML = data.phone;
    document.getElementById("userImg").src = data.logoURL;
   
    locatiFull.innerHTML = data.address.country + ' . ' + data.address.city + ' . ' + data.address.street;
    country.innerHTML = data.address.country;
    city.innerHTML = data.address.city;
    street.innerHTML = data.address.street;


}
function imgError(image) {
    image.onerror = "";
    image.src = "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png";
    console.warn('User avatar has been deleted from the server. We have changed it for the default avatar image');
    return true;
  }
dataCompany(userID);
// "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png"
/*
 email: "info@apple.com", …}
CIF: 49900932
address: {country: "EEUU", street: "Palo Alto, 239", city: "San Francisco", zipcode: 45783}
bio: "Think different"
email: "info@apple.com"
employees: 123000
logoURL: "http://cv-mobile-api.herokuapp.com/uploads/2018-10-30T16_38_53.628Zapple-logo.jpeg"
name: "Apple inc"
phone: 55555555
registeredDate: 1540917533629
website: "apple.com"
__v: 0
_id: "5bd8891d9a8c59001ba6d7f5"
__proto__: Object
*/

$("#edit").click(function editDelete() {
    document.getElementById("edit-options").classList.remove("d-none");
})

$('#edit-btn').click(function edit() {
    email.setAttribute('contenteditable', true);
    website.setAttribute('contenteditable', true);
    works.setAttribute('contenteditable', true);
    phone.setAttribute('contenteditable', true);
    street.setAttribute('contenteditable', true);
    city.setAttribute('contenteditable', true);
    country.setAttribute('contenteditable', true);

    liLocatiFull.classList.add("d-none");
    liStreet.classList.remove("d-none");
    liCity.classList.remove("d-none");
    liCountry.classList.remove("d-none");

    liLocatiFull.classList.remove("d-flex");
    liStreet.classList.add("d-flex");
    liCity.classList.add("d-flex");
    liCountry.classList.add("d-flex");

    document.getElementById("need-company").setAttribute('contenteditable', true);
    document.getElementById("save").classList.remove("d-none");
    document.getElementById("cancel").classList.remove("d-none");
    document.getElementById("edit").classList.add("d-none");
    document.getElementById("edit-options").classList.add("d-none");

});


$("#save").click(function () {

    email.setAttribute('contenteditable', false);
    website.setAttribute('contenteditable', false);
    works.setAttribute('contenteditable', false);
    phone.setAttribute('contenteditable', false);
    street.setAttribute('contenteditable', false);
    city.setAttribute('contenteditable', false);
    country.setAttribute('contenteditable', false);


    liLocatiFull.classList.add("d-flex");
    liStreet.classList.remove("d-flex");
    liCity.classList.remove("d-flex");
    liCountry.classList.remove("d-flex");

    liLocatiFull.classList.remove("d-none");
    liStreet.classList.add("d-none");
    liCity.classList.add("d-none");
    liCountry.classList.add("d-none");

    locatiFull.innerHTML = country.innerText + ' . ' + city.innerText + ' . ' + street.innerText;


    document.getElementById("need-company").setAttribute('contenteditable', false);
    document.getElementById("save").classList.add("d-none");
    document.getElementById("cancel").classList.add("d-none");
    document.getElementById("edit").classList.remove("d-none");

});

$(".user-info").keyup(function () {
    console.log(email);
    console.log(dataf.email);
    if (!(email.innerText == dataf.email)) {
        email.classList.add("edited");
    } else {
        email.classList.remove("edited");
    }
    if (!(website.innerText == dataf.website)) {
        website.classList.add("edited");
    } else {
        website.classList.remove("edited");
    }
    if (!(works.innerText == dataf.employees)) {
        works.classList.add("edited");
    } else {
        works.classList.remove("edited");
    }
    if (!(phone.innerText == dataf.phone)) {
        phone.classList.add("edited");
    } else {
        phone.classList.remove("edited");
    }
    if (!(street.innerText == dataf.address.street)) {
        street.classList.add("edited");
    } else {
        street.classList.remove("edited");
    }
    if (!(city.innerText == dataf.address.city)) {
        city.classList.add("edited");
    } else {
        city.classList.remove("edited");
    }
    if (!(country.innerText == dataf.address.country)) {
        country.classList.add("edited");
    } else {
        country.classList.remove("edited");
    }
});