import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import {
  getISODate,
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

const standardTimeEndDate = newUTC(2023, Month.March, 11);
const daylightTimeStartDate = newUTC(2023, Month.March, 12);
const daylightTimeEndDate = newUTC(2023, Month.November, 5);
const standardTimeStartDate = newUTC(2023, Month.November, 6);

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
    `[data-iso="${getISODate(testToday)}"]`,
  );

  const getCellWithValue = (date: Date) =>
    calendarGrid.querySelector(`[data-iso="${getISODate(date)}"]`);

  const getCellWithISOString = (isoStr: string) =>
    calendarGrid.querySelector(`[data-iso="${isoStr}"]`);

  const getCurrentCell = () =>
    calendarGrid.querySelector('[aria-current="true"]');

  const leftChevron = result?.queryByLabelText('Previous month');
  const rightChevron = result?.queryByLabelText('Next month');

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

    describe.only.each(testTimeZones)(
      'when system time is in $tz',
      ({ tz, UTCOffset }) => {
        const dec24Local = newUTC(2023, Month.December, 24, 23 - UTCOffset, 59);
        const dec25Local = newUTC(2023, Month.December, 25, 0 - UTCOffset, 0);
        const dec24ISO = '2023-12-24';
        const dec25ISO = '2023-12-25';

        beforeEach(() => {
          jest.setSystemTime(dec24Local);
          mockTimeZone(tz, UTCOffset);
        });
        afterEach(() => {
          jest.restoreAllMocks();
        });

        test('default focus (highlight) is on `today`', () => {
          const { getCellWithISOString } = renderDatePickerMenu();
          userEvent.tab();
          expect(getCellWithISOString(dec24ISO)).toHaveFocus();
        });

        test('when `value` is set, focus (highlight) starts on current value', () => {
          const { getCellWithValue } = renderDatePickerMenu(null, {
            value: testValue,
          });
          userEvent.tab();
          const valueCell = getCellWithValue(testValue);
          expect(valueCell).toHaveFocus();
        });

        test('when date changes, cell marked as `current` updates', () => {
          const { getCellWithISOString, rerenderDatePickerMenu } =
            renderDatePickerMenu();
          const dec24Cell = getCellWithISOString(dec24ISO);
          expect(dec24Cell).toHaveAttribute('aria-current', 'true');

          jest.setSystemTime(dec25Local);

          rerenderDatePickerMenu();
          const dec25LocalCell = getCellWithISOString(dec25ISO);
          expect(dec25LocalCell).toHaveAttribute('aria-current', 'true');
        });

        describe.each(testTimeZones)(
          'and timeZone prop is $tz',
          ({ tz: tzProp, UTCOffset: propOffset }) => {
            const ctx = {
              timeZone: tzProp,
            };
            const dec24Local = newUTC(
              2023,
              Month.December,
              24,
              23 - propOffset,
              59,
            );

            const dec25Local = newUTC(
              2023,
              Month.December,
              25,
              0 - propOffset,
              0,
            );

            beforeEach(() => {
              jest.setSystemTime(dec24Local);
            });

            test('default focus (highlight) is on `today`', () => {
              const { getCellWithISOString } = renderDatePickerMenu(
                null,
                null,
                ctx,
              );
              userEvent.tab();
              expect(getCellWithISOString(dec24ISO)).toHaveFocus();
            });

            test('when `value` is set, focus (highlight) starts on current value', () => {
              const { getCellWithValue } = renderDatePickerMenu(
                null,
                {
                  value: testValue,
                },
                ctx,
              );
              userEvent.tab();
              const valueCell = getCellWithValue(testValue);
              expect(valueCell).toHaveFocus();
            });

            test('when time changes cell marked as `current` updates', () => {
              const { getCellWithISOString, rerenderDatePickerMenu } =
                renderDatePickerMenu(null, null, ctx);
              const dec24Cell = getCellWithISOString(dec24ISO);
              expect(dec24Cell).toHaveAttribute('aria-current', 'true');
              jest.setSystemTime(dec25Local);
              rerenderDatePickerMenu();
              const dec25Cell = getCellWithISOString(dec25ISO);
              expect(dec25Cell).toHaveAttribute('aria-current', 'true');
            });
          },
        );
      },
    );
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
            jest.setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithValue(standardTimeEndDate); // Mar 11

            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.setSystemTime(standardTimeEndDate); // Mar 11
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowright}');
            const nextDayCell = getCellWithValue(daylightTimeStartDate); // Mar 12
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.setSystemTime(daylightTimeStartDate); // Mar 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');
            const prevWeekCell = getCellWithValue(weekBeforeDTStart); // Mar 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.setSystemTime(weekBeforeDTStart); // Mar 5
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
            jest.setSystemTime(standardTimeStartDate); // Nov 6
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowleft}');
            const prevDayCell = getCellWithValue(daylightTimeEndDate); // Nov 5

            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('right arrow moves focus to next day', async () => {
            jest.setSystemTime(daylightTimeEndDate); // Nov 5

            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowright}');

            const nextDayCell = getCellWithValue(standardTimeStartDate); // Nov 6
            await waitFor(() => expect(nextDayCell).toHaveFocus());
          });

          test('up arrow moves focus to the previous week', async () => {
            jest.setSystemTime(weekAfterDTEnd); // Nov 12
            const { getCellWithValue } = renderDatePickerMenu();
            userEvent.tab();
            userEvent.keyboard('{arrowup}');

            const prevWeekCell = getCellWithValue(daylightTimeEndDate); // Nov 5
            await waitFor(() => expect(prevWeekCell).toHaveFocus());
          });

          test('down arrow moves focus to the next week', async () => {
            jest.setSystemTime(daylightTimeEndDate); // Nov 5
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
