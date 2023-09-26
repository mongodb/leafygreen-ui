import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  const calendarButton = result.getByRole('button') as HTMLButtonElement;

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

    return {
      menuContainerEl,
      calendarGrid,
      calendarCells,
      leftChevron,
      rightChevron,
      monthSelect,
      yearSelect,
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
