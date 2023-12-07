import { getWeekdayName } from '.';
describe('packages/date-picker/utils/getWeekdayName', () => {
  test('English (default)', () => {
    expect(getWeekdayName(0)).toEqual({
      long: 'Sunday',
      short: 'Sun',
      narrow: 'S',
    });
  });

  test('iso8601', () => {
    expect(getWeekdayName(0, 'iso8601')).toEqual({
      long: 'Sunday',
      short: 'Sun',
      narrow: 'S',
    });
  });

  test('es-MX (Spanish)', () => {
    expect(getWeekdayName(0, 'es-MX')).toEqual({
      long: 'domingo',
      short: 'dom',
      narrow: 'D',
    });
  });

  test('fr-FR (French)', () => {
    expect(getWeekdayName(0, 'fr-FR')).toEqual({
      long: 'dimanche',
      short: 'dim.',
      narrow: 'D',
    });
  });

  test('en-MV (Maldives)', () => {
    expect(getWeekdayName(0, 'en-MV')).toEqual({
      long: 'Sunday',
      short: 'Sun',
      narrow: 'S',
    });
  });
});
