import { Variant } from './shared.types';
import { getIsFilterCountValid, MAX_FILTER_COUNT } from './utils';

describe('packages/collection-toolbar/utils', () => {
  describe('MAX_FILTER_COUNT', () => {
    test('Compact variant has max of 2', () => {
      expect(MAX_FILTER_COUNT[Variant.Compact]).toBe(2);
    });

    test('Default variant has max of 5', () => {
      expect(MAX_FILTER_COUNT[Variant.Default]).toBe(5);
    });

    test('Collapsible variant has max of 5', () => {
      expect(MAX_FILTER_COUNT[Variant.Collapsible]).toBe(5);
    });
  });

  describe('getIsFilterCountValid', () => {
    describe('Compact variant', () => {
      test('returns true for 0 filters', () => {
        expect(getIsFilterCountValid(0, Variant.Compact)).toBe(true);
      });

      test('returns true for 1 filter', () => {
        expect(getIsFilterCountValid(1, Variant.Compact)).toBe(true);
      });

      test('returns true for 2 filters (max allowed)', () => {
        expect(getIsFilterCountValid(2, Variant.Compact)).toBe(true);
      });

      test('returns false for 3 filters (exceeds max)', () => {
        expect(getIsFilterCountValid(3, Variant.Compact)).toBe(false);
      });
    });

    describe('Default variant', () => {
      test('returns true for 0 filters', () => {
        expect(getIsFilterCountValid(0, Variant.Default)).toBe(true);
      });

      test('returns true for 5 filters (max allowed)', () => {
        expect(getIsFilterCountValid(5, Variant.Default)).toBe(true);
      });

      test('returns false for 6 filters (exceeds max)', () => {
        expect(getIsFilterCountValid(6, Variant.Default)).toBe(false);
      });
    });

    describe('Collapsible variant', () => {
      test('returns true for 0 filters', () => {
        expect(getIsFilterCountValid(0, Variant.Collapsible)).toBe(true);
      });

      test('returns true for 5 filters (max allowed)', () => {
        expect(getIsFilterCountValid(5, Variant.Collapsible)).toBe(true);
      });

      test('returns false for 6 filters (exceeds max)', () => {
        expect(getIsFilterCountValid(6, Variant.Collapsible)).toBe(false);
      });
    });
  });
});
