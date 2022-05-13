import templateEngine from './template-engine';
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
import { timer } from './timer';

function renderScreen(template: Object, cleanBackground = true) {
  const { root } = window.app;

  if (!root) throw new Error('No root defined!');

  if (cleanBackground) root.textContent = '';

  const screen = templateEngine(template);
  root.appendChild(screen);
  return screen;
}

export default function renderWelcomeScreen(): void {
  const screen = renderScreen(welcomeScreenTemplate());

  const form = screen.querySelector('.form');
  const error = screen.querySelector('.form__error');
  const submitBtn = screen.querySelector('.form__submit-btn');

  const hideError = () => error.classList.add('hidden');

  form.addEventListener('click', hideError);
  submitBtn.addEventListener('blur', hideError);

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const level = (window.app.level = +form.level.value);

    if (!level) {
      error.classList.remove('hidden');
      return;
    }

    let maxCards: number;
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

function renderGameScreen(): void {
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

  const cards = getCardsToPlay(maxCards);
  for (let i = 0; i < maxCards; i++) {
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
        showErrorIcons(++window.app.errorCount);
        if (window.app.errorCount >= 3) {
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
  window.app.timer = window.setInterval(timer, 1000);
}

function renderWinMsgBox(): void {
  renderMsgBox('Вы выиграли!', window.app.winIcon);
}

function renderLoseMsgBox(): void {
  renderMsgBox('Вы проиграли!', window.app.loseIcon);
}

function renderMsgBox(message: string, icon: string): void {
  const time = document.querySelector('.clock__time');
  const timeToMsgBox = time ? time.textContent : '';
  const screen = renderScreen(
    msgBoxTemplate(message, timeToMsgBox, icon),
    false
  );
  const submitBtn = screen.querySelector('.form-msgbox__submit-btn');
  submitBtn.addEventListener('click', () => restartGame());
}

function showErrorIcons(errorCount: number): void {
  const errors = document.querySelectorAll('.top__error');
  for (let i = 0; i < errorCount; i++) errors[i].classList.remove('hidden');
}
