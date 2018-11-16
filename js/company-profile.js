const companyID = window.location.search.split('=')[1];


var email = document.getElementById("email");
var website = document.getElementById("website");
var works = document.getElementById("works");

var phone = document.getElementById("phone");
var locatiFull = document.getElementById("location");
var country = document.getElementById("location-country");

var city = document.getElementById("location-city");
var street = document.getElementById("location-street");
var nameCompany = document.getElementById("name");

var inputImg = document.getElementById("picture-input");
var CIF = document.getElementById("CIF");
var bio = document.getElementById("bio");

var docType=document.getElementById("docType");
var jobOffers=document.getElementById("jobOffers");
var socialUrls=document.getElementById("socialUrls");

var docNumber=document.getElementById("docNumber");
var zipcode = document.getElementById("zipcode");



var liLocatiFull = document.getElementById("li-location");
var liCountry = document.getElementById("li-location-country");
var liCity = document.getElementById("li-location-city");
var liStreet = document.getElementById("li-location-street");
var liCIF = document.getElementById("li-CIF");
var liZipcode = document.getElementById("li-zipcode");
var dataf = "";


function dataCompany(companyID) {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/companies/" + companyID
    }).done(function (data) {
        fillData(data);
        dataf = data;
    });
}

function fillData(data) {
    nameCompany.innerHTML = data.name;
    email.innerHTML = data.email;
    website.innerHTML = data.website;
    works.innerHTML = data.employees;
    phone.innerHTML = data.phone;
    document.getElementById("userImg").src = data.logoURL;
   
    locatiFull.innerHTML = data.address.country + ' . ' + data.address.city + ' . ' + data.address.street;
    country.innerHTML = data.address.country;
    city.innerHTML = data.address.city;
    street.innerHTML = data.address.street;

    zipcode.innerHTML = data.address.street;
    bio.innerHTML = data.bio;
    CIF.innerHTML = data.CIF;

    docType.innerHTML = data.docType;
    jobOffers.innerHTML = data.jobOffers;
    socialUrls.innerHTML = data.socialUrls;

    docNumber.innerHTML=data.docNumber;
}
function imgError(image) {
    image.onerror = "";
    image.src = "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png";
    console.warn('User avatar has been deleted from the server. We have changed it for the default avatar image');
    return true;
  }
dataCompany(companyID);
// "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png"


let isDropdownOpen = false;
$("#edit").click(function editDelete() {
    isDropdownOpen = !isDropdownOpen;
    if(isDropdownOpen){
        document.getElementById("edit-options").classList.remove("d-none");
    }else{
        document.getElementById("edit-options").classList.add("d-none");
    }
    
})

$('#edit-btn').click(function editCompany() {
    email.setAttribute('contenteditable', true);
    website.setAttribute('contenteditable', true);
    works.setAttribute('contenteditable', true);

    phone.setAttribute('contenteditable', true);
    street.setAttribute('contenteditable', true);
    city.setAttribute('contenteditable', true);

    country.setAttribute('contenteditable', true);
    nameCompany.setAttribute('contenteditable', true);
    docType.setAttribute('contenteditable', true);

    jobOffers.setAttribute('contenteditable', true);
    socialUrls.setAttribute('contenteditable', true);
    docNumber.setAttribute('contenteditable', true);

    bio.setAttribute('contenteditable', true);
    CIF.setAttribute('contenteditable', true);
    zipcode.setAttribute('contenteditable', true);


    inputImg.classList.remove("d-none");

    liLocatiFull.classList.add("d-none");
    liStreet.classList.remove("d-none");
    liCity.classList.remove("d-none");
    liCountry.classList.remove("d-none");

    liZipcode.classList.remove("d-none");
    liCIF.classList.remove("d-none");

    liLocatiFull.classList.remove("d-flex");
    liStreet.classList.add("d-flex");
    liCity.classList.add("d-flex");
    liCountry.classList.add("d-flex");


    document.getElementById("save").classList.remove("d-none");
    document.getElementById("cancel").classList.remove("d-none");
    document.getElementById("edit").classList.add("d-none");
    document.getElementById("edit-options").classList.add("d-none");
    

});

