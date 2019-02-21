const availableCards = ['bomb', 'paper-plane-o', 'diamond', 'repeat', 'anchor', 'bolt', 'cube', 'leaf'];
let matchedMaxCards = 0;
let selectedCard;
let matchedCards = 0;
let cardEvaluationRuning = false;
let moves = 0;
let timerCounter = 0;
let timerInterval;
const timerDisplay = document.querySelector('.timeDisplay');
const movesDisplay = document.querySelector('.moves');
const winContainer = document.querySelector('.win-container');
const scorePanel = document.querySelector('.score-panel');
const deck = document.querySelector('.deck');

/**
 * @description sets up a new gamebord
 */
function buildBoard() {
  selectedCard = undefined;
  timerCounter =0;
  timerDisplay.innerHTML = '00:00';
  clearInterval(timerInterval);
  timer();
  addToMoves(true);
  setStarRanking();
  var cardList = shuffle(availableCards.concat(availableCards));
  const fragmentCardBord = document.createDocumentFragment();
  for (let card of cardList) {
    fragmentCardBord.appendChild(cardTemplate(card));
  }
  matchedMaxCards = cardList.length;
  deck.innerHTML = '';
  deck.appendChild(fragmentCardBord);
  deck.classList.remove('hide');
  scorePanel.classList.remove('hide');
  winContainer.classList.add('hide');
  if (!winContainer.classList.contains('hide')) {
    winContainer.classList.add('hide');
  }
}

/**
 * @description Starts the timer for a game
 **/
function timer() {
  timerInterval = setInterval(function() {
    timerCounter += 1;
    let minutes = Math.floor(timerCounter / 60);
    let seconds = timerCounter % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    timerDisplay.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

/**
 * @description returns the html template for a card
 * @param  cardId - id Of the card
 * @return htmlElemt for a card element
 **/
function cardTemplate(cardId) {
  const li = document.createElement('li');
  li.className = 'card';
  li.setAttribute('data-cardid', cardId);
  const i = document.createElement('i');
  i.className = `fa fa-${cardId}`;
  li.appendChild(i);
  return li;
}

/**
 * @description schuffels an arry
 * @param  array - array of objects
 * @return unsortet arry of objects
 * form: Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  var currentIndex = array.length,
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

/**
 * @description evaluates the card click event and initiates the necessary validations and actions
 * @param  element - event element
 */
function turnCardClickEvent(elemet) {
  let card = elemet.target;
  let cardElemet = card.classList.contains('card') ? card : card.parentNode;
  if (cardElemet.className === 'card' && !cardEvaluationRuning) {
    cardEvaluationRuning = true;
    turnCard(cardElemet);
    if (selectedCard != undefined) {
      if (selectedCard.dataset.cardid === cardElemet.dataset.cardid) {
        setTimeout(function() {
          cardMatchAnimation(cardElemet);
        }, 1000);
      } else {
        setTimeout(function() {
          cardNoMatchAnimation(cardElemet);
        }, 1000);
      }
    } else {
      selectedCard = cardElemet;
      cardEvaluationRuning = false;
    }
  }
}

/**
 * @description  Handels the Animation for a matching Cardpair
 * @param cardElemet - Card Element
 */
function cardMatchAnimation(cardElemet) {
  selectedCard.classList.toggle('match');
  cardElemet.classList.toggle('match');
  selectedCard = undefined;
  cardEvaluationRuning = false;
  matchedCards += 2;
  addToMoves(false);
  setStarRanking();
  if (matchedCards >= matchedMaxCards) {
    clearInterval(timerInterval);
    animationGameWon();
  }
}

/**
 * @description  Handels the Animation for a not matching Cardpair
 * @param cardElemet - Card Element
 */
function cardNoMatchAnimation(cardElemet) {

  cardElemet.classList.add('unMatch');
  selectedCard.classList.add('unMatch');
  setTimeout(function() {
    turnCard(cardElemet);
    turnCard(selectedCard);
    selectedCard = undefined;
    cardEvaluationRuning = false;
    addToMoves(false);
    setStarRanking();
  }, 1500);
}

/**
 * @description  Handels the Animation that appiers on Winning a game
 * @param card - Card Element
 */
function animationGameWon() {
  var newStars = document.querySelector('.stars').cloneNode(true);
  newStars.classList.add('win-stars');
  var oldStars = winContainer.querySelector('.stars');
  winContainer.replaceChild(newStars, oldStars);
  document.querySelector('.finalMove').innerHTML = movesDisplay.innerHTML;
  document.querySelector('.finalTime').innerHTML = timerDisplay.innerHTML;
  scorePanel.classList.add('hide');
  deck.classList.toggle('hide');
  winContainer.classList.toggle('hide');
}

/**
 * @description  Counts the gamemoves and displays them also
 * @param {bool} reset - resets the  move value to 0 when true
 */
function addToMoves(reset) {
  if (reset) {
    moves = 0;
  } else {
    moves += 1;
  }
  movesDisplay.textContent = moves;
}

/**
 * @description  Counts the gamemoves and displays them also
 */
function setStarRanking() {
  var stars = document.querySelector('.stars').querySelectorAll('.fa');

  let starCount = 3;
  if (moves < 16) {
    stars[0].className = 'fa fa-star';
    stars[1].className = 'fa fa-star';
    stars[2].className = 'fa fa-star';
  } else if (moves < 23) {
    stars[0].className = 'fa fa-star';
    stars[1].className = 'fa fa-star';
    stars[2].className = 'fa fa-star-o';
  } else if (moves < 30) {
    stars[0].className = 'fa fa-star';
    stars[1].className = 'fa fa-star-o';
    stars[2].className = 'fa fa-star-o';
  } else {
    stars[0].className = 'fa fa-star-o';
    stars[1].className = 'fa fa-star-o';
    stars[2].className = 'fa fa-star-o';
  }
}

/**
 * @description  Handels the visual turning of the card
 * @param card - Card Element
 */
function turnCard(card) {
  card.classList.toggle('show');
  card.classList.toggle('open');
  card.classList.remove('unMatch');
}

/**
 * @description  adds eventlistener to the reset buttons
 * @param buttons - html Button elements
 */
function setResetGameEvent(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', buildBoard, true);
  }
  document.addEventListener("keydown", function(){ shortcutReset(event);  });
}

/**
 * @description  resets bord with a keybrod shortcut
 */
function shortcutReset(event) {
  if (!cardEvaluationRuning && event.key.toLowerCase() === 'r') {
    buildBoard();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  buildBoard();
  setResetGameEvent(document.querySelectorAll('.restart'));
  deck.addEventListener('click', turnCardClickEvent);

});
