import { getFilteredTimeParts } from './getFilteredTimeParts';

describe('packages/time-input/utils/getFilteredTimeParts', () => {
  test('returns the filtered time parts', () => {
    const filteredTimeParts = getFilteredTimeParts({
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
