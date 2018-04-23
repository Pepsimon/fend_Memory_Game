const cards = shuffle([...document.querySelectorAll(".card")]);
const deck = document.querySelector(".deck");

let cardArr = [];
let matchedCards = [];

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", initGame);

let moves = document.querySelectorAll(".moves");
let stars = document.querySelector(".stars");
let starOne = document.querySelectorAll(".star-one");
let starTwo = document.querySelectorAll(".star-two");

let timerEl = document.querySelectorAll(".timer");
let seconds = 0;
let minutes = 0;
let runTimer = setInterval(timer, 1000);

const modal = document.querySelector(".modal");
let playAgain = document.querySelector(".play-again");
let modalOn = false;
playAgain.addEventListener("click", initGame);

function initGame() {
  for (card of cards) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCards);
    card.classList.remove("open", "show", "match");
    deck.appendChild(card);
  }
  if (modalOn) {
    modal.classList.toggle("show-modal");
    modalOn = false;
  }
  for (star of starOne) {
    if (star.style.color = "#000"){
      star.style.color = "#e6e600";
    }
  }
  for (star of starTwo) {
    if (star.style.color = "#000"){
      star.style.color = "#e6e600";
    }
  }
  moves[0].innerHTML = 0;
  restartTimer();
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
    toggleModal();
    moves[1].innerHTML = moves[0].innerHTML;
    timerEl[1].innerHTML = `${minutes}min : ${seconds}sec`;
  }
}

function rating() {
  let movesCount = Number(moves[0].innerHTML);
  if (movesCount > 9) {
    for (star of starOne) {
      star.style.color = "#000";
    }
  }
  if (movesCount > 19) {
    for (star of starTwo) {
      star.style.color = "#000";
    }
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

function restartTimer() {
  seconds = -1;
  minutes = 0;
  clearInterval(runTimer);
  runTimer = setInterval(timer, 1000);
}

function toggleModal() {
  modal.classList.toggle("show-modal");
  modalOn = true;
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
