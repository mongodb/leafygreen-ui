import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import last from 'lodash/last';

import { Month } from '@leafygreen-ui/date-picker/shared/constants';
import {
  newUTC,
  setUTCDate,
  setUTCMonth,
} from '@leafygreen-ui/date-picker/utils';

import { eventContainingTargetValue, tabNTimes } from '../testUtils';

import {
  expectedTabStopLabels,
  getTabStopElementMap,
  quickSelectButtonTestCases,
  renderDateRangePicker,
} from './DateRangePicker.testutils';
import { DateRangePicker } from '.';

const testToday = newUTC(2023, Month.December, 26);

describe('packages/date-picker/date-range-picker', () => {
  beforeAll(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

  describe('Rendering', () => {
    /// Note: Many rendering tests should be handled by Chromatic

    describe('Input', () => {
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
          value: [
            newUTC(2023, Month.January, 5),
            newUTC(2023, Month.February, 14),
          ],
        });
        expect(inputElements[0].value).toEqual('2023');
        expect(inputElements[1].value).toEqual('01');
        expect(inputElements[2].value).toEqual('05');

        expect(inputElements[3].value).toEqual('2023');
        expect(inputElements[4].value).toEqual('02');
        expect(inputElements[5].value).toEqual('14');
      });

      test('renders `initialStart` & `initialEnd` prop', () => {
        const { inputElements } = renderDateRangePicker({
          initialValue: [
            newUTC(2023, Month.July, 5),
            newUTC(2023, Month.August, 10),
          ],
        });
        expect(inputElements[0].value).toEqual('2023');
        expect(inputElements[1].value).toEqual('07');
        expect(inputElements[2].value).toEqual('05');

        expect(inputElements[3].value).toEqual('2023');
        expect(inputElements[4].value).toEqual('08');
        expect(inputElements[5].value).toEqual('10');
      });
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

      test('renders two calendar grids', () => {
        const { getMenuElements } = renderDateRangePicker({
          initialOpen: true,
        });
        const { calendarGrids } = getMenuElements();
        expect(calendarGrids).toHaveLength(2);
      });

      test('chevrons have correct `aria-label`s', () => {
        const { getMenuElements } = renderDateRangePicker({
          initialOpen: true,
        });
        const { leftChevron, rightChevron } = getMenuElements();
        expect(leftChevron).toHaveAttribute('aria-label', 'Previous month');
        expect(rightChevron).toHaveAttribute('aria-label', 'Next month');
      });

      describe('Displayed month', () => {
        test('if no value is set, menu displays current month', () => {
          const { getMenuElements } = renderDateRangePicker({
            initialOpen: true,
          });
          const { calendarGrids, menuContainerEl } = getMenuElements();

          const headers = menuContainerEl?.querySelectorAll('h6');
          expect(headers?.[0]).toHaveTextContent('December 2023');
          expect(headers?.[1]).toHaveTextContent('January 2024');

          expect(calendarGrids?.[0]).toHaveAttribute(
            'aria-label',
            'December 2023',
          );
          expect(calendarGrids?.[1]).toHaveAttribute(
            'aria-label',
            'January 2024',
          );
        });

        test('if only a start value is set, menu displays the month of that value', () => {
          const { getMenuElements } = renderDateRangePicker({
            initialOpen: true,
            value: [newUTC(2023, Month.March, 10), null],
          });

          const { calendarGrids, menuContainerEl } = getMenuElements();
          const headers = menuContainerEl?.querySelectorAll('h6');
          expect(headers?.[0]).toHaveTextContent('March 2023');
          expect(headers?.[1]).toHaveTextContent('April 2023');
          expect(calendarGrids?.[0]).toHaveAttribute(
            'aria-label',
            'March 2023',
          );
          expect(calendarGrids?.[1]).toHaveAttribute(
            'aria-label',
            'April 2023',
          );
        });

        test('if only an end value is set, menu displays the month _before_ value', () => {
          const { getMenuElements } = renderDateRangePicker({
            initialOpen: true,
            value: [null, newUTC(2023, Month.March, 10)],
          });

          const { calendarGrids, menuContainerEl } = getMenuElements();
          const headers = menuContainerEl?.querySelectorAll('h6');
          expect(headers?.[0]).toHaveTextContent('February 2023');
          expect(headers?.[1]).toHaveTextContent('March 2023');
          expect(calendarGrids?.[0]).toHaveAttribute(
            'aria-label',
            'February 2023',
          );
          expect(calendarGrids?.[1]).toHaveAttribute(
            'aria-label',
            'March 2023',
          );
        });

        test('if a full value is set, menu displays the month of the start value', () => {
          const { getMenuElements } = renderDateRangePicker({
            initialOpen: true,
            value: [
              newUTC(2023, Month.March, 10),
              newUTC(2023, Month.April, 1),
            ],
          });

          const { calendarGrids, menuContainerEl } = getMenuElements();
          const headers = menuContainerEl?.querySelectorAll('h6');
          expect(headers?.[0]).toHaveTextContent('March 2023');
          expect(headers?.[1]).toHaveTextContent('April 2023');
          expect(calendarGrids?.[0]).toHaveAttribute(
            'aria-label',
            'March 2023',
          );
          expect(calendarGrids?.[1]).toHaveAttribute(
            'aria-label',
            'April 2023',
          );
        });

        test('month changes when value changes', () => {
          const { getMenuElements, rerenderWithProps } = renderDateRangePicker({
            initialOpen: true,
          });

          rerenderWithProps({
            value: [
              newUTC(2023, Month.July, 5),
              newUTC(2023, Month.September, 10),
            ],
          });

          const { calendarGrids } = getMenuElements();

          expect(calendarGrids?.[0]).toHaveAttribute('aria-label', 'July 2023');
          expect(calendarGrids?.[1]).toHaveAttribute(
            'aria-label',
            'August 2023',
          );
        });
      });

      test('renders the appropriate number of cells', () => {
        const { getMenuElements } = renderDateRangePicker({
          initialOpen: true,
          value: [newUTC(2024, Month.February, 14), null],
        });
        const { calendarCells } = getMenuElements();
        expect(calendarCells).toHaveLength(29 + 31);
      });

      test('rendered cells have correct `aria-label`', () => {
        const { getMenuElements } = renderDateRangePicker({
          initialOpen: true,
          value: [newUTC(2024, Month.February, 14), null],
        });
        const { calendarCells } = getMenuElements();
        expect(calendarCells[0]).toHaveAttribute(
          'aria-label',
          'Thu Feb 01 2024',
        );
      });

      describe('Quick select menu', () => {
        describe('Month/Year select', () => {
          test('render the correct text', () => {
            const { getMenuElements } = renderDateRangePicker({
              initialOpen: true,
              showQuickSelection: true,
            });
            const { yearSelect, monthSelect } = getMenuElements();
            expect(monthSelect).toHaveTextContent('Dec');
            expect(yearSelect).toHaveTextContent('2023');
          });

          test('have correct `aria-label`s', () => {
            const { getMenuElements } = renderDateRangePicker({
              initialOpen: true,
              showQuickSelection: true,
            });
            const { yearSelect, monthSelect } = getMenuElements();
            expect(monthSelect).toHaveAttribute('aria-label', 'Select month');
            expect(yearSelect).toHaveAttribute('aria-label', 'Select year');
          });

          test('update when the value changes', () => {
            const { getMenuElements, rerenderWithProps } =
              renderDateRangePicker({
                initialOpen: true,
                showQuickSelection: true,
              });

            rerenderWithProps({
              value: [
                newUTC(2024, Month.July, 5),
                newUTC(2024, Month.September, 10),
              ],
            });

            const { yearSelect, monthSelect } = getMenuElements();
            expect(monthSelect).toHaveTextContent('July');
            expect(yearSelect).toHaveTextContent('2024');
          });
        });

        test.each(quickSelectButtonTestCases)(
          'Renders correct label: $label',
          ({ index, label }) => {
            const { getAllByTestId } = renderDateRangePicker({
              initialOpen: true,
              showQuickSelection: true,
            });
            const quickSelectButtons = getAllByTestId(
              'lg-date_picker-menu-quick-range-button',
            );

            expect(quickSelectButtons[index]).toHaveAttribute(
              'aria-label',
              label,
            );
          },
        );
      });
    });
  });

  describe('Interaction', () => {
    describe('Typing', () => {
      test('opens the menu', () => {
        const { inputElements, getMenuElements } = renderDateRangePicker();
        userEvent.type(inputElements[0], '1');
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });

      describe.each([
        ['start', 0],
        ['end', 3],
      ])('into %p input', (input, index) => {
        test('updates segment value', () => {
          const { inputElements } = renderDateRangePicker();
          const element = inputElements[index];
          userEvent.type(element, '1');
          expect(element.value).toBe('1'); // Not '01' if not blurred
        });

        test('does not fire range change handler', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({ onRangeChange });
          const element = inputElements[index];
          userEvent.type(element, '1');
          expect(onRangeChange).not.toHaveBeenCalled();
        });

        test('fires segment change handler', () => {
          const onChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            onChange,
          });
          const element = inputElements[index];
          userEvent.type(element, '1');
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('1'),
          );
        });

        describe('on un-focus/blur', () => {
          test('does not fire a change handler if value is incomplete', () => {
            const onRangeChange = jest.fn();
            const { inputElements } = renderDateRangePicker({ onRangeChange });
            const element = inputElements[index];
            userEvent.type(element, '2023');
            userEvent.tab();
            expect(onRangeChange).not.toHaveBeenCalled();
          });

          test('fires a change handler if the value is valid', () => {
            const onRangeChange = jest.fn();
            const { inputElements } = renderDateRangePicker({ onRangeChange });
            const year = inputElements[index];
            const month = inputElements[index + 1];
            const day = inputElements[index + 2];

            userEvent.type(year, '2023');
            userEvent.type(month, '12');
            userEvent.type(day, '26');
            userEvent.tab();
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([
                expect.objectContaining(newUTC(2023, Month.December, 26)),
              ]),
            );
          });

          test('fires a segment change handler', () => {
            const onChange = jest.fn();
            const { inputElements } = renderDateRangePicker({
              onChange,
            });
            const element = inputElements[index];
            userEvent.type(element, '2023');
            userEvent.tab();
            expect(onChange).toHaveBeenCalledWith(
              eventContainingTargetValue('2023'),
            );
          });

          // eslint-disable-next-line jest/no-disabled-tests
          describe.skip('validation handler', () => {
            test('fired when the value is first set', () => {
              const handleValidation = jest.fn();
              const { inputElements } = renderDateRangePicker({
                handleValidation,
              });
              const year = inputElements[index];
              const month = inputElements[index + 1];
              const day = inputElements[index + 2];
              userEvent.type(year, '2023');
              userEvent.type(month, '12');
              userEvent.type(day, '26');
              userEvent.tab();

              expect(handleValidation).toHaveBeenCalledWith(
                expect.arrayContaining([
                  expect.objectContaining(newUTC(2023, Month.December, 26)),
                ]),
              );
            });

            test('fired when the value is updated', () => {
              const initialStart = newUTC(2023, Month.March, 10);
              const initialEnd = newUTC(2023, Month.December, 26);
              const handleValidation = jest.fn();
              const { inputElements } = renderDateRangePicker({
                value: [initialStart, initialEnd],
                handleValidation,
              });
              const day = inputElements[index + 2];
              userEvent.type(day, '15');

              const expectedValue = expect.arrayContaining([
                input === 'start'
                  ? newUTC(2023, Month.March, 15)
                  : initialStart,
                input === 'end' ? newUTC(2023, Month.December, 15) : initialEnd,
              ]);

              expect(handleValidation).toHaveBeenCalledWith(expectedValue);
            });
          });
        });
      });

      describe('when entering a new value', () => {
        const initialStart = newUTC(2023, Month.September, 2);
        const initialEnd = newUTC(2023, Month.September, 10);

        test('start date is updated', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [initialStart, initialEnd],
            onRangeChange,
          });
          const startMonthInput = inputElements[1];
          userEvent.type(startMonthInput, '{delete}8');
          userEvent.tab();
          expect(onRangeChange).toHaveBeenCalledWith([
            setUTCMonth(initialStart, Month.August),
            initialEnd,
          ]);
        });

        test('end date is updated', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [initialStart, initialEnd],
            onRangeChange,
          });
          const endMonthInput = inputElements[4];
          userEvent.type(endMonthInput, '{delete}10');
          userEvent.tab();
          expect(onRangeChange).toHaveBeenCalledWith([
            initialStart,
            setUTCMonth(initialEnd, Month.October),
          ]);
        });

        test('input is rejected if start date is invalid', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [initialStart, initialEnd],
            onRangeChange,
          });
          const startMonthInput = inputElements[2];
          userEvent.type(startMonthInput, '1');
          userEvent.tab();
          expect(onRangeChange).not.toHaveBeenCalled();
        });

        test('input is rejected if end date is invalid', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [initialStart, initialEnd],
            onRangeChange,
          });
          const endMonthInput = inputElements[4];
          userEvent.type(endMonthInput, '1');
          userEvent.tab();
          expect(onRangeChange).not.toHaveBeenCalled();
        });

        test('input is rejected if start date is after end date', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [initialStart, initialEnd],
            onRangeChange,
          });
          const startDayInput = inputElements[2];
          userEvent.type(startDayInput, '1');
          userEvent.tab();
          expect(onRangeChange).not.toHaveBeenCalled();
        });

        test('input is rejected if end date is before start date', () => {
          const onRangeChange = jest.fn();
          const { inputElements } = renderDateRangePicker({
            value: [
              newUTC(2023, Month.September, 2),
              newUTC(2023, Month.September, 10),
            ],
            onRangeChange,
          });
          const endDayInput = inputElements[5];
          userEvent.type(endDayInput, '{backspace}');
          userEvent.tab();
          expect(onRangeChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('Mouse interaction', () => {
      describe('Input', () => {
        describe('Clicking the input', () => {
          test('opens the menu', () => {
            const { inputContainer, getMenuElements } = renderDateRangePicker();
            userEvent.click(inputContainer);
            const { menuContainerEl } = getMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('focuses the clicked segment', () => {
            const { inputElements } = renderDateRangePicker();
            userEvent.click(inputElements[2]);
            expect(document.activeElement).toBe(inputElements[2]);
          });

          test('focuses the first segment when all are empty (`undefined`)', () => {
            const { inputContainer, inputElements } = renderDateRangePicker();
            userEvent.click(inputContainer);
            expect(document.activeElement).toBe(inputElements[0]);
          });

          test('focuses the first segment when all are empty (`[null, null]`)', () => {
            const { inputContainer, inputElements } = renderDateRangePicker({
              value: [null, null],
            });
            userEvent.click(inputContainer);
            expect(document.activeElement).toBe(inputElements[0]);
          });

          test('focuses the first empty segment in start input', () => {
            const { inputContainer, inputElements } = renderDateRangePicker();
            userEvent.type(inputElements[0], '01');
            userEvent.click(inputContainer);
            expect(document.activeElement).toBe(inputElements[1]);
          });

          test('focuses the first empty segment in end input when start value is set', () => {
            const { inputContainer, inputElements } = renderDateRangePicker({
              value: [newUTC(2023, 1, 1), null],
            });
            userEvent.click(inputContainer);
            expect(document.activeElement).toBe(inputElements[3]);
          });

          test('focuses the last segment when all are filled', () => {
            const { inputContainer, inputElements } = renderDateRangePicker({
              value: [newUTC(2023, 1, 1), newUTC(2023, 1, 14)],
            });
            userEvent.click(inputContainer);
            expect(document.activeElement).toBe(inputElements[5]);
          });
        });

        describe('Clicking the Calendar button', () => {
          test('opens the menu', () => {
            const { calendarButton, getMenuElements } = renderDateRangePicker();
            userEvent.click(calendarButton);
            const { menuContainerEl } = getMenuElements();
            expect(menuContainerEl).toBeInTheDocument();
          });

          test('focuses on the highlighted cell', async () => {
            const { calendarButton, getMenuElements } = renderDateRangePicker();
            userEvent.click(calendarButton);
            const { todayCell } = getMenuElements();
            await waitFor(() => {
              expect(todayCell).toHaveFocus();
            });
          });

          test('initial highlight on `start` value when provided', async () => {
            const { calendarButton, getMenuElements } = renderDateRangePicker({
              value: [newUTC(2023, Month.September, 10), null],
            });
            userEvent.click(calendarButton);
            const { menuContainerEl } = getMenuElements();
            const sep10Cell = within(menuContainerEl!).getByLabelText(
              'Sun Sep 10 2023',
            );
            await waitFor(() => {
              expect(sep10Cell).toHaveFocus();
            });
          });
          test('initial highlight on `end` value when only end provided', async () => {
            const { calendarButton, getMenuElements } = renderDateRangePicker({
              value: [null, newUTC(2023, Month.September, 10)],
            });
            userEvent.click(calendarButton);
            const { menuContainerEl } = getMenuElements();
            const sep10Cell = within(menuContainerEl!).getByLabelText(
              'Sun Sep 10 2023',
            );
            await waitFor(() => {
              expect(sep10Cell).toHaveFocus();
            });
          });
        });
      });

      describe('Basic menu', () => {
        describe('Clicking a calendar cell', () => {
          test('if no value is set, fires a change handler to set the start date', () => {
            const onRangeChange = jest.fn();
            const { openMenu } = renderDateRangePicker({
              value: [null, null],
              onRangeChange,
            });
            const { calendarCells } = openMenu();
            const firstCell = calendarCells[0];
            userEvent.click(firstCell);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([setUTCDate(testToday, 1), null]),
            );
          });

          test('if only start value is set, fires change handler to set the end date', () => {
            const onRangeChange = jest.fn();
            const startDate = newUTC(2023, Month.September, 10);
            const { openMenu } = renderDateRangePicker({
              value: [startDate, null],
              onRangeChange,
            });
            const { calendarCells } = openMenu();
            const lastCell = last(calendarCells);
            userEvent.click(lastCell!);

            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([
                startDate,
                newUTC(2023, Month.October, 31),
              ]),
            );
          });

          test('if only end value is set, fires change handler to set the start date', () => {
            const onRangeChange = jest.fn();
            const endDate = newUTC(2023, Month.September, 10);
            const { openMenu } = renderDateRangePicker({
              value: [null, endDate],
              onRangeChange,
            });
            const { calendarCells } = openMenu();
            const firstCell = calendarCells[0];
            userEvent.click(firstCell);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([newUTC(2023, Month.August, 1), endDate]),
            );
          });

          test('if a full range is set, fires a change handler to set the start date & clear the end date', () => {
            const onRangeChange = jest.fn();
            const startDate = newUTC(2023, Month.September, 10);
            const endDate = newUTC(2023, Month.October, 31);
            const { openMenu } = renderDateRangePicker({
              value: [startDate, endDate],
              onRangeChange,
            });
            const { calendarCells } = openMenu();
            const firstCell = calendarCells[0];
            userEvent.click(firstCell);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([newUTC(2023, Month.September, 1), null]),
            );
          });
        });

        describe('Clicking a Chevron', () => {
          describe('Left', () => {
            test('does not close the menu', () => {
              const { openMenu } = renderDateRangePicker();
              const { leftChevron, menuContainerEl } = openMenu();
              userEvent.click(leftChevron!);
              expect(menuContainerEl).toBeInTheDocument();
            });

            test('updates the displayed month to the previous', () => {
              const { openMenu } = renderDateRangePicker();
              const { leftChevron, menuContainerEl } = openMenu();
              userEvent.click(leftChevron!);
              const monthHeaders = menuContainerEl?.querySelectorAll('h6');
              expect(monthHeaders?.[0]).toHaveTextContent('November 2023');
              expect(monthHeaders?.[1]).toHaveTextContent('December 2023');
            });
          });

          describe('Right', () => {
            test('does not close the menu', () => {
              const { openMenu } = renderDateRangePicker();
              const { rightChevron, menuContainerEl } = openMenu();
              userEvent.click(rightChevron!);
              expect(menuContainerEl).toBeInTheDocument();
            });

            test('updates the displayed month to the next', () => {
              const { openMenu } = renderDateRangePicker();
              const { rightChevron, menuContainerEl } = openMenu();
              userEvent.click(rightChevron!);
              const monthHeaders = menuContainerEl?.querySelectorAll('h6');
              expect(monthHeaders?.[0]).toHaveTextContent('January 2024');
              expect(monthHeaders?.[1]).toHaveTextContent('February 2024');
            });
          });
        });

        describe('Clicking the Apply button', () => {
          test('fires a change handler with the current input value', () => {
            const start = newUTC(2023, Month.April, 1);
            const end = newUTC(2023, Month.July, 5);
            const onRangeChange = jest.fn();
            const { openMenu } = renderDateRangePicker({
              onRangeChange,
              value: [start, end],
            });
            const { applyButton } = openMenu();
            userEvent.click(applyButton!);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([start, end]),
            );
          });

          test('closes menu', async () => {
            const { openMenu } = renderDateRangePicker();
            const { applyButton, menuContainerEl } = openMenu();
            userEvent.click(applyButton!);
            await waitForElementToBeRemoved(menuContainerEl);
            expect(menuContainerEl).not.toBeInTheDocument();
          });
        });

        describe('Clicking the Cancel button', () => {
          test('fires an onCancel handler', () => {
            const start = newUTC(2023, Month.April, 1);
            const end = newUTC(2023, Month.July, 5);
            const onCancel = jest.fn();
            const { inputElements, getMenuElements } = renderDateRangePicker({
              onCancel,
              value: [start, end],
            });
            userEvent.type(inputElements[2], '5');
            const { cancelButton } = getMenuElements();
            userEvent.click(cancelButton!);
            expect(onCancel).toHaveBeenCalled();
          });

          test('fires a change handler with the previous input value', () => {
            const start = newUTC(2023, Month.April, 1);
            const end = newUTC(2023, Month.July, 5);
            const onRangeChange = jest.fn();
            const { inputElements, getMenuElements } = renderDateRangePicker({
              onRangeChange,
              value: [start, end],
            });
            userEvent.type(inputElements[2], '5');
            const { cancelButton } = getMenuElements();
            userEvent.click(cancelButton!);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([start, end]),
            );
          });

          test('closes menu', async () => {
            const { openMenu } = renderDateRangePicker();
            const { cancelButton, menuContainerEl } = openMenu();
            userEvent.click(cancelButton!);
            await waitForElementToBeRemoved(menuContainerEl);
            expect(menuContainerEl).not.toBeInTheDocument();
          });
        });

        describe('Clicking the Clear button', () => {
          test('fires an onClear handler', () => {
            const start = newUTC(2023, Month.April, 1);
            const end = newUTC(2023, Month.July, 5);
            const onClear = jest.fn();
            const { openMenu } = renderDateRangePicker({
              onClear,
              value: [start, end],
            });
            const { clearButton } = openMenu();
            userEvent.click(clearButton!);
            expect(onClear).toHaveBeenCalled();
          });

          test('fires a change handler with the to clear the range values', () => {
            const start = newUTC(2023, Month.April, 1);
            const end = newUTC(2023, Month.July, 5);
            const onRangeChange = jest.fn();
            const { openMenu } = renderDateRangePicker({
              onRangeChange,
              value: [start, end],
            });
            const { clearButton } = openMenu();
            userEvent.click(clearButton!);
            expect(onRangeChange).toHaveBeenCalledWith(
              expect.arrayContaining([null, null]),
            );
          });

          test('does not close the menu', () => {
            const { openMenu } = renderDateRangePicker();
            const { clearButton, menuContainerEl } = openMenu();
            userEvent.click(clearButton!);
            expect(menuContainerEl).toBeInTheDocument();
          });
        });
      });

      describe('Quick Select menu', () => {
        describe('Month select menu', () => {
          test('menu opens over the calendar menu', () => {
            const { openMenu, queryAllByRole } = renderDateRangePicker({
              showQuickSelection: true,
            });
            const { monthSelect, menuContainerEl } = openMenu();
            userEvent.click(monthSelect!);
            expect(menuContainerEl).toBeInTheDocument();
            const listBoxes = queryAllByRole('listbox');
            expect(listBoxes).toHaveLength(2);
          });

          test('selecting the month updates the calendar', async () => {
            const { openMenu, findAllByRole } = renderDateRangePicker({
              showQuickSelection: true,
            });
            const { monthSelect, calendarGrids } = openMenu();
            userEvent.click(monthSelect!);
            const options = await findAllByRole('option');
            const Jan = options[0];
            userEvent.click(Jan);
            expect(calendarGrids?.[0]).toHaveAttribute(
              'aria-label',
              'January 2023',
            );
            expect(calendarGrids?.[1]).toHaveAttribute(
              'aria-label',
              'February 2023',
            );
          });
        });

        describe('Year select menu', () => {
          test('menu opens over the calendar menu', () => {
            const { openMenu, queryAllByRole } = renderDateRangePicker({
              showQuickSelection: true,
            });
            const { yearSelect, menuContainerEl } = openMenu();
            userEvent.click(yearSelect!);
            expect(menuContainerEl).toBeInTheDocument();
            const listBoxes = queryAllByRole('listbox');
            expect(listBoxes).toHaveLength(2);
          });

          test('selecting the year updates the calendar', async () => {
            const { openMenu, findAllByRole } = renderDateRangePicker({
              showQuickSelection: true,
            });
            const { yearSelect, calendarGrids } = openMenu();
            userEvent.click(yearSelect!);
            const options = await findAllByRole('option');
            const _1970 = options[0];
            userEvent.click(_1970);
            expect(calendarGrids?.[0]).toHaveAttribute(
              'aria-label',
              'December 1970',
            );
            expect(calendarGrids?.[1]).toHaveAttribute(
              'aria-label',
              'January 1971',
            );
          });
        });

        describe('Quick range buttons', () => {
          test.each(quickSelectButtonTestCases)(
            '$label button fires the correct change & validation handlers',
            ({ index, expectedRange }) => {
              const onRangeChange = jest.fn();
              const handleValidation = jest.fn();
              const { getAllByTestId } = renderDateRangePicker({
                initialOpen: true,
                showQuickSelection: true,
                onRangeChange,
                handleValidation,
              });
              const quickSelectButtons = getAllByTestId(
                'lg-date_picker-menu-quick-range-button',
              );
              userEvent.click(quickSelectButtons[index]);
              expect(onRangeChange).toHaveBeenCalledWith(expectedRange);
              expect(handleValidation).toHaveBeenCalledWith(expectedRange);
            },
          );

          test('update the displayed calendars', () => {
            const { getAllByTestId, getMenuElements } = renderDateRangePicker({
              initialOpen: true,
              showQuickSelection: true,
            });
            const quickSelectButtons = getAllByTestId(
              'lg-date_picker-menu-quick-range-button',
            );
            const { calendarGrids } = getMenuElements();
            const last90Button = quickSelectButtons[4];
            userEvent.click(last90Button);
            expect(calendarGrids?.[0]).toHaveAttribute(
              'aria-label',
              'September 2023',
            );
            expect(calendarGrids?.[1]).toHaveAttribute(
              'aria-label',
              'October 2023',
            );
          });
        });
      });

      describe('Backdrop', () => {
        test('closes the menu', async () => {
          const { openMenu, container } = renderDateRangePicker();
          const { menuContainerEl } = openMenu();
          userEvent.click(container.parentElement!);
          await waitForElementToBeRemoved(menuContainerEl);
        });

        test('does not fire a change handler', () => {
          const onRangeChange = jest.fn();
          const { openMenu, container } = renderDateRangePicker({
            onRangeChange,
          });
          openMenu();
          userEvent.click(container.parentElement!);
          expect(onRangeChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('Keyboard interaction', () => {
      describe('Tab', () => {
        test('menu does not open on initial input focus', () => {
          const { getMenuElements } = renderDateRangePicker();
          tabNTimes(1);
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('menu does not open on subsequent input focuses', () => {
          const { getMenuElements } = renderDateRangePicker();
          tabNTimes(5);
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('calls validation handler when last segment is unfocused', () => {
          const handleValidation = jest.fn();
          renderDateRangePicker({ handleValidation });
          tabNTimes(8);
          expect(handleValidation).toHaveBeenCalled();
        });

        test('does not call validation handler when changing segment', () => {
          const handleValidation = jest.fn();
          renderDateRangePicker({ handleValidation });
          tabNTimes(1);
          expect(handleValidation).not.toHaveBeenCalled();
        });

        // TODO: Repeat these tests for values:
        // `undefined`, `[null, null]` & `[Date, Date]`
        describe('Tab order', () => {
          describe('when menu is closed', () => {
            const tabStops = expectedTabStopLabels['closed'];

            test('Tab order proceeds as expected', () => {
              const renderResult = renderDateRangePicker();

              for (const label of tabStops) {
                const element = getTabStopElementMap(renderResult)[label];

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

          describe('when basic menu is open', () => {
            const tabStops = expectedTabStopLabels['basic']; // array of label strings

            test(`Tab order proceeds as expected`, () => {
              const renderResult = renderDateRangePicker({
                showQuickSelection: false,
              });
              renderResult.openMenu();

              for (const label of tabStops) {
                const element = getTabStopElementMap(renderResult)[label];
                expect(element).toHaveFocus();
                userEvent.tab();
              }
            });
          });

          describe('when quick-select menu is open', () => {
            const tabStops = expectedTabStopLabels['quick-select'];

            test(`Tab order proceeds as expected`, () => {
              const renderResult = renderDateRangePicker({
                showQuickSelection: true,
              });
              renderResult.openMenu();

              for (const label of tabStops) {
                const element = getTabStopElementMap(renderResult)[label];
                expect(element).toHaveFocus();
                userEvent.tab();
              }
            });
          });
        });
      });

      describe('Enter key', () => {
        test('if menu is closed, does not open the menu', () => {
          const { getMenuElements } = renderDateRangePicker();
          userEvent.tab();
          userEvent.keyboard('{enter}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('opens menu if calendar button is focused', () => {
          const { getMenuElements } = renderDateRangePicker();
          tabNTimes(7);
          userEvent.keyboard('{enter}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('calls validation handler', () => {
          const handleValidation = jest.fn();
          renderDateRangePicker({
            handleValidation,
          });
          tabNTimes(2);
          userEvent.keyboard('{enter}');
          expect(handleValidation).toHaveBeenCalled();
        });

        test('if a cell is focused, fires a change handler', () => {
          const onRangeChange = jest.fn();
          const { openMenu } = renderDateRangePicker({ onRangeChange });
          const { todayCell } = openMenu();
          tabNTimes(7);
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{enter}');
          expect(onRangeChange).toHaveBeenCalled();
        });

        test('if a cell is focused, closes the menu', async () => {
          const { openMenu } = renderDateRangePicker();
          const { todayCell, menuContainerEl } = openMenu();
          tabNTimes(7);
          expect(todayCell).toHaveFocus();
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('if a Chevron is focused, updates the displayed month', () => {
          const { openMenu } = renderDateRangePicker();
          const { leftChevron, menuContainerEl } = openMenu();
          tabNTimes(11);
          expect(leftChevron).toHaveFocus();
          userEvent.keyboard('{enter}');
          const monthHeaders = menuContainerEl?.querySelectorAll('h6');
          expect(monthHeaders?.[0]).toHaveTextContent('November 2023');
          expect(monthHeaders?.[1]).toHaveTextContent('December 2023');
        });

        test('if Quick Select button is clicked, fires change handler', () => {
          const onRangeChange = jest.fn();
          const { openMenu } = renderDateRangePicker({
            showQuickSelection: true,
            onRangeChange,
          });
          const { quickRangeButtons } = openMenu();
          tabNTimes(13);
          expect(quickRangeButtons?.[0]).toHaveFocus();
          userEvent.keyboard('{enter}');
          expect(onRangeChange).toHaveBeenCalled(); // TODO: with
        });

        test('if month/year select is focused, opens the select menu', () => {
          const { openMenu, queryAllByRole } = renderDateRangePicker({
            showQuickSelection: true,
          });
          const { monthSelect } = openMenu();
          tabNTimes(11);
          expect(monthSelect).toHaveFocus();
          userEvent.keyboard('{enter}');
          const listBoxes = queryAllByRole('listbox');
          expect(listBoxes).toHaveLength(2);
        });
      });

      describe('Escape key', () => {
        test('closes the menu', async () => {
          const { openMenu } = renderDateRangePicker();
          const { menuContainerEl } = openMenu();
          userEvent.keyboard('{escape}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('does not fire a change handler', () => {
          const onRangeChange = jest.fn();
          const { openMenu } = renderDateRangePicker({ onRangeChange });
          openMenu();
          userEvent.keyboard('{escape}');
          expect(onRangeChange).not.toHaveBeenCalled();
        });

        test('fires a validation handler', async () => {
          const handleValidation = jest.fn();
          const { openMenu } = renderDateRangePicker({
            handleValidation,
            value: [null, null],
          });
          openMenu();
          userEvent.tab();
          userEvent.keyboard('{escape}');
          await waitFor(() => {
            expect(handleValidation).toHaveBeenCalledWith([null, null]);
          });
        });

        test('focus remains in the input element', () => {
          const handleValidation = jest.fn();
          const { openMenu, inputContainer } = renderDateRangePicker({
            handleValidation,
          });
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
    });
  });
});
