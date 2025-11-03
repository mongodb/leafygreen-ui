import { getValueFormatter } from './getValueFormatter';

type Segment = 'one' | 'two' | 'three';
const charsPerSegment: Record<Segment, number> = {
  one: 1,
  two: 2,
  three: 3,
};

describe('packages/input-box/utils/valueFormatter', () => {
  describe('one segment', () => {
    const formatter = getValueFormatter({
      charsPerSegment: charsPerSegment['one'],
    });

    test('returns the value as is', () => {
      expect(formatter('1')).toEqual('1');
    });

    test('sets 0 to empty string', () => {
      expect(formatter('0')).toEqual('');
    });

    test('sets undefined to empty string', () => {
      expect(formatter(undefined)).toEqual('');
    });
  });

  describe('two segments', () => {
    const formatter = getValueFormatter({
      charsPerSegment: charsPerSegment['two'],
    });

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

  describe('three segments', () => {
    const formatter = getValueFormatter({
      charsPerSegment: charsPerSegment['three'],
    });

    test('formats 4 digit values', () => {
      expect(formatter('202')).toEqual('202');
    });

    test('pads < 3 digit value', () => {
      expect(formatter('12')).toEqual('012');
    });

    test('truncates 4+ digit values', () => {
      expect(formatter('1234')).toEqual('234');
    });

    test('truncates 4+ digit padded values', () => {
      expect(formatter('02345')).toEqual('345');
    });

    test('sets 0 to empty string', () => {
      expect(formatter('0')).toEqual('');
    });

    test('sets undefined to empty string', () => {
      expect(formatter(undefined)).toEqual('');
    });
  });

  describe('with allowZero allows leading zeros', () => {
    test('with one segment', () => {
      const formatter = getValueFormatter({
        charsPerSegment: charsPerSegment['one'],
        allowZero: true,
      });
      expect(formatter('0')).toEqual('0');
    });

    test('with two segments', () => {
      const formatter = getValueFormatter({
        charsPerSegment: charsPerSegment['two'],
        allowZero: true,
      });
      expect(formatter('0')).toEqual('00');
    });

    test('with three segments', () => {
      const formatter = getValueFormatter({
        charsPerSegment: charsPerSegment['three'],
        allowZero: true,
      });
      expect(formatter('0')).toEqual('000');
    });
  });
});
