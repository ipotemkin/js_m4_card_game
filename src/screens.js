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
    window.app.maxCards = maxCards;

    renderGameScreen();
    // screen.innerHTML = `<h2 style="color: white;">Выбран уровень: ${level}</h2>`;
  });
}

function renderGameScreen() {
  const screen = renderScreen(gameScreenTemplate());
  const cardBoard = screen.querySelector('.card-board');

  const { maxCards } = window.app;
  const cards = getCardsToPlay(maxCards);
  for (let i = 0; i < maxCards; i++) {
    // cardBoard.appendChild(templateEngine(cardBack()));
    const card = cardBoard.appendChild(templateEngine(cardFront(cards[i].img)));
    card.addEventListener('click', () => {
      toggleCard(card);
    });
  }
  // const playingCards = cardBoard.querySelectorAll('.card');
  // playingCards.forEach((card) => {
  //   card.addEventListener('click', () => {
  //     toggleCard(card);
  //   });
  // });

  setTimeout(hideCardsFaces, 500);
}

function toggleCard(card) {
  const cardFace = card.querySelector('.card__face');
  const cardBack = card.querySelector('.card__back');

  if (cardFace.classList.contains('hidden')) {
    cardBack.classList.add('hidden');
    cardFace.classList.remove('hidden');
  } else {
    cardFace.classList.add('hidden');
    cardBack.classList.remove('hidden');
  }
}

function hideCardsFaces() {
  const cardFaces = document.querySelectorAll('.card__face');
  const cardBacks = document.querySelectorAll('.card__back');
  cardFaces.forEach((card) => card.classList.add('hidden'));
  cardBacks.forEach((card) => card.classList.remove('hidden'));
}

// module.exports = { renderScreen, renderWelcomeScreen };
