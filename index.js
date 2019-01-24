// Grabbing the inquirer package.
var inquirer = require ("inquirer");
// Grabbing the word constructor file.
var Word = require ("./word.js");

// Word bank for the game.
var wordBank = ["zues", "athena", "ares", "poseidon", "apollo", "artemis", "hades", "nike", "hera", "demeter", "hermes", "hypnos"];

// Global Variables
var guessesLeft;
var pickedWords;
var word;
var pickedWord;

console.log("\n--------------------------------------------------------------------------------------------------------------------------------------------\n" +
    "\nLet's see how well you know your Greek mythology!. Guess the name of the Greek god/godess. Hope you paid attention in history class! \n" +
    "\n--------------------------------------------------------------------------------------------------------------------------------------------\n");

// Start game function.
function start() {
    // Setting an empty array for words that were already chosen.
    pickedWords = [];
    startGame();
};

// Function to play the actual game.
function startGame() {
    // Initial Settings.
    pickedWord = "";
    guessesLeft = 15;
    if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
    } else {
    // If there are no more words in the word bank, the game will display the win condition.
    console.log("You definitely know your Greek mythology. Great job!");
    continuePrompt();
    } // If there are still words left in the wordk bank the game will pick a new Word.
    if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    userGuess();
    }
};

// Function to randomly pick a word from the word bank.
function getWord() {
    var randomizer = Math.floor(Math.random() * wordBank.length);
    var randomWord = wordBank[randomizer];
    if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
    } else {
    return getWord();
    }
};

// Game logic.
function userGuess() {
    var checker = [];
    // Using Inquirer to display information regarding the game and the word itself.
    inquirer.prompt([
    {
        name: "guessedLetter",
        message: "\nGuess a letter! You have " + guessesLeft + " guesses left!" +
        "\n" + word.update()
    }
    ])
    .then(answer => {
    word.letters.forEach(letter => {
        letter.letterCheck(answer.guessedLetter);
        checker.push(letter.getCharacter());
    });
    // if you run out of guesses.
    if(guessesLeft > 0 && checker.indexOf("_") !== -1) {
        guessesLeft--;
        if(guessesLeft === 0) {
        console.log("\n------------------------------------------------" +
        "\nSorry, you ran out of guesses!\n" +
        "\nThe correct answer was " + pickedWord +
        "\n------------------------------------------------\n");
        continuePrompt();
        } else {
        userGuess();
        }
        // If you got the word correctly.
    } else {
        console.log("\n------------------------------------------------\n" + 
        "\nNice job!\n" +
        "\n------------------------------------------------\n");
        word.update();
        startGame();
    }
    });
}

// Using inquirer to determine if user wants to continue to play or exit the game.
function continuePrompt() {
    inquirer.prompt([
        {
        name: "continue",
        type: "list",
        message: "Would you like to try again?",
        choices: ["Yes", "No"]
        }
    ])
    .then(answer => {
        if(answer.continue === "Yes") {
        start();
        } else {
        console.log("Thanks for playing!");
        }
    });
}

// Callback for start function.
start();