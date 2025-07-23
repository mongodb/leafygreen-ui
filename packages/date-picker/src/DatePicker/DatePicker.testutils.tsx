import React from 'react';
import {
  fireEvent,
  queryByRole,
  render,
  RenderResult,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getISODate } from '@leafygreen-ui/date-utils';

import { DateSegment } from '../shared/types';

import { DatePickerProps } from './DatePicker.types';
import { DatePicker } from '.';

const withinElement = (element: HTMLElement | null) => {
  return element ? within(element) : null;
};

export interface RenderDatePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  calendarButton: HTMLButtonElement;
  getInputByName: (name: DateSegment) => HTMLInputElement;

  /**
   * Asynchronously query for menu elements
   */
  findMenuElements: () => Promise<RenderMenuResult>;

  /**
   * Wait for the menu element to finish opening.
   * When this method resolves, the appropriate calendar cell will be focused
   */
  waitForMenuToOpen: () => Promise<RenderMenuResult>;

  /**
   * Opens the menu by clicking the calendar button.
   */
  openMenu: () => Promise<RenderMenuResult>;

  /**
   * Rerender the Date Picker with new props
   */
  rerenderDatePicker: (newProps: Partial<DatePickerProps>) => void;
}

export interface RenderMenuResult {
  menuContainerEl: HTMLElement | null;
  leftChevron: HTMLButtonElement | null;
  rightChevron: HTMLButtonElement | null;
  monthSelect: HTMLButtonElement | null;
  yearSelect: HTMLButtonElement | null;
  calendarGrid: HTMLTableElement | null;
  calendarCells: Array<HTMLTableCellElement | null>;
  todayCell: HTMLTableCellElement | null;
  /** Query for a cell with a given date value */
  queryCellByDate: (date: Date) => HTMLTableCellElement | null;
  /** Query for a cell with a given ISO date string */
  queryCellByISODate: (isoString: string) => HTMLTableCellElement | null;
}

/**
 * Renders a date picker for jest environments
 */
export const renderDatePicker = (
  props?: Partial<DatePickerProps>,
): RenderDatePickerResult => {
  const defaultProps = { label: 'label' };
  const result = render(
    <DatePicker data-testid="lg-date-picker" {...defaultProps} {...props} />,
  );

  /** Rerender the Date Picker with new props */
  const rerenderDatePicker = (newProps: Partial<DatePickerProps>) => {
    result.rerender(
      <DatePicker
        data-testid="lg-date-picker"
        {...defaultProps}
        {...props}
        {...newProps}
      />,
    );
  };

  const inputElements = {
    formField: result.getByTestId('lg-date-picker'),
    inputContainer: result.getByRole('combobox'),
    dayInput: result.getByLabelText('day') as HTMLInputElement,
    monthInput: result.getByLabelText('month') as HTMLInputElement,
    yearInput: result.getByLabelText('year') as HTMLInputElement,
    calendarButton: within(result.getByRole('combobox')).getByRole(
      'button',
    ) as HTMLButtonElement,
  };

  const getInputByName = (name: DateSegment) =>
    result.getByLabelText(name) as HTMLInputElement;

  /**
   * Asynchronously query for menu elements.
   */
  async function findMenuElements(): Promise<RenderMenuResult> {
    const menuContainerEl = await waitFor(() =>
      queryByRole(document.body, 'listbox'),
    );

    const calendarGrid = withinElement(menuContainerEl)?.queryByRole('grid');
    const calendarCells =
      withinElement(menuContainerEl)?.getAllByRole('gridcell');
    const leftChevron =
      withinElement(menuContainerEl)?.queryByLabelText('Previous month') ||
      withinElement(menuContainerEl)?.queryByLabelText('Previous valid month');
    const rightChevron =
      withinElement(menuContainerEl)?.queryByLabelText('Next month') ||
      withinElement(menuContainerEl)?.queryByLabelText('Next valid month');
    const monthSelect = withinElement(menuContainerEl)?.queryByLabelText(
      'Select month',
      {
        exact: false,
      },
    );
    const yearSelect = withinElement(menuContainerEl)?.queryByLabelText(
      'Select year',
      {
        exact: false,
      },
    );

    const queryCellByDate = (date: Date): HTMLTableCellElement | null => {
      const cell = calendarGrid?.querySelector(
        `[data-iso="${getISODate(date)}"]`,
      );

      return cell as HTMLTableCellElement | null;
    };

    const queryCellByISODate = (
      isoString: string,
    ): HTMLTableCellElement | null => {
      const cell = calendarGrid?.querySelector(`[data-iso="${isoString}"]`);

      return cell as HTMLTableCellElement | null;
    };

    const todayCell = queryCellByDate(new Date(Date.now()));

    return {
      menuContainerEl,
      calendarGrid: calendarGrid as HTMLTableElement | null,
      calendarCells: calendarCells as Array<HTMLTableCellElement | null>,
      leftChevron: leftChevron as HTMLButtonElement | null,
      rightChevron: rightChevron as HTMLButtonElement | null,
      monthSelect: monthSelect as HTMLButtonElement | null,
      yearSelect: yearSelect as HTMLButtonElement | null,
      todayCell,
      queryCellByDate,
      queryCellByISODate,
    };
  }

  async function waitForMenuToOpen(): Promise<RenderMenuResult> {
    const menuElements = await findMenuElements();

    fireEvent.transitionEnd(menuElements.menuContainerEl!);

    return menuElements;
  }

  async function openMenu(): Promise<RenderMenuResult> {
    userEvent.click(inputElements.calendarButton);
    return await waitForMenuToOpen();
  }

  return {
    ...result,
    ...inputElements,
    getInputByName,
    findMenuElements,
    waitForMenuToOpen,
    openMenu,
    rerenderDatePicker,
  };
};

/** Labels used for Tab stop testing */
export const expectedTabStopLabels = {
  closed: [
    'none',
    'input > year',
    'input > month',
    'input > day',
    'input > open menu button',
    'none',
  ],
  openENUSFormat: [
    'none',
    'input > month',
    'input > day',
    'input > year',
    'input > open menu button',
    'menu > today cell',
    'menu > left chevron',
    'menu > month select',
    'menu > year select',
    'menu > right chevron',
    'menu > today cell',
  ],
  openISOFormat: [
    'none',
    'input > year',
    'input > month',
    'input > day',
    'input > open menu button',
    'menu > today cell',
    'menu > left chevron',
    'menu > year select',
    'menu > month select',
    'menu > right chevron',
    'menu > today cell',
  ],
};

type TabStopLabel =
  (typeof expectedTabStopLabels)[keyof typeof expectedTabStopLabels][number];

export const findTabStopElementMap = async (
  renderResult: RenderDatePickerResult,
): Promise<Record<TabStopLabel, HTMLElement | null>> => {
  const { yearInput, monthInput, dayInput, calendarButton, findMenuElements } =
    renderResult;
  const { todayCell, monthSelect, yearSelect, leftChevron, rightChevron } =
    await findMenuElements();

  return {
    none: null,
    'input > year': yearInput,
    'input > month': monthInput,
    'input > day': dayInput,
    'input > open menu button': calendarButton,
    'menu > today cell': todayCell,
    'menu > left chevron': leftChevron,
    'menu > month select': monthSelect,
    'menu > year select': yearSelect,
    'menu > right chevron': rightChevron,
  };
};
