import { cards } from './cards';

export function getCardsToPlay(cardsCount) {
  const randomNumbers = getRandomNumbers(cardsCount / 2);
  let cardsToPlay = [];
  for (let cardNumber of randomNumbers) {
    cardsToPlay.push(cards[cardNumber]);
    cardsToPlay.push(cards[cardNumber]);
  }
  return shuffleCards(shuffleCards(cardsToPlay));
}

function getRandomNumbers(n, from = 36) {
  let counter = 0;
  const result = [];
  do {
    const number = Math.floor(Math.random() * from);
    if (!result.includes(number)) {
      result.push(number);
      counter++;
    }
  } while (counter < n);
  return result;
}

function shuffleCards(origin) {
  let shuffled = origin
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

export function closeMissedPair(card) {
  closeCard(card);
  closeCard(window.app.prevOpenCard);
}

export function checkCard(card) {
  return window.app.prevOpenCard.dataset.cardPk === card.dataset.cardPk;
}

function toggleCard(card) {
  const cardFace = card.querySelector('.card__face');
  const cardBack = card.querySelector('.card__back');

  if (cardFace.classList.contains('hidden')) {
    cardBack.classList.add('hidden');
    cardFace.classList.remove('hidden');
    card.dataset.open = true;
    window.app.openCardsCount++;
  } else {
    cardFace.classList.add('hidden');
    cardBack.classList.remove('hidden');
    card.dataset.open = false;
    window.app.openCardsCount--;
  }
}

export function openCard(card) {
  if (card.dataset.open === 'true') return;
  toggleCard(card);
}

function closeCard(card) {
  if (card.dataset.open !== 'true') return;
  toggleCard(card);
}

export function hideCardsFaces() {
  const cards = document.querySelectorAll('.card');
  const cardFaces = document.querySelectorAll('.card__face');
  const cardBacks = document.querySelectorAll('.card__back');

  cards.forEach((card) => (card.dataset.open = false));
  cardFaces.forEach((card) => card.classList.add('hidden'));
  cardBacks.forEach((card) => card.classList.remove('hidden'));
}

// module.exports = {
//   getCardsToPlay,
//   closeMissedPair,
//   checkCard,
//   openCard,
//   closeCard,
//   hideCardsFaces,
// };
