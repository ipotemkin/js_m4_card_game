import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';
import { templateEngine } from './template-engine';
import { cardBack, cardBoard } from './templates';
import renderWelcomeScreen from './screens';
import { cards } from './cards';

function main() {
  const form = document.querySelector('.form');
  const error = document.querySelector('.form__error');
  const submitBtn = document.querySelector('.form__submit-btn');

  const hideError = () => error.classList.add('hidden');

  form.addEventListener('click', hideError);
  submitBtn.addEventListener('blur', hideError);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const level = (window.app = +form.level.value);

    if (!level) {
      error.classList.remove('hidden');
      return;
    }

    const canvas = document.querySelector('.canvas');
    canvas.innerHTML = `<h2 style="color: white;">Выбран уровень: ${level}</h2>`;
  });
}

function screen2() {
  const cardBoard = document.querySelector('.card-board');
  for (let i = 0; i < 36; i++) {
    cardBoard.appendChild(templateEngine(cardBack()));
    // cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
  }
}

// module.exports = { main, screen2 };
window.app.cards = cards;
renderWelcomeScreen();
// screen2();
