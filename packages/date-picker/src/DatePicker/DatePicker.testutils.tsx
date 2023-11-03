import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getISODate } from '../shared/utils/getISODate';

import { DatePickerProps } from './DatePicker.types';
import { DatePicker } from '.';

const withinElement = (element: HTMLElement | null) => {
  return element ? within(element) : null;
};

interface RenderDatePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  calendarButton: HTMLButtonElement;
  /** Asynchronously query for the menu elements */
  findMenuElements: () => Promise<RenderMenuResult>;
  /** Opens the menu by clicking the calendar button */
  openMenu: () => Promise<RenderMenuResult>;
  /** re-render the Date Picker with new props */
  rerenderDatePicker: (newProps: Partial<DatePickerProps>) => void;
}

interface RenderMenuResult {
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
}

/**
 * Renders a date picker for jest environments
 */
export const renderDatePicker = (
  props?: Partial<DatePickerProps>,
): RenderDatePickerResult => {
  const defaultProps = { label: '' };
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

  const formField = result.getByTestId('lg-date-picker');
  const inputContainer = result.getByRole('combobox');
  const dayInput = result.getByLabelText('day');
  const monthInput = result.getByLabelText('month');
  const yearInput = result.getByLabelText('year');
  const calendarButton = within(inputContainer).getByRole('button');

  /**
   * Asynchronously query for menu elements.
   */
  async function findMenuElements(): Promise<RenderMenuResult> {
    const menuContainerEl = await waitFor(() => result.queryByRole('listbox'));

    const calendarGrid = withinElement(menuContainerEl)?.queryByRole('grid');
    const calendarCells =
      withinElement(menuContainerEl)?.getAllByRole('gridcell');
    const leftChevron =
      withinElement(menuContainerEl)?.queryByLabelText('Previous month');
    const rightChevron =
      withinElement(menuContainerEl)?.queryByLabelText('Next month');
    const monthSelect =
      withinElement(menuContainerEl)?.queryByLabelText('Select month');
    const yearSelect =
      withinElement(menuContainerEl)?.queryByLabelText('Select year');

    const queryCellByDate = (date: Date): HTMLTableCellElement | null => {
      const cell = calendarGrid?.querySelector(
        `[data-iso="${getISODate(date)}"]`,
      );

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
    };
  }

  async function openMenu(): Promise<RenderMenuResult> {
    userEvent.click(calendarButton);
    const menuElements = await findMenuElements();

    if (menuElements.menuContainerEl) {
      fireEvent.transitionEnd(menuElements.menuContainerEl);
    }

    return menuElements;
  }

  return {
    ...result,
    formField,
    inputContainer,
    dayInput: dayInput as HTMLInputElement,
    monthInput: monthInput as HTMLInputElement,
    yearInput: yearInput as HTMLInputElement,
    calendarButton: calendarButton as HTMLButtonElement,
    findMenuElements,
    openMenu,
    rerenderDatePicker,
  };
};

export const expectedTabStopLabels = {
  closed: [
    'none',
    'input > year',
    'input > month',
    'input > day',
    'input > open menu button',
    'none',
  ],
  open: [
    'none',
    'input > year',
    'input > month',
    'input > day',
    'input > open menu button',
    'menu > today cell',
    'menu > left chevron',
    'menu > month select',
    'menu > year select',
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
