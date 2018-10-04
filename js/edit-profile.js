function edit() {
    if (document.getElementById("edit").className == "w-25") {
        document.getElementById("edit").innerHTML = "Guardar";
        document.getElementById("edit").className += " editing";
        document.querySelectorAll('p').forEach(el => el.setAttribute('contenteditable', true));
    } else {
        document.querySelectorAll('p').forEach(el => { el.removeAttribute('contenteditable'); console.log(el.textContent); });
        document.getElementById("edit").className = "w-25";
        document.getElementById("edit").innerHTML = "Edit";
    }
};