const cardsContainer = document.getElementById("renderCard");
const currentUser = sessionStorage.getItem('id');
checkIfUserHasFavorite(currentUser);

let ratingsInfo = {}

function getRatedInfo(){
    let localStorageInfo = localStorage.getItem('ratedUser');
    if (localStorageInfo){
        ratingsInfo = localStorageInfo;
    } else {
        ratingsInfo = {
            interested: [],
            ratings: [],
        }
    }
    return ratingsInfo;
}

function existsIdUserRating(idUser, localStorageInfo){
    localStorageInfo.ratings.forEach(function(currentValue, index){
        if(currentValue.idUser == idUser){
            return index;
        }
    });
    return false;
}


function setRatedInfo(idUser ,userIdTextarea, userIdStars, checkUserInterested){
    const ratedInfo = getRatedInfo();
    if(!ratedInfo.checkUserInterested.includes(idUser) && checkUserInterested){
        ratingsInfo.interested.push(checkUserInterested)
    } else if (ratedInfo.checkUserInterested.includes(idUser) && !checkUserInterested){
        const rateUserIndex = ratingsInfo.interested.indexOf(checkUserInterested);
        ratingsInfo.interested.splice(rateUserIndex, 1);
    }
    let existsUserIndex = existsIdUserRating
    if (existsUserIndex){
        localStorageInfo.ratings[existsUserIndex].comments = userIdTextarea;
        localStorageInfo.ratings[existsUserIndex].stars = userIdStars;
    } else {
        ratedUser = {
        idUser: idUser,
        comments: userIdTextarea,
        stars: userIdStars
        }
        localStorageInfo.ratings.push(ratedUser);
    }
    let localStorageInfo = localStorage.setItem('ratedUser', localStorageInfo);
}


function saveRate(e){
    const idUser = $(e).attr('id');
    const userIdTextarea = $(`#${idUser}-textarea`).froalaEditor('html.get');
    const userIdStars = $(`#${idUser}-stars`).val() ;
    const checkUserInterested = $(`#${idUser}-interested`).prop('checked') ? true : false ;
    setRatedInfo(idUser, userIdTextarea, userIdStars, checkUserInterested);
}


function exportCards() {
    $.ajax({
        url: "https://cv-mobile-api.herokuapp.com/api/users"
    }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            const userIsChecked = checkIfUserIsMarked(data[i]);
            const card = renderCard(data[i], userIsChecked);
            cardsContainer.innerHTML += card;
            renderstar(data[i])
            if (i == data.length - 1) {
                textarea()
            }
        }
    });
}

function renderStarSave(json) {
    let star = "";
    for (let i = 0; i < json.star; i++) {
        console.log(json.star + " " + i)
        if (i == json.star - 1) {
            star += `<i class="material-icons activeStar" id="${json.id} ${i + 1}"  onclick="star(id)">star</i>`
        } else {
            star += `<i class="material-icons" id="${json.id} ${i + 1}"  onclick="star(id)">star</i>`
        }
    }
    for (let i = 0; i < 5 - json.star; i++) {

        star += `<i class="material-icons" id="${json.id} ${json.star + i + 1}"  onclick="star(id)">star_border</i>`
    }
    document.getElementById(json.id).innerHTML = star;
}
function renderTextareaSave(json) {
    document.getElementById(json.id).innerHTML = json.textarea
}
function renderInterety(json) {
    if (json.checked) {
        document.getElementById(json.id).innerHTML = `<input type="checkbox" class="mgc-switch mgc-sm interestedCheck" id="${json._id}-interested"  checked  style="margin-right: 5px;"/><p>I\'m interested</p>`
    }

}
function textarea() {
    $('textarea').froalaEditor();
    $(document.querySelector('[title="Insert Image"]')).remove();

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
        `<div class="text-center mb-3" id="${data._id}">` +
        '</div>' +
        '<div class="d-flex flex-row justify-content-center" style="margin-top:5px">' +
        `<input type="checkbox" class="mgc-switch mgc-sm interestedCheck" id="${data._id}-interested" ${checked ? 'checked' : ''} onclick="checkInterested(this)" style="margin-right: 5px;"/><p>I\'m interested</p>` +
        '</div>' +
        `<div class="d-flex justify-content-center"id="" >` +
        `<textarea id="${data._id}-textarea" name="editor1"></textarea>` +
        '</div >' +
        '</div >' +
        `<div class="d-flex justify-content-center mt-3">` +
        `<button class="btn btn-primary saveRate-btn" onclick="saveRate(this)" id="${data._id}">` +
        "Save" +
        `</button>` +
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
            `<i class="material-icons activeStar" id="${idStar} 1" data-stars="1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`
    } else if (siteStar == 2) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons activeStar" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 3) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons activeStar" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star_border</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 4) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons activeStar" id="${idStar} 4"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 5"  onclick="star(id)">star_border</i>`;
    } else if (siteStar == 5) {
        document.getElementById(idStar).innerHTML =
            `<i class="material-icons" id="${idStar} 1"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 2"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 3"  onclick="star(id)">star</i>` +
            `<i class="material-icons" id="${idStar} 4"  onclick="star(id)">star</i>` +
            `<i class="material-icons activeStar" id="${idStar} 5"  onclick="star(id)">star</i>`;
    }
    document.getElementById(idStar).innerHTML += `<input value="${siteStar}" id="${idStar}-stars" type="hidden"/>`;

}


function save(idS) {
    console.log('oh yeah')
    let id = idS.split(" ")[0];
    var activeStar = document.getElementsByClassName("activeStar")
    for (let i = 0; i < activeStar.length; i++) {
        if (activeStar[i].id.split(" ")[0] == id) {
            var NumerStar = activeStar[i].id.split(" ")[1]
        }
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