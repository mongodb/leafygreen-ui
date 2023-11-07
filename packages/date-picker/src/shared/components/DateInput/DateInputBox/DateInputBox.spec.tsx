import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../../constants';
import { SegmentRefs } from '../../../hooks';
import { newUTC } from '../../../utils';
import { eventContainingTargetValue } from '../../../utils/testutils';
import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../DatePickerContext';

import { DateInputBox, type DateInputBoxProps } from '.';

const renderDateInputBox = (
  props?: Omit<DateInputBoxProps, 'segmentRefs'>,
  context?: Partial<DatePickerProviderProps>,
) => {
  const segmentRefsMock: SegmentRefs = {
    day: React.createRef(),
    month: React.createRef(),
    year: React.createRef(),
  };

  const result = render(
    <DatePickerProvider {...defaultDatePickerContext} {...context}>
      <DateInputBox
        {...props}
        value={props?.value ?? null}
        segmentRefs={segmentRefsMock}
      />
    </DatePickerProvider>,
  );

  const dayInput = result.container.querySelector(
    'input[aria-label="day"]',
  ) as HTMLInputElement;
  const monthInput = result.container.querySelector(
    'input[aria-label="month"]',
  ) as HTMLInputElement;
  const yearInput = result.container.querySelector(
    'input[aria-label="year"]',
  ) as HTMLInputElement;

  if (!(dayInput && monthInput && yearInput)) {
    throw new Error('Some or all input segments are missing');
  }

  return { ...result, dayInput, monthInput, yearInput };
};

describe('packages/date-picker/shared/date-input-box', () => {
  const testContext: Partial<DatePickerProviderProps> = {
    dateFormat: 'iso8601',
    timeZone: 'UTC',
  };

  describe('rendering', () => {
    describe.each(['day', 'month', 'year'])('%i', segment => {
      test('renders the correct aria attributes', () => {
        const result = renderDateInputBox();
        const input = result.getByLabelText(segment);

        // each segment has appropriate aria label
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });

    describe('renders segments in the correct order', () => {
      test('iso8601', () => {
        const result = renderDateInputBox(undefined, { dateFormat: 'iso8601' });
        const segments = result.getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'year');
        expect(segments[1]).toHaveAttribute('aria-label', 'month');
        expect(segments[2]).toHaveAttribute('aria-label', 'day');
      });

      test('en-US', () => {
        const result = renderDateInputBox(undefined, { dateFormat: 'en-US' });
        const segments = result.getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'month');
        expect(segments[1]).toHaveAttribute('aria-label', 'day');
        expect(segments[2]).toHaveAttribute('aria-label', 'year');
      });

      test('en-UK', () => {
        const result = renderDateInputBox(undefined, { dateFormat: 'en-UK' });
        const segments = result.getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'day');
        expect(segments[1]).toHaveAttribute('aria-label', 'month');
        expect(segments[2]).toHaveAttribute('aria-label', 'year');
      });
    });

    test('renders an empty text box when no value is passed', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        undefined,
        testContext,
      );
      expect(dayInput).toHaveValue('');
      expect(monthInput).toHaveValue('');
      expect(yearInput).toHaveValue('');
    });

    test('renders a filled text box when value is passed', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        { value: newUTC(1993, Month.December, 26) },
        testContext,
      );

      expect(dayInput.value).toBe('26');
      expect(monthInput.value).toBe('12');
      expect(yearInput.value).toBe('1993');
    });
  });

  describe('typing', () => {
    test('typing into a segment updates the segment value', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '26');
      expect(dayInput.value).toBe('26');
    });

    test('segment value is not immediately formatted', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '2');
      expect(dayInput.value).toBe('2');
    });

    test('deleting characters works as expected', () => {
      const { dayInput, yearInput } = renderDateInputBox(
        { value: newUTC(1993, Month.December, 26) },
        testContext,
      );
      userEvent.type(dayInput, '{backspace}');
      expect(dayInput.value).toBe('2');
      userEvent.type(yearInput, '{backspace}');
      expect(yearInput.value).toBe('199');
    });

    test('typing into a segment does not fire the value setter', () => {
      const setValue = jest.fn();
      const { dayInput } = renderDateInputBox(
        {
          value: null,
          setValue,
        },
        testContext,
      );

      userEvent.type(dayInput, '26');
      expect(setValue).not.toHaveBeenCalled();
    });

    test('typing into a segment fires the change handler', () => {
      const onChange = jest.fn();

      const { yearInput } = renderDateInputBox(
        {
          value: null,
          onChange,
        },
        testContext,
      );
      userEvent.type(yearInput, '1993');

      expect(onChange).toHaveBeenCalledWith(eventContainingTargetValue('1993'));
    });

    test('value setter is called when a complete date is entered', () => {
      const setValue = jest.fn();
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        {
          value: null,
          setValue,
        },
        testContext,
      );
      userEvent.type(yearInput, '1993');
      userEvent.type(monthInput, '12');
      userEvent.type(dayInput, '26');
      expect(setValue).toHaveBeenCalledWith(
        expect.objectContaining(newUTC(1993, Month.December, 26)),
      );
    });

    test('value is only formatted on segment blur', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '2');
      userEvent.tab();
      expect(dayInput.value).toBe('02');
    });
  });

  describe('mouse interaction', () => {
    test('click on segment focuses it', () => {
      const { dayInput } = renderDateInputBox(undefined, {
        dateFormat: 'iso8601',
      });
      userEvent.click(dayInput);
      expect(dayInput).toHaveFocus();
    });
  });

  describe('Keyboard interaction', () => {
    test('Tab moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        undefined,
        { dateFormat: 'iso8601' },
      );
      userEvent.click(yearInput);
      userEvent.tab();
      expect(monthInput).toHaveFocus();
      userEvent.tab();
      expect(dayInput).toHaveFocus();
    });

    // Arrow key interaction tested in DateInputSegment
    // & in relevant DatePicker/RangePicker input component
  });
});
