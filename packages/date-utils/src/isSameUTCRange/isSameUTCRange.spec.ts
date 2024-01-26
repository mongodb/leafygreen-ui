import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { isSameUTCRange } from '.';

describe('packages/date-utils/isSameUTCRange', () => {
  test('same start UTC, same end UTC', () => {
    expect(
      isSameUTCRange(
        [
          newUTC(2020, Month.June, 15, 0, 0),
          newUTC(2020, Month.July, 15, 0, 0),
        ],
        [
          newUTC(2020, Month.June, 15, 23, 0),
          newUTC(2020, Month.July, 15, 23, 0),
        ],
      ),
    ).toBe(true);
  });
  test('same start UTC, different end UTC', () => {
    expect(
      isSameUTCRange(
        [
          newUTC(2020, Month.June, 15, 0, 0),
          newUTC(2020, Month.July, 15, 0, 0),
        ],
        [
          newUTC(2020, Month.June, 15, 23, 0),
          newUTC(2020, Month.July, 14, 23, 0),
        ],
      ),
    ).toBe(false);
  });
  test('different start UTC, same end UTC', () => {
    expect(
      isSameUTCRange(
        [
          newUTC(2020, Month.June, 15, 0, 0),
          newUTC(2020, Month.July, 15, 0, 0),
        ],
        [
          newUTC(2020, Month.June, 14, 23, 0),
          newUTC(2020, Month.July, 15, 23, 0),
        ],
      ),
    ).toBe(false);
  });
  test('different start UTC, different end UTC', () => {
    expect(
      isSameUTCRange(
        [
          newUTC(2020, Month.June, 15, 0, 0),
          newUTC(2020, Month.July, 15, 0, 0),
        ],
        [
          newUTC(2020, Month.June, 14, 23, 0),
          newUTC(2020, Month.July, 14, 23, 0),
        ],
      ),
    ).toBe(false);
  });

  test('undefined start', () => {
    expect(
      isSameUTCRange(undefined, [
        newUTC(2020, Month.June, 15, 23, 0),
        newUTC(2020, Month.July, 14, 23, 0),
      ]),
    ).toBe(false);
  });

  test('undefined end', () => {
    expect(
      isSameUTCRange(
        [
          newUTC(2020, Month.June, 15, 23, 0),
          newUTC(2020, Month.July, 14, 23, 0),
        ],
        undefined,
      ),
    ).toBe(false);
  });
});
