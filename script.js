let players = 1;
let level = 'easy';

let score = 100;
let currentPlayer = 1;
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

const allLetters = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ'];

function setPlayers(p){ players = p; }
function setLevel(l){ level = l; }

function startGame(){
    document.getElementById('menu').style.display="none";
    document.getElementById('game').style.display="block";
    initBoard();
}

function getLettersByLevel(){
    if(level==='easy') return allLetters.slice(0,8);
    if(level==='medium') return allLetters.slice(0,12);
    return allLetters.slice(0,18);
}

function initBoard(){
    const letters = getLettersByLevel();
    const cards = [...letters, ...letters].sort(()=>0.5-Math.random());

    const board = document.getElementById('board');
    board.innerHTML="";
    board.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 80px)`;

    cards.forEach(letter=>{
        const card = document.createElement('div');
        card.className="card";
        card.dataset.letter=letter;
        card.onclick=flipCard;
        board.appendChild(card);
    });

    updateTurnText();
}

function updateTurnText(){
    document.getElementById('turnText').innerText =
        players===2 ? `Player ${currentPlayer} Turn` : "Solo Player";
}

function flipCard(){
    if(lockBoard || this.classList.contains('matched') || flippedCards.includes(this)) return;

    this.innerText=this.dataset.letter;
    this.classList.add('flipped');
    flippedCards.push(this);

    if(flippedCards.length===2){
        lockBoard=true;
        checkMatch();
    }
}

function checkMatch(){
    const [c1,c2]=flippedCards;

    if(c1.dataset.letter===c2.dataset.letter){
        c1.classList.add('matched');
        c2.classList.add('matched');
        matchedPairs++;
        resetTurn();
    }else{
        score-=4;
        document.getElementById('score').innerText=score;

        setTimeout(()=>{
            c1.innerText="";
            c2.innerText="";
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');

            if(players===2){
                currentPlayer = currentPlayer===1?2:1;
                updateTurnText();
            }

            resetTurn();
        },800);
    }

    if(score<=0) setTimeout(()=>alert("Game Over"),300);
}

function resetTurn(){
    flippedCards=[];
    lockBoard=false;
}
