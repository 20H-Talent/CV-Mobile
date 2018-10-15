 var action = ["play", "eat"];
var pepo = ["pepe", "juan"];
var item = ["latop", "cookin"];

function person(pepo,action,item) {
    
    this.name = pepo;
    this.action = action;
    this.item = item;
    this.print=function (){
        console.log(this.name+this.action+this.item);
    };
    if(this.name=="pepe"){
        console.log(this.name+" "+this.action+" "+this.item)
    }
    
}
function uni(pepo, action, item) {
    var array1 = [];

    for (var i = 0; i < pepo.length; i++) {
        for (var j = 0; j < action.length; j++) {
            for (var k = 0; k < item.length; k++) {
                array1.push(new person(pepo[i], action[j], item[k]))
            }
        }

    };
    return array1;
}
var array1=uni(pepo, action, item);
console.log(array1);

