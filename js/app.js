const availableCards = ['bomb', 'paper-plane-o', 'diamond', 'repeat', 'anchor', 'bolt', 'cube', 'leaf'];
let matchedMaxCards = 0;
let selectedCard;
let matchedCards = 0;
let cardEvaluationRuning = false;
let moves = 0;
const movesDisply = document.querySelector('.moves');
const winContainer = document.querySelector('.win-container');
const deck = document.querySelector('.deck');

/**
 * @description sets up a new gamebord
 */
function buildBoard() {
  var cardList = shuffle(availableCards.concat(availableCards));
  const fragmentCardBord = document.createDocumentFragment();
  selectedCard = undefined;
  moves = 0;
  movesDisply.textContent = moves;
  for (let card of cardList) {
    fragmentCardBord.appendChild(cardTemplate(card));
  }
  matchedMaxCards = cardList.length;
  deck.innerHTML = '';
  deck.appendChild(fragmentCardBord);
  deck.classList.remove('hide');
  if (!winContainer.classList.contains('hide')) {
    winContainer.classList.add('hide');
  }
}

/**
 * @description returns the html template for a card
 * @param  cardId - id Of the card
 * @return htmlElemt for a card element
 */
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
    moves += 1;
    movesDisply.textContent = moves;
    if (selectedCard != undefined) {
      if (selectedCard.dataset.cardid === cardElemet.dataset.cardid) {
        setTimeout(function (){cardMatchAnimation(cardElemet);}, 500);
      } else {
        setTimeout(function (){cardNoMatchAnimation(cardElemet);}, 500);
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
function cardMatchAnimation (cardElemet){
  selectedCard.classList.toggle('match');
  cardElemet.classList.toggle('match');
  selectedCard = undefined;
  cardEvaluationRuning = false;
  matchedCards += 2;
  if (matchedCards >= matchedMaxCards) {
    animationGameWon();
  }
}

/**
 * @description  Handels the Animation that appiers on Winning a game
 * @param card - Card Element
 */
function animationGameWon (){
  deck.classList.toggle('hide');
  winContainer.classList.toggle('hide');
}

/**
 * @description  Handels the Animation for a not matching Cardpair
 * @param cardElemet - Card Element
 */
function cardNoMatchAnimation (cardElemet){
  turnCard(cardElemet);
  turnCard(selectedCard);
  selectedCard = undefined;
  cardEvaluationRuning = false;
}

/**
 * @description  Handels the visual turning of the card
 * @param card - Card Element
 */
function turnCard(card) {
  card.classList.toggle('show');
  card.classList.toggle('open');
}

/**
 * @description  adds eventlistener to the reset buttons
 * @param buttons - html Button elements
 */
function setResetGameEvent(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', buildBoard,true);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  buildBoard();
  setResetGameEvent(document.querySelectorAll('.restart'));
  deck.addEventListener('click', turnCardClickEvent);

});
