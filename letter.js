// Letter constructor function.
var Letter = function(letter) {
    this.letter = letter;
    // Setting initial value of guessed of the letter to false.
    this.isGuessed = false;

    // Get character method for inputting "_" into the console instead of the actual letter.
    this.getCharacter = function() {
        if(!this.isGuessed) {
            return "_";
        } else {
            return this.letter;
        }
    };

    // Letter check method for determining if the guess matches the letter. If it does, then it returns true which will then display the correct guessed letter.
    this.letterCheck = function(guess) {
        if(guess === this.letter) {
            this.isGuessed = true;
        }
    };
};

// Setting the Letter constructor function for export to be used in the Word.js file.
module.exports = Letter;