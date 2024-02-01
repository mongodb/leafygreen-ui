import range from 'lodash/range';

import { defaultMax, defaultMin } from '../../../../../constants';
import { DateSegment } from '../../../../../types';
import { getValueFormatter } from '../../../../../utils';

import { getNewSegmentValueFromInputValue } from './getNewSegmentValueFromInputValue';

describe('packages/date-picker/shared/date-input-segment/getNewSegmentValueFromInputValue', () => {
  describe.each(['day', 'month', 'year'])(
    'For segment %p',
    (segment: DateSegment) => {
      describe('when current value is empty', () => {
        test.each(range(10))('accepts %i character as input', i => {
          const newValue = getNewSegmentValueFromInputValue(
            segment,
            '',
            `${i}`,
          );
          expect(newValue).toEqual(`${i}`);
        });

        const validValues = [defaultMin[segment], defaultMax[segment]];
        test.each(validValues)(`accepts value "%i" as input`, v => {
          const newValue = getNewSegmentValueFromInputValue(
            segment,
            '',
            `${v}`,
          );
          expect(newValue).toEqual(`${v}`);
        });

        test('does not accept non-numeric characters', () => {
          const newValue = getNewSegmentValueFromInputValue(segment, '', `b`);
          expect(newValue).toEqual('');
        });

        test('does not accept input with a period/decimal', () => {
          const newValue = getNewSegmentValueFromInputValue(segment, '', `2.`);
          expect(newValue).toEqual('');
        });
      });

      describe('when current value is 0', () => {
        if (segment !== 'year') {
          test('rejects additional 0 as input', () => {
            const newValue = getNewSegmentValueFromInputValue(
              segment,
              '0',
              `00`,
            );
            expect(newValue).toEqual(`0`);
          });
        }
        test.each(range(1, 10))('accepts 0%i as input', i => {
          const newValue = getNewSegmentValueFromInputValue(
            segment,
            '0',
            `0${i}`,
          );
          expect(newValue).toEqual(`0${i}`);
        });
        test('value can be deleted', () => {
          const newValue = getNewSegmentValueFromInputValue(segment, '0', ``);
          expect(newValue).toEqual(``);
        });
      });

      describe('when current value is 1', () => {
        test('value can be deleted', () => {
          const newValue = getNewSegmentValueFromInputValue(segment, '1', ``);
          expect(newValue).toEqual(``);
        });

        if (segment === 'month') {
          test.each(range(0, 3))('accepts 1%i as input', i => {
            const newValue = getNewSegmentValueFromInputValue(
              segment,
              '1',
              `1${i}`,
            );
            expect(newValue).toEqual(`1${i}`);
          });
          describe.each(range(3, 10))('rejects 1%i', i => {
            test(`and sets input "${i}"`, () => {
              const newValue = getNewSegmentValueFromInputValue(
                segment,
                '1',
                `1${i}`,
              );
              expect(newValue).toEqual(`${i}`);
            });
          });
        } else {
          test.each(range(10))('accepts 1%i as input', i => {
            const newValue = getNewSegmentValueFromInputValue(
              segment,
              '1',
              `1${i}`,
            );
            expect(newValue).toEqual(`1${i}`);
          });
        }
      });

      describe('when current value is 3', () => {
        test('value can be deleted', () => {
          const newValue = getNewSegmentValueFromInputValue(segment, '3', ``);
          expect(newValue).toEqual(``);
        });

        switch (segment) {
          case 'day': {
            test.each(range(0, 2))('accepts 3%i as input', i => {
              const newValue = getNewSegmentValueFromInputValue(
                segment,
                '3',
                `3${i}`,
              );
              expect(newValue).toEqual(`3${i}`);
            });
            describe.each(range(3, 10))('rejects 3%i', i => {
              test(`and sets input to ${i}`, () => {
                const newValue = getNewSegmentValueFromInputValue(
                  segment,
                  '3',
                  `3${i}`,
                );
                expect(newValue).toEqual(`${i}`);
              });
            });
            break;
          }

          case 'month': {
            describe.each(range(10))('rejects 3%i', i => {
              test(`and sets input "${i}"`, () => {
                const newValue = getNewSegmentValueFromInputValue(
                  segment,
                  '3',
                  `3${i}`,
                );
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
        const formatter = getValueFormatter(segment);
        const testValues = [defaultMin[segment], defaultMax[segment]].map(
          formatter,
        );
        test.each(testValues)(
          'when current value is %p, rejects additional input',
          val => {
            const newValue = getNewSegmentValueFromInputValue(
              segment,
              val,
              `${val}1`,
            );
            expect(newValue).toEqual(val);
          },
        );
      });
    },
  );
});
