cardsContainer = document.getElementById("renderCard");
var example = [{
    id: "5bfa6563f6d397001b0650f6",
    star: 1
}]
function exportCards() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/users"
    }).done(function (data) {
        console.log(data);
        var i;
        for (i = 0; i <= data.length; i++) {
            const card = renderCard(data[i]);
            cardsContainer.innerHTML += card;
            renderstar(data[i])
            if(i<example.length){
                renderStarSave(example[i]);
            }
            
          
        }
        


    });

}
function renderStarSave(json) {
        let star = "";
        for (let i = 0; i < json.star; i++) {
            console.log(i+ " estella");
            star += `<i class="material-icons" id="${json.id} ${i + 1}"  onclick="star(id)">star</i>`
        }
        for (let i = 0; i < 5 - json.star; i++) {
            console.log(i+ " no estella");
            star += `<i class="material-icons" id="${json.id} ${json.star + i+1}"  onclick="star(id)">star_border</i>`
        }
        document.getElementById(json.id).innerHTML = star
 
}

exportCards();

function renderCard(data) {
    var card = (
        '<div class="card shadow m-3 p-4"  style="width: 90%; height: auto;">' +
        '<img class="card-img-top m-auto" src="' + data.logo + '" alt="' + data.name + '" onError="imgError(this)"style="height:150px; width:150px; border-radius:50%;object-fit:cover;" onerror="imgError(this)">' +
        '<div class="card-body p-0 mt-2">' +
        '<h5 class="card-title text-center mb-2">' +
        data.name +
        '</h5>' +
        `<div class="text-center" id="${data._id}">` +
        '</div>' +
        '<div class="d-flex justify-content-center">' +
        '<textarea name="editor1"></textarea>' +
        '</div >' +
        '</div >' +
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
function renderstar(data) {
    document.getElementById(data._id).innerHTML = (
        `<i class="material-icons" id="${data._id} 1"  onclick="star(id)">star_border</i>` +
        `<i class="material-icons" id="${data._id} 2"  onclick="star(id)">star_border</i>` +
        `<i class="material-icons" id="${data._id} 3"  onclick="star(id)">star_border</i>` +
        `<i class="material-icons" id="${data._id} 4"  onclick="star(id)">star_border</i>` +
        `<i class="material-icons" id="${data._id} 5"  onclick="star(id)">star_border</i>`);
}



function star(id) {
    console.log(id)
    var siteStar = id.split(" ")[1];
    let idStar = id.split(" ")[0]
    console.log(id.split(" "))
    if (siteStar == 1) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`
    } else if (siteStar == 2) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 3) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 4) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 5) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star</i>`;
    }
}