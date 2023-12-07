import React from 'react';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../../constants';
import { segmentRefsMock } from '../../../testutils';
import { newUTC } from '../../../utils';
import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../DatePickerContext';
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

import { DateInputBox, type DateInputBoxProps } from '.';

const renderDateInputBox = (
  props?: Omit<DateInputBoxProps, 'segmentRefs'>,
  context?: Partial<DatePickerProviderProps>,
) => {
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
  const onSegmentChange = jest.fn<DateInputSegmentChangeEventHandler>();

  const testContext: Partial<DatePickerProviderProps> = {
    locale: 'iso8601',
    timeZone: 'UTC',
  };

  afterEach(() => {
    onSegmentChange.mockClear();
  });

  describe('Rendering', () => {
    describe.each(['day', 'month', 'year'])('%p', segment => {
      test('renders the correct aria attributes', () => {
        const result = renderDateInputBox();
        const input = result.getByLabelText(segment);

        // each segment has appropriate aria label
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });

    describe('renders segments in the correct order', () => {
      test('iso8601', () => {
        const result = renderDateInputBox(undefined, { locale: 'iso8601' });
        const segments = result.getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'year');
        expect(segments[1]).toHaveAttribute('aria-label', 'month');
        expect(segments[2]).toHaveAttribute('aria-label', 'day');
      });

      test('en-US', () => {
        const result = renderDateInputBox(undefined, { locale: 'en-US' });
        const segments = result.getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'month');
        expect(segments[1]).toHaveAttribute('aria-label', 'day');
        expect(segments[2]).toHaveAttribute('aria-label', 'year');
      });

      test('en-UK', () => {
        const result = renderDateInputBox(undefined, { locale: 'en-UK' });
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

  describe('Typing', () => {
    test('updates the rendered segment value', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '26');
      expect(dayInput.value).toBe('26');
    });

    test('segment value is not immediately formatted', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '2');
      expect(dayInput.value).toBe('2');
    });

    test('value is formatted on segment blur', () => {
      const { dayInput } = renderDateInputBox(undefined, testContext);
      userEvent.type(dayInput, '2');
      userEvent.tab();
      expect(dayInput.value).toBe('02');
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

    test('typing into a segment does not immediately fire the value setter', () => {
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

    test('typing into a segment fires the segment change handler', () => {
      const { yearInput } = renderDateInputBox(
        {
          value: null,
          onSegmentChange,
        },
        testContext,
      );
      userEvent.type(yearInput, '1993');

      expect(onSegmentChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: '1993' }),
      );
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
  });

  describe('Mouse interaction', () => {
    test('click on segment focuses it', () => {
      const { dayInput } = renderDateInputBox(undefined, {
        locale: 'iso8601',
      });
      userEvent.click(dayInput);
      expect(dayInput).toHaveFocus();
    });
  });

  describe('Keyboard interaction', () => {
    test('Tab moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        undefined,
        { locale: 'iso8601' },
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
