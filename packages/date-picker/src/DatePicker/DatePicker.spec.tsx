/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../constants';

import { renderDatePicker } from './DatePicker.testutils';
import { DatePicker } from '.';

describe('packages/date-picker', () => {
  describe('Rendering', () => {
    /// Note: Most rendering tests handled by Chromatic

    test('spreads rest to formField', () => {
      const { getByTestId } = render(
        <DatePicker label="Label" data-testid="lg-date-picker" />,
      );
      const formField = getByTestId('lg-date-picker');
      expect(formField).toBeInTheDocument();
    });

    test('formField contains label & input elements', () => {
      const { getByTestId, getByRole } = render(
        <DatePicker label="Label" data-testid="lg-date-picker" />,
      );
      const formField = getByTestId('lg-date-picker');
      const inputContainer = getByRole('combobox');
      expect(formField.querySelector('label')).toBeInTheDocument();
      expect(formField.querySelector('label')).toHaveTextContent('Label');
      expect(inputContainer).toBeInTheDocument();
    });

    test('renders 3 inputs', () => {
      const { dayInput, monthInput, yearInput } = renderDatePicker();
      expect(dayInput).toBeInTheDocument();
      expect(monthInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
    });

    describe('Menu', () => {
      test('menu is initially closed', () => {
        const { getMenuElements } = renderDatePicker();
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('if no value is set, menu opens to current month', () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date(Date.UTC(2023, Month.December, 26, 0, 0, 0)));
        const { openMenu } = renderDatePicker();
        const { calendarGrid, monthSelect, yearSelect } = openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('if a value is set, menu opens to the month of that value', () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date(Date.UTC(2023, Month.December, 26, 0, 0, 0)));
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2023, Month.March, 10)),
        });
        const { calendarGrid, monthSelect, yearSelect } = openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'March 2023');
        expect(monthSelect).toHaveValue(Month.March.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('renders the appropriate number of cells', () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2024, Month.February, 14)),
        });
        const { calendarCells } = openMenu();
        expect(calendarCells).toHaveLength(29);
      });
    });
  });

  describe('Mouse interaction', () => {
    describe('Clicking the input', () => {
      test('opens the menu', () => {
        const { inputContainer, getMenuElements } = renderDatePicker();
        userEvent.click(inputContainer);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test.skip('focuses the first empty segment', async () => {
        const { inputContainer, yearInput } = renderDatePicker();
        userEvent.click(inputContainer);
        await waitFor(() => {
          expect(yearInput).toHaveFocus();
        });
      });
    });

    describe.only('Clicking a Calendar cell', () => {
      test('fires a change handler', () => {
        const onChange = jest.fn();
        const { openMenu } = renderDatePicker({
          onChange,
        });
        const { calendarCells } = openMenu();
        const cell1 = calendarCells?.[0];
        userEvent.click(cell1);
        expect(onChange).toHaveBeenCalled();
      });

      test('does nothing if the cell is out-of-range', () => {
        const onChange = jest.fn();
        const { openMenu } = renderDatePicker({
          onChange,
          value: new Date(Date.UTC(2023, Month.September, 15)),
          min: new Date(Date.UTC(2023, Month.September, 10)),
        });
        const { calendarCells } = openMenu();
        const cell1 = calendarCells?.[0];
        userEvent.click(cell1);
        expect(cell1).toHaveAttribute('aria-disabled', 'true');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Clicking a Chevron', () => {
      beforeEach(() => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date(Date.UTC(2023, Month.December, 26)));
      });

      test('Left does not close the menu', async () => {
        const { openMenu } = renderDatePicker();
        const { leftChevron, menuContainerEl } = openMenu();
        userEvent.click(leftChevron!);
        await waitFor(() => {
          expect(menuContainerEl).toBeInTheDocument();
        });
      });

      test('Right does not close the menu', async () => {
        const { openMenu } = renderDatePicker();
        const { rightChevron, menuContainerEl } = openMenu();
        userEvent.click(rightChevron!);
        await waitFor(() => {
          expect(menuContainerEl).toBeInTheDocument();
        });
      });

      test('Left updates the displayed month to the previous', async () => {
        const { openMenu } = renderDatePicker();
        const { leftChevron, monthSelect, yearSelect, calendarGrid } =
          openMenu();
        userEvent.click(leftChevron!);
        await waitFor(() => {
          expect(calendarGrid).toHaveAttribute('aria-label', 'November 2023');
          expect(monthSelect).toHaveValue(Month.November);
          expect(yearSelect).toHaveValue((2023).toString());
        });
      });

      test('Right updates the displayed month to the next', async () => {
        const { openMenu } = renderDatePicker();
        const { rightChevron, monthSelect, yearSelect, calendarGrid } =
          openMenu();
        userEvent.click(rightChevron!);
        await waitFor(() => {
          expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');
          expect(monthSelect).toHaveValue(Month.January);
          expect(yearSelect).toHaveValue((2024).toString());
        });
      });

      test('Left is disabled if prev. month is entirely out of range', () => {
        const { openMenu } = renderDatePicker({
          min: new Date(Date.UTC(2023, Month.December, 1)),
        });
        const { leftChevron } = openMenu();
        expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
      });

      test('Right is disabled if next month is entirely out of range', () => {
        const { openMenu } = renderDatePicker({
          max: new Date(Date.UTC(2023, Month.December, 31)),
        });
        const { rightChevron } = openMenu();
        expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
      });

      test.todo('changing the month is announced in an aria-live region');
    });

    describe('Clicking the month select menu', () => {
      test('menu opens over the calendar menu', async () => {
        const { openMenu, queryAllByRole } = renderDatePicker();
        const { monthSelect, menuContainerEl } = openMenu();
        userEvent.click(monthSelect!);
        await waitFor(() => {
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });
      });

      test('selecting the month updates the calendar', () => {
        const { openMenu, queryAllByRole } = renderDatePicker({
          value: new Date(Date.UTC(2023, Month.December, 26)),
        });
        const { monthSelect, calendarGrid } = openMenu();
        userEvent.click(monthSelect!);
        const options = queryAllByRole('option');
        userEvent.click(options[0]);
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2023');
      });
    });

    describe('Clicking the year select menu', () => {
      test('menu opens over the calendar menu', async () => {
        const { openMenu, queryAllByRole } = renderDatePicker();
        const { yearSelect, menuContainerEl } = openMenu();
        userEvent.click(yearSelect!);
        await waitFor(() => {
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });
      });
      test('selecting the year updates the calendar', () => {
        const { openMenu, queryAllByRole } = renderDatePicker({
          value: new Date(Date.UTC(2023, Month.December, 26)),
        });
        const { monthSelect, calendarGrid } = openMenu();
        userEvent.click(monthSelect!);
        const options = queryAllByRole('option');
        userEvent.click(options[0]);
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 1970');
      });
    });

    describe('Clicking backdrop', () => {
      test('closes the menu', async () => {
        const { openMenu, container } = renderDatePicker();
        const { menuContainerEl } = openMenu();
        userEvent.click(container.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
      });

      test('does not fire a change handler', () => {
        const onChange = jest.fn();
        const { openMenu, container } = renderDatePicker({ onChange });
        openMenu();
        userEvent.click(container.parentElement!);
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('Typing', () => {
    describe('Typing into the input', () => {
      test.todo('fires a change handler when the value is a valid date');
      test.todo('does not fire a change handler when the value is incomplete');
      test.todo('focuses the next segment if the segment value is valid');
      test.todo('fires a validation handler if the value is updated');
    });

    describe('Delete key', () => {
      test.todo('deletes any value in the input');
      test.todo('deletes the whole value on multiple presses');
      test.todo('focuses the previous segment if current segment is empty');
    });
  });

  describe('Keyboard navigation', () => {
    describe('Tab', () => {
      describe('when the menu is open', () => {
        test.todo('tab 1: Input'); // TODO: Should tab focus each segment separately?
        test.todo('tab 2: Left Chevron');
        test.todo('tab 3: Month menu');
        test.todo('tab 4: Year menu');
        test.todo('tab 5: Right Chevron');
        test.todo('tab 6: Calendar grid (selected date)');
        test.todo('tab 7: Returns to Input');
      });
      describe('when menu is closed', () => {
        test.todo('tab 1: Input'); // TODO: Should tab focus each segment separately?
        test.todo('tab 2: next element in tab order');
      });
    });

    describe('Up/Down Arrow', () => {
      describe('when the input is focused', () => {
        test.todo('up arrow increments the segments value');
        test.todo('down arrow decrements the segments value');
      });
      describe('when any menu element is focused', () => {});
    });

    describe('Left/Right Arrow', () => {
      describe('when the input is focused', () => {
        describe('when the segment is empty', () => {
          test.todo('left arrow focuses the prev. segment');
          test.todo('right arrow focuses the next segment');
        });

        describe('when the segment has a value', () => {
          test.todo('left arrow moves the cursor');
          test.todo('right moves the cursor');
        });
      });
      describe('when any menu element is focused', () => {
        test.todo('up arrow decrements the week by 1');
        test.todo('down arrow decrements the week by 1');
        test.todo('left arrow decrements the day by 1');
        test.todo('right arrow increments the day by 1');
        test.todo('up arrow changes the displayed month if necessary');
        test.todo('down arrow changes the displayed month if necessary');
        test.todo('left arrow changes the displayed month if necessary');
        test.todo('right arrow changes the displayed month if necessary');
      });
    });

    describe('Enter key', () => {
      test.todo('fires a change handler');
      test.todo('closes the menu');
      test.todo('if month/year select is open, updates the displayed month');
      test.todo('if menu is closed, opens the menu');
    });

    describe('Escape key', () => {
      test.todo('closes the menu');
      test.todo('does not fire a change handler');
      test.todo('focus remains on the input element');
    });
  });
});
