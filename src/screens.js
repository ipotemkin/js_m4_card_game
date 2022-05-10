import { templateEngine } from './template-engine';
import {
  welcomeScreenTemplate,
  gameScreenTemplate,
  cardFront,
} from './templates';
import {
  getCardsToPlay,
  openCard,
  checkCard,
  closeMissedPair,
  hideCardsFaces,
} from './game';

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
    card.dataset.cardPk = cards[i].pk;
    card.addEventListener('click', () => {
      // if cards are open or before hideCardsFaces
      if (card.dataset.open === 'true' || card.dataset.open === undefined)
        return;

      openCard(card);

      // if the first card in a pair
      if (window.app.openCardsCount % 2 > 0) {
        window.app.prevOpenCard = card;
        // console.log('open cards pair =', window.app.openCardsCount % 2);
        return;
      }

      // if not
      if (checkCard(card)) {
        if (window.app.openCardsCount === window.app.maxCards) {
          setTimeout(() => {
            alert('Вы выиграли!');
          }, 100);
        }
      } else {
        setTimeout(() => {
          closeMissedPair(card);
        }, 500);
        setTimeout(() => {
          alert('Вы проиграли!');
        }, 100);
      }
    });
  }

  setTimeout(hideCardsFaces, 5000);
}
