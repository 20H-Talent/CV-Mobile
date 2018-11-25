var confidocType = "";
var data = document.getElementsByClassName("data");

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
        socialUrls: {
            _id: "5bf7c8ba53abff001b0647c2",
            platform: platform.value,
            url: url.value
        },
        website: website.value,
    }
    return formData;
}
function test(){
    let testEnd = true;
    for(var i = 0;i<=data.length-1;i++){
        console.log(i)
            data[i].value
        
       
    }
    return testEnd;
}
$("#send").click(function SendData() {
    Recort();
    if (country.value !== "" && street.value !== "" && city.value !== "" && zipcode.value !== ""
        && bio.value !== "" && docNumber.value !== "" && email.value !== "" && confidocType !== "" 
        && employees.value !== "" && namecompany.value !== "" && phone.value !== "" && platform.value !== "" 
        && url.value !== "" && website.value !== "") {
         
           if(test()){
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


    }else{
        alert("Please fill all data")
    }

});




