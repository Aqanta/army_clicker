/**
 * Created by OrangeJedi on 1/18/2017.
 */
//Variable that holds the game data
var game = {"land" : 100};
//function to start the game
function start(){
    showGame();
}
//function to update the game
function tick(){

}
//calls the tick function every second
setInterval(tick(),1000);
//function that control the screen
function showGame(){
    $('#screen').text("You started the game. Good Job!");
}
