// Variables for holding cards (shuffled and spread into an array) and deck
const cards = [...document.querySelectorAll(".card")];
const deck = document.querySelector(".deck");

// Variables for holding cards that have been opened and cards that matches
let cardArr = [];
let matchedCards = [];

// Variable and eventListener for the restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", initGame);

// Score-panel varibles
let moves = document.querySelectorAll(".moves");
let stars = document.querySelector(".stars");
let starOne = document.querySelectorAll(".star-one");
let starTwo = document.querySelectorAll(".star-two");

// Variables for the timer
let timerEl = document.querySelectorAll(".timer");
let seconds = 0;
let minutes = 0;
let runTimer;
// Flag for starting timer on first "click"
let clicked = false;

// Varibles for the modal and the play again button
const modal = document.querySelector(".modal");
let playAgain = document.querySelector(".play-again");
let modalOn = false;
playAgain.addEventListener("click", initGame);

let body = document.querySelector("body");

/**
 * @description Initial function to run when the script loads
 * Will set eventListeners on the cards then append the shuffled cards to the deck
 * Will check if the modal is up, and if so toggle it
 * Will check the stars for color changes and set them back to normal
 * Resets the moves and restarts the timer
 */
function initGame() {
  for (card of shuffle(cards)) {
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
  cardArr = [];
  clicked = false;
  restartTimer();
}

/**
 * @description Adds classes for displaying the cards
 */
function displayCard() {
  this.classList.add("open", "show");
}

/**
 * @description Pushes open cards into an array and checks to see if they match or not
 * Runs the matched function if matched or the unmatched funtion otherwise
 * Increments the move counter
 */
function openCards() {
  cardArr.push(this);
  if (cardArr.length === 2) {
    body.style["pointer-events"] = "none";
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
  if (clicked === false) {
    runTimer = setInterval(timer, 1000);
    clicked = true;
  }
}

/**
 * @description Adds a match class to the matched cards
 * Pushes matched cards into an array
 * Resets the card array
 */
function matched() {
  for (card of cardArr) {
    card.classList.add("match");
    matchedCards.push(card);
    cardArr = [];
  }
  body.style["pointer-events"] = "all";
  setTimeout(finish, 1000);
}

/**
 * @description Removes classes showing cards if they dont match
 */
function unMatched() {
  for (card of cardArr) {
    card.classList.toggle("open");
    card.classList.toggle("show");
  }
  body.style["pointer-events"] = "all";
  cardArr = [];
}

/**
 * @description Will stop timer and add html to the modal and show it to the player when matchedCards array has all the cards
 */
function finish() {
  if (matchedCards.length === 16) {
    clearInterval(runTimer);
    toggleModal();
    moves[1].innerHTML = moves[0].innerHTML;
    timerEl[1].innerHTML = `${minutes}min : ${seconds}sec`;
    matchedCards = [];
  }
}

/**
 * @description Change the color of the stars as the moves counter goes above a set number
 */
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

/**
 * @description Simple timer counting seconds and minutes
 */
function timer() {
  seconds++
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerEl[0].innerHTML = `${minutes}min : ${seconds}sec`;
}

/**
 * @description Restarts the timer
 */
function restartTimer() {
  seconds = 0;
  minutes = 0;
  clearInterval(runTimer);
  timerEl[0].innerHTML = `${minutes}min : ${seconds}sec`;
}

/**
 * @description Toggles showing the modal
 */
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
