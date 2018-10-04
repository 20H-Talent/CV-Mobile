

var inputname = document.getElementById("person").value;
var pname = document.getElementById("name");

function edit() {
    if (document.getElementById("edit").className == "w-25") {
        document.getElementById("edit").innerHTML = "Guardar";
        document.getElementById("edit").className += " editing";
        var i;
        var input = document.getElementsByName("rellenar");
        for (i = 0; 1 < input.length; i++) {
            document.getElementsByName("rellenar")[i].className = " ";
            document.getElementsByName("info")[i].className = "d-none"
        };
    } else {

        var inputname = document.getElementById("person").value;
        var pname = document.getElementById("name");

        var pimail = document.getElementById("info-imail");
        var inputimail = document.getElementById("email").value;

        var pwork = document.getElementById("info-work");
        var inputwork = document.getElementById("work").value;

        var plocation = document.getElementById("info-location");
        var inputlocation = document.getElementById("location_city").value;

        if (inputname.trim() == "") {
        } else {
            pname.innerHTML = inputname
        };
        if (inputimail.trim() == "") {
        } else {
            pimail.innerHTML = inputimail
        };
        if (inputwork.trim() == "") {
        } else {
            pwork.innerHTML = inputwork
        };
        if (inputlocation.trim() == "") {
        } else {
            plocation.innerHTML = inputlocation
        };
        document.getElementById("edit").className = "w-25";
        document.getElementById("edit").innerHTML = "Edit";
        var i;
        var input = document.getElementsByName("rellenar");
        for (i = 0; 1 < input.length; i++) {
            document.getElementsByName("rellenar")[i].className = "d-none";
            document.getElementsByName("info")[i].className = " "
        };



    }
}