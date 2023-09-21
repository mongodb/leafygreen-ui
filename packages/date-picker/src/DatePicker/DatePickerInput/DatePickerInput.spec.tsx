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
    describe('Left/Right Arrow', () => {
      describe('when the segment is empty', () => {
        test('Left arrow focuses the prev segment', () => {
          const { dayInput, monthInput } = renderDatePickerInput();
          userEvent.type(dayInput, '{arrowleft}');
          expect(monthInput).toHaveFocus();
        });

        test('Right arrow focuses the next segment', () => {
          const { monthInput, yearInput } = renderDatePickerInput();
          userEvent.type(yearInput, '{arrowright}');
          expect(monthInput).toHaveFocus();
        });
      });

      describe('when the segment has a value', () => {
        test('Left arrow moves the cursor', () => {
          const { monthInput } = renderDatePickerInput({
            value: new Date(),
          });
          userEvent.type(monthInput, '{arrowleft}');
          expect(monthInput).toHaveFocus();
        });
        test('Right arrow moves the cursor', () => {
          const { monthInput } = renderDatePickerInput({
            value: new Date(),
          });
          userEvent.type(monthInput, '{arrowright}');
          expect(monthInput).toHaveFocus();
        });
      });
    });
  });
});
