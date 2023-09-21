import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../constants';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../../DatePickerContext';

import { DatePickerInput, DatePickerInputProps } from '.';

const renderDatePickerInput = (
  props?: DatePickerInputProps,
  context?: DatePickerProviderProps,
) => {
  const result = render(
    <></>,
    // <DatePickerProvider>
    //   <DatePickerInput />
    // </DatePickerProvider>,
  );
};

describe('packages/date-picker/date-picker-input', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest
      .useFakeTimers()
      .setSystemTime(new Date(Date.UTC(2023, Month.December, 26)));
  });

  describe.skip('Keyboard interaction', () => {
    describe('Left/Right Arrow', () => {
      describe('when the input is focused', () => {
        describe('and the segment is empty', () => {
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

        describe('and the segment has a value', () => {
          test('Left arrow moves the cursor', () => {
            const { dayInput } = renderDatePickerInput({
              value: new Date(),
            });
            userEvent.type(dayInput, '{arrowleft}');
            expect(dayInput).toHaveFocus();
          });
          test('Right moves the cursor', () => {
            const { yearInput } = renderDatePickerInput({
              value: new Date(),
            });
            userEvent.type(yearInput, '{arrowright}');
            expect(yearInput).toHaveFocus();
          });
        });
      });
    });
  });
});
