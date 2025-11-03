import range from 'lodash/range';

import { getValueFormatter } from '../getValueFormatter/getValueFormatter';

import { getNewSegmentValueFromInputValue } from './getNewSegmentValueFromInputValue';

const charsPerSegment = {
  day: 2,
  month: 2,
  year: 4,
};

const defaultMin = {
  day: 1,
  month: 1,
  year: 1970,
};

const defaultMax = {
  day: 31,
  month: 12,
  year: new Date().getFullYear(),
};

const segmentObj = {
  day: 'day',
  month: 'month',
  year: 'year',
};

describe('packages/input-box/utils/getNewSegmentValueFromInputValue', () => {
  describe.each(['day', 'month', 'year'])('For segment %p', _segment => {
    const segment = _segment as 'day' | 'month' | 'year';
    describe('when current value is empty', () => {
      test.each(range(10))('accepts %i character as input', i => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '',
          incomingValue: `${i}`,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual(`${i}`);
      });

      const validValues = [defaultMin[segment], defaultMax[segment]];
      test.each(validValues)(`accepts value "%i" as input`, v => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '',
          incomingValue: `${v}`,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual(`${v}`);
      });

      test('does not accept non-numeric characters', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '',
          incomingValue: `b`,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual('');
      });

      test('does not accept input with a period/decimal', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '',
          incomingValue: `2.`,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual('');
      });
    });

    describe('when current value is 0', () => {
      if (segment !== 'year') {
        test('rejects additional 0 as input', () => {
          const newValue = getNewSegmentValueFromInputValue({
            segmentName: segment,
            currentValue: '0',
            incomingValue: `00`,
            charsPerSegment: charsPerSegment[segment],
            defaultMin: defaultMin[segment],
            defaultMax: defaultMax[segment],
            segmentEnum: segmentObj,
          });
          expect(newValue).toEqual(`0`);
        });
      }

      if (segment === 'year') {
        test('accepts 0000 as input', () => {
          const newValue = getNewSegmentValueFromInputValue({
            segmentName: segment,
            currentValue: '0',
            incomingValue: `0000`,
            charsPerSegment: charsPerSegment[segment],
            defaultMin: defaultMin[segment],
            defaultMax: defaultMax[segment],
            segmentEnum: segmentObj,
            shouldSkipValidation: true,
          });
          expect(newValue).toEqual(`0000`);
        });
      }
      test.each(range(1, 10))('accepts 0%i as input', i => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '0',
          incomingValue: `0${i}`,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual(`0${i}`);
      });
      test('value can be deleted', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '0',
          incomingValue: ``,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
          shouldSkipValidation: segment === 'year',
        });
        expect(newValue).toEqual(``);
      });
    });

    describe('when current value is 1', () => {
      test('value can be deleted', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '1',
          incomingValue: ``,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
        });
        expect(newValue).toEqual(``);
      });

      if (segment === 'month') {
        test.each(range(0, 3))('accepts 1%i as input', i => {
          const newValue = getNewSegmentValueFromInputValue({
            segmentName: segment,
            currentValue: '1',
            incomingValue: `1${i}`,
            charsPerSegment: charsPerSegment[segment],
            defaultMin: defaultMin[segment],
            defaultMax: defaultMax[segment],
            segmentEnum: segmentObj,
          });
          expect(newValue).toEqual(`1${i}`);
        });
        describe.each(range(3, 10))('rejects 1%i', i => {
          test(`and sets input "${i}"`, () => {
            const newValue = getNewSegmentValueFromInputValue({
              segmentName: segment,
              currentValue: '1',
              incomingValue: `1${i}`,
              charsPerSegment: charsPerSegment[segment],
              defaultMin: defaultMin[segment],
              defaultMax: defaultMax[segment],
              segmentEnum: segmentObj,
            });
            expect(newValue).toEqual(`${i}`);
          });
        });
      } else {
        test.each(range(10))('accepts 1%i as input', i => {
          const newValue = getNewSegmentValueFromInputValue({
            segmentName: segment,
            currentValue: '1',
            incomingValue: `1${i}`,
            charsPerSegment: charsPerSegment[segment],
            defaultMin: defaultMin[segment],
            defaultMax: defaultMax[segment],
            segmentEnum: segmentObj,
            shouldSkipValidation: segment === 'year',
          });
          expect(newValue).toEqual(`1${i}`);
        });
      }
    });

    describe('when current value is 3', () => {
      test('value can be deleted', () => {
        const newValue = getNewSegmentValueFromInputValue({
          segmentName: segment,
          currentValue: '3',
          incomingValue: ``,
          charsPerSegment: charsPerSegment[segment],
          defaultMin: defaultMin[segment],
          defaultMax: defaultMax[segment],
          segmentEnum: segmentObj,
        });
        expect(newValue).toEqual(``);
      });

      switch (segment) {
        case 'day': {
          test.each(range(0, 2))('accepts 3%i as input', i => {
            const newValue = getNewSegmentValueFromInputValue({
              segmentName: segment,
              currentValue: '3',
              incomingValue: `3${i}`,
              charsPerSegment: charsPerSegment[segment],
              defaultMin: defaultMin[segment],
              defaultMax: defaultMax[segment],
              segmentEnum: segmentObj,
            });
            expect(newValue).toEqual(`3${i}`);
          });
          describe.each(range(3, 10))('rejects 3%i', i => {
            test(`and sets input to ${i}`, () => {
              const newValue = getNewSegmentValueFromInputValue({
                segmentName: segment,
                currentValue: '3',
                incomingValue: `3${i}`,
                charsPerSegment: charsPerSegment[segment],
                defaultMin: defaultMin[segment],
                defaultMax: defaultMax[segment],
                segmentEnum: segmentObj,
              });
              expect(newValue).toEqual(`${i}`);
            });
          });
          break;
        }

        case 'month': {
          describe.each(range(10))('rejects 3%i', i => {
            test(`and sets input "${i}"`, () => {
              const newValue = getNewSegmentValueFromInputValue({
                segmentName: segment,
                currentValue: '3',
                incomingValue: `3${i}`,
                charsPerSegment: charsPerSegment[segment],
                defaultMin: defaultMin[segment],
                defaultMax: defaultMax[segment],
                segmentEnum: segmentObj,
              });
              expect(newValue).toEqual(`${i}`);
            });
          });
          break;
        }

        default:
          break;
      }
    });

    describe('when current value is a full formatted value', () => {
      const formatter = getValueFormatter({
        charsPerSegment: charsPerSegment[segment],
      });
      const testValues = [defaultMin[segment], defaultMax[segment]].map(
        formatter,
      );
      test.each(testValues)(
        'when current value is %p, rejects additional input',
        val => {
          const newValue = getNewSegmentValueFromInputValue({
            segmentName: segment,
            currentValue: val,
            incomingValue: `${val}1`,
            charsPerSegment: charsPerSegment[segment],
            defaultMin: defaultMin[segment],
            defaultMax: defaultMax[segment],
            segmentEnum: segmentObj,
          });
          expect(newValue).toEqual(val);
        },
      );
    });
  });
});
