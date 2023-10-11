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
export const getExpectedTabStopSelector = (
  menuState: 'closed' | 'basic' | 'quick-select',
): Array<string | null> => {
  switch (menuState) {
    case 'closed': {
      return [
        null,
        '[data-lg="date-range-input-start"] > input[aria-label="year"]',
        '[data-lg="date-range-input-start"] > input[aria-label="month"]',
        '[data-lg="date-range-input-start"] > input[aria-label="day"]',
        '[data-lg="date-range-input-end"] > input[aria-label="year"]',
        '[data-lg="date-range-input-end"] > input[aria-label="month"]',
        '[data-lg="date-range-input-end"] > input[aria-label="day"]',
        'button[aria-label="Open calendar menu"]',
        null,
      ];
    }

    case 'basic': {
      return [
        '[data-lg="date-range-input-start"] > input[aria-label="year"]',
        '[data-lg="date-range-input-start"] > input[aria-label="month"]',
        '[data-lg="date-range-input-start"] > input[aria-label="day"]',
        '[data-lg="date-range-input-end"] > input[aria-label="year"]',
        '[data-lg="date-range-input-end"] > input[aria-label="month"]',
        '[data-lg="date-range-input-end"] > input[aria-label="day"]',
        'button[aria-label="Open calendar menu"]',
        `listbox[data-lg="date-range-menu"] table td[data-iso="${new Date().toISOString()}"]`,
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(1)',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(2)',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(3)',
        'listbox[data-lg="date-range-menu"] button[aria-label="Previous month"]',
        'listbox[data-lg="date-range-menu"] button[aria-label="Next month"]',
        `listbox[data-lg="date-range-menu"] table td[data-iso="${new Date().toISOString()}"]`,
      ];
    }

    case 'quick-select': {
      return [
        '[data-lg="date-range-input-start"] > input[aria-label="year"]',
        '[data-lg="date-range-input-start"] > input[aria-label="month"]',
        '[data-lg="date-range-input-start"] > input[aria-label="day"]',
        '[data-lg="date-range-input-end"] > input[aria-label="year"]',
        '[data-lg="date-range-input-end"] > input[aria-label="month"]',
        '[data-lg="date-range-input-end"] > input[aria-label="day"]',
        'button[aria-label="Open calendar menu"]',
        `listbox[data-lg="date-range-menu"] table td[data-iso="${new Date().toISOString()}"]`,
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(1)',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(2)',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-menu-footer"] button:nth-child(3)',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] button[aria-label="Select month"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] button[aria-label="Select year"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Today"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Yesterday"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Last 7 days"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Last 30 days"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Last 90 days"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="Last 12 months"]',
        'listbox[data-lg="date-range-menu"] [data-lg="date-range-picker-quick-select-menu"] [data-lg="date-range-picker-quick-range-button"] [aria-label="All time"]',
        'listbox[data-lg="date-range-menu"] button[aria-label="Previous month"]',
        'listbox[data-lg="date-range-menu"] button[aria-label="Next month"]',
        `listbox[data-lg="date-range-menu"] table td[data-iso="${new Date().toISOString()}"]`,
      ];
    }
  }
};
