function edit() {
    var Button = document.getElementById("edit");
    if (!Button.className.includes('editing')) {
        Button.innerHTML = "Save";
        Button.classList.add('editing');
        document.querySelectorAll('p').forEach(el => el.setAttribute('contenteditable', true));
        document.querySelector('h2').setAttribute('contenteditable', true);
    } else {
        document.querySelectorAll('p').forEach(el => { el.setAttribute('contenteditable', false); console.log(el.textContent); });
        document.querySelector('h2').setAttribute('contenteditable', false);
        Button.classList.remove('editing');
        Button.innerHTML = "Edit";
    }
};