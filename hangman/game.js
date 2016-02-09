// You don't need to touch these. Skip down to doKeypress()
var gameAnswer = "";
var gameShownAnswer = "";
var hangmanState = "";
function resetGame () {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    hangmanState = 0;
    drawWord(gameShownAnswer);    
}
$(document).ready(resetGame);
function win () { alert('You win!');  resetGame() ;}
function lose () { alert('Oh no, you lose!'); resetGame(); }

//
/// Start working here!
function doKeypress () {
    var tempChar = $('#letter-input').val().toLowerCase();
    var tempString = "";
    $('#letter-input').val("");
    
}

// You shouldn't have to touch this!
$('#letter-input').keypress( doKeypress );