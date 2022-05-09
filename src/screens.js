import { templateEngine } from './template-engine';
import {
  welcomeScreenTemplate,
  gameScreenTemplate,
  cardBack,
  cardFront,
} from './templates';
import getCardsToPlay from './game';

function renderScreen(template) {
  const { root } = window.app;

  console.log(root);
  root.textContent = '';

  const screen = templateEngine(template);
  root.appendChild(screen);
  return screen;
}

export default function renderWelcomeScreen() {
  const screen = renderScreen(welcomeScreenTemplate());

  const form = screen.querySelector('.form');
  const error = screen.querySelector('.form__error');
  const submitBtn = screen.querySelector('.form__submit-btn');

  const hideError = () => error.classList.add('hidden');

  form.addEventListener('click', hideError);
  submitBtn.addEventListener('blur', hideError);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const level = (window.app.level = +form.level.value);

    if (!level) {
      error.classList.remove('hidden');
      return;
    }

    renderGameScreen();
    // screen.innerHTML = `<h2 style="color: white;">Выбран уровень: ${level}</h2>`;
  });
}

function renderGameScreen() {
  const screen = renderScreen(gameScreenTemplate());
  const cardBoard = screen.querySelector('.card-board');

  let maxCards;
  switch (window.app.level) {
    case 1:
      maxCards = 6;
      break;
    case 2:
      maxCards = 12;
      break;
    default:
      maxCards = 18;
  }
  // const maxCards = 18;
  const cards = getCardsToPlay(maxCards);
  for (let i = 0; i < maxCards; i++) {
    // cardBoard.appendChild(templateEngine(cardBack()));
    cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
  }
}

// module.exports = { renderScreen, renderWelcomeScreen };
