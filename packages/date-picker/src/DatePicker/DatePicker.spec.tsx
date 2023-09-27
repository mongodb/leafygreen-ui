/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';

import { Month } from '../constants';

import { renderDatePicker } from './DatePicker.testutils';
import { DatePicker } from '.';

const testToday = new Date(Date.UTC(2023, Month.December, 26));

/** Presses the `tab` key `count` times */
const tabNTimes = (count: number) => {
  for (const _ in range(count)) {
    userEvent.tab();
  }
};

describe('packages/date-picker', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

  describe('Rendering', () => {
    /// Note: Many rendering tests should be handled by Chromatic

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

    test('renders `value` prop', () => {
      const { dayInput, monthInput, yearInput } = renderDatePicker({
        value: new Date(Date.now()),
      });
      expect(dayInput.value).toEqual('26');
      expect(monthInput.value).toEqual('12');
      expect(yearInput.value).toEqual('2023');
    });

    test('renders `initialValue` prop', () => {
      const { dayInput, monthInput, yearInput } = renderDatePicker({
        initialValue: new Date(Date.now()),
      });
      expect(dayInput.value).toEqual('26');
      expect(monthInput.value).toEqual('12');
      expect(yearInput.value).toEqual('2023');
    });

    describe('Menu', () => {
      test('menu is initially closed', () => {
        const { getMenuElements } = renderDatePicker();
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('if no value is set, menu opens to current month', () => {
        const { openMenu } = renderDatePicker();
        const { calendarGrid, monthSelect, yearSelect } = openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('if a value is set, menu opens to the month of that value', () => {
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

      describe('Chevrons', () => {
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

        test('Left is not disabled if part of prev. month is in range', () => {
          const { openMenu } = renderDatePicker({
            min: new Date(Date.UTC(2023, Month.November, 29)),
          });
          const { leftChevron } = openMenu();
          expect(leftChevron).toHaveAttribute('aria-disabled', 'false');
        });

        test('Right is not disabled if part of next month is in of range', () => {
          const { openMenu } = renderDatePicker({
            max: new Date(Date.UTC(2024, Month.January, 2)),
          });
          const { rightChevron } = openMenu();
          expect(rightChevron).toHaveAttribute('aria-disabled', 'false');
        });
      });
    });
  });

  describe('Interaction', () => {
    describe('Mouse interaction', () => {
      describe('Clicking the input', () => {
        test('opens the menu', () => {
          const { inputContainer, getMenuElements } = renderDatePicker();
          userEvent.click(inputContainer);
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('focuses a specific segment when clicked', () => {
          const { monthInput } = renderDatePicker();
          userEvent.click(monthInput);
          expect(monthInput).toHaveFocus();
        });

        test('focuses the first segment when all are empty', () => {
          const { inputContainer, yearInput } = renderDatePicker();
          userEvent.click(inputContainer);
          expect(yearInput).toHaveFocus();
        });

        test('focuses the first empty segment when some are empty', () => {
          const { inputContainer, yearInput, monthInput } = renderDatePicker();
          yearInput.value = '2023';
          yearInput.blur();
          userEvent.click(inputContainer);
          expect(monthInput).toHaveFocus();
        });

        test('focuses the last segment when all are filled', () => {
          const { inputContainer, dayInput } = renderDatePicker({
            value: new Date(),
          });
          userEvent.click(inputContainer);
          expect(dayInput).toHaveFocus();
        });
      });

      describe('Clicking the Calendar button', () => {
        test('opens the menu', () => {
          const { calendarButton, getMenuElements } = renderDatePicker();
          userEvent.click(calendarButton);
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });
      });

      describe('Clicking a Calendar cell', () => {
        test('fires a change handler', () => {
          const onChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onChange,
          });
          const { calendarCells } = openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell);
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
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell, {}, { skipPointerEventsCheck: true });
          expect(firstCell).toHaveAttribute('aria-disabled', 'true');
          expect(onChange).not.toHaveBeenCalled();
        });
      });

      describe('Clicking a Chevron', () => {
        describe('Left', () => {
          test('does not close the menu', () => {
            const { openMenu } = renderDatePicker();
            const { leftChevron, menuContainerEl } = openMenu();
            userEvent.click(leftChevron!);
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('updates the displayed month to the previous', () => {
            const { openMenu } = renderDatePicker();
            const { leftChevron, monthSelect, yearSelect, calendarGrid } =
              openMenu();
            userEvent.click(leftChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'November 2023');
            expect(monthSelect).toHaveValue(Month.November.toString());
            expect(yearSelect).toHaveValue('2023');
          });
        });

        describe('Right', () => {
          test('does not close the menu', () => {
            const { openMenu } = renderDatePicker();
            const { rightChevron, menuContainerEl } = openMenu();
            userEvent.click(rightChevron!);
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('updates the displayed month to the next', () => {
            const { openMenu } = renderDatePicker();
            const { rightChevron, monthSelect, yearSelect, calendarGrid } =
              openMenu();
            userEvent.click(rightChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');
            expect(monthSelect).toHaveValue(Month.January.toString());
            expect(yearSelect).toHaveValue('2024');
          });
        });
      });

      describe('Month select menu', () => {
        test('menu opens over the calendar menu', () => {
          const { openMenu, queryAllByRole } = renderDatePicker();
          const { monthSelect, menuContainerEl } = openMenu();
          userEvent.click(monthSelect!);
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });

        test('selecting the month updates the calendar', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: new Date(Date.UTC(2023, Month.December, 26)),
          });
          const { monthSelect, calendarGrid } = openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Jan = options[0];
          userEvent.click(Jan);
          expect(calendarGrid).toHaveAttribute('aria-label', 'January 2023');
        });
      });

      describe('Year select menu', () => {
        test('menu opens over the calendar menu', () => {
          const { openMenu, queryAllByRole } = renderDatePicker();
          const { yearSelect, menuContainerEl } = openMenu();
          userEvent.click(yearSelect!);
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });

        test('selecting the year updates the calendar', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: new Date(Date.UTC(2023, Month.December, 26)),
          });
          const { yearSelect, calendarGrid } = openMenu();
          userEvent.click(yearSelect!);
          const options = await findAllByRole('option');
          const _1970 = options[1];

          userEvent.click(_1970);
          expect(calendarGrid).toHaveAttribute('aria-label', 'December 1970');
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

    describe('Changing the month', () => {
      test.todo('is announced in an aria-live region');

      describe('updates the highlighted cell', () => {
        test('to the end of the month if we went backwards', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: new Date(Date.UTC(2023, Month.July, 5)),
          });
          const { monthSelect, calendarGrid } = openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Jan = options[0];
          userEvent.click(Jan);
          const jan31Cell = calendarGrid?.querySelector(
            '[data-iso="2023-01-31T00:00:00.000Z"]',
          );
          expect(jan31Cell).toHaveAttribute('data-highlight', 'true');
          tabNTimes(3);
          expect(jan31Cell).toHaveFocus();
        });
        test('to the beginning of the month if we went forwards', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: new Date(Date.UTC(2023, Month.July, 5)),
          });
          const { monthSelect, calendarGrid } = openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Dec = options[11];
          userEvent.click(Dec);
          const dec1Cell = calendarGrid?.querySelector(
            '[data-iso="2023-12-01T00:00:00.000Z"]',
          );
          expect(dec1Cell).toHaveAttribute('data-highlight', 'true');
          tabNTimes(3);
          expect(dec1Cell).toHaveFocus();
        });
      });
    });

    describe('Keyboard navigation', () => {
      describe('Tab', () => {
        test('menu does not open on keyboard focus', () => {
          const { getMenuElements } = renderDatePicker();
          userEvent.tab();
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        describe('Tab order', () => {
          describe.each(range(0, 4))('when menu is closed', n => {
            test(`Tab ${n} times`, () => {
              const {
                yearInput,
                monthInput,
                dayInput,
                calendarButton,
                inputContainer,
              } = renderDatePicker();
              tabNTimes(n);

              switch (n) {
                case 0:
                  expect(
                    inputContainer.contains(document.activeElement),
                  ).toBeFalsy();
                  break;
                case 1:
                  expect(yearInput).toHaveFocus();
                  break;
                case 2:
                  expect(monthInput).toHaveFocus();
                  break;
                case 3:
                  expect(dayInput).toHaveFocus();
                  break;
                case 4:
                  expect(calendarButton).toHaveFocus();
                  break;
                case 5:
                  expect(
                    inputContainer.contains(document.activeElement),
                  ).toBeFalsy();
                  break;
              }
            });
          });

          describe.each(range(0, 9))('when the menu is open', n => {
            test(`Tab ${n} times`, () => {
              const {
                yearInput,
                monthInput,
                dayInput,
                calendarButton,
                openMenu,
              } = renderDatePicker();
              const {
                leftChevron,
                monthSelect,
                yearSelect,
                rightChevron,
                calendarGrid,
              } = openMenu();

              const highlightedCell = calendarGrid?.querySelector(
                '[data-highlight="true"]',
              );

              tabNTimes(n);

              switch (n) {
                case 0:
                  expect(yearInput).toHaveFocus();
                  break;
                case 1:
                  expect(monthInput).toHaveFocus();
                  break;
                case 2:
                  expect(dayInput).toHaveFocus();
                  break;
                case 3:
                  expect(calendarButton).toHaveFocus();
                  break;
                case 4:
                  expect(highlightedCell).toHaveFocus();
                  break;
                case 5:
                  expect(leftChevron).toHaveFocus();
                  break;
                case 6:
                  expect(monthSelect).toHaveFocus();
                  break;
                case 7:
                  expect(yearSelect).toHaveFocus();
                  break;
                case 8:
                  expect(rightChevron).toHaveFocus();
                  break;
                case 9:
                  // Focus is trapped within the menu
                  expect(highlightedCell).toHaveFocus();
                  break;
              }
            });
          });
        });
      });

      describe('Enter key', () => {
        test.skip('if menu is closed, opens the menu', () => {
          const { getMenuElements } = renderDatePicker();
          userEvent.tab();
          userEvent.keyboard('{enter}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('if month/year select is open, updates the displayed month', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect } = openMenu();
          userEvent.type(monthSelect!, '{enter}');
          const options = await findAllByRole('option');
          expect(options.length).toBeGreaterThan(0);
        });

        test('if a cell is focused, fires a change handler', () => {
          const onChange = jest.fn();
          const { openMenu } = renderDatePicker({ onChange });
          const { calendarCells } = openMenu();
          const firstCell = calendarCells[0];
          userEvent.type(firstCell, '{enter}');
          expect(onChange).toHaveBeenCalled();
        });

        test('if a cell is focused, closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { calendarCells, menuContainerEl } = openMenu();
          const firstCell = calendarCells[0];
          userEvent.type(firstCell, '{enter}');
          await waitForElementToBeRemoved(menuContainerEl);
        });
      });

      describe('Escape key', () => {
        test('closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { menuContainerEl } = openMenu();
          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('does not fire a change handler', () => {
          const onChange = jest.fn();
          const { openMenu } = renderDatePicker({ onChange });
          openMenu();
          userEvent.keyboard('{escape}');
          expect(onChange).not.toHaveBeenCalled();
        });

        test('focus remains in the input element', () => {
          const onChange = jest.fn();
          const { openMenu, inputContainer } = renderDatePicker({ onChange });
          openMenu();
          userEvent.keyboard('{escape}');
          expect(inputContainer.contains(document.activeElement)).toBeTruthy();
        });
      });

      /**
       * Arrow Keys:
       * Since arrow key behavior changes based on whether the input or menu is focused,
       * many of these tests exist in the "DatePickerInput" and "DatePickerMenu" components
       */
      test.todo('Basic arrow key tests');
    });

    describe('Typing', () => {
      describe('Typing into the input', () => {
        test.skip('opens the menu', () => {
          const { yearInput, getMenuElements } = renderDatePicker();
          userEvent.tab();
          expect(yearInput).toHaveFocus();
          userEvent.keyboard('2');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('does not fire a change handler when the value is incomplete', () => {
          const onChange = jest.fn();
          const { yearInput } = renderDatePicker({
            onChange,
          });
          userEvent.type(yearInput, '2023');
          expect(onChange).not.toHaveBeenCalled();
        });

        test('fires a segment change handler', () => {
          const onSegmentChange = jest.fn();
          const { yearInput } = renderDatePicker({ onSegmentChange });
          userEvent.type(yearInput, '2023');
          expect(onSegmentChange).toHaveBeenCalledWith('year', 2023);
        });

        test('fires a change handler when the value is a valid date', () => {
          const onChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onChange,
          });
          userEvent.type(yearInput, '2023');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          expect(onChange).toHaveBeenCalled();
        });

        // TODO: validation handlers
        test.skip('fires a validation handler if the value is updated', () => {
          const handleValidation = jest.fn();
          const { dayInput } = renderDatePicker({
            value: new Date(),
            handleValidation,
          });

          userEvent.type(dayInput, '05');
          expect(handleValidation).toHaveBeenCalledTimes(2);
        });

        test.todo('focuses the next segment if the segment value is valid');
      });
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    test('(Controlled) fires a change handler if `value` is provided', async () => {
      const onChange = jest.fn();
      const { openMenu } = renderDatePicker({
        value: new Date(),
        onChange,
      });
      const { calendarCells } = openMenu();
      const cell1 = calendarCells?.[0];
      userEvent.click(cell1);
      await waitFor(() => expect(onChange).toHaveBeenCalled());
    });

    test('(Controlled) does not change the value if `value` is provided', async () => {
      const onChange = jest.fn();
      const { openMenu, dayInput, monthInput, yearInput } = renderDatePicker({
        value: new Date(),
        onChange,
      });
      const { calendarCells } = openMenu();
      const cell1 = calendarCells?.[0];
      userEvent.click(cell1);
      await waitFor(() => {
        expect(dayInput.value).toEqual('26');
        expect(monthInput.value).toEqual('12');
        expect(yearInput.value).toEqual('2023');
      });
    });

    test('(Uncontrolled) fires a change handler', async () => {
      const onChange = jest.fn();
      const { openMenu } = renderDatePicker({
        onChange,
      });
      const { calendarCells } = openMenu();
      const cell1 = calendarCells?.[0];
      userEvent.click(cell1);
      await waitFor(() => expect(onChange).toHaveBeenCalled());
    });

    test('(Uncontrolled) changes the input value if `value` is not provided', async () => {
      const onChange = jest.fn();
      const { openMenu, dayInput, monthInput, yearInput } = renderDatePicker({
        onChange,
        initialValue: new Date(),
      });
      const { calendarCells } = openMenu();
      const cell1 = calendarCells?.[0];
      userEvent.click(cell1);
      await waitFor(() => {
        expect(dayInput.value).toEqual('01');
        expect(monthInput.value).toEqual('12');
        expect(yearInput.value).toEqual('2023');
      });
    });
  });
});
