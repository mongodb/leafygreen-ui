import createUniqueClassName from '.';

describe('packages/lib/createUniqueClassName', () => {
  describe('createUniqueClassName', () => {
    test('Format is correct', () => {
      const lgPrefix = 'lg-ui-';
      const expectedUuidLength = 8;
      const result = createUniqueClassName();
      expect(result.startsWith(lgPrefix)).toBe(true);
      expect(result.length == lgPrefix.length + expectedUuidLength);
    });

    test('Two generated classNames are not equal.', () => {
      const res1 = createUniqueClassName();
      const res2 = createUniqueClassName();
      expect(res1.valueOf() == res2.valueOf()).not.toBe(true);
    });

    test('Prefixes are correctly applied.', () => {
      const lgPrefix = 'lg-ui-';
      const customPrefix = 'test';
      const res1 = createUniqueClassName(customPrefix);
      const res2 = createUniqueClassName(customPrefix);
      expect(res1.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res2.startsWith(lgPrefix + customPrefix + '-')).toBe(true);
      expect(res1.valueOf() == res2.valueOf()).not.toBe(true);
    });
  });
});
