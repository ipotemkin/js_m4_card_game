import { cards } from './cards';

export default function getCardsToPlay(cardsCount) {
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
