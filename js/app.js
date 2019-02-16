const availableCards = ['bomb', 'paper-plane-o', 'diamond', 'repeat', 'anchor', 'bolt', 'cube', 'leaf'];

let selectedCard;
let matchedCards = 0;
let cardEvaluationRuning = false;

/**
 * @description sets up a new gamebord
 */
function buildBoard() {
  var cardList = shuffle(availableCards.concat(availableCards));
  const fragmentCardBord = document.createDocumentFragment();

  for (let card of cardList) {
    fragmentCardBord.appendChild(cardTemplate(card));
  }
  document.querySelector('.deck').innerHTML = '';
  document.querySelector('.deck').appendChild(fragmentCardBord);
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
 * @param  element - array of objects
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

/**
 * @description evaluates the card click event and initiates the necessary validations and actions
 * @param  element - Card Element
 */
function turnCardClickEvent(elemet) {
  let card = elemet.target;
  let cardElemet = card.classList.contains('card') ? card : card.parentNode;
  if (cardElemet.className === 'card' && !cardEvaluationRuning) {
    cardEvaluationRuning = true;
    turnCard(cardElemet);
    if (selectedCard != undefined) {
      if (selectedCard.dataset.cardid === cardElemet.dataset.cardid) {
        setTimeout(function (){cardMatchAnimation(cardElemet);}, 1000);
        matchedCards += 2;
      } else {
        setTimeout(function (){cardNoMatchAnimation(cardElemet);}, 1000);
      }
    } else {
      selectedCard = cardElemet
      cardEvaluationRuning = false;
    }
  }
}

/**
 * @description  Handels the Animation for a matching Cardpair
 * @param card - Card Element
 */
function cardMatchAnimation (cardElemet){
  selectedCard.classList.toggle('match');
  cardElemet.classList.toggle('match');
  selectedCard = undefined;
  cardEvaluationRuning = false;
}

/**
 * @description  Handels the Animation for a not matching Cardpair
 * @param card - Card Element
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

document.addEventListener('DOMContentLoaded', function() {
  buildBoard();
  document.querySelector('.deck').addEventListener('click', turnCardClickEvent);
  document.querySelector('.restart').addEventListener('click', buildBoard);

});
