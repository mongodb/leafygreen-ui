import { getLocaleWeekdays } from '.';

describe('packages/date-utils/getLocaleWeekdays', () => {
  test('English (default)', () => {
    expect(getLocaleWeekdays()).toHaveLength(7);
    getLocaleWeekdays().forEach(w => {
      expect(w).not.toBeUndefined();
      expect(w).not.toBeNull();
    });
  });

  test('iso8601', () => {
    expect(getLocaleWeekdays('iso8601')).toHaveLength(7);
    getLocaleWeekdays('iso8601').forEach(w => {
      expect(w).not.toBeUndefined();
      expect(w).not.toBeNull();
    });
  });

  test('es-MX', () => {
    expect(getLocaleWeekdays('es-MX')).toHaveLength(7);
    getLocaleWeekdays('es-MX').forEach(w => {
      expect(w).not.toBeUndefined();
      expect(w).not.toBeNull();
    });
  });

  test('fr-FR', () => {
    expect(getLocaleWeekdays('fr-FR')).toHaveLength(7);
    getLocaleWeekdays('fr-FR').forEach(w => {
      expect(w).not.toBeUndefined();
      expect(w).not.toBeNull();
    });
  });
});