$("#save").click(function confirEditCompany() {

    email.setAttribute('contenteditable', false);
    website.setAttribute('contenteditable', false);
    works.setAttribute('contenteditable', false);
    phone.setAttribute('contenteditable', false);
    street.setAttribute('contenteditable', false);
    city.setAttribute('contenteditable', false);
    country.setAttribute('contenteditable', false);
    nameCompany.setAttribute('contenteditable', false);
    docType.setAttribute('contenteditable', false);
    jobOffers.setAttribute('contenteditable', false);
    socialUrls.setAttribute('contenteditable', false);
    docNumber.setAttribute('contenteditable', false);
    bio.setAttribute('contenteditable', false);
    CIF.setAttribute('contenteditable', false);
    zipcode.setAttribute('contenteditable', false);

    inputImg.classList.add("d-none");

    liLocatiFull.classList.add("d-flex");
    liStreet.classList.remove("d-flex");
    liCity.classList.remove("d-flex");
    liCountry.classList.remove("d-flex");


    liZipcode.classList.add("d-none");
    liCIF.classList.add("d-none");


    liLocatiFull.classList.remove("d-none");
    liStreet.classList.add("d-none");
    liCity.classList.add("d-none");
    liCountry.classList.add("d-none");

    locatiFull.innerHTML = country.innerText + ' . ' + city.innerText + ' . ' + street.innerText;


    

   
    var companynew = createRequestBody();
    console.log(companynew)
    fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${companyID}`, {
        method: 'put',
        body:  JSON.stringify(companynew)
        
      }).then(res => res.json())
    .then(response => {
        console.log(response);

});

    document.getElementById("need-company").setAttribute('contenteditable', false);
    document.getElementById("save").classList.add("d-none");
    document.getElementById("cancel").classList.add("d-none");
    document.getElementById("edit").classList.remove("d-none");

});
$("#cancel").click(function cancelEditCompany(){

    email.setAttribute('contenteditable', false);
    website.setAttribute('contenteditable', false);
    works.setAttribute('contenteditable', false);

    phone.setAttribute('contenteditable', false);
    street.setAttribute('contenteditable', false);
    city.setAttribute('contenteditable', false);
    docNumber.setAttribute('contenteditable', false);

    country.setAttribute('contenteditable', false);
    nameCompany.setAttribute('contenteditable', false);
    docType.setAttribute('contenteditable', false);
    jobOffers.setAttribute('contenteditable', false);
    socialUrls.setAttribute('contenteditable', false);
    bio.setAttribute('contenteditable', false);
    CIF.setAttribute('contenteditable', false);
    zipcode.setAttribute('contenteditable', false);


    fillData(dataf);


    document.getElementById("save").classList.add("d-none");
    document.getElementById("cancel").classList.add("d-none");
    document.getElementById("edit").classList.remove("d-none");


    var i;
    var edited = document.getElementsByClassName("edited");
    var editedall =edited;
    for(i = 0;i<=editedall.length;i++){
        edited[i].classList.remove("edited");
    }

});











$("#delete-btn").click(function questionRemoveCompany() {
   document.getElementById("loader").classList.remove("d-none");

   document.getElementById("edit-options").classList.add("d-none");
})


$("#delete-cancel").click(function cancelRemoveCompany() {

    document.getElementById("loader").classList.add("d-none");
})

$("#delete-confirm").click(function confirRemoveCompany() {
    fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${companyID}`, {
        method: 'DELETE'
      })
      .then(data => data.json())
      .then(response => {
        console.log(response);
        window.location.pathname = '/index.html';
      });
})




// if the input not == the Api the color is orange
$(".user-info").keyup(function detectChanges() {
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
    if (!(nameCompany.innerText == dataf.name)) {
        nameCompany.classList.add("edited");
    } else {
        nameCompany.classList.remove("edited");
    }
});




function createRequestBody(){
    let newPicture = document.querySelector('#picture-input').files[0];
   
    let formData = {
        address:{
            country:country.innerText,
            street:street.innerText,
            city:city.innerText,
            zipcode:dataf.zipcode.innerText
        },
        bio:bio.innerText,
        docNumber:docNumber.innerText,
        docType:docType.innerText,
        email:email.innerText,
        employees:works.innerText,
        jobOffers:jobOffers.innerText,
        logoURL:newPicture,
        name:nameCompany.innerText,
        phone:phone.innerText,
        socialUrls:socialUrls.innerText,
        website:website.innerText,
    }

    return formData;
}
