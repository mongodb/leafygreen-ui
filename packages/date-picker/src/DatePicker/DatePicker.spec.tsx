import React from 'react';
import {
  fireEvent,
  prettyDOM,
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays, subDays } from 'date-fns';

import { Month } from '../shared/constants';
import { newUTC } from '../shared/utils';
import {
  eventContainingTargetValue,
  tabNTimes,
} from '../shared/utils/testutils';

import {
  expectedTabStopLabels,
  findTabStopElementMap,
  renderDatePicker,
} from './DatePicker.testutils';
import { DatePicker } from '.';

const testToday = newUTC(2023, Month.December, 26);

describe('packages/date-picker', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

  describe('Rendering', () => {
    /// Note: Many rendering tests should be handled by Chromatic

    describe('Input', () => {
      test('renders label', () => {
        const { getByText } = render(<DatePicker label="Label" />);
        const label = getByText('Label');
        expect(label).toBeInTheDocument();
      });

      test('renders description', () => {
        const { getByText } = render(
          <DatePicker label="Label" description="Description" />,
        );
        const description = getByText('Description');
        expect(description).toBeInTheDocument();
      });

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
    });

    describe.only('Menu', () => {
      test('menu is initially closed', async () => {
        const { findMenuElements } = renderDatePicker();
        const { menuContainerEl } = await findMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('menu is initially closed when rendered with `initialOpen` and `disabled`', async () => {
        const { findMenuElements } = renderDatePicker({
          initialOpen: true,
          disabled: true,
        });
        const { menuContainerEl } = await findMenuElements();
        await waitFor(() => expect(menuContainerEl).not.toBeInTheDocument());
      });

      test('menu is initially open when rendered with `initialOpen`', async () => {
        const { findMenuElements } = renderDatePicker({ initialOpen: true });
        const { menuContainerEl } = await findMenuElements();
        await waitFor(() => expect(menuContainerEl).toBeInTheDocument());
      });

      test('opened menu closes when `disabled` is set to true', async () => {
        const { findMenuElements, rerenderDatePicker } = renderDatePicker({
          initialOpen: true,
        });
        const { menuContainerEl } = await findMenuElements();
        await waitFor(() => expect(menuContainerEl).toBeInTheDocument());
        rerenderDatePicker({ disabled: true });
        await waitFor(() => expect(menuContainerEl).not.toBeInTheDocument());
      });

      test('if no value is set, menu opens to current month', () => {
        const { openMenu } = renderDatePicker();
        const { calendarGrid, monthSelect, yearSelect } = await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('if a value is set, menu opens to the month of that value', async () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2023, Month.March, 10)),
        });
        const { calendarGrid, monthSelect, yearSelect } = await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'March 2023');
        expect(monthSelect).toHaveValue(Month.March.toString());
        expect(yearSelect).toHaveValue('2023');
      });

      test('renders the appropriate number of cells', async () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2024, Month.February, 14)),
        });
        const { calendarCells } = await openMenu();
        expect(calendarCells).toHaveLength(29);
      });

      describe('Chevrons', () => {
        test('Left is disabled if prev. month is entirely out of range', async () => {
          const { openMenu } = renderDatePicker({
            min: new Date(Date.UTC(2023, Month.December, 1)),
          });
          const { leftChevron } = await openMenu();
          expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
        });

        test('Right is disabled if next month is entirely out of range', async () => {
          const { openMenu } = renderDatePicker({
            max: new Date(Date.UTC(2023, Month.December, 31)),
          });
          const { rightChevron } = await openMenu();
          expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
        });

        test('Left is not disabled if only part of prev. month is in range', async () => {
          const { openMenu } = renderDatePicker({
            min: new Date(Date.UTC(2023, Month.November, 29)),
          });
          const { leftChevron } = await openMenu();
          expect(leftChevron).toHaveAttribute('aria-disabled', 'false');
        });

        test('Right is not disabled if only part of next month is in of range', async () => {
          const { openMenu } = renderDatePicker({
            max: new Date(Date.UTC(2024, Month.January, 2)),
          });
          const { rightChevron } = await openMenu();
          expect(rightChevron).toHaveAttribute('aria-disabled', 'false');
        });
      });
    });
  });

  describe('Interaction', () => {
    describe('Mouse interaction', () => {
      describe('Clicking the input', () => {
        test('opens the menu', async () => {
          const { inputContainer, findMenuElements } = renderDatePicker();
          userEvent.click(inputContainer);
          const { menuContainerEl } = await findMenuElements();
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
        test('toggles the menu open and closed', async () => {
          const { calendarButton, findMenuElements } = renderDatePicker();
          userEvent.click(calendarButton);
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
          userEvent.click(calendarButton);
          await waitFor(() => expect(menuContainerEl).not.toBeInTheDocument());
        });

        test('closes the menu when "initialOpen: true"', async () => {
          const { calendarButton, findMenuElements } = renderDatePicker({
            initialOpen: true,
          });
          const { menuContainerEl } = await findMenuElements();
          await waitFor(() => expect(menuContainerEl).toBeInTheDocument());
          userEvent.click(calendarButton);
          await waitFor(() => expect(menuContainerEl).not.toBeInTheDocument());
        });

        test('focuses on the `today` cell by default', async () => {
          const { calendarButton, findMenuElements, findByRole } =
            renderDatePicker();
          userEvent.click(calendarButton);
          const menuContainerEl = await findByRole('listbox');
          const { todayCell } = await findMenuElements();
          // Manually fire the `transitionEnd` event. This is not fired automatically by JSDOM
          fireEvent.transitionEnd(menuContainerEl!);
          expect(todayCell).toHaveFocus();
        });

        test('focuses on the selected cell', async () => {
          const value = newUTC(1994, Month.September, 10);
          const { calendarButton, findMenuElements, findByRole } =
            renderDatePicker({
              value: value,
            });
          userEvent.click(calendarButton);
          const menuContainerEl = await findByRole('listbox');
          const { queryCellByDate } = await findMenuElements();
          const valueCell = queryCellByDate(value);
          // Manually fire the `transitionEnd` event. This is not fired automatically by JSDOM
          fireEvent.transitionEnd(menuContainerEl!);
          expect(valueCell).toHaveFocus();
        });
      });

      describe('Clicking a Calendar cell', () => {
        test('fires a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(onDateChange).toHaveBeenCalled();
        });

        test('does nothing if the cell is out-of-range', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
            value: new Date(Date.UTC(2023, Month.September, 15)),
            min: new Date(Date.UTC(2023, Month.September, 10)),
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!, {}, { skipPointerEventsCheck: true });
          expect(firstCell).toHaveAttribute('aria-disabled', 'true');
          expect(onDateChange).not.toHaveBeenCalled();
        });

        test('fires a validation handler', async () => {
          const handleValidation = jest.fn();
          const { openMenu } = renderDatePicker({
            handleValidation,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(handleValidation).toHaveBeenCalled();
        });
      });

      describe('Clicking a Chevron', () => {
        describe('Left', () => {
          test('does not close the menu', async () => {
            const { openMenu } = renderDatePicker();
            const { leftChevron, menuContainerEl } = await openMenu();
            userEvent.click(leftChevron!);
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('updates the displayed month to the previous', async () => {
            const { openMenu } = renderDatePicker({
              value: newUTC(2023, Month.December, 25),
            });
            const { leftChevron, monthSelect, yearSelect, calendarGrid } =
              await openMenu();
            userEvent.click(leftChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'November 2023');
            expect(monthSelect).toHaveValue(Month.November.toString());
            expect(yearSelect).toHaveValue('2023');
          });

          test('updates the displayed month to the previous, and updates year', async () => {
            const { openMenu } = renderDatePicker({
              value: newUTC(2023, Month.January, 5),
            });
            const { leftChevron, monthSelect, yearSelect, calendarGrid } =
              await openMenu();
            userEvent.click(leftChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'December 2022');
            expect(monthSelect).toHaveValue(Month.December.toString());
            expect(yearSelect).toHaveValue('2022');
          });
        });

        describe('Right', () => {
          test('does not close the menu', async () => {
            const { openMenu } = renderDatePicker();
            const { rightChevron, menuContainerEl } = await openMenu();
            userEvent.click(rightChevron!);
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('updates the displayed month to the next', async () => {
            const { openMenu } = renderDatePicker({
              value: newUTC(2023, Month.January, 5),
            });
            const { rightChevron, monthSelect, yearSelect, calendarGrid } =
              await openMenu();
            userEvent.click(rightChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'February 2023');
            expect(monthSelect).toHaveValue(Month.February.toString());
            expect(yearSelect).toHaveValue('2023');
          });

          test('updates the displayed month to the next and updates year', async () => {
            const { openMenu } = renderDatePicker({
              value: newUTC(2023, Month.December, 26),
            });
            const { rightChevron, monthSelect, yearSelect, calendarGrid } =
              await openMenu();
            userEvent.click(rightChevron!);
            expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');
            expect(monthSelect).toHaveValue(Month.January.toString());
            expect(yearSelect).toHaveValue('2024');
          });
        });
      });

      describe('Month select menu', () => {
        test('menu opens over the calendar menu', async () => {
          const { openMenu, queryAllByRole } = renderDatePicker();
          const { monthSelect, menuContainerEl } = await openMenu();
          userEvent.click(monthSelect!);
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });

        test('selecting the month updates the calendar', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect, calendarGrid } = await openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Jan = options[0];
          userEvent.click(Jan);
          expect(calendarGrid).toHaveAttribute('aria-label', 'January 2023');
        });

        test('making a selection with enter does not close the datePicker menu', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect, menuContainerEl } = await openMenu();
          userEvent.click(monthSelect!);
          await findAllByRole('option');
          userEvent.keyboard('{arrowdown}');
          userEvent.keyboard('{enter}');
          await waitFor(() => {
            expect(menuContainerEl).toBeInTheDocument();
          });
        });
      });

      describe('Year select menu', () => {
        test('menu opens over the calendar menu', async () => {
          const { openMenu, queryAllByRole } = renderDatePicker();
          const { yearSelect, menuContainerEl } = await openMenu();
          userEvent.click(yearSelect!);
          expect(menuContainerEl).toBeInTheDocument();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });

        test('selecting the year updates the calendar', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: new Date(Date.UTC(2023, Month.December, 26)),
          });
          const { yearSelect, calendarGrid } = await openMenu();
          userEvent.click(yearSelect!);
          const options = await findAllByRole('option');
          const _1970 = options[0];

          userEvent.click(_1970);
          expect(calendarGrid).toHaveAttribute('aria-label', 'December 1970');
        });

        test('making a selection with enter does not close the datePicker menu', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { yearSelect, menuContainerEl } = await openMenu();
          userEvent.click(yearSelect!);
          await findAllByRole('option');
          userEvent.keyboard('{arrowdown}');
          userEvent.keyboard('{enter}');
          await waitFor(() => {
            expect(menuContainerEl).toBeInTheDocument();
          });
        });
      });

      describe('Clicking backdrop', () => {
        test('closes the menu', async () => {
          const { openMenu, container } = renderDatePicker();
          const { menuContainerEl } = await openMenu();
          userEvent.click(container.parentElement!);
          await waitForElementToBeRemoved(menuContainerEl);
        });

        test('does not fire a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu, container } = renderDatePicker({ onDateChange });
          await openMenu();
          userEvent.click(container.parentElement!);
          expect(onDateChange).not.toHaveBeenCalled();
        });

        test('returns focus to the calendar button', async () => {
          const { openMenu, container, calendarButton } = renderDatePicker();
          await openMenu();
          userEvent.click(container.parentElement!);
          await waitFor(() => expect(calendarButton).toHaveFocus());
        });
      });
    });

    describe('Changing the month', () => {
      test.todo('is announced in an aria-live region');

      describe('updates the highlighted cell', () => {
        test('to the end of the month if we went backwards', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: newUTC(2023, Month.July, 5),
          });
          const { monthSelect, queryCellByDate } = await openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Jan = options[0];
          userEvent.click(Jan);
          const jan31Cell = queryCellByDate(newUTC(2023, Month.January, 31));
          await waitFor(() => expect(jan31Cell).toHaveFocus());
        });
        test('to the beginning of the month if we went forwards', async () => {
          const { openMenu, findAllByRole } = renderDatePicker({
            value: newUTC(2023, Month.July, 5),
          });
          const { monthSelect, queryCellByDate } = await openMenu();
          userEvent.click(monthSelect!);
          const options = await findAllByRole('option');
          const Dec = options[11];
          userEvent.click(Dec);
          const dec1Cell = queryCellByDate(newUTC(2023, Month.December, 1));
          await waitFor(() => expect(dec1Cell).toHaveFocus());
        });
      });
    });

    describe('Keyboard navigation', () => {
      describe('Tab', () => {
        test('menu does not open on keyboard focus', async () => {
          const { findMenuElements } = renderDatePicker();
          userEvent.tab();
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('menu does not open on subsequent keyboard focus', async () => {
          const { findMenuElements } = renderDatePicker();
          tabNTimes(3);
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('calls validation handler when last segment is unfocused', () => {
          const handleValidation = jest.fn();
          renderDatePicker({ handleValidation });
          tabNTimes(5);
          expect(handleValidation).toHaveBeenCalled();
        });

        test('todayCelldoes not call validation handler when changing segment focus', () => {
          const handleValidation = jest.fn();
          renderDatePicker({ handleValidation });
          tabNTimes(2);
          expect(handleValidation).not.toHaveBeenCalled();
        });

        describe('Tab order', () => {
          describe('when menu is closed', () => {
            const tabStops = expectedTabStopLabels['closed'];

            test('Tab order proceeds as expected', async () => {
              const renderResult = renderDatePicker();

              for (const label of tabStops) {
                const elementMap = await findTabStopElementMap(renderResult);
                const element = elementMap[label];

                if (element !== null) {
                  expect(element).toHaveFocus();
                } else {
                  expect(
                    renderResult.inputContainer.contains(
                      document.activeElement,
                    ),
                  ).toBeFalsy();
                }

                userEvent.tab();
              }
            });
          });

          describe('when menu is open', () => {
            const tabStops = expectedTabStopLabels['open'];

            test(`Tab order proceeds as expected`, async () => {
              const renderResult = renderDatePicker({
                initialOpen: true,
              });

              for (const label of tabStops) {
                const elementMap = await findTabStopElementMap(renderResult);
                const element = elementMap[label];

                if (element !== null) {
                  await waitFor(() => expect(element).toHaveFocus());
                } else {
                  expect(
                    renderResult.inputContainer.contains(
                      document.activeElement,
                    ),
                  ).toBeFalsy();
                }

                userEvent.tab();
              }
            });
          });
        });
      });

      describe('Enter key', () => {
        test('if menu is closed, does not open the menu', async () => {
          const { findMenuElements } = renderDatePicker();
          userEvent.tab();
          userEvent.keyboard('{enter}');
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('calls validation handler', () => {
          const handleValidation = jest.fn();
          renderDatePicker({ handleValidation });
          userEvent.tab();
          userEvent.keyboard('{enter}');
          expect(handleValidation).toHaveBeenCalledWith(undefined);
        });

        test('opens menu if calendar button is focused', async () => {
          const { findMenuElements } = renderDatePicker();
          tabNTimes(4);
          userEvent.keyboard('{enter}');
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('if month select is focused, opens the select menu', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect } = await openMenu();
          tabNTimes(2);
          expect(monthSelect).toHaveFocus();
          userEvent.keyboard('{enter}');
          const options = await findAllByRole('option');
          expect(options.length).toBeGreaterThan(0);
        });

        test('if a cell is focused, fires a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({ onDateChange });
          const { todayCell } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{enter}');
          expect(onDateChange).toHaveBeenCalled();
        });

        test('if a cell is focused, closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { todayCell, menuContainerEl } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test.skip('if a cell is focused & component has value, closes the menu', async () => {
          const value = newUTC(2023, Month.September, 10);
          const { openMenu } = renderDatePicker({ value });
          const { menuContainerEl, queryCellByDate } = await openMenu();
          expect(queryCellByDate(value)).toHaveFocus();
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        describe('chevron', () => {
          test('if left chevron is focused, does not close the menu', async () => {
            const { openMenu, findMenuElements } = renderDatePicker();
            const { leftChevron } = await openMenu();
            tabNTimes(1);
            expect(leftChevron).toHaveFocus();
            userEvent.keyboard('{enter}');
            const { menuContainerEl } = await findMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('if right chevron is focused, does not close the menu', async () => {
            const { openMenu, findMenuElements } = renderDatePicker();
            const { rightChevron } = await openMenu();
            tabNTimes(4);
            expect(rightChevron).toHaveFocus();
            userEvent.keyboard('{enter}');
            const { menuContainerEl } = await findMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });
        });
      });

      describe('Space key', () => {
        test('opens menu if calendar button is focused', async () => {
          const { findMenuElements, calendarButton } = renderDatePicker();
          tabNTimes(4);
          expect(calendarButton).toHaveFocus();
          userEvent.keyboard('{space}');
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('if month/year select is focused, opens the select menu', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect } = await openMenu();
          tabNTimes(2);
          userEvent.keyboard('{space}');
          expect(monthSelect).toHaveFocus();
          const options = await findAllByRole('option');
          expect(options.length).toBeGreaterThan(0);
        });

        test('if a cell is focused, fires a change handler', async () => {
          const onChange = jest.fn();
          const { openMenu } = renderDatePicker({ onChange });
          const { todayCell } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{space}');
          expect(onChange).toHaveBeenCalled();
        });

        test('if a cell is focused, closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { menuContainerEl, todayCell } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{space}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test.skip('if a cell is focused & component has value, closes the menu', async () => {
          const value = newUTC(2023, Month.September, 10);
          const { openMenu } = renderDatePicker({ value });
          const { menuContainerEl, queryCellByDate } = await openMenu();
          expect(queryCellByDate(value)).toHaveFocus();
          userEvent.keyboard('{space}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });
      });

      describe('Escape key', () => {
        test('closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { menuContainerEl } = await openMenu();
          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('does not fire a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({ onDateChange });
          await openMenu();
          userEvent.keyboard('{escape}');
          expect(onDateChange).not.toHaveBeenCalled();
        });

        test('focus remains in the input element', async () => {
          const { openMenu, inputContainer } = renderDatePicker();
          await openMenu();
          userEvent.keyboard('{escape}');
          expect(inputContainer.contains(document.activeElement)).toBeTruthy();
        });

        test('returns focus to the calendar button', async () => {
          const { openMenu, calendarButton } = renderDatePicker();
          await openMenu();
          userEvent.keyboard('{escape}');
          await waitFor(() => expect(calendarButton).toHaveFocus());
        });

        test('fires a validation handler', async () => {
          const handleValidation = jest.fn();
          const { openMenu } = renderDatePicker({ handleValidation });
          await openMenu();
          userEvent.keyboard('{escape}');
          expect(handleValidation).toHaveBeenCalledWith(undefined);
        });

        test('does not close the main menu if a select menu is open', async () => {
          const { openMenu, queryAllByRole, findAllByRole } =
            renderDatePicker();
          const { monthSelect, menuContainerEl } = await openMenu();

          monthSelect?.focus();
          expect(monthSelect).toHaveFocus();
          userEvent.keyboard('{enter}');
          userEvent.keyboard('{arrowdown}');
          const options = await findAllByRole('option');
          const firstOption = options[0];
          expect(firstOption).toHaveFocus();
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
          const selectMenu = listBoxes[1];
          userEvent.keyboard('{escape}');
          await waitFor(() => {
            expect(menuContainerEl).toBeInTheDocument();
            expect(selectMenu).not.toBeInTheDocument();
          });
        });
      });

      /**
       * Arrow Keys:
       * Since arrow key behavior changes based on whether the input or menu is focused,
       * many of these tests exist in the "DatePickerInput" and "DatePickerMenu" components
       */
      describe('Arrow key', () => {
        describe('Input', () => {
          test.todo('moves focus to segments');
        });
        describe('Menu', () => {
          test('left arrow moves focus to the previous day', async () => {
            const { calendarButton, findMenuElements } = renderDatePicker();
            userEvent.click(calendarButton);
            const { todayCell, menuContainerEl, queryCellByDate } =
              await findMenuElements();
            // Manually fire the `transitionEnd` event. This is not fired automatically by JSDOM
            fireEvent.transitionEnd(menuContainerEl!);
            expect(todayCell).toHaveFocus();

            userEvent.keyboard('{arrowleft}');
            const prevDayCell = queryCellByDate(subDays(testToday, 1));
            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('down arrow moves focus to next week', async () => {
            const { calendarButton, findMenuElements } = renderDatePicker();
            userEvent.click(calendarButton);
            const { todayCell, menuContainerEl, queryCellByDate } =
              await findMenuElements();
            // Manually fire the `transitionEnd` event. This is not fired automatically by JSDOM
            fireEvent.transitionEnd(menuContainerEl!);
            expect(todayCell).toHaveFocus();

            userEvent.keyboard('{arrowdown}');
            const nextWeekCell = queryCellByDate(addDays(testToday, 7));
            await waitFor(() => expect(nextWeekCell).toHaveFocus());
          });

          test('down arrow can change month', async () => {
            const { calendarButton, findByRole } = renderDatePicker();
            userEvent.click(calendarButton);
            const menuContainerEl = await findByRole('listbox');
            const calendarGrid = within(menuContainerEl).getByRole('grid');
            fireEvent.transitionEnd(menuContainerEl!);

            expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');

            userEvent.keyboard('{arrowdown}');
            expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');
          });
        });
      });
    });

    describe('Typing', () => {
      describe('Typing into the input', () => {
        test('opens the menu', async () => {
          const { yearInput, findMenuElements } = renderDatePicker();
          userEvent.tab();
          expect(yearInput).toHaveFocus();
          userEvent.keyboard('2');
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('does not fire a value change handler', () => {
          const onDateChange = jest.fn();
          const { yearInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2023');
          expect(onDateChange).not.toHaveBeenCalled();
        });

        test('fires a segment change handler', () => {
          const onChange = jest.fn();
          const { yearInput } = renderDatePicker({
            onChange,
          });
          userEvent.type(yearInput, '2023');
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('2023'),
          );
        });

        describe('auto-advance focus', () => {
          describe('ISO format', () => {
            const dateFormat = 'iso8601';
            test('when year value is explicit, focus advances to month', () => {
              const { yearInput, monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(yearInput, '1999');
              expect(monthInput).toHaveFocus();
            });
            test('when year value is ambiguous, focus does not advance', () => {
              const { yearInput } = renderDatePicker({ dateFormat });
              userEvent.type(yearInput, '2');
              expect(yearInput).toHaveFocus();
            });
            test('when year value is out-of-range, focus does not advance', () => {
              const { yearInput } = renderDatePicker({ dateFormat });
              userEvent.type(yearInput, '1945');
              expect(yearInput).toHaveFocus();
            });

            test('when month value is explicit, focus advances to day', () => {
              const { monthInput, dayInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '5');
              expect(dayInput).toHaveFocus();
            });
            test('when month value is ambiguous, focus does not advance', () => {
              const { monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '1');
              expect(monthInput).toHaveFocus();
            });
          });

          describe('en-US format', () => {
            const dateFormat = 'en-US';
            test('when month value is explicit, focus advances to day', () => {
              const { monthInput, dayInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '5');
              expect(dayInput).toHaveFocus();
            });
            test('when month value is ambiguous, focus does not advance', () => {
              const { monthInput } = renderDatePicker({ dateFormat });
              userEvent.type(monthInput, '1');
              expect(monthInput).toHaveFocus();
            });

            test('when day value is explicit, focus advances to year', () => {
              const { dayInput, yearInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(dayInput, '5');
              expect(yearInput).toHaveFocus();
            });
            test('when day value is ambiguous, focus does not advance', () => {
              const { dayInput } = renderDatePicker({ dateFormat });
              userEvent.type(dayInput, '2');
              expect(dayInput).toHaveFocus();
            });

            test('when year value is ambiguous, focus does not update', () => {
              const { monthInput, dayInput, yearInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '5');
              userEvent.type(dayInput, '5');
              userEvent.type(yearInput, '2');
              expect(yearInput).toHaveFocus();
            });
          });
        });
      });

      describe('on un-focus/blur', () => {
        test('does not fire a change handler if the value is incomplete', () => {
          const onDateChange = jest.fn();
          const { yearInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2023');
          userEvent.tab();
          expect(onDateChange).not.toHaveBeenCalled();
        });

        test('fires a segment change handler', () => {
          const onChange = jest.fn();
          const { yearInput } = renderDatePicker({ onChange });
          userEvent.type(yearInput, '2023');
          userEvent.tab();
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('2023'),
          );
        });

        test('fires a change handler when the value is a valid date', () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2023');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          userEvent.tab();
          expect(onDateChange).toHaveBeenCalledWith(
            expect.objectContaining(newUTC(2023, Month.December, 26)),
          );
        });

        test('fires a validation handler when the value is first set', () => {
          const handleValidation = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            handleValidation,
          });
          userEvent.type(yearInput, '2023');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          userEvent.tab();
          expect(handleValidation).toHaveBeenCalledWith(
            expect.objectContaining(newUTC(2023, Month.December, 26)),
          );
        });

        test('fires a validation handler any time the value is updated', () => {
          const handleValidation = jest.fn();
          const { dayInput } = renderDatePicker({
            value: new Date(),
            handleValidation,
          });
          userEvent.type(dayInput, '05');
          userEvent.tab();
          expect(handleValidation).toHaveBeenCalledWith(
            expect.objectContaining(newUTC(2023, Month.December, 5)),
          );
        });
      });
    });

<<<<<<< HEAD
    describe('User flows', () => {
      test('month is set when value changes', async () => {
        const { calendarButton, getMenuElements, rerenderDatePicker } =
          renderDatePicker();
        userEvent.click(calendarButton);
        const { calendarGrid, menuContainerEl } = getMenuElements();
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        userEvent.tab();
        userEvent.keyboard('{escape}');
        await waitForElementToBeRemoved(menuContainerEl);

=======
    // TODO: Move these suites to Cypress (or other e2e/integration platform)
    describe.skip('User flows', () => {
      test('month is updated when value changes', async () => {
>>>>>>> ea14b1fffdfb5b1fbe1a710ab10e29d0a0ec2ed2
        const value = newUTC(2023, Month.September, 10);
        const { calendarButton, findMenuElements, rerenderDatePicker } =
          renderDatePicker();
        rerenderDatePicker({ value });
        userEvent.click(calendarButton);
        const { calendarGrid } = await findMenuElements();
        await waitFor(() =>
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023'),
        );
      });

      describe('when closing and re-opening the menu', () => {
        test('month is reset to today by default', async () => {
          const { openMenu } = renderDatePicker();
          const { calendarGrid, menuContainerEl } = await openMenu();

          expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');

          userEvent.keyboard('{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'January 2024');

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);

          await openMenu();
          expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        });

        test('month is reset to value', async () => {
          const value = newUTC(2023, Month.September, 10);

          const { openMenu } = renderDatePicker({
            value,
          });
          const { calendarGrid, menuContainerEl } = await openMenu();

          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');

          userEvent.keyboard('{arrowup}{arrowup}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);

          await openMenu();
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');
        });

        test('highlight returns to today by default', async () => {
          const { openMenu } = renderDatePicker();
          const { todayCell, menuContainerEl, queryCellByDate } =
            await openMenu();
          expect(todayCell).toHaveFocus();

          userEvent.keyboard('{arrowdown}');
          const jan2 = addDays(testToday, 7);
          const jan2Cell = queryCellByDate(jan2);
          await waitFor(() => expect(jan2Cell).toHaveFocus());

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);

          const { todayCell: newTodayCell } = await openMenu();
          expect(newTodayCell).toHaveFocus();
        });

        test('highlight returns to value', async () => {
          const value = newUTC(2023, Month.September, 10);
          const { calendarButton, findMenuElements } = renderDatePicker({
            value,
          });
          userEvent.click(calendarButton);
          const { queryCellByDate, menuContainerEl } = await findMenuElements();
          let valueCell = queryCellByDate(value);
          expect(valueCell).not.toBeNull();
          await waitFor(() => expect(valueCell).toHaveFocus());

          userEvent.keyboard('{arrowup}{arrowup}');
          const aug27 = subDays(value, 14);
          const aug27Cell = queryCellByDate(aug27);
          await waitFor(() => expect(aug27Cell).toHaveFocus());

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);

          userEvent.click(calendarButton);
          valueCell = queryCellByDate(testToday);
          expect(valueCell).not.toBeNull();
          await waitFor(() => expect(valueCell).toHaveFocus());
        });
      });
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    test('(Controlled) Cell click fires a change handler if `value` is provided', async () => {
      const onDateChange = jest.fn();
      const { openMenu } = renderDatePicker({
        value: new Date(),
        onDateChange,
      });
      const { calendarCells } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitFor(() => expect(onDateChange).toHaveBeenCalled());
    });

    test('(Controlled) Cell click does not change the value if `value` is provided', async () => {
      const onDateChange = jest.fn();
      const { openMenu, dayInput, monthInput, yearInput } = renderDatePicker({
        value: new Date(),
        onDateChange,
      });
      const { calendarCells } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitFor(() => {
        expect(dayInput.value).toEqual('26');
        expect(monthInput.value).toEqual('12');
        expect(yearInput.value).toEqual('2023');
      });
    });

    test('(Uncontrolled) Cell click fires a change handler', async () => {
      const onDateChange = jest.fn();
      const { openMenu } = renderDatePicker({
        onDateChange,
      });
      const { calendarCells } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitFor(() => expect(onDateChange).toHaveBeenCalled());
    });

    test('(Uncontrolled) Cell click changes the input value if `value` is not provided', async () => {
      const onDateChange = jest.fn();
      const { openMenu, dayInput, monthInput, yearInput } = renderDatePicker({
        onDateChange,
        initialValue: new Date(),
      });
      const { calendarCells } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitFor(() => {
        expect(dayInput.value).toEqual('01');
        expect(monthInput.value).toEqual('12');
        expect(yearInput.value).toEqual('2023');
      });
    });
  });
});
