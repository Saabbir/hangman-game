import Hangman from './hangman'
import getPuzzle from './requests'

let game1
const puzzleEl  = document.querySelector('#puzzle')
const statusEl  = document.querySelector('#status')
const resetEl   = document.querySelector('#reset')

const render = () => {
    puzzleEl.innerHTML = ''
    statusEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const spanEl = document.createElement('span')
        spanEl.textContent = letter
        puzzleEl.appendChild(spanEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle(2)
    game1 = new Hangman(puzzle, 5)
    render()
}

startGame()

resetEl.addEventListener('click', startGame)

window.addEventListener('keypress', e => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})