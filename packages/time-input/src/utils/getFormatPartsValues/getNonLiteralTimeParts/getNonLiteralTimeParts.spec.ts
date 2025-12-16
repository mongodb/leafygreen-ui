import { getNonLiteralTimeParts } from './getNonLiteralTimeParts';

describe('packages/time-input/utils/getNonLiteralTimeParts', () => {
  test('returns the filtered time parts', () => {
    const filteredTimeParts = getNonLiteralTimeParts({
      timeParts: [
        { type: 'hour', value: '12' },
        { type: 'literal', value: ':' },
        { type: 'minute', value: '30' },
      ],
    });
    expect(filteredTimeParts).toEqual([
      { type: 'hour', value: '12' },
      { type: 'minute', value: '30' },
    ]);
  });
});
