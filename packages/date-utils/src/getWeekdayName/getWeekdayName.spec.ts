import { getWeekdayName } from '.';
describe('packages/date-utils/getWeekdayName', () => {
  test('default (English)', () => {
    expect(getWeekdayName(0)).toEqual(
      expect.objectContaining({
        long: 'Sunday',
        abbr: 'Sun',
        short: 'Su',
        narrow: 'S',
      }),
    );
    expect(getWeekdayName(6)).toEqual(
      expect.objectContaining({
        long: 'Saturday',
        abbr: 'Sat',
        short: 'Sa',
        narrow: 'S',
      }),
    );
  });

  test('iso8601', () => {
    expect(getWeekdayName(0, 'iso8601')).toEqual(
      expect.objectContaining({
        long: 'Sunday',
        short: 'Su',
      }),
    );
  });

  test('es-MX (Spanish)', () => {
    expect(getWeekdayName(0, 'es-MX')).toEqual(
      expect.objectContaining({
        long: 'domingo',
        short: 'do',
      }),
    );
  });

  test('fr-FR (French)', () => {
    expect(getWeekdayName(0, 'fr-FR')).toEqual(
      expect.objectContaining({
        long: 'dimanche',
        short: 'di',
      }),
    );
  });

  test('de-DE (German)', () => {
    expect(getWeekdayName(0, 'de-DE')).toEqual(
      expect.objectContaining({
        long: 'Sonntag',
        short: 'So',
      }),
    );
  });
});
