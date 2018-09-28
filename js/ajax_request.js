  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users"
  }).done(function(data) {

        //Este for hace que empiece por la posición 0. Luego dice que el número de elementos tiene que ser menor que la longitud del string - 1. Después, una vez que se halla hecho la función, añadir otra tarjeta
    for (let i = 0; i < data.length - 1; i ++){

        //La variable cards lo que hace es darle valores a los parámetros de la función renderCard. Estos datos son los que están en la función con parámetros dara
       var cards = renderCard(data[i].name, data[i].username,  data[i].email, data[i].company.name);
       console.log(cards);

       //Esta variable lo que hace es editar el contenido de cards_container
       var currentCardContainer = document.getElementById('cards_container').innerHTML;
       currentCardContainer +=  cards; //Se suma currentCardContainer más cards (el que estaba más los nuevos)
        document.getElementById('cards_container').innerHTML = currentCardContainer;
    }
});

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

// var html = "";
// json.forEach(function(val) {
//   html += "<div class = 'user_card'>";
//   keys.forEach(function(key) {
//     html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
//   });
//   html += "</div><br>";
// });
