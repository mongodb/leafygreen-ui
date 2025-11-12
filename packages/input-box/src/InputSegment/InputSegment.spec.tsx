import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { type InputSegmentChangeEventHandler } from '../shared.types';
import { renderSegment } from '../testutils';
import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  SegmentObjMock,
} from '../testutils/testutils.mocks';
import { getValueFormatter } from '../utils';

import { InputSegment } from '.';

describe('packages/input-segment', () => {
  describe('aria attributes', () => {
    test('does not have basic accessibility issues when tooltip is not open', async () => {
      const { container } = renderSegment({
        segment: 'day',
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test(`segment has aria-label`, () => {
      const { input } = renderSegment({
        segment: 'day',
      });
      expect(input).toHaveAttribute('aria-label', 'day');
    });

    test('has role="spinbutton"', () => {
      const { input } = renderSegment({});
      expect(input).toHaveAttribute('role', 'spinbutton');
    });

    test('has min and max attributes', () => {
      const { input } = renderSegment({
        segment: 'day',
        minSegmentValue: defaultMinMock['day'],
        maxSegmentValue: defaultMaxMock['day'],
      });
      expect(input).toHaveAttribute('min', String(defaultMinMock['day']));
      expect(input).toHaveAttribute('max', String(defaultMaxMock['day']));
    });
  });

  describe('rendering', () => {
    test('Rendering with undefined sets the value to empty string', () => {
      const { input } = renderSegment({
        segment: 'day',
        value: '',
      });
      expect(input.value).toBe('');
    });

    test('Rendering with a value sets the input value', () => {
      const { input } = renderSegment({
        segment: 'day',
        value: '12',
      });
      expect(input.value).toBe('12');
    });

    test('rerendering updates the value', () => {
      const { getInput, rerenderSegment } = renderSegment({
        segment: 'day',
        value: '12',
      });

      rerenderSegment({
        value: '08',
      });
      expect(getInput().value).toBe('08');
    });
  });

  describe('typing', () => {
    describe('into an empty segment', () => {
      test('calls the change handler', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          onChange: onChangeHandler,
        });

        userEvent.type(input, '8');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '8' }),
        );
      });

      test('allows zero character', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          onChange: onChangeHandler,
        });

        userEvent.type(input, '0');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '0' }),
        );
      });

      test('does not allow non-number characters', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          onChange: onChangeHandler,
        });
        userEvent.type(input, 'aB$/');
        expect(onChangeHandler).not.toHaveBeenCalled();
      });
    });

    describe('into a segment with a value', () => {
      test('allows typing additional characters if the current value is incomplete', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          value: '2',
          onChange: onChangeHandler,
        });

        userEvent.type(input, '6');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '26' }),
        );
      });

      test('resets the value when the value is complete', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          value: '26',
          maxSegmentValue: 31,
          onChange: onChangeHandler,
        });

        userEvent.type(input, '4');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '4' }),
        );
      });
    });

    describe('keyboard events', () => {
      describe('Arrow keys', () => {
        const formatter = getValueFormatter({
          charsPerSegment: charsPerSegmentMock['day'],
          allowZero: defaultMinMock['day'] === 0,
        });

        describe('Up arrow', () => {
          test('calls handler with value default +1 step', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(15),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(16),
              }),
            );
          });

          test('calls handler with custom `step`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              step: 2,
              onChange: onChangeHandler,
              value: formatter(15),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(17),
              }),
            );
          });

          test('calls handler with `min`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(0),
              }),
            );
          });

          test('rolls value over to `min` value if value exceeds `max`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(31),
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(0),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              shouldWrap: false,
              onChange: onChangeHandler,
              value: formatter(31),
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(31 + 1),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false and value is less than min', () => {
            const formatter = getValueFormatter({
              charsPerSegment: 4,
              allowZero: false,
            });

            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'year',
              minSegmentValue: 1970,
              maxSegmentValue: 2038,
              charsPerSegment: 4,
              shouldWrap: false,
              onChange: onChangeHandler,
              value: '3',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                segment: 'year',
                value: formatter(3 + 1),
              }),
            );
          });

          test('formats value with leading zero', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '06',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: '07' }),
            );
          });

          test('formats values without leading zeros', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '3',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(3 + 1) }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value default -1 step', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(15),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(15 - 1),
              }),
            );
          });

          test('calls handler with custom `step`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              step: 2,
              onChange: onChangeHandler,
              value: formatter(15),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(15 - 2),
              }),
            );
          });

          test('calls handler with `max`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(31),
              }),
            );
          });

          test('rolls value over to `max` value if value exceeds `min`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(0),
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(31),
              }),
            );
          });

          /* eslint-disable jest/no-disabled-tests */
          test.skip('does not wrap if `shouldWrap` is false', () => {
            // TODO: this should not wrap the min value
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              shouldWrap: false,
              onChange: onChangeHandler,
              value: formatter(0),
              maxSegmentValue: 31,
              minSegmentValue: 0,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(0 - 1),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false and value is less than min', () => {
            const formatter = getValueFormatter({
              charsPerSegment: 4,
              allowZero: false,
            });

            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'year',
              minSegmentValue: 1970,
              maxSegmentValue: 2038,
              charsPerSegment: 4,
              shouldWrap: false,
              onChange: onChangeHandler,
              value: '3',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                segment: 'year',
                value: formatter(3 - 1),
              }),
            );
          });

          test('formats value with leading zero', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '06',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: '05' }),
            );
          });

          test('formats values without leading zeros', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '3',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(3 - 1) }),
            );
          });
        });

        describe('Backspace', () => {
          test('clears the input when there is a value', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '12',
            });

            userEvent.type(input, '{backspace}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: '' }),
            );
          });

          test('does not call the onChangeHandler when the value is initially empty', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{backspace}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });
        });

        describe('Space', () => {
          describe('on a single SPACE', () => {
            test('does not call the onChangeHandler when the value is initially empty', () => {
              const onChangeHandler =
                jest.fn() as InputSegmentChangeEventHandler<
                  SegmentObjMock,
                  string
                >;

              const { input } = renderSegment({
                segment: 'day',
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{space}');
              expect(onChangeHandler).not.toHaveBeenCalled();
            });

            test('calls the onChangeHandler when the value is present', () => {
              const onChangeHandler =
                jest.fn() as InputSegmentChangeEventHandler<
                  SegmentObjMock,
                  string
                >;
              const { input } = renderSegment({
                segment: 'day',
                onChange: onChangeHandler,
                value: '12',
              });

              userEvent.type(input, '{space}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({ value: '' }),
              );
            });
          });

          describe('on a double SPACE', () => {
            test('does not call the onChangeHandler when the value is initially empty', () => {
              const onChangeHandler =
                jest.fn() as InputSegmentChangeEventHandler<
                  SegmentObjMock,
                  string
                >;
              const { input } = renderSegment({
                segment: 'day',
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{space}{space}');
              expect(onChangeHandler).not.toHaveBeenCalled();
            });

            test('calls the onChangeHandler when the value is present', () => {
              const onChangeHandler =
                jest.fn() as InputSegmentChangeEventHandler<
                  SegmentObjMock,
                  string
                >;
              const { input } = renderSegment({
                segment: 'day',
                onChange: onChangeHandler,
                value: '12',
              });

              userEvent.type(input, '{space}{space}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({ value: '' }),
              );
            });
          });
        });
      });
    });

    describe('min/max range', () => {
      test('does not allow values outside max range', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        const { input } = renderSegment({
          segment: 'day',
          onChange: onChangeHandler,
          value: '3',
          maxSegmentValue: 31,
          minSegmentValue: 0,
        });
        userEvent.type(input, '2');

        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '2' }),
        );
      });

      test('allows values below min range', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        // min is 1. We allow values below min range.
        const { input } = renderSegment({
          segment: 'month',
          minSegmentValue: 1,
          maxSegmentValue: 12,
          onChange: onChangeHandler,
          value: '',
        });
        userEvent.type(input, '0');

        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '0' }),
        );
      });

      test('allows values above max range when shouldValidate is false', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;

        const { input } = renderSegment({
          segment: 'year',
          charsPerSegment: 4,
          maxSegmentValue: 2038,
          shouldValidate: false,
          onChange: onChangeHandler,
          value: '203',
        });
        userEvent.type(input, '9');

        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '2039' }),
        );
      });
    });
  });

  describe('onBlur handler', () => {
    test('calls the onBlur handler when the input is blurred', () => {
      const onBlurHandler = jest.fn();
      const { input } = renderSegment({
        segment: 'day',
        onBlur: onBlurHandler,
      });

      input.focus();
      input.blur();

      expect(onBlurHandler).toHaveBeenCalled();
    });
  });

  describe('onKeyDown handler', () => {
    test('calls the onKeyDown handler when a key is pressed', () => {
      const onKeyDownHandler = jest.fn();
      const { input } = renderSegment({
        segment: 'day',
        onKeyDown: onKeyDownHandler,
      });

      userEvent.type(input, '5');

      expect(onKeyDownHandler).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    test('input is disabled when disabled context prop is true', () => {
      const { input } = renderSegment({
        segment: 'day',
        disabled: true,
      });

      expect(input).toBeDisabled();
    });

    test('does not call onChange when disabled and typed into', () => {
      const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const { input } = renderSegment({
        segment: 'day',
        disabled: true,
        onChange: onChangeHandler,
      });

      userEvent.type(input, '5');

      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe('shouldSkipValidation prop', () => {
    test('allows values outside min/max range when shouldValidate is false', () => {
      const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const { input } = renderSegment({
        segment: 'day',
        shouldValidate: false,
        onChange: onChangeHandler,
        value: '9',
      });

      userEvent.type(input, '9');

      expect(onChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ segment: 'day', value: '99' }),
      );
    });

    test('does not allows values outside min/max range when shouldValidate is true', () => {
      const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const { input } = renderSegment({
        segment: 'day',
        shouldValidate: true,
        onChange: onChangeHandler,
        value: '9',
      });

      userEvent.type(input, '9');

      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('InputSegment throws error when no required props are provided', () => {
      // @ts-expect-error - missing required props
      <InputSegment />;
    });

    test('With required props', () => {
      <InputSegment
        segment="day"
        minSegmentValue={1}
        maxSegmentValue={31}
        value=""
        charsPerSegment={2}
        onChange={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        disabled={false}
        size={'default'}
        segmentEnum={SegmentObjMock}
      />;
    });

    test('With all props', () => {
      <InputSegment
        segment="day"
        minSegmentValue={1}
        maxSegmentValue={31}
        value=""
        charsPerSegment={2}
        onChange={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        disabled={false}
        size={'default'}
        segmentEnum={SegmentObjMock}
        data-testid="test-id"
        id="day"
        ref={React.createRef<HTMLInputElement>()}
      />;
    });
  });
});
