import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import { mockTimeZone, testTimeZones } from '@leafygreen-ui/date-utils/testing';

import { renderDatePicker } from './DatePicker.testutils';

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

describe('DatePicker mouse interaction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Clicking a Calendar cell', () => {
    test('closes the menu', async () => {
      const { openMenu } = renderDatePicker({});
      const { calendarCells, menuContainerEl } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitForElementToBeRemoved(menuContainerEl);
    });

    describe.each(testTimeZones)(
      'when system time is in $tz',
      ({ tz, UTCOffset }) => {
        beforeEach(() => {
          mockTimeZone(tz, UTCOffset);
        });
        afterEach(() => {
          jest.restoreAllMocks();
        });

        test('fires a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(onDateChange).toHaveBeenCalledWith(
            newUTC(2023, Month.December, 1),
          );
        });

        test('fires a validation handler', async () => {
          const handleValidation = jest.fn();
          const { openMenu } = renderDatePicker({
            handleValidation,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(handleValidation).toHaveBeenCalledWith(
            newUTC(2023, Month.December, 1),
          );
        });

        test('updates the input', async () => {
          const { openMenu, dayInput, monthInput, yearInput } =
            renderDatePicker({});
          const { todayCell } = await openMenu();
          userEvent.click(todayCell!);
          await waitFor(() => {
            expect(dayInput.value).toBe(testToday.getUTCDate().toString());
            expect(monthInput.value).toBe(
              (testToday.getUTCMonth() + 1).toString(),
            );
            expect(yearInput.value).toBe(testToday.getUTCFullYear().toString());
          });
        });

        test('does nothing if the cell is out-of-range', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
            value: new Date(Date.UTC(2023, Month.September, 15)),
            min: new Date(Date.UTC(2023, Month.September, 10)),
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          expect(firstCell).toHaveAttribute('aria-disabled', 'true');
          userEvent.click(firstCell!, {}, { skipPointerEventsCheck: true });
          expect(onDateChange).not.toHaveBeenCalled();
        });
      },
    );
  });

  describe('Clicking a Chevron', () => {
    describe('Left', () => {
      test('does not close the menu', async () => {
        const { openMenu } = renderDatePicker();
        const { leftChevron, menuContainerEl } = await openMenu();
        userEvent.click(leftChevron!);
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('updates the displayed month to the previous', async () => {
        const { openMenu } = renderDatePicker({
          value: newUTC(2023, Month.December, 25),
        });
        const { leftChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        userEvent.click(leftChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'November 2023');
        expect(monthSelect).toHaveValue(Month.November.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('updates the displayed month to the previous, and updates year', async () => {
        const { openMenu } = renderDatePicker({
          value: newUTC(2023, Month.January, 5),
        });
        const { leftChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        userEvent.click(leftChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2022');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2022');
      });

      test('updates the displayed month to the max month and year when the value is after the max', async () => {
        const { openMenu } = renderDatePicker({
          max: newUTC(2022, Month.January, 5),
          value: newUTC(2023, Month.January, 5),
        });
        const { leftChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2023');
        userEvent.click(leftChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2022');
        expect(monthSelect).toHaveValue(Month.January.toString());
        expect(yearSelect).toHaveValue('2022');
      });

      test('keeps focus on chevron button', async () => {
        const { openMenu } = renderDatePicker();
        const { leftChevron } = await openMenu();
        userEvent.click(leftChevron!);
        expect(leftChevron).toHaveFocus();
      });
    });

    describe('Right', () => {
      test('does not close the menu', async () => {
        const { openMenu } = renderDatePicker();
        const { rightChevron, menuContainerEl } = await openMenu();
        userEvent.click(rightChevron!);
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('updates the displayed month to the next', async () => {
        const { openMenu } = renderDatePicker({
          value: newUTC(2023, Month.January, 5),
        });
        const { rightChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        userEvent.click(rightChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'February 2023');
        expect(monthSelect).toHaveValue(Month.February.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('updates the displayed month to the next and updates year', async () => {
        const { openMenu } = renderDatePicker({
          value: newUTC(2023, Month.December, 26),
        });
        const { rightChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        userEvent.click(rightChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');
        expect(monthSelect).toHaveValue(Month.January.toString());
        expect(yearSelect).toHaveValue('2024');
      });

      test('updates the displayed month to the min month and year when the value is before the min ', async () => {
        const { openMenu } = renderDatePicker({
          min: newUTC(2023, Month.December, 26),
          value: newUTC(2022, Month.November, 26),
        });
        const { rightChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'November 2022');
        userEvent.click(rightChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2023');
      });
    });
  });
});
