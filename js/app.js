const cards = shuffle([...document.querySelectorAll(".card")]);
const deck = document.querySelector(".deck");

let cardArr = [];
let matchedCards = [];

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", restartTimer);

let moves = document.querySelectorAll(".moves");
let stars = document.querySelector(".stars");
let starOne = document.querySelector(".star-one");
let starTwo = document.querySelector(".star-two");

let timerEl = document.querySelectorAll(".timer");
let seconds = 0;
let minutes = 0;
let runTimer = setInterval(timer, 1000);

const modal = document.querySelector(".modal");
let playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", initGame);
playAgain.addEventListener("click", restartTimer);

function restartTimer() {
  seconds = -1;
  minutes = 0;
  clearInterval(runTimer);
  runTimer = setInterval(timer, 1000);
}

function initGame() {
  for (card of cards) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCards);
    card.classList.remove("open", "show", "match");
    deck.appendChild(card);
  }
  moves[0].innerHTML = 0;
}

function displayCard() {
  this.classList.add("open", "show");
}

function openCards() {
  cardArr.push(this);
  if (cardArr.length === 2) {
    if (cardArr[0].isEqualNode(cardArr[1])) {
      matched();
      moves[0].innerHTML++;
      rating();
    } else {
      setTimeout(unMatched, 1000);
      moves[0].innerHTML++;
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

function unMatched() {
  for (card of cardArr) {
    card.classList.toggle("open");
    card.classList.toggle("show");
  }
  cardArr = [];
}

function finish() {
  if (matchedCards.length === 16) {
    clearInterval(runTimer);
    modal.classList.add("show-modal");
    moves[1].innerHTML = moves[0].innerHTML;
    timerEl[2].innerHTML = `${minutes}min : ${seconds}sec`;
  }
}

function rating() {
  let movesCount = Number(moves[0].innerHTML);
  if (movesCount > 9) {
    starOne.style.color = "#000";
  }
  if (movesCount > 19) {
    starTwo.style.color = "#000";
  }
}

function timer() {
  seconds++
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerEl[0].innerHTML = `${minutes}min : ${seconds}sec`;
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

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
