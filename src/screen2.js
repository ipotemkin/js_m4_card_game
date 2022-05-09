import { templateEngine } from './template-engine';
import { cardBack } from './templates';

function screen2() {
  const cardBoard = document.querySelector('.card-board');
  for (let i = 0; i < 36; i++) {
    cardBoard.appendChild(templateEngine(cardBack()));
    // cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
  }
}

module.exports = { screen2 };
