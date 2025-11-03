import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderSegment, setSegmentProps } from '../testutils';
import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  SegmentObjMock,
} from '../testutils/testutils.mocks';
import { getValueFormatter } from '../utils';

import { InputSegment, InputSegmentChangeEventHandler } from '.';

describe('packages/input-segment', () => {
  describe('aria attributes', () => {
    describe.each(['day', 'month', 'year'])('%p', segment => {
      test(`${segment} segment has aria-label`, () => {
        const { input } = renderSegment({
          props: { segment: segment as SegmentObjMock },
        });
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });
  });

  describe('rendering', () => {
    describe('day segment', () => {
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

    describe('month segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ props: setSegmentProps('month') });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          props: setSegmentProps('month'),
          providerProps: { segments: { day: '', month: '26', year: '' } },
        });
        expect(input.value).toBe('26');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          props: setSegmentProps('month'),
          providerProps: { segments: { day: '', month: '26', year: '' } },
        });

        rerenderSegment({
          newProviderProps: { segments: { day: '', month: '08', year: '' } },
        });
        expect(getInput().value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ props: setSegmentProps('year') });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          props: setSegmentProps('year'),
          providerProps: { segments: { day: '', month: '', year: '2023' } },
        });
        expect(input.value).toBe('2023');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          props: setSegmentProps('year'),
          providerProps: { segments: { day: '', month: '', year: '2023' } },
        });
        rerenderSegment({
          newProviderProps: { segments: { day: '', month: '', year: '1993' } },
        });
        expect(getInput().value).toBe('1993');
      });
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

      // TODO: test min/max
    });

    describe('keyboard events', () => {
      describe('Arrow keys', () => {
        const formatter = getValueFormatter(
          charsPerSegmentMock['day'],
          defaultMinMock['day'] === 0,
        );

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

          test('does not rollover if `shouldNotRollover` is true', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { shouldRollover: false },
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

          test('does not rollover if `shouldNotRollover` is true', () => {
            const onChangeHandler = jest.fn() as InputSegmentChangeEventHandler<
              SegmentObjMock,
              string
            >;
            const { input } = renderSegment({
              props: { shouldRollover: false },
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
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('InputSegment throws error when no required props are provided', () => {
      // @ts-expect-error - missing required props
      <InputSegment />;
    });

    test('With required props', () => {
      <InputSegment segment="day" min={1} max={31} />;
    });

    test('With all props', () => {
      <InputSegment
        segment="day"
        min={1}
        max={31}
        step={1}
        shouldRollover={true}
        shouldSkipValidation={false}
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
