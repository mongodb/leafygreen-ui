import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { Month } from '../constants';
import { newUTC } from '../utils';

import { renderDateRangePicker } from './DateRangePicker.testutils';
import { DateRangePicker } from '.';

describe('packages/date-picker/date-range-picker', () => {
  describe('Rendering', () => {
    /// Note: Many rendering tests should be handled by Chromatic

    test('renders label', () => {
      const { getByText } = render(<DateRangePicker label="Label" />);
      const label = getByText('Label');
      expect(label).toBeInTheDocument();
    });

    test('renders description', () => {
      const { getByText } = render(
        <DateRangePicker label="Label" description="Description" />,
      );
      const description = getByText('Description');
      expect(description).toBeInTheDocument();
    });

    test('spreads rest to formField', () => {
      const { getByTestId } = render(
        <DateRangePicker label="Label" data-testid="lg-date-range-picker" />,
      );
      const formField = getByTestId('lg-date-range-picker');
      expect(formField).toBeInTheDocument();
    });

    test('formField contains label & input elements', () => {
      const { getByTestId, getByRole } = render(
        <DateRangePicker label="Label" data-testid="lg-date-range-picker" />,
      );
      const formField = getByTestId('lg-date-range-picker');
      const inputContainer = getByRole('combobox');
      expect(formField.querySelector('label')).toBeInTheDocument();
      expect(formField.querySelector('label')).toHaveTextContent('Label');
      expect(inputContainer).toBeInTheDocument();
    });

    test('renders 6 inputs', () => {
      const { inputElements } = renderDateRangePicker();
      expect(inputElements).toHaveLength(6);
    });

    test('renders `start` & `end` prop', () => {
      const { inputElements } = renderDateRangePicker({
        start: newUTC(2023, Month.January, 5),
        end: newUTC(2023, Month.February, 14),
      });
      expect(inputElements[0]).toEqual('05');
      expect(inputElements[1]).toEqual('01');
      expect(inputElements[2]).toEqual('2023');
      expect(inputElements[3]).toEqual('14');
      expect(inputElements[4]).toEqual('02');
      expect(inputElements[5]).toEqual('2023');
    });

    test('renders `initialStart` & `initialEnd` prop', () => {
      const { inputElements } = renderDateRangePicker({
        initialStart: newUTC(2023, Month.July, 5),
        initialEnd: newUTC(2023, Month.August, 10),
      });
      expect(inputElements[0]).toEqual('05');
      expect(inputElements[1]).toEqual('07');
      expect(inputElements[2]).toEqual('2023');
      expect(inputElements[3]).toEqual('10');
      expect(inputElements[4]).toEqual('08');
      expect(inputElements[5]).toEqual('2023');
    });

    describe('Menu', () => {
      test('menu is initially closed', () => {
        const { getMenuElements } = renderDateRangePicker();
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('menu is initially open when rendered with `initialOpen`', async () => {
        const { getMenuElements } = renderDateRangePicker({
          initialOpen: true,
        });
        const { menuContainerEl } = getMenuElements();
        await waitFor(() => expect(menuContainerEl).toBeInTheDocument());
      });

      test('if no value is set, menu opens to current month', () => {
        const { openMenu } = renderDateRangePicker();
        const { calendarGrids } = openMenu();
        expect(calendarGrids?.[0]).toHaveAttribute(
          'aria-label',
          'December 2023',
        );
        expect(calendarGrids?.[1]).toHaveAttribute(
          'aria-label',
          'January 2024',
        );
      });

      test('if a value is set, menu opens to the month of that value', () => {
        const { openMenu } = renderDateRangePicker({
          start: newUTC(2023, Month.March, 10),
        });
        const { calendarGrids } = openMenu();
        expect(calendarGrids?.[0]).toHaveAttribute('aria-label', 'March 2023');
      });

      test('renders the appropriate number of cells', () => {
        const { openMenu } = renderDateRangePicker({
          start: newUTC(2024, Month.February, 14),
        });
        const { calendarCells } = openMenu();
        expect(calendarCells).toHaveLength(29 + 31);
      });
    });
  });
});
