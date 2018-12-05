cardsContainer = document.getElementById("renderCard");
const currentUser = sessionStorage.getItem('id');
checkIfUserHasFavorite(currentUser);

var example = [{
    id: "5bfa6563f6d397001b0650f6",
    star: 1
}]
function exportCards() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/users"
    }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            const userIsChecked = checkIfUserIsMarked(data[i]);
            const card = renderCard(data[i], userIsChecked);
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
            star += `<i class="material-icons" id="${json.id} ${i + 1}"  onclick="star(id)">star</i>`
        }
        for (let i = 0; i < 5 - json.star; i++) {
            star += `<i class="material-icons" id="${json.id} ${json.star + i+1}"  onclick="star(id)">star_border</i>`
        }
        document.getElementById(json.id).innerHTML = star
 
}

exportCards();

function renderCard(data, checked) {
    var card = (
        '<div class="card shadow m-3 p-4"  style="width: 90%; height: auto;">' +
        '<img class="card-img-top m-auto" src="' + data.logo + '" alt="' + data.name + '" onError="imgError(this)"style="height:150px; width:150px; border-radius:50%;object-fit:cover;" onerror="imgError(this)">' +
        '<div class="card-body p-0 mt-2">' +
        '<h5 class="card-title text-center mb-2">' +
        data.name +
        '</h5>' +
        `<div class="text-center" id="${data._id}">` +
        '</div>' +
        '<div class="d-flex flex-column justify-content-center">' +
        '<div class="d-flex flex-row justify-content-center" style="margin-top:5px">' +
        `<input type="checkbox" class="mgc-switch mgc-sm interestedCheck" data-id="${data._id}"  ${checked ? 'checked' : ''} onclick="checkInterested(this)" style="margin-right: 5px;"/><p>I\'m interested</p>` +
        '</div >' +
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
    var siteStar = id.split(" ")[1];
    let idStar = id.split(" ")[0]
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

function checkIfUserHasFavorite(id){
    if(!localStorage.getItem(currentUser)) {
        localStorage.setItem(id, JSON.stringify([]))
    }
}

function checkIfUserIsMarked(user){
    //Leemos el local storage y ver si el id del usuario está guardado dentro de ese array
    const localData = JSON.parse(localStorage.getItem(currentUser));
    if(localData.includes(user._id)){
        return true;
    }
    return false;
}

function checkInterested(target){
    const action = target.checked ? 'add' : 'remove';
    const clickedUser = target.dataset.id;
    const currentLocalState = JSON.parse(localStorage.getItem(currentUser));
    if (action == 'add'){
        currentLocalState.push(clickedUser);
    } else {
        const userIndex = currentLocalState.indexOf(clickedUser);
        currentLocalState.splice(userIndex, 1);
    }

    localStorage.setItem(currentUser, JSON.stringify(currentLocalState));
}

function rateFilter() {
    const ratedUsers = document.querySelector('#rated');
    const notRatedUsers = document.querySelector('#not-rated');
    const allUsers = document.querySelector('#all');
    if (ratedUsers.checked){

    } else if (notRatedUsers.checked){

    }else if (allUsers.checked){
        
    }
}