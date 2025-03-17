import { generateKindClassName } from './generateKindClassName';

describe('generateKindClassName', () => {
  test('generates class names with default prefix', () => {
    expect(generateKindClassName(['type', 'keyword'])).toBe(
      'lg-highlight-type lg-highlight-keyword',
    );
  });

  test('when passed a single argument, returns a string of the appropriate className', () => {
    const kind = 'string';
    const kindClassName = generateKindClassName([kind]) as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName).toEqual(`lg-highlight-${kind}`);
  });

  test('when passed multiple arguments, returns a string containing the appropriate classNames', () => {
    const kind1 = 'string';
    const kind2 = 'function';
    const kindClassName = generateKindClassName([kind1, kind2]) as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName).toEqual(
      `lg-highlight-${kind1} lg-highlight-${kind2}`,
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

  test('when passed an empty string, returns an empty string', () => {
    const kindClassName = generateKindClassName(['']) as any;

    expect(typeof kindClassName === 'string').toBeTruthy();
    expect(kindClassName.length).toBe(0);
  });

  test('handles no parameters', () => {
    expect(generateKindClassName()).toBe('');
  });

  test('handles multiple dots in kind', () => {
    expect(generateKindClassName(['namespace.class.method'])).toBe(
      'lg-highlight-namespace lg-highlight-class lg-highlight-method',
    );
  });
});
