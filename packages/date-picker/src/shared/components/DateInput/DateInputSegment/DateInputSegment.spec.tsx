import React from 'react';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getValueFormatter } from '@leafygreen-ui/input-box';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from '../../../constants';
import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../../context';
import { DateSegment } from '../../../types';
import { DateInputBoxProvider } from '../DateInputBoxContext';

import { DateInputSegmentChangeEventHandler } from './DateInputSegment.types';
import { DateInputSegment, type DateInputSegmentProps } from '.';

const renderSegment = (
  props?: Partial<DateInputSegmentProps>,
  ctx?: Partial<SharedDatePickerProviderProps>,
) => {
  const defaultSegmentProps = {
    value: '',
    onChange: () => {},
    segment: 'day' as DateSegment,
    disabled: false,
    segmentEnum: DateSegment,
    charsPerSegment: charsPerSegment['day'],
    minSegmentValue: defaultMin['day'],
    maxSegmentValue: defaultMax['day'],
    placeholder: defaultPlaceholder['day'],
    shouldWrap: true,
    shouldValidate: true,
    step: 1,
  };

  const result = render(
    <SharedDatePickerProvider label="label" {...ctx}>
      <DateInputBoxProvider>
        <DateInputSegment {...defaultSegmentProps} {...props} />
      </DateInputBoxProvider>
    </SharedDatePickerProvider>,
  );

  const rerenderSegment = (newProps: Partial<DateInputSegmentProps>) =>
    result.rerender(
      <SharedDatePickerProvider label="label" {...ctx}>
        <DateInputBoxProvider>
          <DateInputSegment {...defaultSegmentProps} {...props} {...newProps} />
        </DateInputBoxProvider>
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
    describe('day segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'day' });
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
        const { input } = renderSegment({
          segment: 'month',
          value: '26',
        });
        expect(input.value).toBe('26');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          segment: 'month',
          value: '26',
        });

        rerenderSegment({
          value: '08',
        });
        expect(getInput().value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'year' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          segment: 'year',
          value: '2023',
        });
        expect(input.value).toBe('2023');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          segment: 'year',
          value: '2023',
        });
        rerenderSegment({
          value: '1993',
        });
        expect(getInput().value).toBe('1993');
      });
    });
  });

  describe('Keyboard', () => {
    describe('Arrow Keys', () => {
      describe('day input', () => {
        const formatter = getValueFormatter({
          charsPerSegment: charsPerSegment['day'],
        });

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: formatter(15),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(16) }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('rolls value over to min value if value exceeds `max`', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: formatter(defaultMax['day']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: formatter(15),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(14),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('rolls value over to max value if value is less than min', () => {
            const { input } = renderSegment({
              segment: 'day',
              value: formatter(defaultMin['day']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });
        });
      });

      describe('month input', () => {
        const formatter = getValueFormatter({
          charsPerSegment: charsPerSegment['month'],
        });

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: formatter(6),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(7),
              }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('rolls value over to min value if value exceeds max', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: formatter(defaultMax['month']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: formatter(6),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('rolls value over to max value if value is less than min', () => {
            const { input } = renderSegment({
              segment: 'month',
              value: formatter(defaultMin['month']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });
        });
      });

      describe('year input', () => {
        const formatter = getValueFormatter({
          charsPerSegment: charsPerSegment['year'],
        });

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: formatter(1993),
              onChange: onChangeHandler,
            });
            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1994),
              }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds max', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: formatter(defaultMax['year']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year'] + 1),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: formatter(1993),
              onChange: onChangeHandler,
            });
            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1992),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: '',
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds min', () => {
            const { input } = renderSegment({
              segment: 'year',
              value: formatter(defaultMin['year']),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year'] - 1),
              }),
            );
          });
        });
      });
    });
  });
});
