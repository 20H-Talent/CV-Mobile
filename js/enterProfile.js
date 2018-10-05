$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    contentType: "application/json"
  }).done(function (data){
    var userid = window.location.search;
   
   var filterUser = data.filter(function(user){
     console.log(user.id)
     return user.id == userid[userid.length - 1];
   });

   console.log(filterUser)

  var nameUser = document.querySelector("h2");
  nameUser.innerHTML = filterUser[0].name;

  var username = document.querySelector("#username");
  username.innerHTML = filterUser[0].username;

  var email = document.querySelector("#email");
  email.innerHTML = filterUser[0].email;

  var company = document.querySelector("#company");
  company.innerHTML = filterUser[0].company.name;

  // var city = document.querySelector("#city");
  // city.innerHTML = filterUser[0].city;





  });


