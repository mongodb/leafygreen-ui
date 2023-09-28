import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../constants';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../../DatePickerContext';
import { defaultDatePickerContext } from '../../DatePickerContext/DatePickerContext.utils';
import { SegmentRefs } from '../../hooks/useSegmentRefs';

import { DatePickerInput, DatePickerInputProps } from '.';

const renderDatePickerInput = (
  props?: Omit<DatePickerInputProps, 'segmentRefs'>,
  context?: DatePickerProviderProps,
) => {
  const segmentRefsMock: SegmentRefs = {
    day: React.createRef(),
    month: React.createRef(),
    year: React.createRef(),
  };

  const result = render(
    <DatePickerProvider value={{ ...defaultDatePickerContext, ...context }}>
      <DatePickerInput {...props} segmentRefs={segmentRefsMock} />
    </DatePickerProvider>,
  );

  const inputContainer = result.getByRole('combobox');
  const dayInput = result.getByLabelText('day') as HTMLInputElement;
  const monthInput = result.getByLabelText('month') as HTMLInputElement;
  const yearInput = result.getByLabelText('year') as HTMLInputElement;

  return {
    ...result,
    inputContainer,
    dayInput,
    monthInput,
    yearInput,
  };
};

describe('packages/date-picker/date-picker-input', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest
      .useFakeTimers()
      .setSystemTime(new Date(Date.UTC(2023, Month.December, 26)));
  });

  describe('Keyboard interaction', () => {
    // yyyy-mm-dd
    describe('Left Arrow', () => {
      test('focuses the previous segment when the segment is empty', () => {
        const { yearInput, monthInput } = renderDatePickerInput();
        userEvent.type(monthInput, '{arrowleft}');
        expect(yearInput).toHaveFocus();
      });

      test('moves the cursor when the segment has a value', () => {
        const { monthInput } = renderDatePickerInput({
          value: new Date(),
        });
        userEvent.type(monthInput, '{arrowleft}');
        expect(monthInput).toHaveFocus();
      });
    });

    describe('Right Arrow', () => {
      test('focuses the next segment when the segment is empty', () => {
        const { monthInput, dayInput } = renderDatePickerInput();
        userEvent.type(monthInput, '{arrowright}');
        expect(dayInput).toHaveFocus();
      });

      test('moves the cursor when the segment has a value', () => {
        const { monthInput } = renderDatePickerInput({
          value: new Date(),
        });
        userEvent.type(monthInput, '{arrowright}');
        expect(monthInput).toHaveFocus();
      });
    });

    describe('Backspace key', () => {
      test('deletes any value in the input', () => {
        const { dayInput } = renderDatePickerInput();
        userEvent.type(dayInput, '26{backspace}');
        expect(dayInput.value).toBe('02');
      });

      // TODO: FIXME:
      test('deletes the whole value on multiple presses', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.type(monthInput, '11');
        userEvent.type(monthInput, '{backspace}{backspace}');
        expect(monthInput.value).toBe('');
      });

      test('focuses the previous segment if current segment is empty', () => {
        const { yearInput, monthInput } = renderDatePickerInput();
        userEvent.type(monthInput, '{backspace}');
        expect(yearInput).toHaveFocus();
      });
    });
  });
});
