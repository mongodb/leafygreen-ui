import { getMonthIndex } from '.';

describe('packages/date-utils/getMonthIndex', () => {
  test('Default (English) long', () => {
    expect(getMonthIndex('January')).toBe(0);
    expect(getMonthIndex('December')).toBe(11);
  });
  test('Default (English) short', () => {
    expect(getMonthIndex('Jan')).toBe(0);
    expect(getMonthIndex('Dec')).toBe(11);
  });

  test('Spanish long', () => {
    expect(getMonthIndex('enero', 'es-MX')).toBe(0);
    expect(getMonthIndex('diciembre', 'es-MX')).toBe(11);
  });
  test('Spanish short', () => {
    expect(getMonthIndex('ene', 'es-MX')).toBe(0);
    expect(getMonthIndex('dic', 'es-MX')).toBe(11);
  });

  test('French long', () => {
    expect(getMonthIndex('janvier', 'fr-FR')).toBe(0);
    expect(getMonthIndex('décembre', 'fr-FR')).toBe(11);
  });
  test('French short', () => {
    expect(getMonthIndex('janv.', 'fr-FR')).toBe(0);
    expect(getMonthIndex('déc.', 'fr-FR')).toBe(11);
  });
});
