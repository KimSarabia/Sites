var wordlist = [],
        targetWord = '',
        guesses = [],
        maxLives = 6;


function setImage(number) {
    $('#hangman_img').removeAttr("class").addClass("image" + number);
}


function loadWordlist() {
    var word = ''; 
    var data = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon",
"Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod",
"Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto",
"Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
"Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina",
"Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable",
"Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
"Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth",
"Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey",
"Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath",
"Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout",
"Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler",
"Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton",
"Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk",
"Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
"Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
"Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
"Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
"Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr.Mime",
"Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp",
"Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon",
"Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl",
"Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair",
"Dragonite", "Mewtwo", "Mew"];
        for (word in data) {
            wordlist.push(data[word]);
    }
}

/*
function loadWordlist() {
    var word = '';
    $.ajax({
        url: 'assets/wordlist.json',
        async: false
    }).done(function(data) {
        for (word in data) {
            wordlist.push(data[word]);
        }
    }, 'json');
}
*/


function newWord() {
    targetWord = wordlist[Math.floor(Math.random() * wordlist.length)];
}

function hideWord() {
    var hdWord = '';

    for (var i = 0; i < targetWord.length; i++) {
        if (guesses.indexOf(targetWord[i].toLowerCase(), 0) == -1) {
            hdWord += ' _ ';
        } else {
            hdWord += targetWord[i];
        }
    }
    return hdWord;
}

function drawWord() {
    while (targetWord == '') {
        newWord();
    }
    $('#targetWord').html(hideWord());
}

function drawGuesses() {
    guesses.sort();
    $('#previousGuesses').html(guesses.join(', '));
}

function cleanGuess() {
    var uniqueGuesses = [];
    $.each(guesses, function(index, element) {
        if (element.length > 0 && $.inArray(element, uniqueGuesses) == -1) {
            uniqueGuesses.push(element);
            //FUNCTION TO FLASH ALL ELEMENTS IF PLAYER PRESS KEY FOR CHARACTER ALREADY USED
        } else {
            $("*").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
            }
    });
    guesses = uniqueGuesses;
}


function addGuess() {
    if (/^[a-zA-Z]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
        guesses.push($('#guess').val().toLowerCase());
    }

    $('#guess').val('');
}

function endGameDialog(isWinner) {
    if (isWinner) {
        $('#endGameDialogTitle').html('You won');
        $('#endGameDialogContent').html('You guessed ' + targetWord + ' in ' + guesses.length + ' attempts');
    } else {
        $('#endGameDialogTitle').html('You lost');
        $('#endGameDialogContent').html('Unlucky.  The word was ' + targetWord);
    }

    $('#endGameDialog').modal('toggle');
}

function reviewLives() {
    var livesRemaining = maxLives,
            string = targetWord.toLowerCase();

    for (var i = 0; i < guesses.length; i++) {
        if (string.indexOf(guesses[i], 0) == -1) {
            livesRemaining--;
        }
    }

    if (livesRemaining <= 0) {
        setImage(0);
        endGameDialog(false);
        return;
    }

    setImage(maxLives - livesRemaining);
}

function checkIfWon() {
    if (hideWord() == targetWord) {
        endGameDialog(true);
        $('h1').addClass('animated hinge');

    }
}

function resetGame() {
    setImage(0);
    targetWord = '';
    guesses = [];
    newWord();
}

function update() {
    addGuess();
    cleanGuess();
    drawWord();
    drawGuesses();
    reviewLives();
    checkIfWon();
}

$(document).ready(function() {
    loadWordlist();
    drawWord();
    drawGuesses();
    $('#guess').attr('onkeyup', 'update();');
});