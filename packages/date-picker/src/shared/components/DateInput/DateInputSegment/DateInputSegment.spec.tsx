import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mean } from 'lodash';

import { defaultMax, defaultMin } from '../../../constants';
import { DateSegment } from '../../../hooks';
import { eventContainingTargetValue } from '../../../utils/testutils';

import { DateInputSegment, type DateInputSegmentProps } from '.';

const onChangeHandler = jest.fn();

const renderSegment = (props: DateInputSegmentProps) => {
  const result = render(<DateInputSegment {...props} />);
  const input = result.getByTestId('lg-date_picker_input-segment');
  return {
    ...result,
    input: input as HTMLInputElement,
  };
};

describe('packages/date-picker/shared/date-input-segment', () => {
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
        const { input, rerender } = renderSegment({
          segment: 'day',
          value: '12',
        });

        rerender(<DateInputSegment segment="day" value={'08'} />);
        expect(input.value).toBe('08');
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
        const { input, rerender } = renderSegment({
          segment: 'year',
          value: '2023',
        });
        rerender(<DateInputSegment segment="year" value={'1993'} />);
        expect(input.value).toBe('1993');
      });
    });
  });

  describe('Typing', () => {
    test('calls the change handler', () => {
      const result = render(
        <DateInputSegment segment="day" onChange={onChangeHandler} />,
      );
      const input = result.getByTestId('lg-date_picker_input-segment');
      userEvent.type(input, '8');
      expect(onChangeHandler).toHaveBeenCalledWith(
        eventContainingTargetValue('8'),
      );
    });

    test('does not allow non-number characters', () => {
      const result = render(
        <DateInputSegment segment="day" onChange={onChangeHandler} />,
      );
      const input = result.getByTestId('lg-date_picker_input-segment');
      userEvent.type(input, 'aB$/');
      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe('Arrow Keys', () => {
    const testCases: Array<DateSegment> = ['day', 'month', 'year'];

    describe.each(testCases)('in %p input', segment => {
      const minValue = defaultMin[segment];
      const maxValue = defaultMax[segment];
      const defaultValue = mean([minValue, maxValue]);

      describe('Up arrow', () => {
        test('calls handler with value + 1', () => {
          const result = render(
            <DateInputSegment
              segment={segment}
              onChange={onChangeHandler}
              value={`${defaultValue}`}
            />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');
          userEvent.type(input, '{arrowup}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${defaultValue + 1}`),
          );
        });

        test('calls handler with `min` if initially undefined', () => {
          const result = render(
            <DateInputSegment onChange={onChangeHandler} segment={segment} />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');

          userEvent.type(input, '{arrowup}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${minValue}`),
          );
        });

        test('calls handler with `min` when the new value is greater than the `max` value', () => {
          const result = render(
            <DateInputSegment
              onChange={onChangeHandler}
              segment={segment}
              value={`${maxValue}`}
            />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');

          userEvent.type(input, '{arrowup}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${minValue}`),
          );
        });
      });

      describe('Down arrow', () => {
        test('calls handler with value - 1', () => {
          const result = render(
            <DateInputSegment
              segment={segment}
              onChange={onChangeHandler}
              value={`${defaultValue}`}
            />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');
          userEvent.type(input, '{arrowdown}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${defaultValue - 1}`),
          );
        });

        test('calls handler with `max` if initially undefined', () => {
          const result = render(
            <DateInputSegment onChange={onChangeHandler} segment={segment} />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');

          userEvent.type(input, '{arrowdown}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${maxValue}`),
          );
        });

        test('calls handler with `max` value when the new value is less than the `min` value', () => {
          const result = render(
            <DateInputSegment
              onChange={onChangeHandler}
              segment={segment}
              value={`${minValue}`}
            />,
          );
          const input = result.getByTestId('lg-date_picker_input-segment');

          userEvent.type(input, '{arrowdown}');
          expect(onChangeHandler).toHaveBeenCalledWith(
            eventContainingTargetValue(`${maxValue}`),
          );
        });
      });
    });
  });
});
