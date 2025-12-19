import { getFormattedDateTimeParts } from './getFormattedDateTimeParts';

describe('packages/time-input/utils/getFormattedDateTimeParts', () => {
  test('returns the formatted date time parts with the default date time parts', () => {
    const formattedDateTimeParts = getFormattedDateTimeParts([
      { type: 'day', value: '12' },
      { type: 'month', value: '01' },
      { type: 'year', value: '2025' },
    ]);
    expect(formattedDateTimeParts).toEqual({
      day: '12',
      month: '01',
      year: '2025',
      hour: '',
      minute: '',
      second: '',
      dayPeriod: 'AM',
    });
  });

  test('returns the formatted time parts without the default time parts', () => {
    const formattedDateTimeParts = getFormattedDateTimeParts([
      { type: 'hour', value: '12' },
      { type: 'minute', value: '30' },
      { type: 'second', value: '00' },
      { type: 'month', value: '01' },
      { type: 'day', value: '01' },
      { type: 'year', value: '2025' },
      { type: 'dayPeriod', value: 'PM' },
    ]);
    expect(formattedDateTimeParts).toEqual({
      hour: '12',
      minute: '30',
      second: '00',
      month: '01',
      day: '01',
      year: '2025',
      dayPeriod: 'PM',
    });
  });

  test('returns the formatted time parts with the default time parts when time parts is an empty array', () => {
    const formattedDateTimeParts = getFormattedDateTimeParts([]);
    expect(formattedDateTimeParts).toEqual({
      hour: '',
      minute: '',
      second: '',
      month: '',
      day: '',
      year: '',
      dayPeriod: 'AM',
    });
  });
});
