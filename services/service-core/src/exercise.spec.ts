import { exercise } from './exercise';
import { printName } from './exercise';

test('dummy function returns 0', () => {
  expect(exercise()).toBe(0);
});

test('function name that return yonas', () => {
  const result = printName();
  expect(typeof result).toBe('number');
});
