import { templateEngine } from './template-engine';
import { cardBack } from './templates';

function main() {
  const cardBoard = document.querySelector('.card-board');
  for (let i = 0; i < 36; i++) {
    cardBoard.appendChild(templateEngine(cardBack()));
    // cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
  }
}

main();
