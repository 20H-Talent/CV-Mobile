// document.getElementById("btn").addEventListener("click", function() {
//     $.ajax({
//       url: "https://jsonplaceholder.typicode.com/users"
//     }).done(function(data) {

// });
// });
var a = document.getElementById('search');
<<<<<<< HEAD

a.addEventListener('submit', function (e) {
    e.preventDefault();
    var b = document.getElementById('search_input').value;
    console.log(b);
});
||||||| merged common ancestors
a.addEventListener('submit',function(e) {
    e.preventDefault();
    var b = document.getElementById('search_input').value;
    window.location.href = '../index.html'+b;

});
=======
a.addEventListener('submit',function(e) {
// var b = document.getElementById('search_input').value;
// var myElement = document.getElementById("cards_container");
});

// function searchUsers (data, input) {
//     if (b = myElement) {

//         console.log("Found user");
//     }
// }

// function myFunction() {
    // var x = document.forms["search"];
    // var text = ""
    // var i;
    // for (i = 0; i < x.length ;i++) {
    //     text += x.elements[i].value + "<br>"
>>>>>>> ba23b8d029b4f5441203110f036484d48574d2d5
