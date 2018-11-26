const companyID = window.location.search.split('=')[1];
var socialUrlsAll = [];

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
var bio = document.getElementById("bio");

var docType = document.getElementById("docType");
var jobOffers = document.getElementById("jobOffers");
var socialUrls = document.getElementById("socialUrl");

var docNumber = document.getElementById("docNumber");
var zipcode = document.getElementById("zipcode");
var platformAll = document.getElementsByClassName("platform");

var urlAll = document.getElementsByClassName("url");


var liLocatiFull = document.getElementById("li-location");
var liCountry = document.getElementById("li-location-country");
var liCity = document.getElementById("li-location-city");
var liStreet = document.getElementById("li-location-street");
var liZipcode = document.getElementById("li-zipcode");
var dataf = "";


function dataCompany(companyID) {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/companies/" + companyID
    }).done(function (data) {
        fillData(data);
        socialRed(data);
        dataf = data;
        console.log(dataf);
    });
}

function fillData(data) {
    if(data.employees == null){
        data.employees = "";
    }

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

    zipcode.innerHTML = data.address.zipcode;
    bio.innerHTML = data.bio;

    docType.innerHTML = data.docType;
    jobOffers.innerHTML = data.jobOffers;
    docNumber.innerHTML = data.docNumber;

  
}
function socialRed(data){
    for (let i = 0; i < data.socialUrls.length; i++) {
        switch (data.socialUrls[i].platform) {
            case "twitter":
                socialUrls.innerHTML += `<a href="${data.socialUrls[i].url}" class=" mr-2 ml-2 mt-2" style="font-size:18px" ><i class="fab fa-twitter"></i></a>`;
                break;
            case "instagram":
                socialUrls.innerHTML += `<a href="${data.socialUrls[i].url}" class=" mr-2 ml-2 mt-2" style="font-size:18px" ><i class="fab fa-instagram"></i></a>`;
                break;
            case "linkedin":
                socialUrls.innerHTML += `<a href="${data.socialUrls[i].url} "class=" mr-2 ml-2 mt-2" style="font-size:18px" ><i class="fab fa-linkedin-in"></i></a>`;
                break;
            case "youtube":
                socialUrls.innerHTML += `<a href="${data.socialUrls[i].url}" class=" mr-2 ml-2 mt-2" style="font-size:18px" ><i class="fab fa-youtube"></i></a>`;
                break;
            case "facebook":
                socialUrls.innerHTML += `<a href="${data.socialUrls[i].url} "class=" mr-2 ml-2 mt-2" style="font-size:18px" ><i class="fab fa-facebook"></i></a>`;
                break;
        }

    }
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
    if (isDropdownOpen) {
        document.getElementById("edit-options").classList.remove("d-none");
    } else {
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
    docNumber.setAttribute('contenteditable', true);
    bio.setAttribute('contenteditable', true);
    zipcode.setAttribute('contenteditable', true);
    for (let i = 0; i < platformAll.length; i++) {
        platformAll[i].setAttribute('contenteditable', true);
        urlAll[i].setAttribute('contenteditable', true);
    }



    inputImg.classList.remove("d-none");

    liLocatiFull.classList.add("d-none");
    liStreet.classList.remove("d-none");
    liCity.classList.remove("d-none");
    liCountry.classList.remove("d-none");

    liZipcode.classList.remove("d-none");

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

    if (docType.innerText == "nif" || docType.innerText == "cif" || docType.innerText == "NIF" || docType.innerText == "CIF" ||
        docType.innerText == "Nif" || docType.innerText == "Cif") {
        if (email.innerText !== "" && country.innerText !== "" && docNumber.innerText !== "" && nameCompany.innerText !== "") {
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
            docNumber.setAttribute('contenteditable', false);
            bio.setAttribute('contenteditable', false);
            zipcode.setAttribute('contenteditable', false);
            for (let i = 0; i < platformAll.length; i++) {
                platformAll[i].setAttribute('contenteditable', false);
                urlAll[i].setAttribute('contenteditable', false);
            }

            document.getElementById("save").classList.add("d-none");
            document.getElementById("cancel").classList.add("d-none");
            document.getElementById("edit").classList.remove("d-none");

            inputImg.classList.add("d-none");

            liLocatiFull.classList.add("d-flex");
            liStreet.classList.remove("d-flex");
            liCity.classList.remove("d-flex");
            liCountry.classList.remove("d-flex");


            liZipcode.classList.add("d-none");


            liLocatiFull.classList.remove("d-none");
            liStreet.classList.add("d-none");
            liCity.classList.add("d-none");
            liCountry.classList.add("d-none");

            locatiFull.innerHTML = country.innerText + ' . ' + city.innerText + ' . ' + street.innerText;


            var companynew = createRequestBody();
            console.log(companynew)
            fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${companyID}`, {
                method: 'put',
                body: JSON.stringify(companynew),
                headers: { "Content-Type": "application/json; chaset=utf-8" }
            })
                .then(res => res.json())
                .then(response => console.log(response));
        } else {
            alert("The data Name,email,country and number of documentation are obligatory ")
        }
    } else {
        alert("There is an error in the type of documentation")
    }


});
$("#cancel").click(function cancelEditCompany() {

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
    bio.setAttribute('contenteditable', false);
    zipcode.setAttribute('contenteditable', false);
    for (let i = 0; i < platformAll.length; i++) {
        platformAll[i].setAttribute('contenteditable', false);
        urlAll[i].setAttribute('contenteditable', false);
    }

    fillData(dataf);


    document.getElementById("save").classList.add("d-none");
    document.getElementById("cancel").classList.add("d-none");
    document.getElementById("edit").classList.remove("d-none");

    inputImg.classList.add("d-none");

    var i;
    var edited = document.getElementsByClassName("edited");
    var editedall = edited;
    for (i = 0; i <= editedall.length; i++) {
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
        console.log(dataf.address.country)
    } else {
        country.classList.remove("edited");
    }
    if (!(zipcode.innerText == dataf.address.zipcode)) {
        zipcode.classList.add("edited");
        console.log(dataf.address.zipcode)
    } else {
        zipcode.classList.remove("edited");
    }
    if (!(nameCompany.innerText == dataf.name)) {
        nameCompany.classList.add("edited");
    } else {
        nameCompany.classList.remove("edited");
    }
    if (!(docType.innerText == dataf.docType)) {
        docType.classList.add("edited");
    } else {
        docType.classList.remove("edited");
    }
    if (!(docNumber.innerText == dataf.docNumber)) {
        docNumber.classList.add("edited");
    } else {
        docNumber.classList.remove("edited");
    }
    if (!(bio.innerText == dataf.bio)) {
        bio.classList.add("edited");
    } else {
        bio.classList.remove("edited");
    }
});
function arraySocial() {
    for (var i = 0; i < platformAll.length; i++) {
        if (!(platformAll[i].innerHTML == "") && !(urlAll[i].innerHTML == "")) {
            socialUrlsAll.push({
                platform: platformAll[i].innerHTML,
                url: urlAll[i].innerHTML
            })
        }
    }
}


function createRequestBody() {
    let newPicture = document.querySelector('#picture-input').files[0];
    arraySocial();
    let formData = {
        address: {
            country: country.innerText,
            street: street.innerText,
            city: city.innerText,
            zipcode: dataf.zipcode
        },
        bio: bio.innerText,
        docNumber: docNumber.innerText,
        docType: docType.innerText,
        email: email.innerText,
        //jobOffers:[jobOffers.innerHTML],
        employees: works.innerText,
        name: nameCompany.innerText,
        phone: phone.innerText,
        socialUrls: socialUrlsAll,
        website: website.innerText,
    }
    return formData;
}
