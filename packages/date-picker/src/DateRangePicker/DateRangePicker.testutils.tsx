import React from 'react';
import {
  getByRole as globalGetByRole,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateRangePicker, DateRangePickerProps } from '.';

export interface RenderDateRangePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  inputElements: Array<HTMLInputElement>;
  calendarButton: HTMLButtonElement;
  getMenuElements: () => RenderMenuResult;
  openMenu: () => RenderMenuResult;
}

export interface RenderMenuResult {
  menuContainerEl: HTMLElement | null;
  leftChevron: HTMLButtonElement | null;
  rightChevron: HTMLButtonElement | null;
  calendarGrids: Array<HTMLTableElement> | null;
  calendarCells: Array<HTMLTableCellElement>;
  todayCell: HTMLTableCellElement | null;
  menuFooter: HTMLDivElement | null;
  clearButton: HTMLButtonElement | null;
  cancelButton: HTMLButtonElement | null;
  applyButton: HTMLButtonElement | null;
  quickSelectMenu: HTMLDivElement | null;
  monthSelect: HTMLButtonElement | null;
  yearSelect: HTMLButtonElement | null;
  quickRangeButtons: Array<HTMLButtonElement | null>;
}

/**
 * Renders a date picker for jest environments
 */
export const renderDateRangePicker = (
  props?: Partial<DateRangePickerProps>,
): RenderDateRangePickerResult => {
  const defaultProps = { label: '' };
  const result = render(
    <DateRangePicker
      data-testid="lg-date-picker"
      {...defaultProps}
      {...props}
    />,
  );

  const formField = result.getByTestId('lg-date-picker');
  const inputContainer = result.getByRole('combobox');

  const inputElements = Array.from(inputContainer.querySelectorAll('input'));

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

    const calendarGrids = result.queryAllByRole(
      'grid',
    ) as Array<HTMLTableElement>;

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
    const todayCell = menuContainerEl?.querySelector(
      '[aria-current="true"]',
    ) as HTMLTableCellElement;

    // Footer
    const menuFooter = menuContainerEl?.querySelector(
      '[data-lg="date-range-picker-menu-footer"]',
    ) as HTMLDivElement | null;
    const clearButton = result.queryByText('Clear') as HTMLButtonElement | null;
    const cancelButton = result.queryByText(
      'Cancel',
    ) as HTMLButtonElement | null;
    const applyButton = result.queryByText('Apply') as HTMLButtonElement | null;

    // Quick select menu
    const quickSelectMenu = menuContainerEl?.querySelector(
      '[data-lg="date-range-picker-quick-select-menu"]',
    ) as HTMLDivElement | null;
    const monthSelect = result.queryByLabelText(
      'Select month',
    ) as HTMLButtonElement | null;
    const yearSelect = result.queryByLabelText(
      'Select year',
    ) as HTMLButtonElement | null;

    const quickRangeButtons = Array.from(
      quickSelectMenu?.querySelectorAll(
        '[data-lg="date-range-picker-quick-range-button"]',
      ) || [null],
    ) as Array<HTMLButtonElement | null>;

    return {
      menuContainerEl,
      calendarGrids,
      calendarCells,
      todayCell,
      leftChevron,
      rightChevron,
      menuFooter,
      clearButton,
      cancelButton,
      applyButton,
      quickSelectMenu,
      monthSelect,
      yearSelect,
      quickRangeButtons,
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
    inputElements,
    calendarButton,
    getMenuElements,
    openMenu,
  };
};

export interface ExpectedTabStop {
  name: string;
  selector: string;
}

/**
 * Returns the elements we expect to have focus after pressing `Tab` N times
 */
export const expectedTabStopLabels = {
  closed: [
    'none',
    'input > start date > year segment',
    'input > start date > month segment',
    'input > start date > day segment',
    'input > end date > year segment',
    'input > end date > month segment',
    'input > end date > day segment',
    'input > open menu button',
    'none',
  ],
  basic: [
    'input > start date > year segment',
    'input > start date > month segment',
    'input > start date > day segment',
    'input > end date > year segment',
    'input > end date > month segment',
    'input > end date > day segment',
    'input > open menu button',
    `menu > today cell`,
    'menu > footer > clear button',
    'menu > footer > cancel button',
    'menu > footer > apply button',
    'menu > left chevron',
    'menu > right chevron',
    `menu > today cell`,
  ],
  'quick-select': [
    'input > start date > year segment',
    'input > start date > month segment',
    'input > start date > day segment',
    'input > end date > year segment',
    'input > end date > month segment',
    'input > end date > day segment',
    'input > open menu button',
    `menu > today cell`,
    'menu > footer > clear button',
    'menu > footer > cancel button',
    'menu > footer > apply button',
    'menu > quick select > month select',
    'menu > quick select > year select',
    'menu > quick select > quick range > Today',
    'menu > quick select > quick range > Yesterday',
    'menu > quick select > quick range > Last 7 days',
    'menu > quick select > quick range > Last 30 days',
    'menu > quick select > quick range > Last 90 days',
    'menu > quick select > quick range > Last 12 months',
    'menu > quick select > quick range > All time',
    'menu > left chevron',
    'menu > right chevron',
    `menu > today cell`,
  ],
} as const;

type TabStopLabel =
  (typeof expectedTabStopLabels)[keyof typeof expectedTabStopLabels][number];

export const getTabStopElementMap = (
  renderResult: RenderDateRangePickerResult,
): Record<TabStopLabel, HTMLElement | null> => {
  const { inputElements, calendarButton, getMenuElements } = renderResult;
  const {
    todayCell,
    clearButton,
    cancelButton,
    applyButton,
    monthSelect,
    yearSelect,
    leftChevron,
    rightChevron,
    quickRangeButtons,
  } = getMenuElements();
  return {
    none: null,
    'input > start date > year segment': inputElements[0],
    'input > start date > month segment': inputElements[1],
    'input > start date > day segment': inputElements[2],
    'input > end date > year segment': inputElements[3],
    'input > end date > month segment': inputElements[4],
    'input > end date > day segment': inputElements[5],
    'input > open menu button': calendarButton,
    'menu > today cell': todayCell,
    'menu > footer > clear button': clearButton,
    'menu > footer > cancel button': cancelButton,
    'menu > footer > apply button': applyButton,
    'menu > quick select > month select': monthSelect,
    'menu > quick select > year select': yearSelect,
    'menu > quick select > quick range > Today': quickRangeButtons[0],
    'menu > quick select > quick range > Yesterday': quickRangeButtons[1],
    'menu > quick select > quick range > Last 7 days': quickRangeButtons[2],
    'menu > quick select > quick range > Last 30 days': quickRangeButtons[3],
    'menu > quick select > quick range > Last 90 days': quickRangeButtons[4],
    'menu > quick select > quick range > Last 12 months': quickRangeButtons[5],
    'menu > quick select > quick range > All time': quickRangeButtons[6],
    'menu > left chevron': leftChevron,
    'menu > right chevron': rightChevron,
  };
};
