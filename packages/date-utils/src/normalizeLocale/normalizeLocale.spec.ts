import { normalizeLocale } from '.';

describe('packages/date-utils/normalizeLocale', () => {
  test('pass through valid locale', () => {
    expect(normalizeLocale('de-DE')).toBe('de-DE');
  });

  test('resolve invalid locale to system', () => {
    expect(normalizeLocale('asdf')).toBe('en-US');
  });

  test('resolve undefined to system', () => {
    expect(normalizeLocale()).toBe('en-US');
  });
});
