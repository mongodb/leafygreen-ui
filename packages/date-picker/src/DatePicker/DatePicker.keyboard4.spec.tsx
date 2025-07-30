import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { renderDatePicker, RenderMenuResult } from './DatePicker.testutils';

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

describe('DatePicker keyboard interaction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('arrow keys interaction when Menu is focused', () => {
    describe('basic arrow key behavior', () => {
      let menuResult: RenderMenuResult;

      beforeEach(async () => {
        const renderResult = renderDatePicker({
          value: newUTC(2023, Month.September, 10),
        });
        menuResult = await renderResult.openMenu();
      });

      test('left arrow moves focus to the previous day', async () => {
        const { queryCellByISODate } = menuResult;
        userEvent.keyboard('{arrowleft}');
        const prevDay = queryCellByISODate('2023-09-09');
        await waitFor(() => expect(prevDay).toHaveFocus());
      });

      test('right arrow moves focus to the next day', async () => {
        const { queryCellByISODate } = menuResult;
        userEvent.keyboard('{arrowright}');
        const nextDay = queryCellByISODate('2023-09-11');
        await waitFor(() => expect(nextDay).toHaveFocus());
      });

      test('up arrow moves focus to the previous week', async () => {
        const { queryCellByISODate } = menuResult;
        userEvent.keyboard('{arrowup}');
        const prevWeek = queryCellByISODate('2023-09-03');
        await waitFor(() => expect(prevWeek).toHaveFocus());
      });

      test('down arrow moves focus to the next week', async () => {
        const { queryCellByISODate } = menuResult;
        userEvent.keyboard('{arrowdown}');
        const nextWeek = queryCellByISODate('2023-09-17');
        await waitFor(() => expect(nextWeek).toHaveFocus());
      });
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
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          const currentDayCell = queryCellByISODate('2023-03-12'); // Mar 12
          await waitFor(() => expect(currentDayCell).toHaveFocus());

          userEvent.keyboard('{arrowleft}');
          const prevDayCell = queryCellByISODate('2023-03-11'); // Mar 11
          await waitFor(() => expect(prevDayCell).toHaveFocus());
        });

        test('right arrow moves focus to next day', async () => {
          jest.setSystemTime(standardTimeEndDate); // Mar 11
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          const currentDayCell = queryCellByISODate('2023-03-11'); // Mar 11
          await waitFor(() => expect(currentDayCell).toHaveFocus());

          userEvent.keyboard('{arrowright}');
          const nextDayCell = queryCellByISODate('2023-03-12'); // Mar 12
          await waitFor(() => expect(nextDayCell).toHaveFocus());
        });

        test('up arrow moves focus to the previous week', async () => {
          jest.setSystemTime(daylightTimeStartDate); // Mar 12
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowup}');
          const prevWeekCell = queryCellByISODate('2023-03-05'); // Mar 5
          await waitFor(() => expect(prevWeekCell).toHaveFocus());
        });

        test('down arrow moves focus to the next week', async () => {
          jest.setSystemTime(weekBeforeDTStart); // Mar 5
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowdown}');
          const nextWeekCell = queryCellByISODate('2023-03-12'); // Mar 12
          await waitFor(() => expect(nextWeekCell).toHaveFocus());
        });
      });

      describe('DST end (Nov 5 2023)', () => {
        test('left arrow moves focus to prev day', async () => {
          jest.setSystemTime(standardTimeStartDate); // Nov 6
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowleft}');
          const prevDayCell = queryCellByISODate('2023-11-05'); // Nov 5

          await waitFor(() => expect(prevDayCell).toHaveFocus());
        });

        test('right arrow moves focus to next day', async () => {
          jest.setSystemTime(daylightTimeEndDate); // Nov 5

          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowright}');

          const nextDayCell = queryCellByISODate('2023-11-06'); // Nov 6
          await waitFor(() => expect(nextDayCell).toHaveFocus());
        });

        test('up arrow moves focus to the previous week', async () => {
          jest.setSystemTime(weekAfterDTEnd); // Nov 12
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowup}');

          const prevWeekCell = queryCellByISODate('2023-11-05'); // Nov 5
          await waitFor(() => expect(prevWeekCell).toHaveFocus());
        });

        test('down arrow moves focus to the next week', async () => {
          jest.setSystemTime(daylightTimeEndDate); // Nov 5
          const { openMenu } = renderDatePicker();
          const { queryCellByISODate } = await openMenu();
          userEvent.keyboard('{arrowdown}');

          const nextWeekCell = queryCellByISODate('2023-11-12'); // Nov 12
          await waitFor(() => expect(nextWeekCell).toHaveFocus());
        });
      });
    });

    describe('when next day would be out of range', () => {
      const testValue = newUTC(2023, Month.September, 10);
      const isoString = '2023-09-10';

      test('left arrow does nothing', async () => {
        const { openMenu } = renderDatePicker({
          value: testValue,
          min: testValue,
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowleft}');
        await waitFor(() =>
          expect(queryCellByISODate(isoString)).toHaveFocus(),
        );
      });

      test('right arrow does nothing', async () => {
        const { openMenu } = renderDatePicker({
          value: testValue,
          max: testValue,
        });
        const { queryCellByISODate } = await openMenu();

        userEvent.keyboard('{arrowright}');
        await waitFor(() =>
          expect(queryCellByISODate(isoString)).toHaveFocus(),
        );
      });

      test('up arrow does nothing', async () => {
        const { openMenu } = renderDatePicker({
          value: testValue,
          min: addDays(testValue, -6),
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowup}');
        await waitFor(() =>
          expect(queryCellByISODate(isoString)).toHaveFocus(),
        );
      });
      test('down arrow does nothing', async () => {
        const { openMenu } = renderDatePicker({
          value: testValue,
          max: addDays(testValue, 6),
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowdown}');
        await waitFor(() =>
          expect(queryCellByISODate(isoString)).toHaveFocus(),
        );
      });
    });

    describe('update the displayed month', () => {
      test('left arrow updates displayed month to previous', async () => {
        const value = new Date(Date.UTC(2023, Month.September, 1));
        const { openMenu } = renderDatePicker({ value });
        const { calendarGrid } = await openMenu();

        userEvent.keyboard('{arrowleft}');
        expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
      });

      test('right arrow updates displayed month to next', async () => {
        const value = new Date(Date.UTC(2023, Month.September, 30));
        const { openMenu } = renderDatePicker({ value });
        const { calendarGrid } = await openMenu();
        userEvent.keyboard('{arrowright}');
        expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
      });

      test('up arrow updates displayed month to previous', async () => {
        const value = new Date(Date.UTC(2023, Month.September, 6));
        const { openMenu } = renderDatePicker({ value });
        const { calendarGrid } = await openMenu();

        userEvent.keyboard('{arrowup}');
        expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
      });

      test('down arrow updates displayed month to next', async () => {
        const value = new Date(Date.UTC(2023, Month.September, 25));
        const { openMenu } = renderDatePicker({ value });
        const { calendarGrid } = await openMenu();

        userEvent.keyboard('{arrowdown}');
        expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
      });

      test('does not update month when month does not need to change', async () => {
        const { openMenu } = renderDatePicker({
          value: newUTC(2023, Month.September, 10),
        });
        const { calendarGrid } = await openMenu();

        userEvent.tab();
        userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
        expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');
      });
    });

    describe('when month should be updated', () => {
      test('left arrow focuses the previous day', async () => {
        const value = newUTC(2023, Month.September, 1);
        const { openMenu } = renderDatePicker({
          value,
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowleft}');
        const highlightedCell = queryCellByISODate('2023-08-31');
        await waitFor(() => expect(highlightedCell).toHaveFocus());
      });
      test('right arrow focuses the next day', async () => {
        const value = newUTC(2023, Month.September, 30);
        const { openMenu } = renderDatePicker({
          value,
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowright}');
        const highlightedCell = queryCellByISODate('2023-10-01');
        await waitFor(() => expect(highlightedCell).toHaveFocus());
      });
      test('up arrow focuses the previous week', async () => {
        const value = newUTC(2023, Month.September, 7);
        const { openMenu } = renderDatePicker({
          value,
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowup}');
        const highlightedCell = queryCellByISODate('2023-08-31');
        await waitFor(() => expect(highlightedCell).toHaveFocus());
      });
      test('down arrow focuses the next week', async () => {
        const value = newUTC(2023, Month.September, 24);
        const { openMenu } = renderDatePicker({
          value,
        });
        const { queryCellByISODate } = await openMenu();
        userEvent.keyboard('{arrowdown}');
        const highlightedCell = queryCellByISODate('2023-10-01');
        await waitFor(() => expect(highlightedCell).toHaveFocus());
      });
    });

    describe('focus-trap', () => {
      test('when a cell is focused, pressing tab moves the focus to the left chevron', async () => {
        const { openMenu } = renderDatePicker();
        const { todayCell, leftChevron } = await openMenu();
        expect(todayCell).toHaveFocus();
        userEvent.tab();
        expect(leftChevron).toHaveFocus();
      });

      test('when a cell is focused, pressing tab + shift moves the focus to the right chevron', async () => {
        const { openMenu } = renderDatePicker();
        const { todayCell, rightChevron } = await openMenu();
        expect(todayCell).toHaveFocus();
        userEvent.tab({ shift: true });
        expect(rightChevron).toHaveFocus();
      });

      test('when the left chevron is focused, pressing tab + shift moves the focus to todays cell', async () => {
        const { openMenu } = renderDatePicker();
        const { todayCell, leftChevron } = await openMenu();
        userEvent.tab();
        expect(leftChevron).toHaveFocus();
        userEvent.tab({ shift: true });
        expect(todayCell).toHaveFocus();
      });

      test('when the right chevron is focused, pressing tab moves the focus to todays cell', async () => {
        const { openMenu } = renderDatePicker();
        const { todayCell, rightChevron } = await openMenu();
        userEvent.tab({ shift: true });
        expect(rightChevron).toHaveFocus();
        userEvent.tab();
        expect(todayCell).toHaveFocus();
      });
    });
  });
});
