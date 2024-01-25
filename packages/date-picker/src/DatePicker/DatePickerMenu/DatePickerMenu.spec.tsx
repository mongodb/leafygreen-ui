import React from 'react';
import { render } from '@testing-library/react';

import {
  getISODate,
  getISODateTZ,
  Month,
  newUTC,
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
  const monthSelect = result.queryByLabelText('Select month', { exact: false });
  const yearSelect = result.queryByLabelText('Select year', { exact: false });

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
      const { getByLabelText } = renderDatePickerMenu();
      const leftChevron = getByLabelText('Previous month');
      const rightChevron = getByLabelText('Next month');
      expect(leftChevron).toBeInTheDocument();
      expect(rightChevron).toBeInTheDocument();
    });
    test('select menu triggers have aria labels', () => {
      const { monthSelect, yearSelect } = renderDatePickerMenu();
      expect(monthSelect).toBeInTheDocument();
      expect(yearSelect).toBeInTheDocument();
    });
    test('select menus have correct values', () => {
      const { monthSelect, yearSelect } = renderDatePickerMenu();
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
        const { rerenderDatePickerMenu, monthSelect, yearSelect } =
          renderDatePickerMenu();
        rerenderDatePickerMenu(null, {
          value: newUTC(2024, Month.March, 10),
        });
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
});
