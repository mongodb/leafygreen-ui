import { DateSegment } from '../../types';

import { getValueFormatter } from '.';

describe('packages/date-picker/utils/valueFormatter', () => {
  describe.each(['day', 'month'] as Array<DateSegment>)('', segment => {
    const formatter = getValueFormatter(segment);

    test('formats 2 digit values', () => {
      expect(formatter('12')).toEqual('12');
    });

    test('pads 1 digit value', () => {
      expect(formatter('2')).toEqual('02');
    });

    test('truncates 3+ digit values', () => {
      expect(formatter('123')).toEqual('23');
    });

    test('truncates 3+ digit padded values', () => {
      expect(formatter('012')).toEqual('12');
    });

    test('sets 0 to empty string', () => {
      expect(formatter('0')).toEqual('');
    });

    test('sets undefined to empty string', () => {
      expect(formatter(undefined)).toEqual('');
    });
  });

  describe('year', () => {
    const formatter = getValueFormatter('year');

    test('formats 4 digit values', () => {
      expect(formatter('2023')).toEqual('2023');
    });

    test('pads < 4 digit value', () => {
      expect(formatter('123')).toEqual('0123');
    });

    test('truncates 5+ digit values', () => {
      expect(formatter('12345')).toEqual('2345');
    });

    test('truncates 5+ digit padded values', () => {
      expect(formatter('02345')).toEqual('2345');
    });

    test('sets 0 to empty string', () => {
      expect(formatter('0')).toEqual('');
    });

    test('sets undefined to empty string', () => {
      expect(formatter(undefined)).toEqual('');
    });
  });
});
