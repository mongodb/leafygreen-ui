import {
  areItemsPerPageValid,
  getCurrentRangeString,
  getRangeMaxString,
  getTotalNumPages,
  isCurrentPageValid,
} from './utils';

describe('Pagination utils', () => {
  describe('getCurrentRangeString', () => {
    test('returns correct range for first page', () => {
      expect(getCurrentRangeString(10, 1)).toBe('1 - 10');
    });

    test('returns correct range for second page', () => {
      expect(getCurrentRangeString(10, 2)).toBe('11 - 20');
    });

    test('returns correct range for middle page', () => {
      expect(getCurrentRangeString(10, 5)).toBe('41 - 50');
    });

    test('returns correct range with numTotalItems on last page', () => {
      expect(getCurrentRangeString(10, 103, 1021)).toBe('1021 - 1021');
    });

    test('returns correct range when numTotalItems caps the end', () => {
      expect(getCurrentRangeString(10, 11, 105)).toBe('101 - 105');
    });

    test('returns correct range with different itemsPerPage values', () => {
      expect(getCurrentRangeString(25, 1)).toBe('1 - 25');
      expect(getCurrentRangeString(50, 2)).toBe('51 - 100');
      expect(getCurrentRangeString(100, 1)).toBe('1 - 100');
    });

    test('returns correct range when numTotalItems is less than itemsPerPage', () => {
      expect(getCurrentRangeString(10, 1, 5)).toBe('1 - 5');
    });

    test('returns correct range for single item', () => {
      expect(getCurrentRangeString(10, 1, 1)).toBe('1 - 1');
    });

    test('returns correct range at exact page boundary', () => {
      expect(getCurrentRangeString(10, 10, 100)).toBe('91 - 100');
    });

    test('returns correct range without numTotalItems (undefined)', () => {
      expect(getCurrentRangeString(10, 3, undefined)).toBe('21 - 30');
    });
  });

  describe('getRangeMaxString', () => {
    test('returns "many" when numTotalItems is undefined', () => {
      expect(getRangeMaxString()).toBe('many');
    });

    test('returns "many" when numTotalItems is 0', () => {
      expect(getRangeMaxString(0)).toBe('many');
    });

    test('returns correct string when numTotalItems is provided', () => {
      expect(getRangeMaxString(100)).toBe('100 items');
    });

    test('returns correct string for large numTotalItems', () => {
      expect(getRangeMaxString(1021)).toBe('1021 items');
    });

    test('returns correct string for single item', () => {
      expect(getRangeMaxString(1)).toBe('1 item');
    });
  });

  describe('getTotalNumPages', () => {
    test('calculates correct number of pages with exact division', () => {
      expect(getTotalNumPages(100, 10)).toBe(10);
    });

    test('calculates correct number of pages with remainder', () => {
      expect(getTotalNumPages(105, 10)).toBe(11);
    });

    test('returns 1 page when items less than itemsPerPage', () => {
      expect(getTotalNumPages(5, 10)).toBe(1);
    });

    test('returns 1 page when items equal itemsPerPage', () => {
      expect(getTotalNumPages(10, 10)).toBe(1);
    });

    test('calculates correctly with different itemsPerPage values', () => {
      expect(getTotalNumPages(1021, 10)).toBe(103);
      expect(getTotalNumPages(1021, 25)).toBe(41);
      expect(getTotalNumPages(1021, 50)).toBe(21);
      expect(getTotalNumPages(1021, 100)).toBe(11);
    });

    test('handles single item', () => {
      expect(getTotalNumPages(1, 10)).toBe(1);
    });

    test('handles 0 items', () => {
      expect(getTotalNumPages(0, 10)).toBe(0);
    });
  });

  describe('isCurrentPageValid', () => {
    test('returns false when currentPage is less than 1', () => {
      expect(
        isCurrentPageValid({
          currentPage: 0,
          itemsPerPage: 10,
        }),
      ).toBe(false);
    });

    test('returns false when currentPage is negative', () => {
      expect(
        isCurrentPageValid({
          currentPage: -1,
          itemsPerPage: 10,
        }),
      ).toBe(false);
    });

    test('returns false when currentPage exceeds total pages', () => {
      expect(
        isCurrentPageValid({
          currentPage: 11,
          numTotalItems: 100,
          itemsPerPage: 10,
        }),
      ).toBe(false);
    });

    test('returns true when currentPage is valid (first page)', () => {
      expect(
        isCurrentPageValid({
          currentPage: 1,
          numTotalItems: 100,
          itemsPerPage: 10,
        }),
      ).toBe(true);
    });

    test('returns true when currentPage is valid (last page)', () => {
      expect(
        isCurrentPageValid({
          currentPage: 10,
          numTotalItems: 100,
          itemsPerPage: 10,
        }),
      ).toBe(true);
    });

    test('returns true when currentPage is valid (middle page)', () => {
      expect(
        isCurrentPageValid({
          currentPage: 5,
          numTotalItems: 100,
          itemsPerPage: 10,
        }),
      ).toBe(true);
    });

    test('returns true when numTotalItems is undefined and currentPage is valid', () => {
      expect(
        isCurrentPageValid({
          currentPage: 100,
          itemsPerPage: 10,
        }),
      ).toBe(true);
    });

    test('handles edge case with partial last page', () => {
      // 1021 items / 10 per page = 103 pages
      expect(
        isCurrentPageValid({
          currentPage: 103,
          numTotalItems: 1021,
          itemsPerPage: 10,
        }),
      ).toBe(true);

      expect(
        isCurrentPageValid({
          currentPage: 104,
          numTotalItems: 1021,
          itemsPerPage: 10,
        }),
      ).toBe(false);
    });
  });

  describe('areItemsPerPageValid', () => {
    test('returns false when itemsPerPage is not in options', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 15,
          itemsPerPageOptions: [10, 25, 50, 100],
        }),
      ).toBe(false);
    });

    test('returns true when itemsPerPage is in options', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 10,
          itemsPerPageOptions: [10, 25, 50, 100],
        }),
      ).toBe(true);
    });

    test('returns true when itemsPerPage matches middle option', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 50,
          itemsPerPageOptions: [10, 25, 50, 100],
        }),
      ).toBe(true);
    });

    test('returns true when itemsPerPage matches last option', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 100,
          itemsPerPageOptions: [10, 25, 50, 100],
        }),
      ).toBe(true);
    });

    test('returns false with empty options array', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 10,
          itemsPerPageOptions: [],
        }),
      ).toBe(false);
    });

    test('handles single option array', () => {
      expect(
        areItemsPerPageValid({
          itemsPerPage: 10,
          itemsPerPageOptions: [10],
        }),
      ).toBe(true);

      expect(
        areItemsPerPageValid({
          itemsPerPage: 25,
          itemsPerPageOptions: [10],
        }),
      ).toBe(false);
    });
  });
});
