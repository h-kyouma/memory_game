const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var sec = 0;
var firstClick = false;
var allFlipped = 0;
var refreshIntervalId;

function flipCard() {
    if (firstClick === false) {
        startTimer(); //start the timer
        firstClick = true;
    }

    if (lockBoard) return; //if the board is locked do not flip a goddamn card
    if (this === firstCard) return; //prevent double clicking from blocking the card flip

    this.classList.toggle('flip'); //add class flip to memory-card in html

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else {
        //second click
        secondCard = this;

        //do cards match?
        checkMatch();
    }

    countFlipped();
    if (allFlipped === 12) {
        clearInterval(refreshIntervalId);
    }
}

function startTimer() {
    document.getElementById("seconds").innerHTML = "";
    document.getElementById("minutes").innerHTML = "";

    refreshIntervalId = setInterval(function () {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
}

function pad(val) {
    if (val > 9) {
        return val;
    }
    else {
        return ("0" + val)
    }
}

function checkMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //match
        disableCards();
    }
    else {
        //not a match
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip'); //remove class flip from memory-card
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function countFlipped() {
    var flippedCards = 0;
    cards_instance = document.querySelectorAll('.memory-card')
    for (var i = 0; i < cards_instance.length; i++) {
        if (cards_instance[i].classList.contains("flip")) {
            flippedCards++;
        }
    }
    allFlipped = flippedCards;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12) //generate a random integer between 0 an 11
        card.style.order = randomPos;
    });
})(); //extra parentheses == immediately invoked function expression (executed right after definition)

cards.forEach(card => card.addEventListener('click', flipCard));