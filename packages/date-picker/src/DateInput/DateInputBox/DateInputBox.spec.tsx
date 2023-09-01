import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputBox, type DateInputBoxProps } from '.';

const renderDateInputBox = (
  props?: DateInputBoxProps,
  context?: DatePickerContextProps,
) => {
  const result = render(
    <DatePickerProvider value={{ label: 'Label', ...context }}>
      <DateInputBox {...props} value={props?.value ?? null} />
    </DatePickerProvider>,
  );

  const dayInput = result.container.querySelector('input[aria-label="day"]');
  const monthInput = result.container.querySelector(
    'input[aria-label="month"]',
  );
  const yearInput = result.container.querySelector('input[aria-label="year"]');

  if (!(dayInput && monthInput && yearInput)) {
    throw new Error('Some or all input segments are missing');
  }

  return { ...result, dayInput, monthInput, yearInput };
};

describe('packages/date-input-box', () => {
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

    test('renders an empty text box', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        undefined,
        { dateFormat: 'iso8601' },
      );
      expect(dayInput).toHaveValue(null);
      expect(monthInput).toHaveValue(null);
      expect(yearInput).toHaveValue(null);
    });

    test('renders a filled text box', () => {
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        { value: new Date('1993-12-26') },
        { dateFormat: 'iso8601', timeZone: 'UTC' },
      );

      expect(dayInput).toHaveValue(26);
      expect(monthInput).toHaveValue(12);
      expect(yearInput).toHaveValue(1993);
    });
  });

  describe('typing', () => {
    test('typing into a segment updates the segment', () => {
      const { dayInput } = renderDateInputBox(undefined, {
        dateFormat: 'iso8601',
        timeZone: 'UTC',
      });

      userEvent.type(dayInput, '26');
      expect(dayInput).toHaveValue(26);
    });

    test('typing into a segment does not fire the change handler ', () => {
      const handler = jest.fn();
      const { dayInput } = renderDateInputBox(
        {
          value: null,
          setValue: handler,
        },
        {
          dateFormat: 'iso8601',
          timeZone: 'UTC',
        },
      );

      userEvent.type(dayInput, '26');
      expect(handler).not.toHaveBeenCalled();
    });

    test('typing a complete date fires the change handler', () => {
      const handler = jest.fn();
      const { dayInput, monthInput, yearInput } = renderDateInputBox(
        {
          value: null,
          setValue: handler,
        },
        {
          dateFormat: 'iso8601',
          timeZone: 'UTC',
        },
      );
      userEvent.type(yearInput, '1993');
      userEvent.type(monthInput, '12');
      userEvent.type(dayInput, '26');

      expect(handler).toHaveBeenCalled();
    });

    test.todo(
      'typing a complete segment value focuses the next segment',
      // () => {
      //   const { yearInput, monthInput } = renderDateInputBox(undefined, {
      //     dateFormat: 'iso8601',
      //     timeZone: 'UTC',
      //   });
      //   userEvent.type(yearInput, '1993');
      //   expect(monthInput).toHaveFocus();
      // },
    );

    test.todo(
      'typing an incomplete segment does not focus the next segment',
      // () => {
      //   const { yearInput } = renderDateInputBox(undefined, {
      //     dateFormat: 'iso8601',
      //     timeZone: 'UTC',
      //   });
      //   userEvent.type(yearInput, '200');
      //   expect(yearInput).toHaveFocus();
      // },
    );
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

  describe('keyboard interaction', () => {
    test('Tab moves focus', () => {
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

    describe('Arrow Keys', () => {
      test('ArrowRight moves focus right', () => {
        const { monthInput, yearInput } = renderDateInputBox(undefined, {
          dateFormat: 'iso8601',
        });

        userEvent.click(yearInput);
        userEvent.type(yearInput, '{arrowright}');
        expect(monthInput).toHaveFocus();
      });

      test('ArrowLeft moves focus left', () => {
        const { dayInput, monthInput } = renderDateInputBox(undefined, {
          dateFormat: 'iso8601',
        });

        userEvent.click(dayInput);
        userEvent.type(dayInput, '{arrowleft}');
        expect(monthInput).toHaveFocus();
      });
    });
  });
});