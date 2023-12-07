import { Month } from '../../../../../shared/constants';

import { isChevronDisabled } from './';

const MIN_DATE = new Date(Date.UTC(1970, Month.February, 20));
const MAX_DATE = new Date(Date.UTC(2037, Month.February, 20));

const beforeMinDateDiffYear = new Date(Date.UTC(1969, Month.February, 20));
const beforeMinDateSameMonth = new Date(Date.UTC(1970, Month.February, 19));
const beforeMinDateSameYearDiffMonth = new Date(
  Date.UTC(1970, Month.January, 20),
);

const afterMinDateSameMonth = new Date(Date.UTC(1970, Month.February, 21));
const afterMinDateSameYear = new Date(Date.UTC(1970, Month.March, 20));
const afterMinDateDifferentYear = MAX_DATE;

const afterMaxDateSameMonth = new Date(Date.UTC(2037, Month.February, 21));
const afterMaxDateDiffYear = new Date(Date.UTC(2038, Month.February, 20));
const afterMaxDateSameYearDiffMonth = new Date(Date.UTC(2037, Month.March, 20));

const beforeMaxDateSameMonth = new Date(Date.UTC(2037, Month.February, 19));
const beforeMaxDateSameYear = new Date(Date.UTC(2037, Month.January, 20));
const beforeMaxDateDiffYear = MIN_DATE;

describe('packages/date-picker/menu/utils/shouldMonthBeEnabled', () => {
  describe('left chevron', () => {
    describe('returns true', () => {
      describe('when the menu date is before the minDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            isChevronDisabled('left', beforeMinDateSameMonth, MIN_DATE),
          ).toBeTruthy();
        });
        test('and is in a different year', () => {
          expect(
            isChevronDisabled('left', beforeMinDateDiffYear, MIN_DATE),
          ).toBeTruthy();
        });
        test('and is in the same year and different month', () => {
          expect(
            isChevronDisabled('left', beforeMinDateSameYearDiffMonth, MIN_DATE),
          ).toBeTruthy();
        });
      });
      describe('when the menu date is after the minDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            isChevronDisabled('left', afterMinDateSameMonth, MIN_DATE),
          ).toBeTruthy();
        });
      });
    });

    describe('returns false', () => {
      describe('when the menu date is after the minDate', () => {
        test('and is in the same year', () => {
          expect(
            isChevronDisabled('left', afterMinDateSameYear, MIN_DATE),
          ).toBeFalsy();
        });
        test('and is in a different year', () => {
          expect(
            isChevronDisabled('left', afterMinDateDifferentYear, MIN_DATE),
          ).toBeFalsy();
        });
      });
    });
  });

  describe('right chevron', () => {
    describe('returns true', () => {
      describe('when the menu date is after the maxDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            isChevronDisabled('right', afterMaxDateSameMonth, MAX_DATE),
          ).toBeTruthy();
        });
        test('and is in a different year', () => {
          expect(
            isChevronDisabled('right', afterMaxDateDiffYear, MAX_DATE),
          ).toBeTruthy();
        });
        test('and is in the same year and different month', () => {
          expect(
            isChevronDisabled('right', afterMaxDateSameYearDiffMonth, MAX_DATE),
          ).toBeTruthy();
        });
      });
      describe('when the menu date is before the maxDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            isChevronDisabled('right', beforeMaxDateSameMonth, MAX_DATE),
          ).toBeTruthy();
        });
      });
    });

    describe('returns false', () => {
      describe('when the menu date is before the maxDate', () => {
        test('and is in the same year', () => {
          expect(
            isChevronDisabled('right', beforeMaxDateSameYear, MAX_DATE),
          ).toBeFalsy();
        });
        test('and is in a different year', () => {
          expect(
            isChevronDisabled('right', beforeMaxDateDiffYear, MAX_DATE),
          ).toBeFalsy();
        });
      });
    });
  });
});
