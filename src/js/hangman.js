class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else if (this.status === 'finished') {
            return `Great work! You guessed the word.`
        }
    }
    get puzzle() {
        let puzzle = ''
    
        this.word.forEach((letter) => {
            if(this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
    
        return puzzle
    }
    calculateStatus() {
        const finished = this.word.every((letter) => {
            return this.guessedLetters.includes(letter) || letter === ' '
        })
    
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    makeGuess(guess) {
        if (this.status !== 'playing') {
            return
        }
        
        guess = guess.toLowerCase()
        const isUniqueGuess = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
        if (isUniqueGuess) {
            this.guessedLetters.push(guess)
        }
        if (isUniqueGuess && isBadGuess) {
            this.remainingGuesses--
        }

        this.calculateStatus()
    }
}

export { Hangman as default }