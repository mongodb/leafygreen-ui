import { getLocaleMonths } from '.';

describe('packages/date-picker/utils/getLocaleMonths', () => {
  test('en-US', () => {
    expect(getLocaleMonths('en-US')).toEqual([
      {
        long: 'January',
        short: 'Jan',
      },
      {
        long: 'February',
        short: 'Feb',
      },
      {
        long: 'March',
        short: 'Mar',
      },
      {
        long: 'April',
        short: 'Apr',
      },
      {
        long: 'May',
        short: 'May',
      },
      {
        long: 'June',
        short: 'Jun',
      },
      {
        long: 'July',
        short: 'Jul',
      },
      {
        long: 'August',
        short: 'Aug',
      },
      {
        long: 'September',
        short: 'Sep',
      },
      {
        long: 'October',
        short: 'Oct',
      },
      {
        long: 'November',
        short: 'Nov',
      },
      {
        long: 'December',
        short: 'Dec',
      },
    ]);
  });
  test('iso8601', () => {
    expect(getLocaleMonths('iso8601')).toEqual([
      {
        long: 'January',
        short: 'Jan',
      },
      {
        long: 'February',
        short: 'Feb',
      },
      {
        long: 'March',
        short: 'Mar',
      },
      {
        long: 'April',
        short: 'Apr',
      },
      {
        long: 'May',
        short: 'May',
      },
      {
        long: 'June',
        short: 'Jun',
      },
      {
        long: 'July',
        short: 'Jul',
      },
      {
        long: 'August',
        short: 'Aug',
      },
      {
        long: 'September',
        short: 'Sep',
      },
      {
        long: 'October',
        short: 'Oct',
      },
      {
        long: 'November',
        short: 'Nov',
      },
      {
        long: 'December',
        short: 'Dec',
      },
    ]);
  });
});
