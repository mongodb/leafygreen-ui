import React from 'react';
import { render } from '@testing-library/react';

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

  describe('typing', () => {});

  describe('mouse interaction', () => {});

  describe('keyboard interaction', () => {});
});
