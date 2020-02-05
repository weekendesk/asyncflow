const asyncflow = require('./index');

const square = (value) => value * value;

const slowSquare = (value) => new Promise((resolve) => {
  setTimeout(() => { resolve(square(value)); }, 10);
});

const addToArray = (entry) => (value) => new Promise((resolve) => {
  setTimeout(() => { resolve([...value, entry]); }, 10);
});

describe('asyncflow', () => {
  it('should throw an error if the flow is not an array', () => {
    expect(() => asyncflow()).toThrow();
  });
  it('should return the value a simple synchronous function', async () => {
    const flow = asyncflow([square]);
    expect(await flow(2)).toEqual(4);
  });
  it('should return work with mutiple step on the flow', async () => {
    const flow = asyncflow([square, square]);
    expect(await flow(2)).toEqual(16);
  });
  it('should work with a asynchronous functions', async () => {
    const flow = asyncflow([slowSquare]);
    expect(await flow(2)).toEqual(4);
  });
  it('should work with multiple asynchronous functions', async () => {
    const flow = asyncflow([addToArray('step1'), addToArray('step2')]);
    expect(await flow([])).toEqual([
      'step1',
      'step2',
    ]);
  });
});
