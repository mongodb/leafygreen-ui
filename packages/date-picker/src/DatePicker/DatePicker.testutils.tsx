import React from 'react';
import {
  getByRole as globalGetByRole,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getISODate } from '../shared/utils/getISODate';

import { DatePickerProps } from './DatePicker.types';
import { DatePicker } from '.';

interface RenderDatePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  calendarButton: HTMLButtonElement;
  getMenuElements: () => RenderMenuResult;
  openMenu: () => RenderMenuResult;
}

interface RenderMenuResult {
  menuContainerEl: HTMLElement | null;
  leftChevron: HTMLButtonElement | null;
  rightChevron: HTMLButtonElement | null;
  monthSelect: HTMLButtonElement | null;
  yearSelect: HTMLButtonElement | null;
  calendarGrid: HTMLTableElement | null;
  calendarCells: Array<HTMLTableCellElement>;
  todayCell: HTMLTableCellElement | null;
  getCellForDate: (date: Date) => HTMLTableCellElement | null;
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

  const formField = result.getByTestId('lg-date-picker');
  const inputContainer = result.getByRole('combobox');
  const dayInput = result.getByLabelText('day') as HTMLInputElement;
  const monthInput = result.getByLabelText('month') as HTMLInputElement;
  const yearInput = result.getByLabelText('year') as HTMLInputElement;
  const calendarButton = globalGetByRole(
    inputContainer,
    'button',
  ) as HTMLButtonElement;

  /**
   * Returns relevant menu elements.
   * Call this after the menu has been opened
   */
  function getMenuElements(): RenderMenuResult {
    const menuContainerEl = result.queryByRole('listbox');
    const calendarGrid = result.queryByRole('grid') as HTMLTableElement;
    const calendarCells = result.queryAllByRole(
      'gridcell',
    ) as Array<HTMLTableCellElement>;

    // label text is tested in DatePickerMenu.spec
    const leftChevron = result.queryByLabelText(
      'Previous month',
    ) as HTMLButtonElement;
    const rightChevron = result.queryByLabelText(
      'Next month',
    ) as HTMLButtonElement;
    const monthSelect = result.queryByLabelText(
      'Select month',
    ) as HTMLButtonElement;
    const yearSelect = result.queryByLabelText(
      'Select year',
    ) as HTMLButtonElement;
    const todayCell = calendarGrid?.querySelector(
      '[aria-current="true"]',
    ) as HTMLTableCellElement;

    const getCellForDate = (date: Date): HTMLTableCellElement | null => {
      const cell = calendarGrid.querySelector(
        `"[date-iso=${getISODate(date)}]"`,
      );

      return cell as HTMLTableCellElement | null;
    };

    return {
      menuContainerEl,
      calendarGrid,
      calendarCells,
      todayCell,
      leftChevron,
      rightChevron,
      monthSelect,
      yearSelect,
      getCellForDate,
    };
  }

  function openMenu(): RenderMenuResult {
    userEvent.click(inputContainer);
    return getMenuElements();
  }

  return {
    ...result,
    formField,
    inputContainer,
    dayInput,
    monthInput,
    yearInput,
    calendarButton,
    getMenuElements,
    openMenu,
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
export const getTabStopElementMap = (
  renderResult: RenderDatePickerResult,
): Record<TabStopLabel, HTMLElement | null> => {
  const { yearInput, monthInput, dayInput, calendarButton, getMenuElements } =
    renderResult;
  const { todayCell, monthSelect, yearSelect, leftChevron, rightChevron } =
    getMenuElements();

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
