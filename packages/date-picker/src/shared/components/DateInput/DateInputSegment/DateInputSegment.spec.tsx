import React from 'react';
import { jest } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { defaultMax, defaultMin } from '../../../constants';
import { DateSegment } from '../../../hooks';
import { getValueFormatter } from '../../../utils';
import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../DatePickerContext';

import { DateInputSegmentChangeEventHandler } from './DateInputSegment.types';
import { DateInputSegment, type DateInputSegmentProps } from '.';

const renderSegment = (
  props?: Partial<DateInputSegmentProps>,
  ctx?: Partial<DatePickerProviderProps>,
) => {
  const defaultProps = {
    value: '',
    onChange: () => {},
    segment: 'day' as DateSegment,
  };

  const result = render(
    <DatePickerProvider {...defaultDatePickerContext} {...ctx}>
      <DateInputSegment {...defaultProps} {...props} />
    </DatePickerProvider>,
  );

  const rerenderSegment = (newProps: Partial<DateInputSegmentProps>) =>
    result.rerender(
      <DateInputSegment {...defaultProps} {...props} {...newProps} />,
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
    test('calls the change handler', () => {
      const { input } = renderSegment({
        onChange: onChangeHandler,
      });

      userEvent.type(input, '8');
      expect(onChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ value: '8' }),
      );
    });

    test('allows typing additional characters to create a valid value', () => {
      const { input } = renderSegment({
        value: '02',
        onChange: onChangeHandler,
      });

      userEvent.type(input, '6');
      expect(onChangeHandler).toHaveBeenCalled();
      expect(onChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ value: '26' }),
      );
    });

    test('allows typing additional characters to create an invalid value', () => {
      // Note: event may be ignored by the parent,
      // but this component still fires the event
      const { input } = renderSegment({
        value: '26',
        onChange: onChangeHandler,
      });

      userEvent.type(input, '6');
      expect(onChangeHandler).toHaveBeenCalled();
      expect(onChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ value: '66' }),
      );
    });

    test('allows zero character', () => {
      const { input } = renderSegment({
        onChange: onChangeHandler,
      });

      userEvent.type(input, '0');
      expect(onChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ value: '0' }),
      );
    });

    test('allows leading zeroes', async () => {
      const { input } = renderSegment({
        value: '0',
        onChange: onChangeHandler,
      });

      userEvent.type(input, '2');
      await waitFor(() =>
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '02' }),
        ),
      );
    });

    test('does not allow non-number characters', () => {
      const { input } = renderSegment({
        onChange: onChangeHandler,
      });

      userEvent.type(input, 'aB$/');
      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard', () => {
    describe('Backspace', () => {
      test('deletes value in the input', () => {
        const { input } = renderSegment({
          value: '26',
          onChange: onChangeHandler,
        });

        userEvent.type(input, '{backspace}');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '2' }),
        );
      });

      test('fully clears the input', () => {
        const { input } = renderSegment({
          value: '2',
          onChange: onChangeHandler,
        });

        userEvent.type(input, '{backspace}');
        expect(onChangeHandler).toHaveBeenCalledWith(
          expect.objectContaining({ value: '' }),
        );
      });
    });

    describe('Arrow Keys', () => {
      describe('day input', () => {
        const formatter = getValueFormatter('day');

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
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

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('calls handler with default `min` when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMax['day']),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
              min: 5,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(5) }),
            );
          });

          test('calls handler with provided `min` prop when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMax['day']),
              min: 5,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(5) }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1', () => {
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

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('calls handler with default `max` value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMin['day']),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: '',
              max: 25,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(25) }),
            );
          });

          test('calls handler with provided `max` prop value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'day',
              onChange: onChangeHandler,
              value: formatter(defaultMin['day']),
              max: 25,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(25) }),
            );
          });
        });
      });

      describe('month input', () => {
        const formatter = getValueFormatter('month');

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(6),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(7),
              }),
            );
          });

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('calls handler with default `min` when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(defaultMax['month']),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: '',
              min: 5,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('calls handler with provided `min` prop when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(defaultMax['month']),
              min: 5,
            });

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
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(6),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('calls handler with default `max` value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(defaultMin['month']),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: '',
              max: 10,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(10),
              }),
            );
          });

          test('calls handler with provided `max` prop value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'month',
              onChange: onChangeHandler,
              value: formatter(defaultMin['month']),
              max: 10,
            });

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
        const formatter = getValueFormatter('year');

        describe('Up arrow', () => {
          test('calls handler with value +1', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(1993),
            });
            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1994),
              }),
            );
          });

          test('calls handler with default `min` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year']),
              }),
            );
          });

          test('calls handler with default `min` when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(defaultMax['year']),
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year']),
              }),
            );
          });

          test('calls handler with provided `min` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: '',
              min: 1969,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1969),
              }),
            );
          });

          test('calls handler with provided `min` prop when the new value is greater than the `max` value', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(defaultMax['year']),
              min: 1969,
            });

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
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(1993),
            });
            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1992),
              }),
            );
          });

          test('calls handler with default `max` if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: '',
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year']),
              }),
            );
          });

          test('calls handler with default `max` value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(defaultMin['year']),
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year']),
              }),
            );
          });

          test('calls handler with provided `max` prop if initially undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: '',
              max: 2000,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(2000),
              }),
            );
          });

          test('calls handler with provided `max` prop value when the new value is less than the `min` value', () => {
            const { input } = renderSegment({
              segment: 'year',
              onChange: onChangeHandler,
              value: formatter(defaultMin['year']),
              max: 2000,
            });

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
            const { input } = renderSegment({
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });

          test('when the input has a value', () => {
            const { input } = renderSegment({
              onChange: onChangeHandler,
              value: '12',
            });

            userEvent.type(input, '{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });
        });
      });

      describe('on a double SPACE', () => {
        describe('does not call the onChangeHandler ', () => {
          test('when the input is initially empty', () => {
            const { input } = renderSegment({
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{space}{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });

          test('when the input has a value', () => {
            const { input } = renderSegment({
              onChange: onChangeHandler,
              value: '12',
            });

            userEvent.type(input, '{space}{space}');
            expect(onChangeHandler).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
