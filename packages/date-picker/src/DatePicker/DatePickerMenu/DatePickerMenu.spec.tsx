import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../shared/components/DatePickerContext';
import { Month } from '../../shared/constants';
import { getISODate, newUTC, setUTCDate } from '../../shared/utils';
import {
  SingleDateProvider,
  SingleDateProviderProps,
} from '../SingleDateContext';

import { DatePickerMenu, DatePickerMenuProps } from '.';

const testToday = new Date(Date.UTC(2023, Month.September, 10));
const testValue = new Date(Date.UTC(2023, Month.September, 14));

const standardTimeEndDate = new Date(Date.UTC(2023, Month.March, 11));
const daylightTimeStartDate = new Date(Date.UTC(2023, Month.March, 12));
const daylightTimeEndDate = new Date(Date.UTC(2023, Month.November, 5));
const standardTimeStartDate = new Date(Date.UTC(2023, Month.November, 6));

const renderDatePickerMenu = (
  props?: Partial<DatePickerMenuProps> | null,
  singleContext?: Partial<SingleDateProviderProps> | null,
  context?: Partial<DatePickerProviderProps> | null,
) => {
  const result = render(
    <DatePickerProvider
      {...defaultDatePickerContext}
      {...context}
      initialOpen={true}
    >
      <SingleDateProvider
        value={null}
        setValue={() => {}}
        handleValidation={undefined}
        {...singleContext}
      >
        <DatePickerMenu {...props} />,
      </SingleDateProvider>
    </DatePickerProvider>,
  );

  const rerenderDatePickerMenu = (
    newProps?: Partial<DatePickerMenuProps> | null,
    newSingleContext?: Partial<SingleDateProviderProps> | null,
  ) =>
    result.rerender(
      <DatePickerProvider
        {...defaultDatePickerContext}
        {...context}
        initialOpen={true}
      >
        <SingleDateProvider
          value={null}
          setValue={() => {}}
          handleValidation={undefined}
          {...singleContext}
          {...newSingleContext}
        >
          <DatePickerMenu
            {...({ ...props, ...newProps } as Partial<DatePickerMenuProps>)}
          />
        </SingleDateProvider>
      </DatePickerProvider>,
    );

  const calendarGrid = result.getByRole('grid');

  const calendarCells = result.queryAllByRole(
    'gridcell',
  ) as Array<HTMLTableCellElement>;

  const todayCell = calendarGrid.querySelector(
    `[data-iso="${getISODate(testToday)}"]`,
  );

  const getCellWithValue = (date: Date) =>
    calendarGrid.querySelector(`[data-iso="${getISODate(date)}"]`);

  const leftChevron = result?.queryByLabelText('Previous month');
  const rightChevron = result?.queryByLabelText('Next month');

  return {
    ...result,
    rerenderDatePickerMenu,
    calendarGrid,
    calendarCells,
    todayCell,
    getCellWithValue,
    leftChevron,
    rightChevron,
  };
};

