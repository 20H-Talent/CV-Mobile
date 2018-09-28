var a = document.getElementById('search');

a.addEventListener('submit', function (e) {
    e.preventDefault();
    var b = document.getElementById('search_input').value;
    console.log(b);
});