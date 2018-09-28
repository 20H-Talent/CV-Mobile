// document.getElementById("btn").addEventListener("click", function() {
//     $.ajax({
//       url: "https://jsonplaceholder.typicode.com/users"
//     }).done(function(data) {

// });
// });


function renderCard(name, userName, email, company) {
                var template_cards =
                  '<div class="card" style="width: 18rem;">' +
                  '<div class="card-body">' +
                  '<h5 class="card-title">' + name + '</h5>' +
                  '<p class="card-text">' + userName + '</p>' +
                  '<p class="card-text">' + email + '</p>' +
                  '<p class="card-text">' + company + '</p>' +
                  '</div>' +
                  '</div>';
                return template_cards;
}
var a = document.getElementById("search");
a.addEventListener("submit", function(e) {
  e.preventDefault();
  var b = document.getElementById("search_input").value;
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users"
    }).done(function(data) {
        // Aqui ya tienes la info del input y la info de los usuarios
        // Para filtrar hay un metodo de javascript para los arrays
        // data.filter()
        // dentro del filtro va como una function anonima que lleva dentro otro parametro que corresponde con el objeto que estas analizando
        // como la funcion te devuelve los valores que cumplen con el filtro los puedes almacenar en una variable
        var filteredUsers = data.filter( function (usuario) {
            if (usuario != data) {
                document.getElementById('cards_container').innerHTML = '<i class="far fa-frown fa-2x"></i>' + "<br>" + "User not found";
            }
          return usuario.name === b;
        })       
        filteredUsers.forEach(function(user) {
            var userCard = renderCard (user.name, user.username, user.email, user.company.name);
            document.getElementById('cards_container').innerHTML = " ";
            document.getElementById('cards_container').innerHTML += userCard;
            
        });
        // console.log(filteredUsers);

        // una vez almacenados en la variable ya puedes hacer el loop en la nueva variable para renderizar las tarjetas como hacias antes
      });
});