// Grabbing the Letter consctuctor function from the letter.js file.
var Letter = require("./letter.js");

// Word Constructor function.
var Word = function(word) {
    this.word = word;
    //empty array to store letters.
    this.letters = [];

    // Make letter method to split the chosen word into its individual letters. Using for loop to iterate over each letter of the word and join them in the letters array.
    this.makeLetters = function() {
        var wordArray = this.word.split("");
        for(var i = 0; i < wordArray.length; i++) {
            var newLetter = new Letter(wordArray[i]);
            this.letters.push(newLetter);
        };
    };

    // Make guess method that runs over the letters array to see if the chosen letter exists in the array. 
    this.userGuess = function(guess) {
        this.letters.forEach(letter => {
            letter.letterCheck(guess);
        });
    };

    // Update method that updates the characters on the console.
    this.update = function() {
        var printedWord = "";
        this.letters.forEach(letter => {
            printedWord += letter.getCharacter() + " ";
        });
        return printedWord;
    };
};

// Setting the Word constructor function for export to be used in the index.js file.
module.exports = Word;