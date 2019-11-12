function wrongGuessCount(word, guesses) {
    return guesses.filter(letter => !word.includes(letter)).length
}

// console.log('wrong guesses: ', wrongGuessCount('hello', ['e', 'd', 'x', 'o']), 'should be:', 2)

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
// console.log('show guess 1:', showGuess('hello', ['l']), 'should be:', '_ _ l l _')
// console.log('show guess 2:', showGuess('hello', ['l', 'a', 'e']), 'should be:', '_ e l l _')

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

// console.log('winner 1:', isWinner('hello', ['e', 'x']), 'should be:', false)
// console.log('winner 2:', isWinner('hello', ['o', 'l', 'e', 'h']), 'should be:', true)

const word = "love"
let guesses = []
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function next(word, guesses) {
    if (guesses.length > 0 && wrongGuessCount(word, guesses) > 0) {
        console.log(drawHanger(wrongGuessCount(word, guesses)))
    }
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
next(word, guesses)