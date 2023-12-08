import React from 'react';
import {
  fireEvent,
  // prettyDOM,
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays, subDays } from 'date-fns';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { defaultMax, defaultMin, Month } from '../shared/constants';
import { eventContainingTargetValue, tabNTimes } from '../shared/testutils';
import {
  getFormattedDateString,
  getISODate,
  getValueFormatter,
  newUTC,
  setUTCMonth,
  setUTCYear,
} from '../shared/utils';

import {
  expectedTabStopLabels,
  findTabStopElementMap,
  renderDatePicker,
  RenderDatePickerResult,
  RenderMenuResult,
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

      // TODO: Test a11y linking of label & input
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

      describe('Error states', () => {
        test('renders error state when `state` is "error"', () => {
          const { getByRole } = render(
            <DatePicker
              label="Label"
              state="error"
              errorMessage="Custom error message"
            />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
        });

        test('renders with `errorMessage` when provided', () => {
          const { queryByTestId } = render(
            <DatePicker
              label="Label"
              state="error"
              errorMessage="Custom error message"
            />,
          );
          const errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent('Custom error message');
        });

        test('does not render `errorMessage` when state is not set', () => {
          const { getByRole, queryByTestId } = render(
            <DatePicker label="Label" errorMessage="Custom error message" />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'false');
          const errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).not.toBeInTheDocument();
        });

        test('renders with internal error state when value is out of range', () => {
          const { getByTestId, getByRole } = render(
            <DatePicker label="Label" value={newUTC(2100, 1, 1)} />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');

          const errorElement = getByTestId('lg-form_field-error_message');
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });

        test('external error message overrides internal error message', () => {
          const { getByTestId, getByRole } = renderDatePicker({
            value: newUTC(2100, 1, 1),
            state: 'error',
            errorMessage: 'Custom error message',
          });
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');

          const errorElement = getByTestId('lg-form_field-error_message');
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent('Custom error message');
        });

        test('renders internal message if external error message is not set', () => {
          const { inputContainer, getByTestId } = renderDatePicker({
            value: newUTC(2100, 1, 1),
            state: 'error',
            errorMessage: undefined,
          });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(getByTestId('lg-form_field-error_message')).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });

        test('removing an external error displays an internal error when applicable', () => {
          const { inputContainer, rerenderDatePicker, getByTestId } =
            renderDatePicker({
              value: newUTC(2100, 1, 1),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(getByTestId('lg-form_field-error_message')).toHaveTextContent(
            'Date must be before 2038-01-19',
          );

          rerenderDatePicker({ errorMessage: 'Some error', state: 'error' });

          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(getByTestId('lg-form_field-error_message')).toHaveTextContent(
            'Some error',
          );

          rerenderDatePicker({ state: 'none' });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(getByTestId('lg-form_field-error_message')).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });
      });
    });

    describe('Menu', () => {
      test('menu is initially closed', async () => {
        const { findMenuElements } = renderDatePicker();
        const { menuContainerEl } = await findMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('menu is initially open when rendered with `initialOpen`', async () => {
        const { findMenuElements } = renderDatePicker({ initialOpen: true });
        const { menuContainerEl } = await findMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('menu is initially closed when rendered with `initialOpen` and `disabled`', async () => {
        const { findMenuElements } = renderDatePicker({
          initialOpen: true,
          disabled: true,
        });
        const { menuContainerEl } = await findMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('if no value is set, menu opens to current month', async () => {
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

      test('if value is invalid, menu still opens to the month of that value', async () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2100, Month.July, 10)),
        });
        const { calendarGrid, calendarCells } = await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'July 2100');
        calendarCells.forEach(cell => {
          expect(cell).toHaveAttribute('aria-disabled', 'true');
        });
      });

      test('renders the appropriate number of cells', async () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2024, Month.February, 14)),
        });
        const { calendarCells } = await openMenu();
        expect(calendarCells).toHaveLength(29);
      });

      describe('when disabled is toggled to true', () => {
        test('menu closes', async () => {
          const { findMenuElements, rerenderDatePicker } = renderDatePicker({
            initialOpen: true,
          });
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
          rerenderDatePicker({ disabled: true });
          await waitFor(() => {
            expect(menuContainerEl).not.toBeInTheDocument();
          });
        });

        test('validation handler fires', async () => {
          const handleValidation = jest.fn();
          const { findMenuElements, rerenderDatePicker } = renderDatePicker({
            initialOpen: true,
            handleValidation,
          });
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
          rerenderDatePicker({ disabled: true });
          await waitFor(() => {
            expect(handleValidation).toHaveBeenCalled();
          });
        });
      });

      describe('Chevrons', () => {
        describe('left', () => {
          describe('is disabled', () => {
            test('when the year and month is before the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                value: new Date(Date.UTC(2022, Month.December, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the year and month is the same as the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 10)),
                value: new Date(Date.UTC(2023, Month.December, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the year is the same as the min and the month is before the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                value: new Date(Date.UTC(2023, Month.November, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('min and max are in the same month', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                max: new Date(Date.UTC(2023, Month.December, 20)),
                value: new Date(Date.UTC(2023, Month.December, 5)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
            });
          });
          describe('is not disabled', () => {
            test('when the year and month is after the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2025, Month.December, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'false');
            });
            test('when the year and month is the same as the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2024, Month.January, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'false');
            });
            test('when the year is the same as the max and the month is after the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2024, Month.February, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'false');
            });
          });
        });
        describe('right', () => {
          describe('is disabled', () => {
            test('when the year and month is after the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2025, Month.December, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the year and month is the same as the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2024, Month.January, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the year is the same as the max and the month is after the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2024, Month.February, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('min and max are in the same month', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                max: new Date(Date.UTC(2023, Month.December, 20)),
                value: new Date(Date.UTC(2023, Month.December, 5)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
            });
          });
          describe('is not disabled', () => {
            test('when the year and month is before the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                value: new Date(Date.UTC(2022, Month.December, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'false');
            });
            test('when the year and month is the same as the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 10)),
                value: new Date(Date.UTC(2023, Month.December, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'false');
            });
            test('when the year is the same as the min and the month before the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                value: new Date(Date.UTC(2023, Month.November, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'false');
            });
          });
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

        test('focuses a specific segment when clicked', async () => {
          const { monthInput, waitForMenuToOpen } = renderDatePicker();
          userEvent.click(monthInput);
          await waitForMenuToOpen();
          expect(monthInput).toHaveFocus();
        });

        test('focuses the first segment when all are empty', async () => {
          const { inputContainer, yearInput, waitForMenuToOpen } =
            renderDatePicker();
          userEvent.click(inputContainer);
          await waitForMenuToOpen();
          expect(yearInput).toHaveFocus();
        });

        test('focuses the first empty segment when some are empty', async () => {
          const { inputContainer, yearInput, monthInput, waitForMenuToOpen } =
            renderDatePicker();
          yearInput.value = '2023';
          yearInput.blur();
          userEvent.click(inputContainer);
          await waitForMenuToOpen();
          expect(monthInput).toHaveFocus();
        });

        test('focuses the last segment when all are filled', async () => {
          const { inputContainer, dayInput, waitForMenuToOpen } =
            renderDatePicker({
              value: new Date(),
            });
          userEvent.click(inputContainer);
          await waitForMenuToOpen();
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

        test('closes the menu', async () => {
          const { openMenu } = renderDatePicker({});
          const { calendarCells, menuContainerEl } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          await waitForElementToBeRemoved(menuContainerEl);
        });

        test('updates the input', async () => {
          const { openMenu, dayInput, monthInput, yearInput } =
            renderDatePicker({});
          const { todayCell } = await openMenu();
          userEvent.click(todayCell!);
          await waitFor(() => {
            expect(dayInput.value).toBe(testToday.getUTCDate().toString());
            expect(monthInput.value).toBe(
              (testToday.getUTCMonth() + 1).toString(),
            );
            expect(yearInput.value).toBe(testToday.getUTCFullYear().toString());
          });
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

          test('keeps focus on chevron button', async () => {
            const { openMenu } = renderDatePicker();
            const { leftChevron } = await openMenu();
            userEvent.click(leftChevron!);
            expect(leftChevron).toHaveFocus();
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
          userEvent.keyboard('[Enter]');
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
          userEvent.keyboard('[Enter]');
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

        describe('when select is open', () => {
          describe('Year select menu', () => {
            test('keeps the menu open', async () => {
              const { openMenu, container } = renderDatePicker();
              const { yearSelect, menuContainerEl } = await openMenu();
              userEvent.click(yearSelect!);
              userEvent.click(container.parentElement!);
              await waitFor(() => {
                expect(menuContainerEl).toBeInTheDocument();
              });
            });

            test('closes the month/year select', async () => {
              const { openMenu, container } = renderDatePicker();
              const { yearSelect } = await openMenu();
              userEvent.click(yearSelect!);
              userEvent.click(container.parentElement!);
              await waitForElementToBeRemoved(yearSelect);
            });
          });

          describe('Month select menu', () => {
            test('keeps the menu open', async () => {
              const { openMenu, container } = renderDatePicker();
              const { monthSelect, menuContainerEl } = await openMenu();
              userEvent.click(monthSelect!);
              userEvent.click(container.parentElement!);
              await waitFor(() => {
                expect(menuContainerEl).toBeInTheDocument();
              });
            });

            test('closes the month/year select', async () => {
              const { openMenu, container } = renderDatePicker();
              const { monthSelect } = await openMenu();
              userEvent.click(monthSelect!);
              userEvent.click(container.parentElement!);
              await waitForElementToBeRemoved(monthSelect);
            });
          });
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

        test('todayCell does not call validation handler when changing segment focus', () => {
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
                  expect(element).toHaveFocus();
                } else {
                  expect(
                    renderResult.inputContainer.contains(
                      document.activeElement,
                    ),
                  ).toBeFalsy();
                }

                userEvent.tab();
                // There are side-effects triggered on CSS transition-end events.
                // Fire this event here to ensure these side-effects don't impact Tab order
                if (element) fireEvent.transitionEnd(element);
              }
            });
          });
        });
      });

      describe.each(['Enter', 'Space'])('%p key', key => {
        test('opens menu if calendar button is focused', async () => {
          const { findMenuElements } = renderDatePicker();
          tabNTimes(4);
          userEvent.keyboard(`[${key}]`);
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('if month select is focused, opens the select menu', async () => {
          const { openMenu, findAllByRole } = renderDatePicker();
          const { monthSelect } = await openMenu();
          tabNTimes(2);
          expect(monthSelect).toHaveFocus();
          userEvent.keyboard(`[${key}]`);
          const options = await findAllByRole('option');
          expect(options.length).toBeGreaterThan(0);
        });

        test('if a cell is focused, fires a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({ onDateChange });
          const { todayCell } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard(`[${key}]`);
          expect(onDateChange).toHaveBeenCalled();
        });

        test('if a cell is focused, closes the menu', async () => {
          const { openMenu } = renderDatePicker();
          const { todayCell, menuContainerEl } = await openMenu();
          expect(todayCell).toHaveFocus();
          userEvent.keyboard(`[${key}]`);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('if a cell is focused on current value, closes the menu, but does not fire a change handler', async () => {
          const onDateChange = jest.fn();
          const value = newUTC(2023, Month.September, 10);
          const { openMenu } = renderDatePicker({ value, onDateChange });
          const { menuContainerEl, queryCellByDate } = await openMenu();
          expect(queryCellByDate(value)).toHaveFocus();
          userEvent.keyboard(`[${key}]`);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
          expect(onDateChange).not.toHaveBeenCalled();
        });

        describe('chevron', () => {
          test('if left chevron is focused, does not close the menu', async () => {
            const { openMenu, findMenuElements } = renderDatePicker();
            const { leftChevron } = await openMenu();
            tabNTimes(1);
            expect(leftChevron).toHaveFocus();
            userEvent.keyboard(`[${key}]`);
            const { menuContainerEl } = await findMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('if right chevron is focused, does not close the menu', async () => {
            const { openMenu, findMenuElements } = renderDatePicker();
            const { rightChevron } = await openMenu();
            tabNTimes(4);
            expect(rightChevron).toHaveFocus();
            userEvent.keyboard(`[${key}]`);
            const { menuContainerEl } = await findMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });
        });
      });

      describe('Enter key only', () => {
        test('does not open the menu if input is focused', async () => {
          const { findMenuElements } = renderDatePicker();
          userEvent.tab();
          userEvent.keyboard(`[Enter]`);
          const { menuContainerEl } = await findMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('calls validation handler', () => {
          const handleValidation = jest.fn();
          renderDatePicker({ handleValidation });
          userEvent.tab();
          userEvent.keyboard(`[Enter]`);
          expect(handleValidation).toHaveBeenCalledWith(undefined);
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

        test('closes the menu regardless of which element is focused', async () => {
          const { openMenu } = renderDatePicker();
          const { menuContainerEl, leftChevron } = await openMenu();
          userEvent.tab();
          expect(leftChevron).toHaveFocus();

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('does not close the main menu if a select menu is open', async () => {
          const { openMenu, queryAllByRole, findAllByRole } =
            renderDatePicker();
          const { monthSelect, menuContainerEl } = await openMenu();

          tabNTimes(2);
          expect(monthSelect).toHaveFocus();

          userEvent.keyboard('[Enter]');
          await waitFor(() =>
            jest.advanceTimersByTime(transitionDuration.default),
          );

          const options = await findAllByRole('option');
          const firstOption = options[0];
          userEvent.keyboard('{arrowdown}');
          expect(firstOption).toHaveFocus();

          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);

          const selectMenu = listBoxes[1];
          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(selectMenu);
          expect(menuContainerEl).toBeInTheDocument();
          expect(monthSelect).toHaveFocus();
        });
      });

      /**
       * Arrow Keys:
       * Since arrow key behavior changes based on whether the input or menu is focused,
       * many tests exist in the "DatePickerInput" and "DatePickerMenu" components
       */
      describe('Arrow key', () => {
        describe('Input', () => {
          test('right arrow moves focus through segments', () => {
            const { yearInput, monthInput, dayInput } = renderDatePicker();
            userEvent.click(yearInput);
            userEvent.keyboard('{arrowright}');
            expect(monthInput).toHaveFocus();

            userEvent.keyboard('{arrowright}');
            expect(dayInput).toHaveFocus();
          });

          test('left arrow moves focus back through segments', () => {
            const { yearInput, monthInput, dayInput } = renderDatePicker();
            userEvent.click(dayInput);
            userEvent.keyboard('{arrowleft}');
            expect(monthInput).toHaveFocus();

            userEvent.keyboard('{arrowleft}');
            expect(yearInput).toHaveFocus();
          });

          describe('Up Arrow', () => {
            describe('month input', () => {
              const formatter = getValueFormatter('month');
              test('updates segment value to the default min', () => {
                const { monthInput } = renderDatePicker();
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowup}`);

                expect(monthInput).toHaveValue(formatter(defaultMin.month));
              });

              test(`fires segment change handler`, () => {
                const onChange = jest.fn();
                const { monthInput } = renderDatePicker({ onChange });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onChange).toHaveBeenCalledWith(
                  eventContainingTargetValue(formatter(defaultMin.month)),
                );
              });

              test(`does not fire value change handler`, () => {
                const onDateChange = jest.fn();
                const { monthInput } = renderDatePicker({ onDateChange });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onDateChange).not.toHaveBeenCalled();
              });
            });

            describe('year input', () => {
              const formatter = getValueFormatter('year');

              test('updates segment value to the default min', () => {
                const { yearInput } = renderDatePicker();
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowup}`);

                expect(yearInput).toHaveValue(formatter(defaultMin.year));
              });

              test('updates segment value to the provided min year', () => {
                const { yearInput } = renderDatePicker({
                  min: newUTC(1969, Month.June, 20),
                });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowup}`);

                expect(yearInput).toHaveValue(formatter(1969));
              });

              test(`fires segment change handler`, () => {
                const onChange = jest.fn();
                const { yearInput } = renderDatePicker({ onChange });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onChange).toHaveBeenCalledWith(
                  eventContainingTargetValue(formatter(defaultMin.year)),
                );
              });

              test(`does not fire value change handler`, () => {
                const onDateChange = jest.fn();
                const { yearInput } = renderDatePicker({ onDateChange });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onDateChange).not.toHaveBeenCalled();
              });
            });

            describe('when a value is set', () => {
              test('fires value change handler', () => {
                const onDateChange = jest.fn();
                const { monthInput } = renderDatePicker({
                  onDateChange,
                  value: testToday,
                });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onDateChange).toHaveBeenCalled();
              });

              test('rolls year value over from max prop to min prop', () => {
                const onDateChange = jest.fn();
                const { yearInput } = renderDatePicker({
                  onDateChange,
                  value: newUTC(2020, Month.July, 5),
                  min: newUTC(1969, Month.June, 20),
                  max: newUTC(2020, Month.September, 10),
                });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowup}`);
                expect(onDateChange).toHaveBeenCalledWith(
                  newUTC(1969, Month.July, 5),
                );
              });

              describe('if new value would be out of range', () => {
                const onDateChange = jest.fn();
                const onSegmentChange = jest.fn();
                const handleValidation = jest.fn();
                const max = newUTC(2020, Month.July, 4);
                const startValue = newUTC(2019, Month.August, 1);
                const newYearVal = '2020';
                const expectedMessage = `Date must be before ${getFormattedDateString(
                  max,
                  'iso8601',
                )}`;

                let renderResult: RenderDatePickerResult;

                beforeEach(() => {
                  onDateChange.mockReset();
                  onSegmentChange.mockReset();
                  handleValidation.mockReset();

                  renderResult = renderDatePicker({
                    max,
                    value: startValue,
                    onDateChange,
                    onChange: onSegmentChange,
                    handleValidation,
                  });
                  userEvent.click(renderResult.yearInput);
                  userEvent.keyboard(`{arrowup}`);
                });

                test('updates the input', () => {
                  expect(renderResult.yearInput).toHaveValue(newYearVal);
                });

                test('fires the change handler', () => {
                  expect(onDateChange).toHaveBeenCalledWith(
                    setUTCYear(startValue, Number(newYearVal)),
                  );
                });

                test('fires the segment change handler', () => {
                  expect(onSegmentChange).toHaveBeenCalledWith(
                    eventContainingTargetValue(newYearVal),
                  );
                });

                test('fires the validation handler', () => {
                  expect(handleValidation).toHaveBeenCalledWith(
                    setUTCYear(startValue, Number(newYearVal)),
                  );
                });

                test('sets aria-invalid', () => {
                  expect(renderResult.inputContainer).toHaveAttribute(
                    'aria-invalid',
                    'true',
                  );
                });

                test('sets error message', () => {
                  const errorMessageElement = within(
                    renderResult.formField,
                  ).queryByText(expectedMessage);
                  expect(errorMessageElement).toBeInTheDocument();
                });
              });
            });
          });

          describe('Down Arrow', () => {
            describe('month input', () => {
              const formatter = getValueFormatter('month');

              test('updates segment value to the default max', () => {
                const { monthInput } = renderDatePicker();
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowdown}`);

                expect(monthInput).toHaveValue(formatter(defaultMax.month));
              });

              test(`fires segment change handler`, () => {
                const onChange = jest.fn();
                const { monthInput } = renderDatePicker({ onChange });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onChange).toHaveBeenCalledWith(
                  eventContainingTargetValue(formatter(defaultMax.month)),
                );
              });

              test(`does not fire value change handler`, () => {
                const onDateChange = jest.fn();
                const { monthInput } = renderDatePicker({ onDateChange });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onDateChange).not.toHaveBeenCalled();
              });
            });

            describe('year input', () => {
              const formatter = getValueFormatter('year');

              test('updates segment value to the default max', () => {
                const { yearInput } = renderDatePicker();
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowdown}`);

                expect(yearInput).toHaveValue(formatter(defaultMax.year));
              });

              test('updates segment value to the provided min year', () => {
                const { yearInput } = renderDatePicker({
                  max: newUTC(2020, Month.March, 13),
                });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowdown}`);

                expect(yearInput).toHaveValue(formatter(2020));
              });

              test(`fires segment change handler`, () => {
                const onChange = jest.fn();
                const { yearInput } = renderDatePicker({ onChange });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onChange).toHaveBeenCalledWith(
                  eventContainingTargetValue(formatter(defaultMax.year)),
                );
              });

              test(`does not fire value change handler`, () => {
                const onDateChange = jest.fn();
                const { yearInput } = renderDatePicker({ onDateChange });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onDateChange).not.toHaveBeenCalled();
              });
            });

            describe('when a value is set', () => {
              test('fires value change handler', () => {
                const onDateChange = jest.fn();
                const { monthInput } = renderDatePicker({
                  onDateChange,
                  value: testToday,
                });
                userEvent.click(monthInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onDateChange).toHaveBeenCalledWith(
                  setUTCMonth(testToday, testToday.getUTCMonth() - 1),
                );
              });

              test('rolls year value over from min prop to max prop', () => {
                const onDateChange = jest.fn();
                const { yearInput } = renderDatePicker({
                  onDateChange,
                  value: newUTC(1969, Month.July, 5),
                  min: newUTC(1969, Month.June, 20),
                  max: newUTC(2020, Month.September, 10),
                });
                userEvent.click(yearInput);
                userEvent.keyboard(`{arrowdown}`);
                expect(onDateChange).toHaveBeenCalledWith(
                  newUTC(2020, Month.July, 5),
                );
              });

              describe('if new value would be out of range', () => {
                const onDateChange = jest.fn();
                const onSegmentChange = jest.fn();
                const handleValidation = jest.fn();
                const min = newUTC(1999, Month.November, 11);
                const startValue = newUTC(2000, Month.August, 1);
                const newYearVal = '1999';

                const expectedMessage = `Date must be after ${getFormattedDateString(
                  min,
                  'iso8601',
                )}`;

                let renderResult: RenderDatePickerResult;

                beforeEach(() => {
                  onDateChange.mockReset();
                  onSegmentChange.mockReset();
                  handleValidation.mockReset();

                  renderResult = renderDatePicker({
                    min,
                    value: startValue,
                    onDateChange,
                    onChange: onSegmentChange,
                    handleValidation,
                  });
                  userEvent.click(renderResult.yearInput);
                  userEvent.keyboard(`{arrowdown}`);
                });

                test('updates the input', () => {
                  expect(renderResult.yearInput).toHaveValue(newYearVal);
                });

                test('fires the change handler', () => {
                  expect(onDateChange).toHaveBeenCalledWith(
                    setUTCYear(startValue, Number(newYearVal)),
                  );
                });

                test('fires the segment change handler', () => {
                  expect(onSegmentChange).toHaveBeenCalledWith(
                    eventContainingTargetValue(newYearVal),
                  );
                });

                test('fires the validation handler', () => {
                  expect(handleValidation).toHaveBeenCalledWith(
                    setUTCYear(startValue, Number(newYearVal)),
                  );
                });

                test('sets aria-invalid', () => {
                  expect(renderResult.inputContainer).toHaveAttribute(
                    'aria-invalid',
                    'true',
                  );
                });

                test('sets error message', () => {
                  const errorMessageElement = within(
                    renderResult.formField,
                  ).queryByText(expectedMessage);
                  expect(errorMessageElement).toBeInTheDocument();
                });
              });
            });
          });
        });

        describe('Menu', () => {
          test('left arrow moves focus to the previous day', async () => {
            const { openMenu } = renderDatePicker();
            const { todayCell, queryCellByDate } = await openMenu();
            expect(todayCell).toHaveFocus();

            userEvent.keyboard('{arrowleft}');
            const prevDayCell = queryCellByDate(subDays(testToday, 1));
            await waitFor(() => expect(prevDayCell).toHaveFocus());
          });

          test('down arrow moves focus to next week', async () => {
            const { openMenu } = renderDatePicker();
            const { todayCell, queryCellByDate } = await openMenu();
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
      test('does not open the menu', async () => {
        const { yearInput, findMenuElements } = renderDatePicker();
        userEvent.tab();
        expect(yearInput).toHaveFocus();
        userEvent.keyboard('2');
        const { menuContainerEl } = await findMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      describe('typing a single segment', () => {
        describe('typing space', () => {
          describe('single space', () => {
            describe('does not fire a segment value change', () => {
              test('when the value prop is set', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                  value: newUTC(2023, Month.December, 25),
                });
                userEvent.type(yearInput, '{space}');
                expect(onChange).not.toHaveBeenCalled();
              });

              test('when typing another digit', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}2');
                expect(onChange).not.toHaveBeenCalledWith(
                  expect.objectContaining({ value: ' 2' }),
                );
              });

              test('when there is no value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}');
                expect(onChange).not.toHaveBeenCalled();
              });
            });

            describe('renders the correct value when the space is', () => {
              test('at the start of a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}2023');
                expect(yearInput.value).toBe('2023');
              });

              test('at the end of a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '2023{space}');
                expect(yearInput.value).toBe('2023');
              });

              test('between a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '202{space}3');
                expect(yearInput.value).toBe('2023');
              });

              test('in multiple spots', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '2{space}0{space}2{space}3{space}');
                expect(yearInput.value).toBe('2023');
              });
            });

            test('opens the menu', async () => {
              const { yearInput, findMenuElements } = renderDatePicker({});
              userEvent.type(yearInput, '{space}');
              const { menuContainerEl } = await findMenuElements();
              expect(menuContainerEl).toBeInTheDocument();
            });
          });

          describe('double space', () => {
            describe('does not fire a segment value change', () => {
              test('when the value prop is set', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                  value: newUTC(2023, Month.December, 25),
                });
                userEvent.type(yearInput, '{space}{space}');
                expect(onChange).not.toHaveBeenCalled();
              });

              test('when typing another digit', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}{space}2');
                expect(onChange).not.toHaveBeenCalledWith(
                  expect.objectContaining({ value: ' 2' }),
                );
              });

              test('when there is no value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}{space}');
                expect(onChange).not.toHaveBeenCalled();
              });

              test('in multiple spots', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(
                  yearInput,
                  '2{space}{space}0{space}{space}2{space}{space}3{space}{space}',
                );
                expect(yearInput.value).toBe('2023');
              });
            });

            describe('renders the correct value when the space is', () => {
              test('at the start of a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '{space}{space}2023');
                expect(yearInput.value).toBe('2023');
              });

              test('at the end of a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '2023{space}{space}');
                expect(yearInput.value).toBe('2023');
              });

              test('between a value', () => {
                const onChange = jest.fn();

                const { yearInput } = renderDatePicker({
                  onChange,
                });
                userEvent.type(yearInput, '202{space}{space}3');
                expect(yearInput.value).toBe('2023');
              });
            });
          });
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

        test('does not immediately format the segment', () => {
          const onChange = jest.fn();
          const { dayInput } = renderDatePicker({ onChange });
          userEvent.type(dayInput, '2');
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('2'),
          );
          expect(dayInput.value).toBe('2');
        });

        test('formats on segment blur', () => {
          const onChange = jest.fn();
          const { dayInput } = renderDatePicker({ onChange });
          userEvent.type(dayInput, '2');
          userEvent.tab();
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('02'),
          );
          expect(dayInput.value).toBe('02');
        });

        describe('auto-advance focus', () => {
          describe('for ISO format', () => {
            const dateFormat = 'iso8601';

            test('when year value is explicit, focus advances to month', () => {
              const { yearInput, monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(yearInput, '1999');
              expect(monthInput).toHaveFocus();
            });
            test('when year value is before MIN, focus still advances', () => {
              const { yearInput, monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(yearInput, '1944');
              expect(monthInput).toHaveFocus();
            });
            test('when year value is after MAX, focus still advances', () => {
              const { yearInput, monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(yearInput, '2048');
              expect(monthInput).toHaveFocus();
            });
            test('when month value is explicit, focus advances to day', () => {
              const { monthInput, dayInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '5');
              expect(dayInput).toHaveFocus();
            });

            test('focus does NOT advance when year value is ambiguous', () => {
              const { yearInput } = renderDatePicker({ dateFormat });
              userEvent.type(yearInput, '200');
              expect(yearInput).toHaveFocus();
            });
            test('focus does NOT advance when month value is ambiguous', () => {
              const { monthInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '1');
              expect(monthInput).toHaveFocus();
            });
          });

          describe('for en-US format', () => {
            const dateFormat = 'en-US';

            test('when month value is explicit, focus advances to day', () => {
              const { monthInput, dayInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(monthInput, '5');
              expect(dayInput).toHaveFocus();
            });

            test('when day value is explicit, focus advances to year', () => {
              const { dayInput, yearInput } = renderDatePicker({
                dateFormat,
              });
              userEvent.type(dayInput, '5');
              expect(yearInput).toHaveFocus();
            });

            test('focus does NOT advance when month value is ambiguous', () => {
              const { monthInput } = renderDatePicker({ dateFormat });
              userEvent.type(monthInput, '1');
              expect(monthInput).toHaveFocus();
            });
            test('focus does NOT advance when day value is ambiguous', () => {
              const { dayInput } = renderDatePicker({ dateFormat });
              userEvent.type(dayInput, '2');
              expect(dayInput).toHaveFocus();
            });

            test('focus does NOT update when year value is ambiguous', () => {
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

      describe('typing a full value', () => {
        test('fires value change handler', () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2003');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          expect(onDateChange).toHaveBeenCalledWith(
            expect.objectContaining(newUTC(2003, Month.December, 26)),
          );
        });

        test('properly renders the input', () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2003');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          expect(yearInput).toHaveValue('2003');
          expect(monthInput).toHaveValue('12');
          expect(dayInput).toHaveValue('26');
        });

        describe('if value is out of range', () => {
          test('still fires a value change handler if value is after MAX', async () => {
            const onDateChange = jest.fn();
            const { yearInput, monthInput, dayInput } = renderDatePicker({
              onDateChange,
            });
            userEvent.type(yearInput, '2048');
            userEvent.type(monthInput, '12');
            userEvent.type(dayInput, '26');
            await waitFor(() =>
              expect(onDateChange).toHaveBeenCalledWith(
                expect.objectContaining(newUTC(2048, Month.December, 26)),
              ),
            );
          });

          test('properly renders input if value is after MAX', () => {
            const onDateChange = jest.fn();
            const { yearInput, monthInput, dayInput } = renderDatePicker({
              onDateChange,
            });
            userEvent.type(yearInput, '2048');
            userEvent.type(monthInput, '12');
            userEvent.type(dayInput, '23');
            expect(yearInput).toHaveValue('2048');
            expect(monthInput).toHaveValue('12');
            expect(dayInput).toHaveValue('23');
          });

          test('fire a value change handler if value is before MIN', () => {
            const onDateChange = jest.fn();
            const { yearInput, monthInput, dayInput } = renderDatePicker({
              onDateChange,
            });
            userEvent.type(yearInput, '1969');
            userEvent.type(monthInput, '7');
            userEvent.type(dayInput, '20');
            expect(onDateChange).toHaveBeenCalledWith(
              expect.objectContaining(newUTC(1969, Month.July, 20)),
            );
          });

          test('properly renders input if value is before MIN', () => {
            const onDateChange = jest.fn();
            const { yearInput, monthInput, dayInput } = renderDatePicker({
              onDateChange,
            });
            userEvent.type(yearInput, '1969');
            userEvent.type(monthInput, '7');
            userEvent.type(dayInput, '20');
            expect(yearInput).toHaveValue('1969');
            expect(monthInput).toHaveValue('07');
            expect(dayInput).toHaveValue('20');
          });
        });
      });

      describe('updating a segment', () => {
        test('clearing the segment updates the input', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          yearInput.setSelectionRange(0, 4);
          userEvent.type(yearInput, '{backspace}');
          expect(yearInput).toHaveValue('');
        });

        test('clearing and typing a new value does not format the input', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          yearInput.setSelectionRange(0, 4);
          userEvent.type(yearInput, '{backspace}');
          userEvent.type(yearInput, '2');
          expect(yearInput).toHaveValue('2');
        });

        test('deleting characters does not format the segment', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          userEvent.type(yearInput, '{backspace}{backspace}');
          expect(yearInput).toHaveValue('20');
        });

        test('typing new characters does not format the segment', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2019');
          userEvent.type(monthInput, '6');
          userEvent.type(dayInput, '1');

          userEvent.type(yearInput, '9');
          userEvent.type(yearInput, '9');
          expect(yearInput).toHaveValue('1999');
        });
      });

      describe('on un-focus/blur', () => {
        test('does not fire a value change handler if the value is incomplete', () => {
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

        test('fires a value change handler when the value is a valid date', () => {
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

    // TODO: Move these suites to Cypress (or other e2e/integration platform)
    describe('User flows', () => {
      test('month is updated when value changes externally', async () => {
        const value = newUTC(2023, Month.September, 10);
        const { calendarButton, waitForMenuToOpen, rerenderDatePicker } =
          renderDatePicker();
        rerenderDatePicker({ value });
        userEvent.click(calendarButton);
        const { calendarGrid } = await waitForMenuToOpen();
        await waitFor(() =>
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023'),
        );
      });

      describe('setting the date to an invalid value', () => {
        describe('with initial value', () => {
          let menuElements: RenderMenuResult;

          beforeEach(async () => {
            const { openMenu } = renderDatePicker({
              value: newUTC(2038, Month.December, 25),
            });
            menuElements = await openMenu();
          });

          test('sets displayed month to that month', () => {
            expect(menuElements.calendarGrid).toHaveAttribute(
              'aria-label',
              'December 2038',
            );
          });

          test.todo('sets the error state');
        });

        describe('with arrow keys', () => {
          const onDateChange = jest.fn();
          let menuElements: RenderMenuResult;

          beforeEach(async () => {
            const { yearInput, waitForMenuToOpen, findMenuElements } =
              renderDatePicker({
                value: newUTC(2037, Month.December, 25),
                onDateChange,
              });
            userEvent.click(yearInput);
            await waitForMenuToOpen();
            userEvent.keyboard('{arrowup}');
            menuElements = await findMenuElements();
          });

          test('fires onDateChange handler', async () => {
            expect(onDateChange).toHaveBeenCalledWith(
              expect.objectContaining(newUTC(2038, Month.December, 25)),
            );
          });

          test('sets displayed month to that month', async () => {
            expect(menuElements.calendarGrid).toHaveAttribute(
              'aria-label',
              'December 2038',
            );
          });

          test.todo('sets the error state');
        });

        describe('by typing', () => {
          let menuElements: RenderMenuResult;
          const onDateChange = jest.fn();

          beforeEach(async () => {
            const {
              yearInput,
              monthInput,
              dayInput,
              calendarButton,
              waitForMenuToOpen,
            } = renderDatePicker({ onDateChange });
            userEvent.type(yearInput, '2037');
            userEvent.type(monthInput, '12');
            userEvent.type(dayInput, '25');
            userEvent.click(calendarButton);
            menuElements = await waitForMenuToOpen();
          });

          test('fires onDateChange handler', () => {
            expect(onDateChange).toHaveBeenCalledWith(
              expect.objectContaining(newUTC(2037, Month.December, 25)),
            );
          });

          test('sets displayed month to that month', () => {
            expect(menuElements.calendarGrid).toHaveAttribute(
              'aria-label',
              'December 2037',
            );
          });

          test('focuses the correct date in the calendar', () => {
            const value = new Date(Date.UTC(2037, Month.December, 25));
            userEvent.tab();

            const valueCell = menuElements.calendarGrid!.querySelector(
              `[data-iso="${getISODate(value)}"]`,
            );
            expect(valueCell).toHaveFocus();
          });

          test.todo('sets the error state');
        });
      });

      describe('When closing and re-opening the menu', () => {
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
          const { openMenu, findMenuElements } = renderDatePicker({
            value,
          });
          let queryCellByDate = (await openMenu()).queryCellByDate;
          const { menuContainerEl } = await findMenuElements();
          let valueCell = queryCellByDate(value);
          expect(valueCell).not.toBeNull();
          await waitFor(() => expect(valueCell).toHaveFocus());

          userEvent.keyboard('{arrowup}{arrowup}');
          const aug27 = subDays(value, 14);
          const aug27Cell = queryCellByDate(aug27);
          await waitFor(() => expect(aug27Cell).toHaveFocus());

          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);

          queryCellByDate = (await openMenu()).queryCellByDate;
          valueCell = queryCellByDate(value);
          expect(valueCell).not.toBeNull();
          await waitFor(() => expect(valueCell).toHaveFocus());
        });
      });

      describe('Changing the month', () => {
        test.todo('is announced in an aria-live region');

        describe('updates the highlighted cell...', () => {
          test('to the end of the month if we went backwards', async () => {
            const { openMenu, findAllByRole } = renderDatePicker({
              value: newUTC(2023, Month.July, 5),
            });
            const { monthSelect, queryCellByDate } = await openMenu();
            userEvent.click(monthSelect!);
            const options = await findAllByRole('option');
            const Jan = options[0];
            userEvent.click(Jan);
            tabNTimes(3);
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
            tabNTimes(3);
            const dec1Cell = queryCellByDate(newUTC(2023, Month.December, 1));
            await waitFor(() => expect(dec1Cell).toHaveFocus());
          });
        });

        describe('shows the correct date in the input', () => {
          test('after selecting a month and clicking a cell', async () => {
            const { openMenu, findAllByRole, dayInput, monthInput, yearInput } =
              renderDatePicker({ initialValue: new Date() });
            const { monthSelect, queryCellByDate } = await openMenu();
            userEvent.click(monthSelect!);
            const options = await findAllByRole('option');
            const Jan = options[0];
            userEvent.click(Jan);

            const jan1Cell = queryCellByDate(newUTC(2023, Month.January, 1));
            userEvent.click(jan1Cell!);

            await waitFor(() => {
              expect(dayInput.value).toEqual('01');
              expect(monthInput.value).toEqual('01');
              expect(yearInput.value).toEqual('2023');
            });
          });

          test('after selecting a month and clicking a cell a second time', async () => {
            const { openMenu, findAllByRole, dayInput, monthInput, yearInput } =
              renderDatePicker({ initialValue: new Date() });
            const { monthSelect, queryCellByDate } = await openMenu();
            userEvent.click(monthSelect!);
            const options = await findAllByRole('option');
            const Jan = options[0];
            userEvent.click(Jan);

            const jan1Cell = queryCellByDate(newUTC(2023, Month.January, 1));
            userEvent.click(jan1Cell!);

            const Feb = options[1];
            userEvent.click(Feb);

            const feb1Cell = queryCellByDate(newUTC(2023, Month.February, 1));
            userEvent.click(feb1Cell!);

            await waitFor(() => {
              expect(dayInput.value).toEqual('01');
              expect(monthInput.value).toEqual('02');
              expect(yearInput.value).toEqual('2023');
            });
          });
        });
      });

      describe('Changing the year', () => {
        test.todo('is announced in an aria-live region');

        describe('displays the same month', () => {
          test('when the month is in range', async () => {
            const { openMenu, findAllByRole } = renderDatePicker({
              value: newUTC(2006, Month.July, 4),
              min: newUTC(1996, Month.January, 1),
            });

            const { yearSelect, calendarGrid } = await openMenu();
            userEvent.click(yearSelect!);
            const options = await findAllByRole('option');
            const firstYear = options[0]; // 1996
            userEvent.click(firstYear);

            expect(calendarGrid).toHaveAttribute('aria-label', 'July 1996');
          });

          test('when the month is not in range', async () => {
            const { openMenu, findAllByRole } = renderDatePicker({
              value: newUTC(2006, Month.July, 4),
              min: newUTC(1996, Month.September, 10),
            });

            const { yearSelect, calendarGrid } = await openMenu();
            userEvent.click(yearSelect!);
            const options = await findAllByRole('option');
            const firstYear = options[0]; // 1996
            userEvent.click(firstYear);

            expect(calendarGrid).toHaveAttribute('aria-label', 'July 1996');
          });
        });

        describe('shows the correct date in the input', () => {
          test('after selecting a year and clicking a cell', async () => {
            const { openMenu, findAllByRole, dayInput, monthInput, yearInput } =
              renderDatePicker({
                initialValue: new Date(), // dec 26 2023
                min: newUTC(1996, Month.January, 1),
                max: newUTC(2026, Month.January, 1),
              });
            const { yearSelect, queryCellByDate } = await openMenu();
            userEvent.click(yearSelect!);
            const options = await findAllByRole('option');
            const firstYear = options[0]; // 1996

            userEvent.click(firstYear);

            const dec1Cell = queryCellByDate(newUTC(1996, Month.December, 1));
            userEvent.click(dec1Cell!);

            await waitFor(() => {
              expect(dayInput.value).toEqual('01');
              expect(monthInput.value).toEqual('12');
              expect(yearInput.value).toEqual('1996');
            });
          });

          test('after selecting a year and clicking a cell a second time', async () => {
            const { openMenu, dayInput, monthInput, yearInput } =
              renderDatePicker({
                initialValue: new Date(), // dec 26 2023
                min: newUTC(1996, Month.January, 1),
                max: newUTC(2026, Month.January, 1),
              });

            // Open the menu the first time
            {
              const { yearSelect, queryCellByDate, menuContainerEl } =
                await openMenu();
              userEvent.click(yearSelect!);
              const options = await within(menuContainerEl!).findAllByRole(
                'option',
              );
              const yearOption1996 = options[0]; // 1996

              userEvent.click(yearOption1996);

              const dec1_96Cell = queryCellByDate(
                newUTC(1996, Month.December, 1),
              );
              userEvent.click(dec1_96Cell!);
              await waitForElementToBeRemoved(menuContainerEl);
            }

            // Re-open the menu
            {
              const { yearSelect, menuContainerEl, queryCellByDate } =
                await openMenu();
              userEvent.click(yearSelect!);
              expect(menuContainerEl).toBeInTheDocument();
              const options = await within(menuContainerEl!).findAllByRole(
                'option',
              );

              const yearOption1997 = options[1]; // 1997
              userEvent.click(yearOption1997);

              const dec2_97Cell = queryCellByDate(
                newUTC(1997, Month.December, 2),
              );
              expect(dec2_97Cell).toBeInTheDocument();
              userEvent.click(dec2_97Cell!);
            }

            await waitFor(() => {
              expect(dayInput.value).toEqual('02');
              expect(monthInput.value).toEqual('12');
              expect(yearInput.value).toEqual('1997');
            });
          });
        });
      });

      // JSDOM does not support layout: https://github.com/testing-library/react-testing-library/issues/671
      test.todo('page does not scroll when arrow keys are pressed');
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
