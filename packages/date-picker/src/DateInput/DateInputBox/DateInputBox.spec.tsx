import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../../DatePickerContext';
import { defaultDatePickerContext } from '../../DatePickerContext/DatePickerContext.utils';
import { SegmentRefs } from '../../hooks/useSegmentRefs';

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
    <DatePickerProvider value={{ ...defaultDatePickerContext, ...context }}>
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

    test('typing into a segment fires a segment change handler', () => {
      const onSegmentChange = jest.fn();

      const { yearInput } = renderDateInputBox(
        {
          value: null,
          onSegmentChange,
        },
        {
          dateFormat: 'iso8601',
          timeZone: 'UTC',
        },
      );
      userEvent.type(yearInput, '1993');

      expect(onSegmentChange).toHaveBeenCalledWith('year', 1993);
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

  describe('Keyboard interaction', () => {
    // Skipping, since {arrowup}/{arrowdown} do not trigger
    // a change event in userEvent
    // https://github.com/testing-library/user-event/issues/1066
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('Up arrow', () => {
      describe('increments the input value', () => {
        test('year input', async () => {
          const { yearInput } = renderDateInputBox({});
          userEvent.type(yearInput, '2023{arrowup}');
          expect(yearInput.value).toBe('2024');
        });
        test('month input', async () => {
          const { monthInput } = renderDateInputBox();
          userEvent.type(monthInput, '9{arrowup}');
          expect(monthInput.value).toBe('10');
        });
        test('day input', async () => {
          const { dayInput } = renderDateInputBox();
          userEvent.type(dayInput, '26{arrowup}');
          expect(dayInput.value).toBe('27');
        });
      });
    });

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
  });
});
