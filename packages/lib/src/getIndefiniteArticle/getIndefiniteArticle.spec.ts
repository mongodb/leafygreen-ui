import { getIndefiniteArticle } from './getIndefiniteArticle';

describe('getIndefiniteArticle', () => {
  test('returns "a" for words that start with a consonant', () => {
    expect(getIndefiniteArticle('button')).toBe('a');
    expect(getIndefiniteArticle('card')).toBe('a');
    expect(getIndefiniteArticle('dog')).toBe('a');
    expect(getIndefiniteArticle('zebra')).toBe('a');
  });

  test('returns "an" for words that start with a vowel', () => {
    expect(getIndefiniteArticle('apple')).toBe('an');
    expect(getIndefiniteArticle('elephant')).toBe('an');
    expect(getIndefiniteArticle('igloo')).toBe('an');
    expect(getIndefiniteArticle('orange')).toBe('an');
    expect(getIndefiniteArticle('umbrella')).toBe('an');
  });

  test('is case-insensitive', () => {
    expect(getIndefiniteArticle('Apple')).toBe('an');
    expect(getIndefiniteArticle('ELEPHANT')).toBe('an');
    expect(getIndefiniteArticle('Banana')).toBe('a');
    expect(getIndefiniteArticle('ZEBRA')).toBe('a');
  });

  test('handles empty string', () => {
    expect(getIndefiniteArticle('')).toBe('a');
  });

  test('handles words with special characters', () => {
    expect(getIndefiniteArticle('_apple')).toBe('a');
    expect(getIndefiniteArticle('123')).toBe('a');
    expect(getIndefiniteArticle('-orange')).toBe('a');
  });
});
