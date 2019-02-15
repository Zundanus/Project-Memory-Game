const availableCards = ['bomb', 'paper-plane-o','diamond','repeat','anchor','bolt','cube','leaf']

/**
* @description sets up a new gamebord
*/
function buildBoard(){
   var cardList = shuffle(availableCards.concat(availableCards));
   const fragmentCardBord = document.createDocumentFragment();

   for (card of cardList) {
     fragmentCardBord.appendChild(cardTemplate(card));
   }
   document.querySelector('.deck').innerHTML = '';
   document.querySelector('.deck').appendChild(fragmentCardBord)
}
/**
* @description returns the html template for a card
* @param  cardId - id Of the card
* @return htmlElemt for a card element
*/
function cardTemplate(cardId){
  const li = document.createElement('li');
  li.className = 'card';
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
    let currentIndex = array.length, temporaryValue, randomIndex;

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
 function turnCardClickEvent(elemet){
   let card = elemet.target;
   if (card.classList.contains('card') || card.classList.contains('fa')) {
        turnCard(card.classList.contains('card') ? card : card.parentNode);
     }
 }

 /**
 * @description  Handels the visual turning of the card
 * @param card - Card Element
 */
 function turnCard(card){
    card.classList.toggle('show');
    card.classList.toggle('open');
 }

 document.addEventListener('DOMContentLoaded', function () {
   buildBoard();
   document.querySelector('.deck').addEventListener('click', turnCardClickEvent);
 });
