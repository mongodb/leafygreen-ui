import { getMonthName } from '.';

describe('packages/date-utils/getMonthName', () => {
  test('Default (English)', () => {
    expect(getMonthName(0)).toEqual(
      expect.objectContaining({ long: 'January', short: 'Jan' }),
    );

    expect(getMonthName(1)).toEqual(
      expect.objectContaining({ long: 'February', short: 'Feb' }),
    );

    expect(getMonthName(2)).toEqual(
      expect.objectContaining({ long: 'March', short: 'Mar' }),
    );

    expect(getMonthName(3)).toEqual(
      expect.objectContaining({ long: 'April', short: 'Apr' }),
    );

    expect(getMonthName(4)).toEqual(
      expect.objectContaining({ long: 'May', short: 'May' }),
    );

    expect(getMonthName(5)).toEqual(
      expect.objectContaining({ long: 'June', short: 'Jun' }),
    );

    expect(getMonthName(6)).toEqual(
      expect.objectContaining({ long: 'July', short: 'Jul' }),
    );

    expect(getMonthName(7)).toEqual(
      expect.objectContaining({ long: 'August', short: 'Aug' }),
    );

    expect(getMonthName(8)).toEqual(
      expect.objectContaining({ long: 'September', short: 'Sep' }),
    );

    expect(getMonthName(9)).toEqual(
      expect.objectContaining({ long: 'October', short: 'Oct' }),
    );

    expect(getMonthName(10)).toEqual(
      expect.objectContaining({ long: 'November', short: 'Nov' }),
    );

    expect(getMonthName(11)).toEqual(
      expect.objectContaining({ long: 'December', short: 'Dec' }),
    );
  });

  test('iso8601', () => {
    expect(getMonthName(0, 'iso8601')).toEqual(
      expect.objectContaining({ long: 'January', short: 'Jan' }),
    );

    expect(getMonthName(11, 'iso8601')).toEqual(
      expect.objectContaining({ long: 'December', short: 'Dec' }),
    );
  });

  test('es-MX (Spanish)', () => {
    expect(getMonthName(0, 'es-MX')).toEqual(
      expect.objectContaining({ long: 'enero', short: 'ene' }),
    );
    expect(getMonthName(11, 'es-MX')).toEqual(
      expect.objectContaining({ long: 'diciembre', short: 'dic' }),
    );
  });

  test('fr-FR (French)', () => {
    expect(getMonthName(0, 'fr-FR')).toEqual(
      expect.objectContaining({ long: 'janvier', short: 'janv.' }),
    );
    expect(getMonthName(11, 'fr-FR')).toEqual(
      expect.objectContaining({ long: 'décembre', short: 'déc.' }),
    );
  });
});
