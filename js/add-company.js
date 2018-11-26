var confidocType = "";
var data = document.getElementsByClassName("data");
var moreSocial = document.getElementById("moreSocial");
var formDiv = document.getElementById("socialUrls");
var socialUrls = [];

var email = document.getElementById("email");
var phone = document.getElementById("phone");
var city = document.getElementById("city");

var docNumber = document.getElementById("docNumber")
var namecompany = document.getElementById("namecompany");
var country = document.getElementById("Country");
var street = document.getElementById("street");

var website = document.getElementById("website");
var employees = document.getElementById("employees");
var logoURL = document.getElementById("logoURL");

var numberType = document.getElementById("numberType");
var bio = document.getElementById("bio");

var NIF = document.getElementById("NIF");
var CIF = document.getElementById("CIF");

var zipcode = document.getElementById("zipcode");
var platform = document.getElementById("platform");
var url = document.getElementById("url");


var platformAll = document.getElementsByClassName("platform");
var urlAll = document.getElementsByClassName("url");

function Recort() {
    if (NIF.checked) {
        confidocType = "nif"
    } else if (CIF.checked) {
        confidocType = "cif"
    }
}

function createRequestBody() {

    let formData = {
        address: {
            country: country.value,
            street: street.value,
            city: city.value,
            zipcode: zipcode.value,
        },
        bio: bio.value,
        docNumber: docNumber.value,
        docType: confidocType,
        email: email.value,
        //jobOffers:[jobOffers.innerHTML],
        employees: employees.value,
        name: namecompany.value,
        phone: phone.value,
        socialUrls: socialUrls,
        website: website.value,
    }
    return formData;
}

$("#moreSocial").click(function moreSocial() {
    formDiv.innerHTML += '<div class="input-group input-group-sm mb-4 d-flex justify-content-between font-weight-bold">' +
        ' <label for="platform" class="col-2 d-flex">platform</label>' +
        '<input type="text" class="form-control order2 data  col-8 platform" name="platform" aria-describedby="basic-addon1">' +
        ' </div>' +
        '<div class="input-group input-group-sm mb-4 d-flex justify-content-between font-weight-bold">' +
        '<label for="url" class="col-2 d-flex">url</label>' +
        '<input type="text" class="form-control order2 data  col-8 url"  name="url" aria-describedby="basic-addon1">' +
        '</div>'
})
function arraySocial() {
    for (var i = 0; i < platformAll.length; i++) {
        if (!(platformAll[i].value == "") && !(urlAll[i].value == "")) {
            socialUrls.push({
                platform: platformAll[i].value,
                url: urlAll[i].value
            })
        }
    }
}







$("#send").click(function SendData() {
    Recort();
    arraySocial();
    if (country.value !== "" && docNumber.value !== "" && email.value !== "" && confidocType !== "" && namecompany.value !== "" ) {


        console.log("Enviando")
        var companyNew = createRequestBody();
        console.log(companyNew)
        fetch('https://cv-mobile-api.herokuapp.com/api/companies', {
            method: 'POST',
            body: JSON.stringify(companyNew),
            headers: { "Content-Type": "application/json; chaset=utf-8" }
        })
            .then(res => res.json())
            .then(response => console.log(response));


    } else {
        alert("Please fill all data");

    }

});




