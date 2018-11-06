var cardsContainer = document.getElementById("cards-container");
var example = 'example';
function exportCards() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/company"
    }).done(function (data) {
        console.log(data);
        var i;
        for(i=0;i<=data.length;i++){
            const card = renderCard(data[i]);
            cardsContainer.innerHTML += card;
        }
        
    });

}
exportCards();

function renderCard(data) {
    var card = (
        '<div class="card shadow m-3 p-4"  style="width: 90%; height: auto;">'+
        '<img class="card-img-top m-auto" src="' + data.logoURL + '" alt="'+data.name +'" onError="imgError(this)"style="height:150px; width:150px; border-radius:50%;object-fit:cover;" onerror="imgError(this)">' +
        '<div class="card-body p-0 mt-2">' +
        '<h5 class="card-title text-center mb-2">' +
        data.name +
        '<span class="d-flex justify-content-center">S.L</span>' +
        ' </h5>' +
        '<div class="alert alert-primary" role="alert">' +
        example +
        '<a href="#" class="alert-link">' +
        example +
        '</a>' +
        '</div>' +
        '<div class="d-flex justify-content-center">' +
        '<button type="button" class="btn btn-primary "><a class="text-light" href="../html/company-profile.html?id='+data._id+'">More Info</a></button>' +
        '</div >' +
        '</div >'  +
        '</div >' 
    );
    return card;
}
function imgError(image) {
    image.onerror = "";
    image.src = "https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png";
    console.warn('User avatar has been deleted from the server. We have changed it for the default avatar image');
    return true;
  }
/*
[{
    "address": {"country": "EEUU", "street": "Palo Alto, 239", "city": "San Francisco", "zipcode": 45783}
    "_ id": "5bd8891d9a8c59001ba6d7f5"
    "nombre": "Apple inc"
    "CIF": 49900932
    "correo electrónico": "info@apple.com"
    "sitio web": "apple.com"
    "bio": "Piensa diferente"
    "empleados": 123000
    "phone": 55555555
    "registeredDate": 1540917533629
    "logoURL": "http://cv-mobile-api.herokuapp.com/uploads/2018-10-30T16_38_53.628Zapple-logo.jpeg"
    "__v ": 0
}]
 */