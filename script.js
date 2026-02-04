const greekLetters = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ'];
let cards = [...greekLetters, ...greekLetters];
let score = 100;
let flippedCards = [];
let matched = 0;

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
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.innerText = this.dataset.letter;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.letter === card2.dataset.letter) {
        matched += 1;
        flippedCards = [];
        if (matched === greekLetters.length) {
            alert("You won!");
        }
    } else {
        score -= 4;
        scoreDisplay.innerText = score;

        setTimeout(() => {
            card1.innerText = "";
            card2.innerText = "";
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 800);

        if (score <= 0) {
            alert("Game Over!");
        }
    }
}
