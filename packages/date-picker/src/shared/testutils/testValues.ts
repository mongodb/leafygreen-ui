import { createRef } from 'react';

import { SegmentRefs } from '../hooks';

export const segmentRefsMock: SegmentRefs = {
  day: createRef<HTMLInputElement>(),
  month: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};

export const testTimeZones = [
  { tz: 'Pacific/Honolulu', UTCOffset: -10 },
  { tz: 'America/Los_Angeles', UTCOffset: -8 },
  { tz: 'America/New_York', UTCOffset: -5 },
  { tz: 'Europe/London', UTCOffset: +0 },
  { tz: 'Asia/Istanbul', UTCOffset: +3 },
  { tz: 'Asia/Seoul', UTCOffset: +9 },
  { tz: 'Pacific/Auckland', UTCOffset: +13 },
] as const;

/** Time zones used to test with */
export const TimeZones = testTimeZones.map(({ tz }) => tz);

/** Locales (date formats) to test with:
 *
 * English-US
 * English-UK
 * German (Germany) (uses `.` char separator)
 * Farsi-Afghanistan (week starts on Sat)
 * English-Maldives (week starts on Fri.)
 */
export const Locales = [
  'iso8601',
  'en-US',
  'en-UK',
  'de-DE',
  'fa-AF',
  'es-MX',
  'fr-FR',
  'en-MV',
];
