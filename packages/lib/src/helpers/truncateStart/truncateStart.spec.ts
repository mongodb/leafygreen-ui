import { truncateStart } from '.';

describe('packages/lib/helpers/truncateStart', () => {
  test('does not truncate when less than maxLength', () => {
    expect(truncateStart('abc')).toBe('abc');
  });

  test('truncates to maxLength', () => {
    expect(truncateStart('abc', { length: 2 })).toBe('bc');
  });
});
