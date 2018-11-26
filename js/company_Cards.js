var cardsContainer = document.getElementById("cards-container");
function exportCards() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/companies"
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
    var social =   "";
    for (let i = 0; i < data.socialUrls.length; i++) {
        social+=
            `<p class="m-0 w-100 user-info platform" id="">${data.socialUrls[i].platform}</p>` +
            `<p class="m-0 w-100 user-info url" id="">${data.socialUrls[i].url}</p>`
    };
    var card = (
        '<div class="card shadow m-3 p-4"  style="width: 90%; height: auto;">'+
        '<img class="card-img-top m-auto" src="' + data.logoURL + '" alt="'+data.name +'" onError="imgError(this)"style="height:150px; width:150px; border-radius:50%;object-fit:cover;" onerror="imgError(this)">' +
        '<div class="card-body p-0 mt-2">' +
        '<h5 class="card-title text-center mb-2">' +
        data.name +
     //   `<div class="" id="Socialurl">${social}</div>`+
        '<div class="alert alert-primary" role="alert">' +
        data.jobOffers +
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
