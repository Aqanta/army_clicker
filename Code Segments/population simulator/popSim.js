/**
 * Created by OrangeJedi on 2/20/2017.
 */
var pop = [];
function start() {
    pop.push(new PopSeg(0,100));
    printOut();
    setTimeout(tick,1000);
}
function tick(){
    for(var i = 0;i < pop.length;i++){
        pop[i].age++;
    }

    printOut();
    setTimeout(tick,1000);
}
function printOut(){
    $('#output').text(pop[0].age);
}
function PopSeg(age,size){
    this.age = age;
    this.size = size;
    /*this.male = size * Math.floor((Math.random() * .1) + .45);
    this.female = size - male;
    this.edu = 0;*/
}