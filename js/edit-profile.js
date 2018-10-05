function edit() {
    var Button = document.getElementById("edit");
    if (Button.className == "w-25 border border-info mt-2 rounded") {
        Button.innerHTML = "Save";
        Button.className += " editing";
        document.querySelectorAll('p').forEach(el => el.setAttribute('contenteditable', true));
    } else {
        document.querySelectorAll('p').forEach(el => { el.setAttribute('contenteditable', false); console.log(el.textContent); });
        Button.className = "w-25 border border-info mt-2 rounded";
        Button.innerHTML = "Edit";
    }
};