import { templateEngine } from './template-engine';
import {
  welcomeScreenTemplate,
  gameScreenTemplate,
  cardBack,
  cardFront,
} from './templates';

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
  const { cards } = window.app;
  for (let i = 0; i < 36; i++) {
    // cardBoard.appendChild(templateEngine(cardBack()));
    cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
  }
}

// module.exports = { renderScreen, renderWelcomeScreen };