describe('packages/date-picker/date-picker-menu', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-09-10
    jest.useFakeTimers().setSystemTime(testToday);
  });

  describe('Rendering', () => {
    test('renders calendar grid', () => {
      const result = renderDatePickerMenu();
      expect(result.getByRole('grid')).toBeInTheDocument();
    });
    test('grid is labelled as the current month', () => {
      const result = renderDatePickerMenu();
      const grid = result.getByRole('grid');
      expect(grid).toHaveAttribute('aria-label', 'September 2023');
    });
    test('chevrons have aria labels', () => {
      const result = renderDatePickerMenu();
      const leftChevron = result.getByLabelText('Previous month');
      const rightChevron = result.getByLabelText('Next month');
      expect(leftChevron).toBeInTheDocument();
      expect(rightChevron).toBeInTheDocument();
    });
    test('select menu triggers have aria labels', () => {
      const result = renderDatePickerMenu();
      const monthSelect = result.getByLabelText('Select month');
      const yearSelect = result.getByLabelText('Select year');
      expect(monthSelect).toBeInTheDocument();
      expect(yearSelect).toBeInTheDocument();
    });
    test('select menus have correct values', () => {
      const result = renderDatePickerMenu();
      const monthSelect = result.getByLabelText('Select month');
      const yearSelect = result.getByLabelText('Select year');
      expect(monthSelect).toHaveValue(Month.September.toString());
      expect(yearSelect).toHaveValue('2023');
    });

    describe('rendered cells', () => {
      test('have correct `aria-label`', () => {
        const { todayCell } = renderDatePickerMenu();
        expect(todayCell).toHaveAttribute('aria-label', 'Sun Sep 10 2023');
      });
    });

    describe('when value is updated', () => {
      test('grid is labelled as the current month', () => {
        const { getByRole, rerenderDatePickerMenu } = renderDatePickerMenu();
        rerenderDatePickerMenu(null, {
          value: newUTC(2024, Month.March, 10),
        });
        const grid = getByRole('grid');
        expect(grid).toHaveAttribute('aria-label', 'March 2024');
      });
      test('select menus have correct values', () => {
        const { getByLabelText, rerenderDatePickerMenu } =
          renderDatePickerMenu();
        rerenderDatePickerMenu(null, {
          value: newUTC(2024, Month.March, 10),
        });

        const monthSelect = getByLabelText('Select month');
        const yearSelect = getByLabelText('Select year');
        expect(monthSelect).toHaveValue(Month.March.toString());
        expect(yearSelect).toHaveValue('2024');
      });
    });

    test('default highlight is on today', () => {
      const { todayCell } = renderDatePickerMenu();
      userEvent.tab();
      expect(todayCell).toHaveFocus();
    });

    test('highlight starts on current value when provided', () => {
      const { getCellWithValue } = renderDatePickerMenu(null, {
        value: testValue,
      });
      userEvent.tab();
      const valueCell = getCellWithValue(testValue);
      expect(valueCell).toHaveFocus();
    });
  });

  describe('Keyboard navigation', () => {
    describe('Arrow Keys', () => {
      test('left arrow moves focus to the previous day', async () => {
        const { getCellWithValue } = renderDatePickerMenu(null, {
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowleft}');
        const prevDay = getCellWithValue(setUTCDate(testValue, 13));

        await waitFor(() => expect(prevDay).toHaveFocus());
      });

      test('right arrow moves focus to the next day', async () => {
        const { getCellWithValue } = renderDatePickerMenu(null, {
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowright}');

        const nextDay = getCellWithValue(setUTCDate(testValue, 15));
        await waitFor(() => expect(nextDay).toHaveFocus());
      });

      test('up arrow moves focus to the previous week', async () => {
        const { getCellWithValue } = renderDatePickerMenu(null, {
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowup}');

        const prevWeek = getCellWithValue(setUTCDate(testValue, 7));
        await waitFor(() => expect(prevWeek).toHaveFocus());
      });

      test('down arrow moves focus to the next week', async () => {
        const { getCellWithValue } = renderDatePickerMenu(null, {
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowdown}');

        const nextWeek = getCellWithValue(setUTCDate(testValue, 21));
        await waitFor(() => expect(nextWeek).toHaveFocus());
      });

      describe('when switching between daylight savings and standard time', () => {
        // DT: Sun, Mar 12, 2023 – Sun, Nov 5, 2023

        describe('daylight time start (Mar 12 2023)', () => {
          const weekBeforeDTStart = new Date(Date.UTC(2023, Month.March, 5));

          test('left arrow moves focus to prev day', async () => {
            jest.useFakeTimers().setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithValue(standardTimeEndDate); // Mar 11

            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.useFakeTimers().setSystemTime(standardTimeEndDate); // Mar 11
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowright}');
            const nextDayCell = getCellWithValue(daylightTimeStartDate); // Mar 12
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.useFakeTimers().setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');
            const prevWeekCell = getCellWithValue(weekBeforeDTStart); // Mar 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.useFakeTimers().setSystemTime(weekBeforeDTStart); // Mar 5
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowdown}');
            const nextWeekCell = getCellWithValue(daylightTimeStartDate); // Mar 12
            await waitFor(() => expect(nextWeekCell).toHaveFocus());
          });
        });

        describe('daylight time end (Nov 5 2023)', () => {
          const weekAfterDTEnd = new Date(Date.UTC(2023, Month.November, 12));

          test('left arrow moves focus to prev day', async () => {
            jest.useFakeTimers().setSystemTime(standardTimeStartDate); // Nov 6
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithValue(daylightTimeEndDate); // Nov 5

            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.useFakeTimers().setSystemTime(daylightTimeEndDate); // Nov 5

            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowright}');

            const nextDayCell = getCellWithValue(standardTimeStartDate); // Nov 6
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.useFakeTimers().setSystemTime(weekAfterDTEnd); // Nov 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');

            const prevWeekCell = getCellWithValue(daylightTimeEndDate); // Nov 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.useFakeTimers().setSystemTime(daylightTimeEndDate); // Nov 5
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowdown}');

            const nextWeekCell = getCellWithValue(weekAfterDTEnd); // Nov 12
            await waitFor(() => expect(nextWeekCell).toHaveFocus());
          });
        });
      });

      describe('when next day would be out of range', () => {
        const singleCtx = {
          value: testToday,
        };
        test('left arrow does nothing', async () => {
          const { todayCell } = renderDatePickerMenu(null, singleCtx, {
            min: testToday,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          await waitFor(() => expect(todayCell).toHaveFocus());
        });

        test('right arrow does nothing', async () => {
          const { todayCell } = renderDatePickerMenu(null, singleCtx, {
            max: testToday,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          await waitFor(() => expect(todayCell).toHaveFocus());
        });

        test('up arrow does nothing', async () => {
          const { todayCell } = renderDatePickerMenu(null, singleCtx, {
            min: addDays(testToday, -6),
          });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          await waitFor(() => expect(todayCell).toHaveFocus());
        });
        test('down arrow does nothing', async () => {
          const { todayCell } = renderDatePickerMenu(null, singleCtx, {
            max: addDays(testToday, 6),
          });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          await waitFor(() => expect(todayCell).toHaveFocus());
        });
      });

      describe('update the displayed month', () => {
        test('left arrow updates displayed month to previous', () => {
          const value = new Date(Date.UTC(2023, Month.September, 1));
          const { calendarGrid } = renderDatePickerMenu(null, { value });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
        });

        test('right arrow updates displayed month to next', () => {
          const value = new Date(Date.UTC(2023, Month.September, 30));
          const { calendarGrid } = renderDatePickerMenu(null, { value });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
        });

        test('up arrow updates displayed month to previous', () => {
          const value = new Date(Date.UTC(2023, Month.September, 6));
          const { calendarGrid } = renderDatePickerMenu(null, { value });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
        });

        test('down arrow updates displayed month to next', () => {
          const value = new Date(Date.UTC(2023, Month.September, 25));
          const { calendarGrid } = renderDatePickerMenu(null, { value });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
        });

        test('does not update month when month does not need to change', () => {
          const { calendarGrid } = renderDatePickerMenu(null, {
            value: testValue,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');
        });
      });

      describe('when month should be updated', () => {
        test('left arrow focuses the previous day', async () => {
          const value = newUTC(2023, Month.September, 1);
          const { getCellWithValue } = renderDatePickerMenu(null, {
            value,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          const highlightedCell = getCellWithValue(
            newUTC(2023, Month.August, 31),
          );

          await waitFor(() => expect(highlightedCell).toHaveFocus());
        });
        test('right arrow focuses the next day', async () => {
          const value = newUTC(2023, Month.September, 30);
          const { getCellWithValue } = renderDatePickerMenu(null, {
            value,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          const highlightedCell = getCellWithValue(
            newUTC(2023, Month.October, 1),
          );
          await waitFor(() => expect(highlightedCell).toHaveFocus());
        });
        test('up arrow focuses the previous week', async () => {
          const value = newUTC(2023, Month.September, 7);
          const { getCellWithValue } = renderDatePickerMenu(null, {
            value,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          const highlightedCell = getCellWithValue(
            newUTC(2023, Month.August, 31),
          );
          await waitFor(() => expect(highlightedCell).toHaveFocus());
        });
        test('down arrow focuses the next week', async () => {
          const value = newUTC(2023, Month.September, 24);
          const { getCellWithValue } = renderDatePickerMenu(null, {
            value,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          const highlightedCell = getCellWithValue(
            newUTC(2023, Month.October, 1),
          );
          await waitFor(() => expect(highlightedCell).toHaveFocus());
        });
      });

      describe('focus-trap', () => {
        test('when a cell is in focus, pressing tab moves the focus to the left chevron', async () => {
          const { todayCell, leftChevron } = renderDatePickerMenu();
          userEvent.tab();
          expect(todayCell).toHaveFocus();
          userEvent.tab();
          expect(leftChevron).toHaveFocus();
        });

        test('when a cell is in focus, pressing tab + shift moves the focus to the right chevron', async () => {
          const { todayCell, rightChevron } = renderDatePickerMenu();
          userEvent.tab();
          expect(todayCell).toHaveFocus();
          userEvent.tab({ shift: true });
          expect(rightChevron).toHaveFocus();
        });

        test('when the left chevron is in focus, pressing shift + tab moves the focus to todays cell', async () => {
          const { todayCell, leftChevron } = renderDatePickerMenu();
          leftChevron?.focus();
          expect(leftChevron).toHaveFocus();
          userEvent.tab({ shift: true });
          expect(todayCell).toHaveFocus();
        });

        test('when the right chevron is in focus, pressing tab moves the focus to todays cell', async () => {
          const { todayCell, rightChevron } = renderDatePickerMenu();
          rightChevron?.focus();
          expect(rightChevron).toHaveFocus();
          userEvent.tab();
          expect(todayCell).toHaveFocus();
        });
      });
    });
  });
});
