function  edit(){
    if(document.getElementById("edit").className == "w-25"){
        document.getElementById("edit").innerHTML = "Guardar";
        document.getElementById("edit").className += " editing";
    }else{
        document.getElementById("edit").className = "w-25";
        document.getElementById("edit").innerHTML = "Edit";
        
        
    }
}