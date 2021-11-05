const asyncflow = require('./index');

const square = (value) => value * value;

const slowSquare = (value) => new Promise((resolve) => {
  setTimeout(() => { resolve(square(value)); }, 10);
});

const addToArray = (entry) => (value) => new Promise((resolve) => {
  setTimeout(() => { resolve([...value, entry]); }, 10);
});

test('Asyncflow works with an array of functions', async () => {
  expect(await asyncflow([square, square])(2)).toEqual(16);
});
test('Asyncflow also works with multiple functions as arguments', async () => {
  expect(await asyncflow(square, square)(2)).toEqual(16);
});
test('A single function can be used', async () => {
  expect(await asyncflow([square])(2)).toEqual(4);
});
test('A single asynchronous function can be used', async () => {
  expect(await asyncflow([slowSquare])(2)).toEqual(4);
});
test('Synchronous and asynchronous functions can be used', async () => {
  expect(await asyncflow([slowSquare, square])(2)).toEqual(16);
});
test('The functions are executed on the right order', async () => {
  expect(await asyncflow([
    addToArray('step1'),
    addToArray('step2'),
    addToArray('step3'),
    addToArray('step4'),
    addToArray('step5'),
  ])([])).toEqual([
    'step1',
    'step2',
    'step3',
    'step4',
    'step5',
  ]);
});
