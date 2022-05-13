const { zeroPrefix, timeToString, showTime, timer } = require('./timer');

//  jest.mock('./timer', () => {
//     const originalModule = jest.requireActual('./timer');
  
//     //Mock showTime function
//     return {
//       __esModule: true,
//       ...originalModule,
//       showTime: jest.fn(() => 'mocked showTime'),
//     };
//   });
 

describe('zeroPrefix()', () => {
  it('should add 0 to one digit number and convert to string', () => {
    const data = 1;
    const expectedResult = '01';

    const result = zeroPrefix(data);

    expect(result).toBe(expectedResult);
  });

  it('should not add 0 to two digit number', () => {
    const data = 21;
    const expectedResult = '21';

    const result = zeroPrefix(data);

    expect(result).toBe(expectedResult);
  });
});

describe('timeToString()', () => {
  it("should convert seconds to '00.00' string format", () => {
    const data = 70;
    const expectedResult = '01.10';

    const result = timeToString(data);

    expect(result).toBe(expectedResult);
  });

  it("should not exceed '00.59' string format", () => {
    const data = 60;
    const expectedResult = '01.00';

    const result = timeToString(data);

    expect(result).toBe(expectedResult);
  });

  it("should not exceed '59.59' string format", () => {
    const data = 60 * 60;
    const expectedResult = '59.59';

    const result = timeToString(data);

    expect(result).toBe(expectedResult);
  });
});

describe('timer()', () => {
  it('should increment window.app.timerValue', () => {   
    Object.defineProperty(global, 'window', {
      value: {
        app: {
          timerValue: 0,
        },
      },
      writable: true,
    });
    const expectedResult = 1;
  
    const foo = (number: number) => {};
    timer(foo);
    
    expect(window.app.timerValue).toBe(expectedResult);
  });  
});
