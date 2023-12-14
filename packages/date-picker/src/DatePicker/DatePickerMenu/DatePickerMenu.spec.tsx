import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import {
  getISODate,
  getISODateTZ,
  Month,
  newUTC,
  setUTCDate,
} from '@leafygreen-ui/date-utils';
import {
  mockTimeZone,
  testTimeZones,
} from '@leafygreen-ui/date-utils/src/testing';

import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../shared/context';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../DatePickerContext';

import { DatePickerMenu, DatePickerMenuProps } from '.';

const testToday = newUTC(2023, Month.September, 10);
const testValue = newUTC(2023, Month.September, 14);

const renderDatePickerMenu = (
  props?: Partial<DatePickerMenuProps> | null,
  singleContext?: Partial<DatePickerProviderProps> | null,
  context?: Partial<SharedDatePickerProviderProps> | null,
) => {
  const result = render(
    <SharedDatePickerProvider label="" {...context} initialOpen={true}>
      <DatePickerProvider
        value={null}
        setValue={() => {}}
        handleValidation={undefined}
        {...singleContext}
      >
        <DatePickerMenu {...props} />,
      </DatePickerProvider>
    </SharedDatePickerProvider>,
  );

  const rerenderDatePickerMenu = (
    newProps?: Partial<DatePickerMenuProps> | null,
    newSingleContext?: Partial<DatePickerProviderProps> | null,
  ) =>
    result.rerender(
      <SharedDatePickerProvider label="" {...context} initialOpen={true}>
        <DatePickerProvider
          value={null}
          setValue={() => {}}
          handleValidation={undefined}
          {...singleContext}
          {...newSingleContext}
        >
          <DatePickerMenu
            {...({ ...props, ...newProps } as Partial<DatePickerMenuProps>)}
          />
        </DatePickerProvider>
      </SharedDatePickerProvider>,
    );

  const calendarGrid = result.getByRole('grid');

  const calendarCells = result.queryAllByRole(
    'gridcell',
  ) as Array<HTMLTableCellElement>;

  const todayCell = calendarGrid.querySelector(
    `[data-iso="${getISODateTZ(
      new Date(Date.now()),
      context?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    )}"]`,
  );

  const getCellWithValue = (date: Date) =>
    calendarGrid.querySelector(`[data-iso="${getISODate(date)}"]`);

  const getCellWithISOString = (isoStr: string) =>
    calendarGrid.querySelector(`[data-iso="${isoStr}"]`);

  const getCurrentCell = () =>
    calendarGrid.querySelector('[aria-current="true"]');

  const leftChevron =
    result.queryByLabelText('Previous month') ||
    result.queryByLabelText('Previous valid month');
  const rightChevron =
    result.queryByLabelText('Next month') ||
    result.queryByLabelText('Next valid month');
  const monthSelect = result.queryByLabelText('Select month');
  const yearSelect = result.queryByLabelText('Select year');

  return {
    ...result,
    rerenderDatePickerMenu,
    calendarGrid,
    calendarCells,
    todayCell,
    getCellWithValue,
    getCellWithISOString,
    getCurrentCell,
    leftChevron,
    rightChevron,
    monthSelect,
    yearSelect,
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

    test('sets `aria-current` on today cell', () => {
      jest.setSystemTime(
        newUTC(2023, Month.September, 10, 0, testToday.getTimezoneOffset()),
      );
      const { getCellWithISOString } = renderDatePickerMenu();
      expect(getCellWithISOString('2023-09-10')).toHaveAttribute(
        'aria-current',
        'true',
      );
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

    describe('when value is out of range', () => {
      test('grid is labelled', () => {
        const { calendarGrid } = renderDatePickerMenu(null, {
          value: newUTC(2048, Month.December, 25),
        });
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2048');
      });
      test('all cells disabled', () => {
        const { calendarCells } = renderDatePickerMenu(null, {
          value: newUTC(2048, Month.December, 25),
        });
        const isEveryCellDisabled = calendarCells.every(
          cell => cell?.getAttribute('aria-disabled') === 'true',
        );
        expect(isEveryCellDisabled).toBe(true);
      });

      test('does not highlight a cell', () => {
        const { calendarCells } = renderDatePickerMenu(null, {
          value: newUTC(2048, Month.December, 25),
        });
        const isSomeCellHighlighted = calendarCells.some(
          cell => cell?.getAttribute('aria-selected') === 'true',
        );
        expect(isSomeCellHighlighted).toBe(false);
      });
    });

    // TODO: Test in multiple time zones with a properly mocked Date object
    describe('rendered cells', () => {
      test('have correct text content and `aria-label`', () => {
        const { calendarCells } = renderDatePickerMenu();

        calendarCells.forEach((cell, i) => {
          const date = String(i + 1);
          expect(cell).toHaveTextContent(date);

          expect(cell).toHaveAttribute(
            'aria-label',
            expect.stringContaining(`September ${date}, 2023`),
          );
        });
      });
    });

    describe.each(testTimeZones)(
      'when system time is in $tz',
      ({ tz, UTCOffset }) => {
        describe.each([
          { tz: undefined, UTCOffset: undefined },
          ...testTimeZones,
        ])('and timeZone prop is $tz', prop => {
          const elevenLocal = 23 - (prop.UTCOffset ?? UTCOffset);
          const midnightLocal = 0 - (prop.UTCOffset ?? UTCOffset);
          const dec24Local = newUTC(2023, Month.December, 24, elevenLocal, 59);
          const dec25Local = newUTC(2023, Month.December, 25, midnightLocal, 0);
          const dec24ISO = '2023-12-24';
          const dec25ISO = '2023-12-25';
          const ctx = {
            timeZone: prop?.tz,
          };

          beforeEach(() => {
            jest.setSystemTime(dec24Local);
            mockTimeZone(tz, UTCOffset);
          });
          afterEach(() => {
            jest.restoreAllMocks();
          });

          test('when date changes, cell marked as `current` updates', () => {
            const { getCellWithISOString, rerenderDatePickerMenu } =
              renderDatePickerMenu(null, null, ctx);
            const dec24Cell = getCellWithISOString(dec24ISO);
            expect(dec24Cell).toHaveAttribute('aria-current', 'true');

            jest.setSystemTime(dec25Local);

            rerenderDatePickerMenu();
            const dec25LocalCell = getCellWithISOString(dec25ISO);
            expect(dec25LocalCell).toHaveAttribute('aria-current', 'true');
          });
        });
      },
    );
  });

  describe('Keyboard navigation', () => {
    describe('Arrow Keys', () => {
      beforeEach(() => {
        jest.setSystemTime(testToday);
        mockTimeZone('America/New_York', -5);
      });
      afterEach(() => {
        jest.restoreAllMocks();
      });

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
        // DST: Sun, Mar 12, 2023 – Sun, Nov 5, 2023

        const standardTimeEndDate = newUTC(2023, Month.March, 11, 22);
        const weekBeforeDTStart = newUTC(2023, Month.March, 5, 22);
        const daylightTimeStartDate = newUTC(2023, Month.March, 12, 22);
        const daylightTimeEndDate = newUTC(2023, Month.November, 5, 22);
        const weekAfterDTEnd = newUTC(2023, Month.November, 12, 22);
        const standardTimeStartDate = newUTC(2023, Month.November, 6, 22);

        describe('DST start (Mar 12 2023)', () => {
          test('left arrow moves focus to prev day', async () => {
            jest.setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            const currentDayCell = getCellWithISOString('2023-03-12'); // Mar 12
            await waitFor(() => expect(currentDayCell).toHaveFocus());

            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithISOString('2023-03-11'); // Mar 11
            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.setSystemTime(standardTimeEndDate); // Mar 11
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            const currentDayCell = getCellWithISOString('2023-03-11'); // Mar 11
            await waitFor(() => expect(currentDayCell).toHaveFocus());

            userEvent.keyboard('{arrowright}');
            const nextDayCell = getCellWithISOString('2023-03-12'); // Mar 12
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');
            const prevWeekCell = getCellWithISOString('2023-03-05'); // Mar 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.setSystemTime(weekBeforeDTStart); // Mar 5
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowdown}');
            const nextWeekCell = getCellWithISOString('2023-03-12'); // Mar 12
            await waitFor(() => expect(nextWeekCell).toHaveFocus());
          });
        });

        describe('DST end (Nov 5 2023)', () => {
          test('left arrow moves focus to prev day', async () => {
            jest.setSystemTime(standardTimeStartDate); // Nov 6
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithISOString('2023-11-05'); // Nov 5

            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.setSystemTime(daylightTimeEndDate); // Nov 5

            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowright}');

            const nextDayCell = getCellWithISOString('2023-11-06'); // Nov 6
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.setSystemTime(weekAfterDTEnd); // Nov 12
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');

            const prevWeekCell = getCellWithISOString('2023-11-05'); // Nov 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.setSystemTime(daylightTimeEndDate); // Nov 5
            const { getCellWithISOString } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowdown}');

            const nextWeekCell = getCellWithISOString('2023-11-12'); // Nov 12
            await waitFor(() => expect(nextWeekCell).toHaveFocus());
          });
        });
      });

      describe('when next day would be out of range', () => {
        const testValue = newUTC(2023, Month.September, 10);
        const isoString = '2023-09-10';
        const singleCtx = {
          value: testValue,
        };
        test('left arrow does nothing', async () => {
          const { getCellWithISOString } = renderDatePickerMenu(
            null,
            singleCtx,
            {
              min: testValue,
            },
          );
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          await waitFor(() =>
            expect(getCellWithISOString(isoString)).toHaveFocus(),
          );
        });

        test('right arrow does nothing', async () => {
          const { getCellWithISOString } = renderDatePickerMenu(
            null,
            singleCtx,
            {
              max: testValue,
            },
          );
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          await waitFor(() =>
            expect(getCellWithISOString(isoString)).toHaveFocus(),
          );
        });

        test('up arrow does nothing', async () => {
          const { getCellWithISOString } = renderDatePickerMenu(
            null,
            singleCtx,
            {
              min: addDays(testValue, -6),
            },
          );
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          await waitFor(() =>
            expect(getCellWithISOString(isoString)).toHaveFocus(),
          );
        });
        test('down arrow does nothing', async () => {
          const { getCellWithISOString } = renderDatePickerMenu(
            null,
            singleCtx,
            {
              max: addDays(testValue, 6),
            },
          );
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          await waitFor(() =>
            expect(getCellWithISOString(isoString)).toHaveFocus(),
          );
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
        test('when a cell is focused, pressing tab moves the focus to the left chevron', () => {
          const { todayCell, leftChevron } = renderDatePickerMenu();
          userEvent.tab();
          expect(todayCell).toHaveFocus();
          userEvent.tab();
          expect(leftChevron).toHaveFocus();
        });

        test('when a cell is focused, pressing tab + shift moves the focus to the right chevron', () => {
          const { todayCell, rightChevron } = renderDatePickerMenu();
          userEvent.tab();
          expect(todayCell).toHaveFocus();
          userEvent.tab({ shift: true });
          expect(rightChevron).toHaveFocus();
        });

        test('when the left chevron is focused, pressing tab + shift moves the focus to todays cell', () => {
          const { todayCell, leftChevron } = renderDatePickerMenu();
          leftChevron?.focus();
          expect(leftChevron).toHaveFocus();
          userEvent.tab({ shift: true });
          expect(todayCell).toHaveFocus();
        });

        test('when the right chevron is focused, pressing tab moves the focus to todays cell', () => {
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
