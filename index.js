const fs = require('fs');

// Returns the path to the word list which is separated by `\n`
const wordListPath = require('word-list');

const ArrayOfWords = fs.readFileSync(wordListPath, 'utf8').split('\n');

const rand = Math.random()
const randWordIndex = Math.floor(rand * ArrayOfWords.length + 1)
const word = ArrayOfWords[randWordIndex]
let guesses = []
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// play the game
next(word, guesses)


function wrongGuessCount(word, guesses) {
    return guesses.filter(letter => !word.includes(letter)).length
}

function showGuess(word, guesses) {
    const wordArray = Array.from(word) // or word.split('')
    const answerArray = wordArray.map(letter => {
        if (guesses.includes(letter)) {
            return letter
        } else {
            return "_"
        }
    })
    return answerArray.join(' ')
}

function isWinner(word, guesses) {
    const wordArray = Array.from(word)
    const booleanArray = wordArray.map((value) => guesses.includes(value))
    // map (as well as forEach0 takes 3 arguments: element, index and whole array
    return booleanArray.reduce((sum, value) => sum && value)
}

//how can I simplify this function?
function drawHanger(wrongGuesses) {
    switch (wrongGuesses) {
        case 1:
            return "_________\n|   o"
        case 2:
            return "_________\n|   o   |\n|   |   |\n|   |   |"

        case 3:
            return "_________\n|   o   |\n|  /|   |\n|   |   |"

        case 4:
            return "_________\n|   o   |\n|  /|\\  |\n|   |   |"

        case 5:
            return "_________\n|   o   |\n|  /|\\  |\n|   |   |\n|  /    |"

        case 6:
            return "_________\n|   o   |\n|  /|\\  |\n|   |   |\n|  / \\  |\n|_______|"

    }
    for (let i = 0; i <= 6; i++) {

    }
}

function next(word, guesses) {
    if (guesses.length > 0 && wrongGuessCount(word, guesses) > 0) {
        console.log(drawHanger(wrongGuessCount(word, guesses)))
    }
    console.log("The word:")
    console.log(showGuess(word, guesses))
    // check if lost
    if (wrongGuessCount(word, guesses) >= 6) {
        console.log("Player lost") // how can I exit the game?
        return process.exit()
    }
    // check if won
    else if (isWinner(word, guesses)) {
        console.log("Player won")
        return process.exit()
    }
    // ask for the next letter
    else {
        rl.question('next letter? ', answer => {
            console.log('player wrote:', answer)
            const trimmedAnswer = answer.trim()
            const answerLetter = trimmedAnswer[0]
            if (!answerLetter) {
                console.log()
                console.log("Enter a letter!")
                const newGuesses = [...guesses]
                next(word, newGuesses)
            }
            else if (guesses.includes(answerLetter)) {
                console.log()
                console.log("Enter a new letter!")
                const newGuesses = [...guesses]
                next(word, newGuesses)
            }
            else {
                const newGuesses = [...guesses, answerLetter]
                next(word, newGuesses)
            }
            // next(word, newGuesses) ???

        })
    }
}
