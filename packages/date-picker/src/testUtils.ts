import userEvent from '@testing-library/user-event';
import { range } from 'lodash';

/** Time zones used to test with */
export const TimeZones = [
  'Pacific/Honolulu',
  'America/Los_Angeles',
  'America/New_York',
  'Europe/London',
  'Asia/Istanbul',
  'Asia/Seoul',
  'Pacific/Auckland',
];

/** Locales (date formats) to test with:
 *
 * English-US
 * English-UK
 * German (Germany) (uses `.` char separator)
 * Farsi-Afghanistan (week starts on Sat)
 * English-Maldives (week starts on Fri.)
 */
export const Locales = ['iso8601', 'en-US', 'en-UK', 'de-DE', 'fa-AF', 'en-MV'];

/** Presses the `tab` key `count` times */
export const tabNTimes = (count: number) => {
  for (const _ in range(count)) {
    userEvent.tab();
  }
};
