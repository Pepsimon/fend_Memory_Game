

const cards = shuffle([...document.querySelectorAll(".card")]);
const deck = document.querySelector(".deck");

let cardArr = [];
let matchedCards = [];

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", initGame);

let moves = document.querySelector(".moves");
let stars = document.querySelector(".stars");
let starOne = document.querySelector(".star-one");
let starTwo = document.querySelector(".star-two");

let timerEl = document.querySelector(".timer");
let seconds = 00;
let minutes = 00;

function initGame() {
  for (card of cards) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCards);
    card.classList.remove("open", "show", "match");
    deck.appendChild(card);
  }
  moves.innerHTML = 0;
  setInterval(timer, 1000);
}

function displayCard() {
  this.classList.add("open", "show");
}

function openCards() {
  cardArr.push(this);
  if (cardArr.length === 2) {
    if (cardArr[0].isEqualNode(cardArr[1])) {
      matched();
      moves.innerHTML ++;
      rating();
    } else {
      setTimeout(unMatched, 1000);
      moves.innerHTML ++;
      rating();
    }
  }
  console.log(cardArr);
}

function matched() {
  for (card of cardArr) {
    card.classList.add("match");
    matchedCards.push(card);
    cardArr = [];
  }
  setTimeout(finish, 1000);
}

function unMatched () {
  for (card of cardArr) {
    card.classList.toggle("open");
    card.classList.toggle("show");
  }
  cardArr = [];
}

function finish() {
  if (matchedCards.length === 16 ) {
    alert("YOU WON!");
  }
}

function rating() {
  let movesCount = Number(moves.innerHTML);
  if (movesCount > 9) {
    starOne.style.color = "#000";
  }
  if (movesCount > 19) {
    starTwo.style.color = "#000";
  }
}

function timer() {
  seconds ++
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerEl.innerHTML = `${minutes}min : ${seconds}sec`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

initGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
