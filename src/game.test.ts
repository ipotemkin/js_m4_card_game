const { getRandomNumbers, getCardsToPlay, shuffleCards } = require('./game');
const { cards } = require('./cards');

describe('getRandomNumbers()', () => {
  it('should be six', () => {
    const cardNumber = 6;
    const expectedResult = 6;

    expect(getRandomNumbers(cardNumber)).toHaveLength(expectedResult);
  });

  it('should contains unique values', () => {
    const cardNumber = 6;

    const resultSet = new Set(getRandomNumbers(cardNumber));

    expect(resultSet.size).toBe(cardNumber);
  });

  it("should contains from 0 to 'from'", () => {
    const cardNumber = 6;
    const from = 36;

    const result = getRandomNumbers(cardNumber, from);
    const min = Math.min.apply(null, result);
    const max = Math.max.apply(null, result);

    expect(min).toBeGreaterThanOrEqual(0);
    expect(max).toBeLessThan(from);
  });

  it('should be numbers', () => {
    const cardNumber = 6;

    const result = getRandomNumbers(cardNumber);

    const notNumbers = result.filter((item) => typeof item !== 'number');
    expect(notNumbers.length).toBe(0);
  });
});

describe('getCardsToPlay()', () => {
  it('response list length should be equal to the argument', () => {
    const cardCount: number = 6;
    const expectedResult: number = 6;

    const result = getCardsToPlay(cardCount);

    expect(result).toHaveLength(expectedResult);
  });
});

describe('shuffleCards()', () => {
  it('cards should be shuffled', () => {
    const request = cards.slice(0,7);
    const requestSorted = request.slice().sort((a, b) => a.pk > b.pk ? 1: -1);

    const result = shuffleCards(cards.slice(0,7));
    const resultSorted = result.slice().sort((a, b) => a.pk > b.pk ? 1: -1);

    expect(result).not.toEqual(request);
    expect(resultSorted).toEqual(requestSorted);
    expect(result.length).toBe(request.length);
  });
});
