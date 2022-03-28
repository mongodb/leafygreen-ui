import createUniqueClassName from '.';

describe('packages/lib/createUniqueClassName', () => {
  describe('createUniqueClassName', () => {
    test('Format is correct', () => {
      const prefix = 'lg-ui-';
      const expectedUuidLength = 8;
      const result = createUniqueClassName();
      expect(result.startsWith(prefix)).toBe(true);
      expect(result.length == prefix.length + expectedUuidLength);
    });

    test('Two generated classNames are not equal.', () => {
      const res1 = createUniqueClassName();
      const res2 = createUniqueClassName();
      expect(res1.valueOf() == res2.valueOf()).not.toBe(true);
    });
  });
});
