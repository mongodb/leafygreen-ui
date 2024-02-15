import React from 'react';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';

import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../../context';
import { segmentRefsMock } from '../../../testutils';
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

import { DateInputBox, type DateInputBoxProps } from '.';

const renderDateInputBox = (
  props?: Omit<DateInputBoxProps, 'segmentRefs'>,
  context?: Partial<SharedDatePickerProviderProps>,
) => {
  const result = render(
    <SharedDatePickerProvider label="label" {...context}>
      <DateInputBox {...props} segmentRefs={segmentRefsMock} />
    </SharedDatePickerProvider>,
  );

  const rerenderDateInputBox = (
    newProps?: Omit<DateInputBoxProps, 'segmentRefs'>,
  ) => {
    result.rerender(
      <SharedDatePickerProvider label="label" {...context}>
        <DateInputBox {...props} {...newProps} segmentRefs={segmentRefsMock} />
      </SharedDatePickerProvider>,
    );
  };

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

  return { ...result, rerenderDateInputBox, dayInput, monthInput, yearInput };
};

describe('packages/date-picker/shared/date-input-box', () => {
  const onSegmentChange = jest.fn<DateInputSegmentChangeEventHandler>();

  const testContext: Partial<SharedDatePickerProviderProps> = {
    locale: 'iso8601',
    timeZone: 'UTC',
  };

  afterEach(() => {
    onSegmentChange.mockClear();
  });

  describe('Rendering', () => {
    describe.each(['day', 'month', 'year'])('%p', segment => {
      test('renders the correct aria attributes', () => {
        const { getByLabelText } = renderDateInputBox();
        const input = getByLabelText(segment);

        // each segment has appropriate aria label
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });

    describe('renders segments in the correct order', () => {
      test('iso8601', () => {
        const { getAllByRole } = renderDateInputBox(undefined, {
          locale: 'iso8601',
        });
        const segments = getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'year');
        expect(segments[1]).toHaveAttribute('aria-label', 'month');
        expect(segments[2]).toHaveAttribute('aria-label', 'day');
      });

      test('en-US', () => {
        const { getAllByRole } = renderDateInputBox(undefined, {
          locale: 'en-US',
        });
        const segments = getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'month');
        expect(segments[1]).toHaveAttribute('aria-label', 'day');
        expect(segments[2]).toHaveAttribute('aria-label', 'year');
      });

      test('en-UK', () => {
        const { getAllByRole } = renderDateInputBox(undefined, {
          locale: 'en-UK',
        });
        const segments = getAllByRole('spinbutton');
        expect(segments[0]).toHaveAttribute('aria-label', 'day');
        expect(segments[1]).toHaveAttribute('aria-label', 'month');
        expect(segments[2]).toHaveAttribute('aria-label', 'year');
      });
    });

    test('renders empty segments when no props are passed', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        undefined,
        testContext,
      );
      expect(dayInput).toHaveValue('');
      expect(monthInput).toHaveValue('');
      expect(yearInput).toHaveValue('');
    });

    test('renders empty segments when value is null', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        { value: null },
        testContext,
      );
      expect(dayInput).toHaveValue('');
      expect(monthInput).toHaveValue('');
      expect(yearInput).toHaveValue('');
    });

    test('renders filled segments when a value is passed', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        { value: newUTC(1993, Month.December, 26) },
        testContext,
      );

      expect(dayInput.value).toBe('26');
      expect(monthInput.value).toBe('12');
      expect(yearInput.value).toBe('1993');
    });

    test('renders empty segments when an invalid value is passed', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        { value: new Date('invalid') },
        testContext,
      );

      expect(dayInput.value).toBe('');
      expect(monthInput.value).toBe('');
      expect(yearInput.value).toBe('');
    });

    describe('re-rendering', () => {
      test('with new value updates the segments', () => {
        const { rerenderDateInputBox, dayInput, monthInput, yearInput } =
          renderDateInputBox(
            { value: newUTC(1993, Month.December, 26) },
            testContext,
          );

        rerenderDateInputBox({ value: newUTC(1994, Month.September, 10) });

        expect(dayInput.value).toBe('10');
        expect(monthInput.value).toBe('09');
        expect(yearInput.value).toBe('1994');
      });

      test('with null clears the segments', () => {
        const { rerenderDateInputBox, dayInput, monthInput, yearInput } =
          renderDateInputBox(
            { value: newUTC(1993, Month.December, 26) },
            testContext,
          );

        rerenderDateInputBox({ value: null });

        expect(dayInput.value).toBe('');
        expect(monthInput.value).toBe('');
        expect(yearInput.value).toBe('');
      });

      test('with invalid value does not update the segments', () => {
        const { rerenderDateInputBox, dayInput, monthInput, yearInput } =
          renderDateInputBox(
            { value: newUTC(1993, Month.December, 26) },
            testContext,
          );

        rerenderDateInputBox({ value: new Date('invalid') });

        expect(dayInput.value).toBe('26');
        expect(monthInput.value).toBe('12');
        expect(yearInput.value).toBe('1993');
      });
    });
  });

  describe('Typing', () => {
    describe('single segment', () => {
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

      test('backspace deletes characters', () => {
        const { dayInput, yearInput } = renderDateInputBox(
          { value: null },
          testContext,
        );
        userEvent.type(dayInput, '21');
        userEvent.type(dayInput, '{backspace}');
        expect(dayInput.value).toBe('2');

        userEvent.type(yearInput, '1993');
        userEvent.type(yearInput, '{backspace}');
        expect(yearInput.value).toBe('199');
      });

      test('segment change handler is called when typing into a segment', () => {
        const { yearInput } = renderDateInputBox(
          { onSegmentChange },
          testContext,
        );
        userEvent.type(yearInput, '1993');

        expect(onSegmentChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: '1993' }),
        );
      });

      test('value setter is not called when typing into a segment', () => {
        const setValue = jest.fn();
        const { dayInput } = renderDateInputBox({ setValue }, testContext);

        userEvent.type(dayInput, '26');
      });

      test('segment change handler is called when deleting from a single segment', () => {
        const { dayInput } = renderDateInputBox(
          { onSegmentChange },
          testContext,
        );
        userEvent.type(dayInput, '21');
        userEvent.type(dayInput, '{backspace}');
        expect(onSegmentChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: '2' }),
        );
      });

      test('value setter is not called when deleting from a single segment', () => {
        const setValue = jest.fn();

        const { dayInput } = renderDateInputBox({ setValue }, testContext);
        userEvent.type(dayInput, '21');
        userEvent.type(dayInput, '{backspace}');
        expect(setValue).not.toHaveBeenCalled();
      });
    });

    describe('with no initial value', () => {
      test('value setter is not called when an ambiguous date is entered', () => {
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
        userEvent.type(dayInput, '2');
        expect(setValue).not.toHaveBeenCalled();
      });

      test('value setter is called when an explicit date is entered', () => {
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

    describe('with an initial value', () => {
      test('value setter is called when a new date is typed', () => {
        const setValue = jest.fn();
        const { dayInput } = renderDateInputBox(
          {
            value: newUTC(1993, Month.December, 26),
            setValue,
          },
          testContext,
        );
        userEvent.type(dayInput, '{backspace}5');
        expect(setValue).toHaveBeenCalledWith(
          expect.objectContaining(newUTC(1993, Month.December, 25)),
        );
        expect(dayInput).toHaveValue('25');
      });

      test('value setter is _not_ called when new input is ambiguous', () => {
        const setValue = jest.fn();
        const { dayInput } = renderDateInputBox(
          {
            value: newUTC(1993, Month.December, 26),
            setValue,
          },
          testContext,
        );
        userEvent.type(dayInput, '{backspace}');
        expect(setValue).not.toHaveBeenCalled();
        expect(dayInput).toHaveValue('2');
      });

      test('value setter is called when the input is cleared', () => {
        const setValue = jest.fn();
        const { dayInput, monthInput, yearInput } = renderDateInputBox(
          {
            value: newUTC(1993, Month.December, 26),
            setValue,
          },
          testContext,
        );
        userEvent.type(dayInput, '{backspace}{backspace}');
        userEvent.type(monthInput, '{backspace}{backspace}');
        userEvent.type(
          yearInput,
          '{backspace}{backspace}{backspace}{backspace}',
        );
        expect(setValue).toHaveBeenCalledWith(expect.objectContaining(null));
        expect(dayInput).toHaveValue('');
        expect(monthInput).toHaveValue('');
        expect(yearInput).toHaveValue('');
      });

      test('value setter is called when new date is invalid', () => {
        const setValue = jest.fn();
        const { yearInput, monthInput, dayInput } = renderDateInputBox(
          {
            value: newUTC(1993, Month.December, 26),
            setValue,
          },
          testContext,
        );

        userEvent.type(monthInput, '{backspace}{backspace}');
        // TODO: with InvalidDate
        expect(setValue).toHaveBeenCalled();
        expect(dayInput).toHaveValue('26');
        expect(monthInput).toHaveValue('');
        expect(yearInput).toHaveValue('1993');
      });
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
