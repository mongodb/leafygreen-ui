import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import range from 'lodash/range';

import { Month } from '../constants';
import { eventContainingTargetValue } from '../testUtils';
import { newUTC } from '../utils';

import { renderDateRangePicker } from './DateRangePicker.testutils';
import { DateRangePicker } from '.';

const testToday = newUTC(2023, Month.December, 26);

describe('packages/date-picker/date-range-picker', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

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
          value: [newUTC(2023, Month.March, 10), null],
        });
        const { calendarGrids } = openMenu();
        expect(calendarGrids?.[0]).toHaveAttribute('aria-label', 'March 2023');
      });

      test('renders the appropriate number of cells', () => {
        const { openMenu } = renderDateRangePicker({
          value: [newUTC(2024, Month.February, 14), null],
        });
        const { calendarCells } = openMenu();
        expect(calendarCells).toHaveLength(29 + 31);
      });
    });
  });

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
        expect(onChange).toHaveBeenCalledWith(eventContainingTargetValue('1'));
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
              input === 'start' ? newUTC(2023, Month.March, 15) : initialStart,
              input === 'end' ? newUTC(2023, Month.December, 15) : initialEnd,
            ]);

            expect(handleValidation).toHaveBeenCalledWith(expectedValue);
          });
        });
      });
    });
  });

  describe('Interaction', () => {
    describe('Mouse interaction', () => {
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

        test('focuses the first segment when all are empty', () => {
          const { inputContainer, inputElements } = renderDateRangePicker();
          userEvent.click(inputContainer);
          expect(document.activeElement).toBe(inputElements[0]);
        });

        test('focuses the first empty segment in start input', () => {
          const { inputContainer, inputElements } = renderDateRangePicker();
          userEvent.type(inputElements[0], '01');
          userEvent.click(inputContainer);
          expect(document.activeElement).toBe(inputElements[1]);
        });

        test('focuses the first empty segment in end input', () => {
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

      describe('Clicking a calendar cell', () => {
        test.todo(
          'if no value is set, fires a change handler for the start date',
        );
        test.todo(
          'if only start value is set, fires change handler for the end date',
        );
        test.todo(
          'if only end value is set, fires change handler for the start date',
        );

        describe('if a full range is set', () => {
          test.todo('fires a change handler for start date');
          test.todo('fires a change handler to clear the end date');
        });
      });

      describe('Clicking the Apply button', () => {
        test.todo('fires a change handler with the current input value');
      });

      describe('Clicking the Cancel button', () => {
        test.todo('fires an onCancel handler');
        test.todo('fires a change handler with the previous input value');
      });

      describe('Clicking the Clear button', () => {
        test.todo('fires an onClear handler');
        test.todo('fires a change handler with the to clear the range values');
      });

      describe('Clicking a Chevron', () => {
        describe('Left', () => {
          test.todo('does not close the menu');

          test.todo('updates the displayed month to the previous');

          test.todo(
            'updates the displayed month to the previous, and updates year',
          );
        });

        describe('Right', () => {
          test.todo('does not close the menu');

          test.todo('updates the displayed month to the next');

          test.todo('updates the displayed month to the next and updates year');
        });
      });

      describe('Month select menu', () => {
        test.todo('menu opens over the calendar menu');

        test.todo('selecting the month updates the calendar');
      });

      describe('Year select menu', () => {
        test.todo('menu opens over the calendar menu');

        test.todo('selecting the year updates the calendar');
      });

      describe('Clicking backdrop', () => {
        test.todo('closes the menu');
        test.todo('does not fire a change handler');
      });
    });

    describe('Keyboard interaction', () => {
      describe('Tab', () => {
        test.todo('menu does not open on initial focus');

        const closedTabStops = 3 + 3 + 1; // start + end + button
        const basicMenuTabStops = closedTabStops + 3; // chevrons + cell
        const quickSelectTabStops = basicMenuTabStops + 2 + 7; // selects + quick select buttons

        describe('Tab order', () => {
          describe.each(range(0, closedTabStops))('when menu is closed', n => {
            test.todo(`Tab ${n} times`);
          });

          describe.each(range(0, basicMenuTabStops))(
            'when basic menu is open',
            n => {
              test.todo(`Tab ${n} times`);
            },
          );

          describe.each(range(0, quickSelectTabStops))(
            'when quick select menu is open',
            n => {
              test.todo(`Tab ${n} times`);
            },
          );
        });

        test.todo('calls validation handler when last segment is unfocused');
        test.todo('does not call validation handler when changing segment');
      });

      describe('Enter key', () => {
        test.todo('if menu is closed, does not open the menu');
        test.todo('opens menu if calendar button is focused');
        test.todo('calls validation handler');
        test.todo('if month/year select is focused, opens the select menu');
        test.todo('if a cell is focused, fires a change handler');
        test.todo('if a cell is focused, closes the menu');
        test.todo('if a Chevron is focused, updates the displayed month');
        test.todo('if Quick Select button is clicked, fires change handler');
      });

      describe('Escape key', () => {
        test.todo('closes the menu');
        test.todo('does not fire a change handler');
        test.todo('fires a validation handler');
        test.todo('focus remains in the input element');
      });

      /**
       * Arrow Keys:
       * Since arrow key behavior changes based on whether the input or menu is focused,
       * many of these tests exist in the "DatePickerInput" and "DatePickerMenu" components
       */
    });
  });
});
