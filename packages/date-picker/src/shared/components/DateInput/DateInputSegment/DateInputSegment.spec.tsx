import React from 'react';
import { jest } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getValueFormatter } from '@leafygreen-ui/input-box';

import { charsPerSegment, defaultMax, defaultMin } from '../../../constants';
import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../../context';
import { DateSegment } from '../../../types';

import { DateInputSegmentChangeEventHandler } from './DateInputSegment.types';
import { DateInputSegment, type DateInputSegmentProps } from '.';

import {
  InputBoxProvider,
  type InputBoxProviderProps,
} from '@leafygreen-ui/input-box';

const renderSegment = (
  props?: Partial<DateInputSegmentProps>,
  ctx?: Partial<SharedDatePickerProviderProps>,
  providerProps?: Partial<InputBoxProviderProps<DateSegment>>,
) => {
  const defaultProps = {
    value: '',
    onChange: () => {}, //TODO: remove this
    segment: 'day' as DateSegment,
  };

  const defaultProviderProps = {
    onChange: () => {},
    onBlur: () => {},
  };

  const result = render(
    <SharedDatePickerProvider label="label" {...ctx}>
      <InputBoxProvider
        charsPerSegment={charsPerSegment}
        segmentEnum={DateSegment}
        {...defaultProviderProps}
        {...providerProps}
      >
        <DateInputSegment {...defaultProps} {...props} />
      </InputBoxProvider>
    </SharedDatePickerProvider>,
  );

  const rerenderSegment = (
    newProps: Partial<DateInputSegmentProps>,
    newProviderProps?: Partial<InputBoxProviderProps<DateSegment>>,
  ) =>
    result.rerender(
      <SharedDatePickerProvider label="label" {...ctx}>
        <InputBoxProvider
          charsPerSegment={charsPerSegment}
          segmentEnum={DateSegment}
          {...defaultProviderProps}
          {...newProviderProps}
        >
          <DateInputSegment {...defaultProps} {...props} {...newProps} />
        </InputBoxProvider>
        ,
      </SharedDatePickerProvider>,
    );

  const getInput = () =>
    result.getByTestId('lg-date_picker_input-segment') as HTMLInputElement;

  return {
    ...result,
    rerenderSegment,
    getInput,
    input: getInput(),
  };
};

