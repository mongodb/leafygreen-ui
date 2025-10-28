import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Size } from '@leafygreen-ui/tokens';

import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
} from '../testutils';
import { getValueFormatter } from '../utils';

import {
  InputSegment,
  InputSegmentChangeEventHandler,
  InputSegmentProps,
} from '.';

const renderSegment = (
  props?: Partial<InputSegmentProps<typeof SegmentObjMock, string>>,
): RenderResult & {
  getInput: () => HTMLInputElement;
  input: HTMLInputElement;
  rerenderSegment: (
    newProps: Partial<InputSegmentProps<typeof SegmentObjMock, string>>,
  ) => void;
} => {
  const defaultProps: InputSegmentProps<typeof SegmentObjMock, string> = {
    value: '',
    onChange: () => {},
    segment: 'day',
    charsPerSegment: charsPerSegmentMock,
    min: defaultMinMock['day'],
    max: defaultMaxMock['day'],
    segmentObj: SegmentObjMock,
    size: Size.Default,
    shouldNotRollover: false,
    placeholder: defaultPlaceholderMock['day'],
    // @ts-expect-error - data-testid
    ['data-testid']: 'lg-input-segment',
  };

  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  const utils = render(<InputSegment {...mergedProps} />);

  const rerenderSegment = (
    newProps: Partial<InputSegmentProps<typeof SegmentObjMock, string>>,
  ) => {
    utils.rerender(<InputSegment {...mergedProps} {...newProps} />);
  };

  const getInput = () =>
    utils.getByTestId('lg-input-segment') as HTMLInputElement;
  return { ...utils, getInput, input: getInput(), rerenderSegment };
};

describe('packages/input-segment', () => {
  describe('aria attributes', () => {
    describe.each(['day', 'month', 'year'])('%p', segment => {
      test(`${segment} segment has aria-label`, () => {
        const { input } = renderSegment({ segment: segment as SegmentObjMock });
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });
  });

  describe('rendering', () => {
    describe('day segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({ segment: 'day', value: '12' });
        expect(input.value).toBe('12');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          segment: 'day',
          value: '12',
        });

        rerenderSegment({ value: '08' });
        expect(getInput().value).toBe('08');
      });
    });

    describe('month segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'month' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({ segment: 'month', value: '26' });
        expect(input.value).toBe('26');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          segment: 'month',
          value: '26',
        });

        rerenderSegment({ value: '08' });
        expect(getInput().value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'year' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({ segment: 'year', value: '2023' });
        expect(input.value).toBe('2023');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          segment: 'year',
          value: '2023',
        });
        rerenderSegment({ value: '1993' });
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
          value: '26',
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
        const formatter = getValueFormatter('day', charsPerSegmentMock);

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
              onChange: onChangeHandler,
              value: formatter(15),
              step: 2,
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMaxMock['day']),
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMaxMock['day']),
              shouldNotRollover: true,
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(15),
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(15),
              step: 2,
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
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMinMock['day']),
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
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMinMock['day']),
              shouldNotRollover: true,
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
  });
});
