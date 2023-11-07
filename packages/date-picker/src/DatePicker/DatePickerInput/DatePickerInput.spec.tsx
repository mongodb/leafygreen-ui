import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { newUTC } from '../../shared';
import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../shared/components/DatePickerContext';
import { Month } from '../../shared/constants';
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

      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('focuses the previous segment if the cursor is at the start of the input text', () => {
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
        const { monthInput, dayInput } = renderDatePickerInput();
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowright}');
        expect(dayInput).toHaveFocus();
      });

      test('moves the cursor when the segment has a value', () => {
        const { monthInput } = renderDatePickerInput(null, {
          value: new Date(),
        });
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowright}');
        expect(monthInput).toHaveFocus();
      });

      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('focuses the next segment if the cursor is at the start of the input text', () => {
        const { dayInput, monthInput } = renderDatePickerInput(null, {
          value: testDate,
        });
        userEvent.click(monthInput);
        userEvent.keyboard('{arrowright}{arrowright}{arrowright}');
        expect(dayInput).toHaveFocus();
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
  });
});