describe('packages/date-picker/shared/date-input-segment', () => {
  const onChangeHandler = jest.fn<DateInputSegmentChangeEventHandler>();

  afterEach(() => {
    onChangeHandler.mockClear();
  });

  describe('rendering', () => {
    describe('aria attributes', () => {
      test('has `spinbutton` role', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input).toHaveAttribute('role', 'spinbutton');
      });
      test('day segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input).toHaveAttribute('aria-label', 'day');
      });
      test('month segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'month' });
        expect(input).toHaveAttribute('aria-label', 'month');
      });
      test('year segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'year' });
        expect(input).toHaveAttribute('aria-label', 'year');
      });
    });

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

  describe('Typing', () => {
    describe('into an empty segment', () => {
      test('calls the change handler', () => {
        const { input } = renderSegment({}, undefined, {
          onChange: onChangeHandler,
        });

        userEvent.type(input, '8');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '8' }),
        );
      });

      test('allows zero character', () => {
        const { input } = renderSegment({}, undefined, {
          onChange: onChangeHandler,
        });

        userEvent.type(input, '0');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '0' }),
        );
      });

      test('allows typing leading zeroes', async () => {
        const { input, rerenderSegment } = renderSegment({}, undefined, {
          onChange: onChangeHandler,
        });

        userEvent.type(input, '0');
        rerenderSegment({ value: '0' }, { onChange: onChangeHandler });

        userEvent.type(input, '2');
        await waitFor(() => {
          expect(onChangeHandler).toHaveBeenCalledWith(
            expect.objectContaining({ value: '02' }),
          );
        });
      });

      test('does not allow non-number characters', () => {
        const { input } = renderSegment({}, undefined, {
          onChange: onChangeHandler,
        });

        userEvent.type(input, 'aB$/');
        expect(onChangeHandler).not.toHaveBeenCalled();
      });
    });

    describe('into a segment with a value', () => {
      test('allows typing additional characters if the current value is incomplete', () => {
        const { input } = renderSegment(
          {
            value: '2',
            // onChange: onChangeHandler,
          },
          undefined,
          {
            onChange: onChangeHandler,
          },
        );

        userEvent.type(input, '6');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '26' }),
        );
      });

      test('resets the value when the value is complete', () => {
        const { input } = renderSegment(
          {
            value: '26',
            // onChange: onChangeHandler,
          },
          undefined,
          {
            onChange: onChangeHandler,
          },
        );

        userEvent.type(input, '4');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '4' }),
        );
      });
    });
  });

  describe('Keyboard', () => {
    describe('Backspace', () => {
      test('does not call the onChangeHandler when the value is initially empty', () => {
        const { input } = renderSegment({}, undefined, {
          onChange: onChangeHandler,
        });

        userEvent.type(input, '{backspace}');
        expect(onChangeHandler).not.toHaveBeenCalled();
      });

      test('clears the input when there is a value', () => {
        const { input } = renderSegment(
          {
            value: '26',
            // onChange: onChangeHandler,
          },
          undefined,
          {
            onChange: onChangeHandler,
          },
        );

        userEvent.type(input, '{backspace}');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '' }),
        );
      });
    });

    describe('Arrow Keys', () => {
      describe('day input', () => {
        const formatter = getValueFormatter(charsPerSegment['day']);

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: formatter(15),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(16),
              }),
            );
          });

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('rolls value over to default `min` value if value exceeds `max`', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: formatter(defaultMax['day']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: '',
                min: 5,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(5) }),
            );
          });

          test('rolls value over to provided `min` value if value exceeds `max`', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: formatter(defaultMax['day']),
                min: 5,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(5) }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: formatter(15),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(14),
              }),
            );
          });

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('rolls value over to default `max` value if value exceeds `min`', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                //  onChange: onChangeHandler,
                value: formatter(defaultMin['day']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: '',
                max: 25,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(25) }),
            );
          });

          test('rolls value over to provided `max` value if value exceeds `min`', () => {
            const { input } = renderSegment(
              {
                segment: 'day',
                // onChange: onChangeHandler,
                value: formatter(defaultMin['day']),
                max: 25,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(25) }),
            );
          });
        });
      });

      describe('month input', () => {
        const formatter = getValueFormatter(charsPerSegment['month']);

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                // onChange: onChangeHandler,
                value: formatter(6),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(7),
              }),
            );
          });

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                // onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('rolls value over to default `min` value if value exceeds `max`', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                // onChange: onChangeHandler,
                value: formatter(defaultMax['month']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: '',
                min: 5,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('rolls value over to provided `min` value if value exceeds `max`', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: formatter(defaultMax['month']),
                min: 5,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: formatter(6),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('rolls value over to default `max` value if value exceeds `min`', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: formatter(defaultMin['month']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //  onChange: onChangeHandler,
                value: '',
                max: 10,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(10),
              }),
            );
          });

          test('rolls value over to provided `max` value if value exceeds `min`', () => {
            const { input } = renderSegment(
              {
                segment: 'month',
                //    onChange: onChangeHandler,
                value: formatter(defaultMin['month']),
                max: 10,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(10),
              }),
            );
          });
        });
      });

      describe('year input', () => {
        const formatter = getValueFormatter(charsPerSegment['year']);

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //  onChange: onChangeHandler,
                value: formatter(1993),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );
            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1994),
              }),
            );
          });

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //  onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds max', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //  onChange: onChangeHandler,
                value: formatter(defaultMax['year']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year'] + 1),
              }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //  onChange: onChangeHandler,
                value: '',
                min: 1969,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1969),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //  onChange: onChangeHandler,
                value: formatter(1993),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );
            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1992),
              }),
            );
          });

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //    onChange: onChangeHandler,
                value: '',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds min', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //      onChange: onChangeHandler,
                value: formatter(defaultMin['year']),
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year'] - 1),
              }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment(
              {
                segment: 'year',
                //      onChange: onChangeHandler,
                value: '',
                max: 2000,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(2000),
              }),
            );
          });
        });
      });
    });
    describe('Space Key', () => {
      describe('on a single SPACE', () => {
        describe('does not call the onChangeHandler ', () => {
          test('when the input is initially empty', () => {
            const { input } = renderSegment(
              {
                //      onChange: onChangeHandler,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });
        });
        describe('calls the onChangeHandler', () => {
          test('when the input has a value', () => {
            const { input } = renderSegment(
              {
                // onChange: onChangeHandler,
                value: '12',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{space}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: '',
              }),
            );
          });
        });
      });

      describe('on a double SPACE', () => {
        describe('does not call the onChangeHandler ', () => {
          test('when the input is initially empty', () => {
            const { input } = renderSegment(
              {
                // onChange: onChangeHandler,
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{space}{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });
        });

        describe('calls the onChangeHandler', () => {
          test('when the input has a value', () => {
            const { input } = renderSegment(
              {
                // onChange: onChangeHandler,
                value: '12',
              },
              undefined,
              {
                onChange: onChangeHandler,
              },
            );

            userEvent.type(input, '{space}{space}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: '',
              }),
            );
          });
        });
      });
    });
  });
});
