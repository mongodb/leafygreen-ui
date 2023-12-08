import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';

import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../shared/components/DatePickerContext';
import {
  SingleDateProvider,
  SingleDateProviderProps,
} from '../SingleDateContext';

import { DatePickerInput, DatePickerInputProps } from '.';

const renderDatePickerInput = (
  props?: Omit<DatePickerInputProps, 'segmentRefs' | 'setValue'> | null,
  singleDateContext?: Partial<SingleDateProviderProps>,
  context?: Partial<DatePickerProviderProps>,
) => {
  const result = render(
    <DatePickerProvider {...defaultDatePickerContext} {...context}>
      <SingleDateProvider
        value={null}
        setValue={() => {}}
        {...singleDateContext}
      >
        <DatePickerInput {...props} />
      </SingleDateProvider>
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

const testDate = newUTC(2023, Month.December, 26);

describe('packages/date-picker/date-picker-input', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testDate);
  });

  describe('Typing', () => {
    test('typing into a segment updates the segment value', () => {
      const { dayInput } = renderDatePickerInput();
      userEvent.type(dayInput, '26');
      expect(dayInput.value).toBe('26');
    });

    test('segment value is not immediately formatted', () => {
      const { dayInput } = renderDatePickerInput();
      userEvent.type(dayInput, '2');
      expect(dayInput.value).toBe('2');
    });

    test('value is formatted on segment blur', () => {
      const { dayInput } = renderDatePickerInput();
      userEvent.type(dayInput, '2');
      userEvent.tab();
      expect(dayInput.value).toBe('02');
    });
  });

  describe('Keyboard interaction', () => {
    // yyyy-mm-dd
    describe('Left Arrow', () => {
      test('focuses the previous segment when the segment is empty', () => {
        const { yearInput, monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowleft}');
        expect(yearInput).toHaveFocus();
      });

      test('moves the cursor when the segment has a value', () => {
        const { monthInput } = renderDatePickerInput(null, {
          value: testDate,
        });
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowleft}');
        expect(monthInput).toHaveFocus();
      });

      test('focuses the previous segment if the cursor is at the start of the input text', () => {
        const { yearInput, monthInput } = renderDatePickerInput(null, {
          value: testDate,
        });
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
        expect(yearInput).toHaveFocus();
      });
    });

    describe('Right Arrow', () => {
      test('focuses the next segment when the segment is empty', () => {
        const { yearInput, monthInput } = renderDatePickerInput();
        userEvent.click(yearInput);
        userEvent.keyboard('{arrowright}');
        expect(monthInput).toHaveFocus();
      });

      test('focuses the next segment if the cursor is at the start of the input text', () => {
        const { yearInput, monthInput } = renderDatePickerInput(null, {
          value: testDate,
        });
        userEvent.click(yearInput);
        userEvent.keyboard('{arrowright}');
        expect(monthInput).toHaveFocus();
      });

      test('moves the cursor when the segment has a value', () => {
        const { yearInput } = renderDatePickerInput(null, {
          value: new Date(),
        });
        userEvent.click(yearInput);
        userEvent.keyboard('{arrowleft}{arrowright}');
        expect(yearInput).toHaveFocus();
      });
    });

    describe('Backspace key', () => {
      test('deletes any value in the input', () => {
        const { dayInput } = renderDatePickerInput();
        userEvent.type(dayInput, '26{backspace}');
        expect(dayInput.value).toBe('2');
        userEvent.tab();
        expect(dayInput.value).toBe('02');
      });

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

    describe('Up Arrow', () => {
      test('keeps the focus in the current segment', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowup}');
        expect(monthInput).toHaveFocus();
      });

      test('keeps the focus in the current segment even if the value is valid', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowup}{arrowup}{arrowup}');
        expect(monthInput).toHaveValue('03');
        expect(monthInput).toHaveFocus();
      });

      test('Resets the value to the min value when the new value is greater than the max value', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowup}');
        expect(monthInput).toHaveValue('01');
        userEvent.keyboard(
          '{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}',
        );
        expect(monthInput).toHaveValue('01');
      });
    });

    describe('Down Arrow', () => {
      test('keeps the focus in the current segment', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowdown}');
        expect(monthInput).toHaveFocus();
      });

      test('keeps the focus in the current segment even if the value is valid', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
        expect(monthInput).toHaveValue('10');
        expect(monthInput).toHaveFocus();
      });

      test('Resets the value to the max value when the new value is less than the min value', () => {
        const { monthInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowdown}');
        expect(monthInput).toHaveValue('12');
      });
    });

    describe('typing', () => {
      describe('allows only 2 characters', () => {
        test('in day input', () => {
          const { dayInput } = renderDatePickerInput();
          userEvent.type(dayInput, '22222222');
          expect(dayInput.value.length).toBe(2);
        });

        test('in month input', () => {
          const { monthInput } = renderDatePickerInput();
          userEvent.type(monthInput, '22222222');
          expect(monthInput.value.length).toBe(2);
        });
      });

      describe('allows only 4 characters', () => {
        test('in year input', () => {
          const { yearInput } = renderDatePickerInput();
          userEvent.type(yearInput, '22222222');
          expect(yearInput.value.length).toBe(4);
        });
      });
    });
  });
});
