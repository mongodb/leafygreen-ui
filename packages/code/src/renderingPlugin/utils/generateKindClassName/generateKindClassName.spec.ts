import { generateKindClassName } from './generateKindClassName';

describe('generateKindClassName', () => {
  test('generates class names with default prefix', () => {
    expect(generateKindClassName(['type', 'keyword'])).toBe(
      'lg-highlight-type lg-highlight-keyword',
    );
  });

  test('handles kinds with dots by splitting them', () => {
    expect(generateKindClassName(['class.name'])).toBe(
      'lg-highlight-class lg-highlight-name',
    );
  });

  test('preserves existing prefixes', () => {
    expect(generateKindClassName(['lg-highlight-existing'])).toBe(
      'lg-highlight-existing',
    );
  });

  test('filters out non-string and empty values', () => {
    expect(generateKindClassName(['valid', '', null, undefined, 123])).toBe(
      'lg-highlight-valid',
    );
  });

  test('works with custom prefix', () => {
    expect(generateKindClassName(['test'], 'custom-')).toBe('custom-test');
  });

  test('handles empty array', () => {
    expect(generateKindClassName([])).toBe('');
  });

  test('handles multiple dots in kind', () => {
    expect(generateKindClassName(['namespace.class.method'])).toBe(
      'lg-highlight-namespace lg-highlight-class lg-highlight-method',
    );
  });
});
