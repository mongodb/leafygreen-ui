import { keyMap } from '@leafygreen-ui/lib';

import { getNewSegmentValueFromArrowKeyPress } from './getNewSegmentValueFromArrowKeyPress';

describe('packages/input-box/utils/getNewSegmentValueFromArrowKeyPress', () => {
  describe('ArrowUp key', () => {
    test('increments value by 1 when step is not provided', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(6);
    });

    test('increments value by custom step', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
        step: 5,
      });
      expect(result).toBe(10);
    });

    test('rolls over from max to min', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '31',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(1);
    });

    test('does not rollover when shouldNotRollover is true', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '2038',
        key: keyMap.ArrowUp,
        min: 1970,
        max: 2038,
        shouldNotRollover: true,
      });
      expect(result).toBe(2039);
    });

    test('rolls over when shouldNotRollover is false', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '12',
        key: keyMap.ArrowUp,
        min: 1,
        max: 12,
        shouldNotRollover: false,
      });
      expect(result).toBe(1);
    });

    test('defaults to min when value is empty', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(1);
    });

    test('handles value at min boundary', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(2);
    });

    test('handles mid-range value', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '15',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(16);
    });

    test('handles value at max boundary with rollover', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '31',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(1);
    });

    test('handles large step increments', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
        step: 10,
      });
      expect(result).toBe(15);
    });
  });

  describe('ArrowDown key', () => {
    test('decrements value by 1 when step is not provided', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
      });
      expect(result).toBe(4);
    });

    test('decrements value by custom step', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '10',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
        step: 5,
      });
      expect(result).toBe(5);
    });

    test('rolls over from min to max', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
      });
      expect(result).toBe(31);
    });

    test('rolls over from min to max for month range', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1',
        key: keyMap.ArrowDown,
        min: 1,
        max: 12,
      });
      expect(result).toBe(12);
    });

    test('does not rollover when shouldNotRollover is true', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1970',
        key: keyMap.ArrowDown,
        min: 1970,
        max: 2038,
        shouldNotRollover: true,
      });
      expect(result).toBe(1969);
    });

    test('rolls over when shouldNotRollover is false', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
        shouldNotRollover: false,
      });
      expect(result).toBe(31);
    });

    test('defaults to max when value is empty', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
      });
      expect(result).toBe(31);
    });

    test('handles value at max boundary', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '31',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
      });
      expect(result).toBe(30);
    });

    test('handles mid-range value', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '15',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
      });
      expect(result).toBe(14);
    });

    test('handles large step decrements', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '20',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
        step: 10,
      });
      expect(result).toBe(10);
    });
  });

  describe('edge cases', () => {
    test('handles step larger than range with rollover', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowUp,
        min: 1,
        max: 12,
        step: 20,
      });
      expect(result).toBe(2); // 25 rolls over to 2
    });

    test('handles step larger than range without rollover', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '5',
        key: keyMap.ArrowUp,
        min: 1,
        max: 12,
        step: 20,
        shouldNotRollover: true,
      });
      expect(result).toBe(25);
    });

    test('handles negative values when not rolling over', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '-5',
        key: keyMap.ArrowDown,
        min: -10,
        max: 10,
      });
      expect(result).toBe(-6);
    });

    test('handles rollover with negative range', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '-10',
        key: keyMap.ArrowDown,
        min: -10,
        max: 10,
      });
      expect(result).toBe(10);
    });

    test('handles zero as min value', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '0',
        key: keyMap.ArrowDown,
        min: 0,
        max: 23,
      });
      expect(result).toBe(23);
    });

    test('handles rollover at boundary with step', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '30',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
        step: 5,
      });
      expect(result).toBe(4); // 35 rolls to 4
    });

    test('handles going below min with step and rollover', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '3',
        key: keyMap.ArrowDown,
        min: 1,
        max: 31,
        step: 5,
      });
      expect(result).toBe(29); // -2 rolls to 29
    });
  });

  describe('shouldNotRollover behavior', () => {
    test('allows exceeding max when shouldNotRollover is true', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '2038',
        key: keyMap.ArrowUp,
        min: 1970,
        max: 2038,
        shouldNotRollover: true,
      });
      expect(result).toBe(2039);
    });

    test('allows going below min when shouldNotRollover is true', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '1970',
        key: keyMap.ArrowDown,
        min: 1970,
        max: 2038,
        shouldNotRollover: true,
      });
      expect(result).toBe(1969);
    });

    test('respects rollover by default', () => {
      const result = getNewSegmentValueFromArrowKeyPress({
        value: '31',
        key: keyMap.ArrowUp,
        min: 1,
        max: 31,
      });
      expect(result).toBe(1);
    });
  });
});
