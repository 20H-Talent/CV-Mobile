var confidocType = "";
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var city = document.getElementById("city");

var docNumber = document.getElementById("docNumber")
var namecompany =document.getElementById("namecompany");
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


function Recort() {
   if(NIF.checked){
    confidocType = "nif"
   }else if(CIF.checked){
    confidocType ="cif"
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
        docNumber:docNumber.value,
        docType: confidocType,
        name: namecompany.value,
        email: email.value,
        phone: phone.value,
        website: website.value,
        employees: employees.value,
    }
    return formData;
}

$("form").on("submit",function () {
    Recort()
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


});




