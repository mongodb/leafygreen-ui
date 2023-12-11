import { Month } from '@leafygreen-ui/date-utils';

import { shouldChevronBeDisabled } from '.';

const testMinDate = new Date(Date.UTC(1970, Month.February, 20));
const testMaxDate = new Date(Date.UTC(2037, Month.February, 20));

const beforeMinDateDiffYear = new Date(Date.UTC(1969, Month.February, 20));
const beforeMinDateSameMonth = new Date(Date.UTC(1970, Month.February, 19));
const beforeMinDateSameYearDiffMonth = new Date(
  Date.UTC(1970, Month.January, 20),
);

const afterMinDateSameMonth = new Date(Date.UTC(1970, Month.February, 21));
const afterMinDateSameYear = new Date(Date.UTC(1970, Month.March, 20));
const afterMinDateDifferentYear = testMaxDate;

const afterMaxDateSameMonth = new Date(Date.UTC(2037, Month.February, 21));
const afterMaxDateDiffYear = new Date(Date.UTC(2038, Month.February, 20));
const afterMaxDateSameYearDiffMonth = new Date(Date.UTC(2037, Month.March, 20));

const beforeMaxDateSameMonth = new Date(Date.UTC(2037, Month.February, 19));
const beforeMaxDateSameYear = new Date(Date.UTC(2037, Month.January, 20));
const beforeMaxDateDiffYear = testMinDate;

describe('packages/date-picker/menu/utils/shouldMonthBeEnabled', () => {
  describe('left chevron', () => {
    describe('returns true', () => {
      describe('when the menu date is before the minDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            shouldChevronBeDisabled(
              'left',
              beforeMinDateSameMonth,
              testMinDate,
            ),
          ).toBeTruthy();
        });
        test('and is in a different year', () => {
          expect(
            shouldChevronBeDisabled('left', beforeMinDateDiffYear, testMinDate),
          ).toBeTruthy();
        });
        test('and is in the same year and different month', () => {
          expect(
            shouldChevronBeDisabled(
              'left',
              beforeMinDateSameYearDiffMonth,
              testMinDate,
            ),
          ).toBeTruthy();
        });
      });
      describe('when the menu date is after the minDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            shouldChevronBeDisabled('left', afterMinDateSameMonth, testMinDate),
          ).toBeTruthy();
        });
      });
    });

    describe('returns false', () => {
      describe('when the menu date is after the minDate', () => {
        test('and is in the same year', () => {
          expect(
            shouldChevronBeDisabled('left', afterMinDateSameYear, testMinDate),
          ).toBeFalsy();
        });
        test('and is in a different year', () => {
          expect(
            shouldChevronBeDisabled(
              'left',
              afterMinDateDifferentYear,
              testMinDate,
            ),
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
            shouldChevronBeDisabled(
              'right',
              afterMaxDateSameMonth,
              testMaxDate,
            ),
          ).toBeTruthy();
        });
        test('and is in a different year', () => {
          expect(
            shouldChevronBeDisabled('right', afterMaxDateDiffYear, testMaxDate),
          ).toBeTruthy();
        });
        test('and is in the same year and different month', () => {
          expect(
            shouldChevronBeDisabled(
              'right',
              afterMaxDateSameYearDiffMonth,
              testMaxDate,
            ),
          ).toBeTruthy();
        });
      });
      describe('when the menu date is before the maxDate', () => {
        test('but is in a month that has both valid and invalid dates', () => {
          expect(
            shouldChevronBeDisabled(
              'right',
              beforeMaxDateSameMonth,
              testMaxDate,
            ),
          ).toBeTruthy();
        });
      });
    });

    describe('returns false', () => {
      describe('when the menu date is before the maxDate', () => {
        test('and is in the same year', () => {
          expect(
            shouldChevronBeDisabled(
              'right',
              beforeMaxDateSameYear,
              testMaxDate,
            ),
          ).toBeFalsy();
        });
        test('and is in a different year', () => {
          expect(
            shouldChevronBeDisabled(
              'right',
              beforeMaxDateDiffYear,
              testMaxDate,
            ),
          ).toBeFalsy();
        });
      });
    });
  });
});
