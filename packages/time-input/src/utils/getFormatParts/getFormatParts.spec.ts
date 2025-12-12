import { getFormatParts } from './getFormatParts';

describe('packages/time-input/utils/getFormatParts', () => {
  test('returns the correct format parts without seconds', () => {
    const formatParts = getFormatParts({});
    expect(formatParts).toEqual([
      { type: 'hour', value: '' },
      { type: 'literal', value: ':' },
      { type: 'minute', value: '' },
    ]);
  });

  test('returns the correct format parts with seconds', () => {
    const formatParts = getFormatParts({ showSeconds: true });
    expect(formatParts).toEqual([
      { type: 'hour', value: '' },
      { type: 'literal', value: ':' },
      { type: 'minute', value: '' },
      { type: 'literal', value: ':' },
      { type: 'second', value: '' },
    ]);
  });
});
