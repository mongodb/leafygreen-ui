import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';

import {
  defaultSharedDatePickerContext,
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../shared/context';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../DatePickerContext';

import { DatePickerInput, DatePickerInputProps } from '.';

const renderDatePickerInput = (
  props?: Omit<DatePickerInputProps, 'segmentRefs' | 'setValue'> | null,
  singleDateContext?: Partial<DatePickerProviderProps>,
  context?: Partial<SharedDatePickerProviderProps>,
) => {
  const result = render(
    <SharedDatePickerProvider {...defaultSharedDatePickerContext} {...context}>
      <DatePickerProvider
        value={null}
        setValue={() => {}}
        {...singleDateContext}
      >
        <DatePickerInput {...props} />
      </DatePickerProvider>
    </SharedDatePickerProvider>,
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

    test('allows only 4 characters in year input', () => {
      const { yearInput } = renderDatePickerInput();
      userEvent.type(yearInput, '22222222');
      expect(yearInput.value.length).toBe(4);
    });
  });
});
