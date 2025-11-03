import range from 'lodash/range';

import { getNewSegmentValueFromInputValue } from './getNewSegmentValueFromInputValue';

const segmentObj = {
  day: 'day',
  year: 'year',
  minute: 'minute',
};

describe('packages/input-box/utils/getNewSegmentValueFromInputValue', () => {
  describe('when segment is empty', () => {
    // accepts 0-9 characters as input
    test.each(range(10))('accepts %i character as input', i => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '',
        incomingValue: `${i}`,
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual(`${i}`);
    });

    test.each(range(9))('accepts 1%i character as input', i => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: `1${i}`,
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 19,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual(`1${i}`);
    });

    test('does not accept non-numeric characters', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '',
        incomingValue: `b`,
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('');
    });

    test('does not accept input with a period/decimal', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '',
        incomingValue: `2.`,
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('');
    });

    test('returns the current value when the incoming value is not a number', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: 'a',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('1');
    });
  });

  describe('when segment is not empty', () => {
    test('value can be deleted', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: '',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('');
    });

    test('does not accept value that would cause overflow', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '15',
        incomingValue: '150',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('15');
    });

    test('does not accept value that would cause overflow with leading 0', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '05',
        incomingValue: '050',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 15,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('05');
    });

    test('accepts a value between defaultMin and defaultMax', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: '34',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 35,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('34');
    });

    test('accepts defaultMax', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: '35',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 35,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('35');
    });

    test('accepts defaultMin', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '2',
        incomingValue: '1',
        charsPerSegment: 2,
        defaultMin: 1,
        defaultMax: 35,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('1');
    });

    test('does not accept a value greater than defaultMax', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'day',
        currentValue: '1',
        incomingValue: '36',
        charsPerSegment: 2,
        defaultMin: 0,
        defaultMax: 35,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('6');
    });

    describe('when current value is 0', () => {
      test('rejects additional 0 as input when min value is not 0', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: 'day',
          currentValue: '0',
          incomingValue: `00`,
          charsPerSegment: 2,
          defaultMin: 1,
          defaultMax: 15,
          segmentEnum: segmentObj,
        });
        expect(newValue).toEqual(`0`);
      });

      test('accepts 00 as input when min value is 0', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: 'day',
          currentValue: '0',
          incomingValue: `00`,
          charsPerSegment: 2,
          defaultMin: 0,
          defaultMax: 15,
          segmentEnum: segmentObj,
        });
        expect(newValue).toEqual(`00`);
      });

      test('accepts 00 as input when shouldSkipValidation is true and value is less than defaultMin', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: 'day',
          currentValue: '0',
          incomingValue: `00`,
          charsPerSegment: 2,
          defaultMin: 1,
          defaultMax: 15,
          segmentEnum: segmentObj,
          shouldSkipValidation: true,
        });
        expect(newValue).toEqual(`00`);
      });
    });
  });

  describe('multi-character segments (4 digits)', () => {
    test('accepts valid 4-digit value', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'year',
        currentValue: '202',
        incomingValue: '2024',
        charsPerSegment: 4,
        defaultMin: 1970,
        defaultMax: 2099,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('2024');
    });

    test('prevents overflow on 4-digit segment', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'year',
        currentValue: '2024',
        incomingValue: '20245',
        charsPerSegment: 4,
        defaultMin: 1970,
        defaultMax: 2099,
        segmentEnum: segmentObj,
      });
      expect(newValue).toEqual('2024');
    });

    test('truncates from start when shouldSkipValidation is true and value exceeds charsPerSegment', () => {
      const newValue = getNewSegmentValueFromInputValue({
        segmentName: 'year',
        currentValue: '000',
        incomingValue: '00001',
        charsPerSegment: 4,
        defaultMin: 1970,
        defaultMax: 2099,
        segmentEnum: segmentObj,
        shouldSkipValidation: true,
      });
      expect(newValue).toEqual('0001');
    });
  });
});
