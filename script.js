const greekLetters = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ'];
let cards = [...greekLetters, ...greekLetters];

let score = 100;
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

cards.sort(() => 0.5 - Math.random());

const board = document.getElementById('board');
const scoreDisplay = document.getElementById('score');

cards.forEach(letter => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;
    card.innerText = "";
    card.addEventListener('click', flipCard);
    board.appendChild(card);
});

function flipCard() {
    if (lockBoard || this.classList.contains('matched') || flippedCards.includes(this)) return;

    this.innerText = this.dataset.letter;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.letter === card2.dataset.letter) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        resetTurn();

        if (matchedPairs === greekLetters.length) {
            setTimeout(() => alert("You won the game!"), 300);
        }
    } else {
        score -= 4;
        scoreDisplay.innerText = score;

        setTimeout(() => {
            card1.innerText = "";
            card2.innerText = "";
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetTurn();
        }, 800);

        if (score <= 0) {
            setTimeout(() => alert("Game Over!"), 300);
        }
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}
