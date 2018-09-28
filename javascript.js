
//Mueve el menu para la dereche y quita el buton de esta funcion y pone el otro 
function Desplegar(){
document.getElementById("play").style.marginLeft = "0";
document.getElementById("linerplay").style.display= "none";
document.getElementById("lineroff").style.display= "block";
};
//Mueve el menu a su inicio y quita el buton de esta funcion y pone el otro 
  function Quitar(){
    document.getElementById("play").style.marginLeft = "-85%"
    document.getElementById("linerplay").style.display= "block"
    document.getElementById("lineroff").style.display= "none"



};

$('[data-toggle="slide-collapse"]').on('click', function() {
  $navMenuCont = $($(this).data('target'));
  $navMenuCont.animate({
    'width': 'toggle'
  }, 350);
  $(".menu-overlay").fadeIn(500);

});
$(".menu-overlay").click(function(event) {
  $(".navbar-toggle").trigger("click");
  $(".menu-overlay").fadeOut(500);
});





