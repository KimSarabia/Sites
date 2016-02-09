/*
Takes the words array and then returns a random element of the array. 
The returned output should be a string. 
Make the random number an integer. 
Use words.length to keep the random number between 0 and length of the array.
*/

var words = ['cat', 'tree', 'swing', 'around', 'scientist'];

var chooseWord = function() {
    var randomWord = words[Math.floor(Math.random()*words.length)];
    return randomWord;
    
};

/*Create a way to hold the player's answer. In the beginning of a hangman game after the word is chosen you show the player how many letters are in the word by giving a sequence of blanks. Usually this is drawn on a piece of paper, but in our case we are going to be using JavaScript to do it. Right now though we have a particular problem: How do we hold the answer?

In this example, we are going to describe a function where a string argument is passed in and returns a new string with each letter of the original string replaced with a '_'.

In the function blanksFromAnswer write a loop that concatenates a '_' to result for every letter in the string answerWord.
*/

// Fill in this function!
var blanksfromAnswer = function() {
    
    var result = ""; // This is the variable we want to use
    for(var i = 0; i < chooseWord.length; i++){
      result += "_";
    }
    // Write a loop here to concatanate a '_' to result for
    // every letter in answerWord.
    

    return result;
};

/*So we are going to start by writing a function called alterAt() and through a combination of .substr() and string concatenation return a new string with a letter replaced.*/

function alterAt ( n, c, originalString ) {
    return originalString.substr(0,n) + c + originalString.substr(n+1,originalString.length);
}

function guessLetter( letter, shown, answer ) {
    var checkLetter = -1;  // This variable will hold the indexOf()

    checkLetter = answer.indexOf(letter); // Single Argument Version starting at 0
    while ( checkLetter >= 0 ) {
        // Replace the letter in shown with alterAt() and then store in shown.
        shown = alterAt(checkLetter, letter, shown);
        // Use indexOf() again and store in checkLetter
        checkLetter = answer.indexOf(letter, ++checkLetter);
    }

    // Return our string, modified or not
    return shown;
}

