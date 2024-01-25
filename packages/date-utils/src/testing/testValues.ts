export const testTimeZones = [
  { tz: 'Pacific/Honolulu', UTCOffset: -10 },
  { tz: 'America/Los_Angeles', UTCOffset: -8 },
  { tz: 'America/New_York', UTCOffset: -5 },
  { tz: 'Europe/London', UTCOffset: +0 },
  { tz: 'Asia/Istanbul', UTCOffset: +3 },
  { tz: 'Asia/Seoul', UTCOffset: +9 },
  { tz: 'Pacific/Kiritimati', UTCOffset: +14 },
] as const;

export const undefinedTZ = {
  tz: undefined,
  UTCOffset: undefined,
};

/** Time zones used to test with */
export const testTimeZoneLabels = testTimeZones.map(({ tz }) => tz);

/** Locales (date formats) to test with:
 *
 * English-US
 * English-UK
 * German (Germany) (uses `.` char separator)
 * Farsi-Afghanistan (week starts on Sat)
 * English-Maldives (week starts on Fri.)
 */
export const testLocales = [
  'iso8601',
  'de-DE', // German, Germany (uses `.` char separator)
  'en-US', // English, US (week starts on Sun.)
  'en-GB', // English, UK (week starts on Mon.)
  'en-MV', // English, Maldives (week starts on Fri.)
  'es-MX', // Spanish, Mexico
  'fa-AF', // Farsi, Afghanistan (week starts on Sat.)
  'fr-FR', // French, France
  'he-IL', // Hebrew, Israel
  'ja-JP', // Japanese, Japan
  'zh-CN', // Chinese, China
] as const;
