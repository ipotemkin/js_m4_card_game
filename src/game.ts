import { cards } from './cards';
import renderWelcomeScreen from './screens';

export function getCardsToPlay(cardsCount: number): typeof cards {
  const randomNumbers = getRandomNumbers(cardsCount / 2);
  let cardsToPlay: typeof cards = [];
  for (let cardNumber of randomNumbers) {
    cardsToPlay.push(cards[cardNumber]);
    cardsToPlay.push(cards[cardNumber]);
  }
  return shuffleCards(shuffleCards(cardsToPlay));
}

export function getRandomNumbers(n: number, from = 36): number[] {
  let counter = 0;
  const result: number[] = [];
  do {
    const number: number = Math.floor(Math.random() * from);
    if (!result.includes(number)) {
      result.push(number);
      counter++;
    }
  } while (counter < n);
  return result;
}

function shuffleCards(origin: typeof cards): typeof cards {
  let shuffled = origin
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

export function closeMissedPair(card: HTMLDivElement): void {
  closeCard(card);
  if (window.app.prevOpenCard)
    closeCard(window.app.prevOpenCard);
}

export function checkCard(card: HTMLDivElement): boolean {
  return window.app.prevOpenCard?.dataset.cardPk === card.dataset.cardPk;
}

function toggleCard(card: HTMLDivElement): void {
  const cardFace = card.querySelector('.card__face');
  const cardBack = card.querySelector('.card__back');

  if (cardFace?.classList.contains('hidden')) {
    cardBack?.classList.add('hidden');
    cardFace.classList.remove('hidden');
    card.dataset.open = 'true';
    window.app.openCardsCount++;
  } else {
    cardFace?.classList.add('hidden');
    cardBack?.classList.remove('hidden');
    card.dataset.open = 'false';
    window.app.openCardsCount--;
  }
}

export function openCard(card: HTMLDivElement): void {
  if (card.dataset.open === 'true') return;
  toggleCard(card);
}

function closeCard(card: HTMLDivElement): void {
  if (card.dataset.open !== 'true') return;
  toggleCard(card);
}

export function hideCardsFaces(): void {
  const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll('.card');
  const cardFaces = document.querySelectorAll('.card__face');
  const cardBacks = document.querySelectorAll('.card__back');

  cards.forEach((card) => (card.dataset.open = 'false'));
  cardFaces.forEach((card) => card.classList.add('hidden'));
  cardBacks.forEach((card) => card.classList.remove('hidden'));
}

export function restartGame(): void {
  window.app.timerValue = 0;
  window.app.openCardsCount = 0;
  window.app.errorCount = 0;
  renderWelcomeScreen();
}

export function stopGame(): void {
  clearInterval(window.app.timer);
  window.app.timer = undefined;
}
