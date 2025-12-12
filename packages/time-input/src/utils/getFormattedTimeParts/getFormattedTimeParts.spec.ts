import { getFormattedTimeParts } from './getFormattedTimeParts';

describe('packages/time-input/utils/getFormattedTimeParts', () => {
  test('returns the formatted time parts with the default time parts', () => {
    const formattedTimeParts = getFormattedTimeParts([
      { type: 'hour', value: '12' },
      { type: 'minute', value: '30' },
      { type: 'second', value: '00' },
    ]);
    expect(formattedTimeParts).toEqual({
      hour: '12',
      minute: '30',
      second: '00',
      month: '',
      day: '',
      year: '',
      dayPeriod: 'AM',
    });
  });

  test('returns the formatted time parts without the default time parts', () => {
    const formattedTimeParts = getFormattedTimeParts([
      { type: 'hour', value: '12' },
      { type: 'minute', value: '30' },
      { type: 'second', value: '00' },
      { type: 'month', value: '01' },
      { type: 'day', value: '01' },
      { type: 'year', value: '2025' },
      { type: 'dayPeriod', value: 'PM' },
    ]);
    expect(formattedTimeParts).toEqual({
      hour: '12',
      minute: '30',
      second: '00',
      month: '01',
      day: '01',
      year: '2025',
      dayPeriod: 'PM',
    });
  });
});
