import React from 'react';
import { render } from '@testing-library/react';

import {
  getISODate,
  getISODateTZ,
  Month,
  newUTC,
} from '@leafygreen-ui/date-utils';
import { mockTimeZone, testTimeZones } from '@leafygreen-ui/date-utils/testing';

import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../shared/context';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../DatePickerContext';

import { DatePickerMenu, DatePickerMenuProps } from '.';

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

describe('DatePicker time zone testing', () => {
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
          jest.useFakeTimers().setSystemTime(dec24Local);
          mockTimeZone(tz, UTCOffset);
        });
        afterEach(() => {
          jest.useRealTimers();
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
