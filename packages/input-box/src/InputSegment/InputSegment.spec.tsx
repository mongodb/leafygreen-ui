import React from 'react';
import userEvent from '@testing-library/user-event';

import { InputSegmentChangeEventHandler } from '../shared/types';
import { renderSegment, setSegmentProps } from '../testutils';
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
    test(`segment has aria-label`, () => {
      const { input } = renderSegment({
        props: { segment: 'day' },
      });
      expect(input).toHaveAttribute('aria-label', 'day');
    });

    test('has role="spinbutton"', () => {
      const { input } = renderSegment({});
      expect(input).toHaveAttribute('role', 'spinbutton');
    });

    test('has min and max attributes', () => {
      const { input } = renderSegment({
        props: { segment: 'day' },
      });
      expect(input).toHaveAttribute('min', String(defaultMinMock['day']));
      expect(input).toHaveAttribute('max', String(defaultMaxMock['day']));
    });
  });

  describe('rendering', () => {
    test('Rendering with undefined sets the value to empty string', () => {
      const { input } = renderSegment({});
      expect(input.value).toBe('');
    });

    test('Rendering with a value sets the input value', () => {
      const { input } = renderSegment({
        providerProps: { segments: { day: '12', month: '', year: '' } },
      });
      expect(input.value).toBe('12');
    });

    test('rerendering updates the value', () => {
      const { getInput, rerenderSegment } = renderSegment({
        providerProps: { segments: { day: '12', month: '', year: '' } },
      });

      rerenderSegment({
        newProviderProps: { segments: { day: '08', month: '', year: '' } },
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
          providerProps: { onChange: onChangeHandler },
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
          providerProps: { onChange: onChangeHandler },
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
          providerProps: { onChange: onChangeHandler },
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
          providerProps: {
            segments: { day: '2', month: '', year: '' },
            onChange: onChangeHandler,
          },
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
          providerProps: {
            segments: { day: '26', month: '', year: '' },
            onChange: onChangeHandler,
          },
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
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: formatter(15), month: '', year: '' },
              },
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
              props: { segment: 'day', step: 2 },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: formatter(15), month: '', year: '' },
              },
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
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '', month: '', year: '' },
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMinMock['day']),
              }),
            );
          });

          test('rolls value over to `min` value if value exceeds `max`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: {
                  day: formatter(defaultMaxMock['day']),
                  month: '',
                  year: '',
                },
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMinMock['day']),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { shouldWrap: false },
              providerProps: {
                onChange: onChangeHandler,
                segments: {
                  day: formatter(defaultMaxMock['day']),
                  month: '',
                  year: '',
                },
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMaxMock['day'] + 1),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false and value is less than min', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: {
                ...setSegmentProps('year'),
                shouldWrap: false,
              },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '0', month: '', year: '3' },
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ segment: 'year', value: '0004' }),
            );
          });

          test('formats value with leading zero', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '06', month: '', year: '' },
              },
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
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '3', month: '', year: '' },
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: '04' }),
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
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: formatter(15), month: '', year: '' },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(14),
              }),
            );
          });

          test('calls handler with custom `step`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { step: 2 },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: formatter(15), month: '', year: '' },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(13),
              }),
            );
          });

          test('calls handler with `max`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { segment: 'day' },
              providerProps: { onChange: onChangeHandler },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMaxMock['day']),
              }),
            );
          });

          test('rolls value over to `max` value if value exceeds `min`', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              providerProps: {
                onChange: onChangeHandler,
                segments: {
                  day: formatter(defaultMinMock['day']),
                  month: '',
                  year: '',
                },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMaxMock['day']),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { shouldWrap: false },
              providerProps: {
                onChange: onChangeHandler,
                segments: {
                  day: formatter(defaultMinMock['day']),
                  month: '',
                  year: '',
                },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMinMock['day'] - 1),
              }),
            );
          });

          test('does not wrap if `shouldWrap` is false and value is less than min', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: {
                ...setSegmentProps('year'),
                shouldWrap: false,
              },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '0', month: '', year: '3' },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ segment: 'year', value: '0002' }),
            );
          });

          test('formats value with leading zero', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '06', month: '', year: '' },
              },
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
              props: { segment: 'day' },
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '3', month: '', year: '' },
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: '02' }),
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
              providerProps: {
                onChange: onChangeHandler,
                segments: { day: '12', month: '', year: '' },
              },
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
              providerProps: { onChange: onChangeHandler },
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
                providerProps: { onChange: onChangeHandler },
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
                providerProps: {
                  onChange: onChangeHandler,
                  segments: { day: '12', month: '', year: '' },
                },
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
                providerProps: { onChange: onChangeHandler },
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
                providerProps: {
                  onChange: onChangeHandler,
                  segments: { day: '12', month: '', year: '' },
                },
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
        // max is 31
        const { input } = renderSegment({
          providerProps: {
            segments: { day: '3', month: '', year: '' },
            onChange: onChangeHandler,
          },
        });
        userEvent.type(input, '2');
        // returns the last valid value
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
          props: { ...setSegmentProps('month') },
          providerProps: {
            segments: { day: '', month: '', year: '' },
            onChange: onChangeHandler,
          },
        });
        userEvent.type(input, '0');
        // returns the last valid value
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '0' }),
        );
      });

      test('allows values above max range when shouldValidate is false', () => {
        const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
          SegmentObjMock,
          string
        >;
        // max is 2038
        const { input } = renderSegment({
          props: {
            ...setSegmentProps('year'),
            shouldValidate: false,
          },
          providerProps: {
            segments: { day: '', month: '', year: '203' },
            onChange: onChangeHandler,
          },
        });
        userEvent.type(input, '9');
        // returns the last valid value
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '2039' }),
        );
      });
    });
  });

  describe('onBlur handler', () => {
    test('calls the custom onBlur prop when provided', () => {
      const onBlurHandler = jest.fn();
      const { input } = renderSegment({
        props: { onBlur: onBlurHandler },
      });

      input.focus();
      input.blur();

      expect(onBlurHandler).toHaveBeenCalled();
    });

    test('calls both context and prop onBlur handlers', () => {
      const contextOnBlur = jest.fn();
      const propOnBlur = jest.fn();
      const { input } = renderSegment({
        props: { onBlur: propOnBlur },
        providerProps: { onBlur: contextOnBlur },
      });

      input.focus();
      input.blur();

      expect(contextOnBlur).toHaveBeenCalled();
      expect(propOnBlur).toHaveBeenCalled();
    });
  });

  describe('custom onKeyDown handler', () => {
    test('calls the custom onKeyDown prop when provided', () => {
      const onKeyDownHandler = jest.fn();
      const { input } = renderSegment({
        props: { onKeyDown: onKeyDownHandler },
      });

      userEvent.type(input, '5');

      expect(onKeyDownHandler).toHaveBeenCalled();
    });

    test('custom onKeyDown is called alongside internal handler', () => {
      const onKeyDownHandler = jest.fn();
      const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const { input } = renderSegment({
        props: { onKeyDown: onKeyDownHandler },
        providerProps: { onChange: onChangeHandler },
      });

      userEvent.type(input, '{arrowup}');

      expect(onKeyDownHandler).toHaveBeenCalled();
      expect(onChangeHandler).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    test('input is disabled when disabled context prop is true', () => {
      const { input } = renderSegment({
        providerProps: { disabled: true },
      });

      expect(input).toBeDisabled();
    });

    test('does not call onChange when disabled and typed into', () => {
      const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const { input } = renderSegment({
        providerProps: { disabled: true, onChange: onChangeHandler },
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
        props: { segment: 'day', shouldValidate: false },
        providerProps: {
          onChange: onChangeHandler,
          segments: { day: '9', month: '', year: '' },
        },
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
        props: { segment: 'day', shouldValidate: true },
        providerProps: {
          onChange: onChangeHandler,
          segments: { day: '9', month: '', year: '' },
        },
      });

      userEvent.type(input, '9');

      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe('custom onChange prop', () => {
    test('calls prop-level onChange in addition to context onChange', () => {
      const contextOnChange = jest.fn() as InputSegmentChangeEventHandler<
        SegmentObjMock,
        string
      >;
      const propOnChange = jest.fn();
      const { input } = renderSegment({
        props: { onChange: propOnChange },
        providerProps: { onChange: contextOnChange },
      });

      userEvent.type(input, '5');

      expect(contextOnChange).toHaveBeenCalled();
      expect(propOnChange).toHaveBeenCalled();
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('InputSegment throws error when no required props are provided', () => {
      // @ts-expect-error - missing required props
      <InputSegment />;
    });

    test('With required props', () => {
      <InputSegment segment="day" minSegmentValue={1} maxSegmentValue={31} />;
    });

    test('With all props', () => {
      <InputSegment
        segment="day"
        minSegmentValue={1}
        maxSegmentValue={31}
        step={1}
        shouldWrap={true}
        shouldValidate={true}
        placeholder="12"
        className="test"
        onBlur={() => {}}
        onKeyDown={() => {}}
        disabled={false}
        data-testid="test-id"
        id="day"
        ref={React.createRef<HTMLInputElement>()}
      />;
    });
  });
});
