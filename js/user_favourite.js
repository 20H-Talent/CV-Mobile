const cardsContainer = document.querySelector('#cards-container');
const idUserFav = localStorage.getItem('favStorage')


console.log(localStorage.getItem('favStorage'));
function fetchUsersData() {
    $.ajax({
    url: "https://cv-mobile-api.herokuapp.com/api/users"
    }).done(function(data) {
        data.forEach(function(user){
            if (idUserFav.includes(user._id)){
                cardsContainer.innerHTML += renderCards(user);
                const starIcons = document.querySelectorAll("#star-icon");
                starIcons.forEach(function(star){
                    star.addEventListener("click", showStar);
                });
                stars = document.querySelectorAll("#star-icon");
                renderFav();
            // } else {
            //     cardsContainer.innerHTML = "<div class='media-body'><p>You have not save any profile</p></div>"
            }  
        })
    });
};


fetchUsersData();

function renderCards(userFav) {
    
    const {
        name,
        username,
        jobTitle,
        company,
        email,
        languages,
        skills,
        _id,
        address,
        experience,
        profilePicture,
    } = userFav
    var template_cards = (
        '<div class="card shadow m-3 p-4" style="width: 90%; height: auto;">' +
        '<i class="material-icons" style="width: 24px;" id="star-icon" data-id="' + _id + '">star_border</i>' +
        '<img class="card-img-top m-auto" src="' + profilePicture + '" alt="' + name + ' Profile picture" style="height:150px; width:150px; border-radius:50%;">' +
        '<div class="card-body p-0 mt-2">' +
        '<h2 class="card-title text-center mb-2"><span>' + name + '</span></h2>' +
        '<h6 class="card-title text-center text-muted mb-4"><span>' + jobTitle + '</span></h6>' +
        '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">person</i> <span>' + username + '</span></p>' +
        '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">email</i> <span>' + email + '</span></p>' +
        '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">work</i> <span>' + company + '</span></p>' +
        '<p class="card-text d-flex align-items-center"><i class="material-icons mr-3">public</i> <span>' + address.city + ', ' + address.country + '</span></p>' +
        '<a href="./html/profile.html?id=' + _id + '" class="btn btn-primary mt-3">View Profile</a>' +
        '</div>' +
        '</div>'
    );
    return template_cards;
}

function showStar(e) {
    //Global variable to save in the favourite local storage. This will try to take favStorage of the local Storage. If not, it will create an empty array
    let favUsers = JSON.parse(localStorage.getItem('favStorage')) || []
    const selectedFavUserId = e.target.dataset.id
    if (e.target.innerHTML === 'star'){
        e.target.innerHTML = 'star_border';
        let userIndex = favUsers.indexOf(selectedFavUserId);
        favUser = favUsers.splice(userIndex, 1);
        localStorage.setItem('favStorage', JSON.stringify(favUsers));
    } else {
        e.target.innerHTML = 'star';
        favUsers.push(selectedFavUserId);
        localStorage.setItem('favStorage', JSON.stringify(favUsers));
    }
};

//Function to render the users that have been selected as favourite
function renderFav(){
    let favUsers = localStorage.getItem('favStorage') || [];
    stars.forEach(function(star){
        if (favUsers.includes(star.dataset.id)) {
        star.innerHTML = 'star';
        }
    })
}