import { mergeStringsIntoString } from './mergeStringsIntoString';

describe('mergeStringsIntoString', () => {
  test('merges consecutive strings', () => {
    const input = ['hello', ' ', 'world'];
    expect(mergeStringsIntoString(input)).toEqual(['hello world']);
  });

  test('preserves non-string objects', () => {
    const input = [
      'hello',
      { kind: 'lg-highlight-custom', children: ['hello'] },
      'world',
    ];
    expect(mergeStringsIntoString(input)).toEqual([
      'hello',
      { kind: 'lg-highlight-custom', children: ['hello'] },
      'world',
    ]);
  });

  test('merges strings around objects', () => {
    const input = [
      '_',
      'hello ',
      'world ',
      'hi',
      { kind: 'lg-highlight-custom', children: ['hello'] },
      'bye ',
      '_',
      'hello ',
    ];
    expect(mergeStringsIntoString(input)).toEqual([
      '_hello world hi',
      { kind: 'lg-highlight-custom', children: ['hello'] },
      'bye _hello ',
    ]);
  });

  test('handles empty array', () => {
    expect(mergeStringsIntoString([])).toEqual([]);
  });

  test('handles array with single string', () => {
    expect(mergeStringsIntoString(['hello'])).toEqual(['hello']);
  });

  test('handles array with single object', () => {
    expect(
      mergeStringsIntoString([
        { kind: 'lg-highlight-custom', children: ['hello'] },
      ]),
    ).toEqual([{ kind: 'lg-highlight-custom', children: ['hello'] }]);
  });
});
