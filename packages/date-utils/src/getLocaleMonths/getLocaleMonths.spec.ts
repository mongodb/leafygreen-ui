import { getLocaleMonths } from '.';

describe('packages/date-utils/getLocaleMonths', () => {
  test('default (English)', () => {
    expect(getLocaleMonths()).toHaveLength(12);
    getLocaleMonths().forEach(mo => {
      expect(mo).not.toBeUndefined();
      expect(mo).not.toBeNull();
    });
  });
  test('iso8601', () => {
    expect(getLocaleMonths('iso8601')).toHaveLength(12);
    getLocaleMonths('iso8601').forEach(mo => {
      expect(mo).not.toBeUndefined();
      expect(mo).not.toBeNull();
    });
  });
  test('jp-JP', () => {
    expect(getLocaleMonths('jp-JP')).toHaveLength(12);
    getLocaleMonths('jp-JP').forEach(mo => {
      expect(mo).not.toBeUndefined();
      expect(mo).not.toBeNull();
    });
  });
});
