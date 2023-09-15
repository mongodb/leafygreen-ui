import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePickerProps } from './DatePicker.types';
import { DatePicker } from '.';

interface RenderDatePickerResult extends RenderResult {
  formField: HTMLElement;
  inputContainer: HTMLElement;
  dayInput: HTMLElement;
  monthInput: HTMLElement;
  yearInput: HTMLElement;
  getMenuElements: () => RenderMenuResult;
  openMenu: () => RenderMenuResult;
}

interface RenderMenuResult {
  menuContainerEl: HTMLElement | null;
  leftChevron: HTMLElement | null;
  rightChevron: HTMLElement | null;
  monthSelect: HTMLElement | null;
  yearSelect: HTMLElement | null;
  calendarGrid: HTMLElement | null;
  calendarCells: Array<HTMLElement>;
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
  const dayInput = result.getByLabelText('day');
  const monthInput = result.getByLabelText('month');
  const yearInput = result.getByLabelText('year');

  /**
   * Returns relevant menu elements.
   * Call this after the menu has been opened
   */
  function getMenuElements(): RenderMenuResult {
    const menuContainerEl = result.queryByRole('listbox');
    const calendarGrid = result.queryByRole('grid');
    const calendarCells = result.queryAllByRole('gridcell');

    // label text is tested in DatePickerMenu.spec
    const leftChevron = result.queryByLabelText('Previous month');
    const rightChevron = result.queryByLabelText('Next month');
    const monthSelect = result.queryByLabelText('Select month');
    const yearSelect = result.queryByLabelText('Select year');

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
    getMenuElements,
    openMenu,
  };
};
