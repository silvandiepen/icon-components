import { toArray } from './array';

describe('toArray', () => {
  it('should return the same array if input is an array', () => {
    const input = ['hello', 'world'];
    const result = toArray(input);
    expect(result).toEqual(input);
  });

  it('should return an array containing the input if input is a string', () => {
    const input = 'hello';
    const result = toArray(input);
    expect(result).toEqual([input]);
  });
});