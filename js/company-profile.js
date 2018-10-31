const userID = window.location.search.split('=')[1];
console.log(userID);
function dataCompany(userID){
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/company/"+ userID
    }).done(function (data) {
        fillData(data);
        console.log(data)
    });
}
function fillData(data){
document.getElementById("name").innerHTML = data.name;
document.getElementById("email").innerHTML = data.email;
document.getElementById("website").innerHTML = data.website;
document.getElementById("works").innerHTML = data.employees;
document.getElementById("phone").innerHTML = data.phone;
document.getElementById("userImg").src = data.logoURL;
document.getElementById("location").innerHTML = data.address.country+' '+data.address.city+ ' ,'+data.address.street ;
}
dataCompany(userID);
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


let isDropdownOpen = false;
// Edit profile functionality
edit.addEventListener('click', toggleDropdown);

// Show profile options dropdown
function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  let options = document.querySelector('#edit-options');

  if (isDropdownOpen) {
    // Show the options of the profile
    options.classList.add('d-flex');
    options.classList.remove('d-none');
    // Add listeners to each option
    document.querySelector('#edit-btn').addEventListener('click', openEditMode)
    document.querySelector('#delete-btn').addEventListener('click', removeConfirmation)
  } else {
    // Hide the options of the profile
    options.classList.remove('d-flex');
    options.classList.add('d-none');
    // Remove the listener of the options to avoid unexpected behavior
    document.querySelector('#edit-btn').removeEventListener('click', openEditMode)
    document.querySelector('#delete-btn').removeEventListener('click', removeConfirmation)

  }

}

