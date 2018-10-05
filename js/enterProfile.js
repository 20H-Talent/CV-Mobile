$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    contentType: "application/json"
  }).done(function (data){
    console.log(data)
  })

  // var cards_profile = (
  //   '<h5 class="card-title"><b>' + Leanne Graham + '</b></h5>' +
  //   '<p class="card-text">Username: <b>' + Bret + '</b></p>' +
  //   '<p class="card-text">Email: <b>' + Sincere@april.biz + '</b></p>' +
  //   '<p class="card-text">city: <b>' + Gwenborough + '</b></p>' +
  //   // window.location.search console.log index=3
  //   // var x = document.getElementById("myList").innerHTML;

  // );