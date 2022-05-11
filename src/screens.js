import { templateEngine } from './template-engine';
import {
  welcomeScreenTemplate,
  gameScreenTemplate,
  cardFront,
  msgBoxTemplate,
} from './templates';
import {
  getCardsToPlay,
  openCard,
  checkCard,
  closeMissedPair,
  hideCardsFaces,
  restartGame,
  stopGame,
} from './game';
import timer from './timer';

function renderScreen(template, cleanBackground = true) {
  const { root } = window.app;

  // console.log(root);
  if (cleanBackground) root.textContent = '';

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
  });
}

function renderGameScreen() {
  const screen = renderScreen(gameScreenTemplate());
  const cardBoard = screen.querySelector('.card-board');
  const restartBtn = screen.querySelector('.restart-btn');
  const clock = screen.querySelector('.clock__time');

  restartBtn.addEventListener('click', () => {
    stopGame();
    restartGame();
  });

  clock.textContent = '00.00';
  const { maxCards } = window.app;

  // console.log('renderGameScreen:maxCards =', maxCards);

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
        return;
      }

      // if not
      if (checkCard(card)) {
        if (window.app.openCardsCount === window.app.maxCards) {
          stopGame();
          renderWinMsgBox();
        }
      } else {
        if (++window.app.errorCount >= 3) {
          stopGame();
          renderLoseMsgBox();
        } else {
          // to close a wrong pair if the player is given several attempts
          // TODO to block card picking before closeMissedPair
          setTimeout(() => {
            closeMissedPair(card);
          }, 500);
        }
      }
    });
  }

  setTimeout(hideCardsFaces, 5000);
  window.app.timer = setInterval(timer, 1000);
}

function renderWinMsgBox() {
  renderMsgBox('Вы выиграли!', './static/win.svg');
}

function renderLoseMsgBox() {
  renderMsgBox('Вы проиграли!', './static/lose.svg');
}

function renderMsgBox(message, icon) {
  const time = document.querySelector('.clock__time');
  const screen = renderScreen(
    msgBoxTemplate(message, time.textContent, icon),
    false
  );
  // const form = screen.querySelector('.form-msgbox');
  const submitBtn = screen.querySelector('.form-msgbox__submit-btn');
  submitBtn.addEventListener('click', () => restartGame());
}
