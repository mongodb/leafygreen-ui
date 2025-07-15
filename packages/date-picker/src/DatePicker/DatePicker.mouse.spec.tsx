import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import {
  mockTimeZone,
  testTimeZones,
  undefinedTZ,
} from '@leafygreen-ui/date-utils/testing';

import { renderDatePicker } from './DatePicker.testutils';

/**
 * There are HUNDREDS of tests for this component.
 * To keep things organized we've attempted to adopt the following testing philosophy.
 *
 * Rendering Tests:
 * Tests that assert that certain elements are rendered to the DOM.
 * These tests should not have any user interaction (except when absolutely necessary to arrive in a certain state)
 * These tests should exist on each sub-component to simplify test suites
 *
 * Interaction tests:
 * Tests that assert some behavior following user interaction.
 * Generally, this type of tests should _only_ exist in a test file for user-facing components.
 */

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

describe('DatePicker mouse interaction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

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
      const { inputContainer, dayInput, waitForMenuToOpen } = renderDatePicker({
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

    describe.each([testTimeZones])(
      'when system time is in $tz',
      ({ tz, UTCOffset }) => {
        describe.each([undefinedTZ, ...testTimeZones])(
          'and timeZone prop is $tz',
          props => {
            const offset = props.UTCOffset ?? UTCOffset;
            const dec24Local = newUTC(
              2023,
              Month.December,
              24,
              23 - offset,
              59,
            );
            const dec24ISO = '2023-12-24';

            beforeEach(() => {
              jest.setSystemTime(dec24Local);
              mockTimeZone(tz, UTCOffset);
            });
            afterEach(() => {
              jest.restoreAllMocks();
            });

            describe('if no value is set', () => {
              test('default focus (highlight) is on `today`', async () => {
                const { calendarButton, waitForMenuToOpen } = renderDatePicker({
                  timeZone: props.tz,
                });
                userEvent.click(calendarButton);
                const { queryCellByISODate } = await waitForMenuToOpen();
                expect(queryCellByISODate(dec24ISO)).toHaveFocus();
              });

              test('menu opens to current month', async () => {
                const { calendarButton, waitForMenuToOpen } = renderDatePicker({
                  timeZone: props.tz,
                });
                userEvent.click(calendarButton);
                const { calendarGrid, monthSelect, yearSelect } =
                  await waitForMenuToOpen();
                expect(calendarGrid).toHaveAttribute(
                  'aria-label',
                  'December 2023',
                );
                expect(monthSelect).toHaveTextContent('Dec');
                expect(yearSelect).toHaveTextContent('2023');
              });
            });

            describe('when `value` is set', () => {
              test('focus (highlight) starts on current value', async () => {
                const testValue = newUTC(2024, Month.September, 10);
                const { calendarButton, waitForMenuToOpen } = renderDatePicker({
                  value: testValue,
                  timeZone: props.tz,
                });
                userEvent.click(calendarButton);
                const { queryCellByISODate } = await waitForMenuToOpen();
                expect(queryCellByISODate('2024-09-10')).toHaveFocus();
              });

              test('menu opens to the month of that `value`', async () => {
                const testValue = newUTC(2024, Month.September, 10);
                const { calendarButton, waitForMenuToOpen } = renderDatePicker({
                  value: testValue,
                  timeZone: props.tz,
                });
                userEvent.click(calendarButton);
                const { calendarGrid, monthSelect, yearSelect } =
                  await waitForMenuToOpen();

                expect(calendarGrid).toHaveAttribute(
                  'aria-label',
                  'September 2024',
                );
                expect(monthSelect).toHaveTextContent('Sep');
                expect(yearSelect).toHaveTextContent('2024');
              });
            });
          },
        );
      },
    );

    describe('if `value` is not valid', () => {
      test('focus (highlight) starts on chevron button', async () => {
        const testValue = newUTC(2100, Month.July, 4);
        const { calendarButton, waitForMenuToOpen } = renderDatePicker({
          value: testValue,
        });
        userEvent.click(calendarButton);
        const { leftChevron } = await waitForMenuToOpen();
        expect(leftChevron).toHaveFocus();
      });

      test('menu opens to the month of that `value`', async () => {
        const testValue = newUTC(2100, Month.July, 4);
        const { calendarButton, waitForMenuToOpen } = renderDatePicker({
          value: testValue,
        });
        userEvent.click(calendarButton);
        const { calendarGrid, monthSelect, yearSelect } =
          await waitForMenuToOpen();

        expect(calendarGrid).toHaveAttribute('aria-label', 'July 2100');
        expect(monthSelect).toHaveTextContent('Jul');
        expect(yearSelect).toHaveTextContent('2100');
      });
    });
  });

  describe('Clicking a Calendar cell', () => {
    test('closes the menu', async () => {
      const { openMenu } = renderDatePicker({});
      const { calendarCells, menuContainerEl } = await openMenu();
      const firstCell = calendarCells?.[0];
      userEvent.click(firstCell!);
      await waitForElementToBeRemoved(menuContainerEl);
    });

    describe.each(testTimeZones)(
      'when system time is in $tz',
      ({ tz, UTCOffset }) => {
        beforeEach(() => {
          mockTimeZone(tz, UTCOffset);
        });
        afterEach(() => {
          jest.restoreAllMocks();
        });

        test('fires a change handler', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(onDateChange).toHaveBeenCalledWith(
            newUTC(2023, Month.December, 1),
          );
        });

        test('fires a validation handler', async () => {
          const handleValidation = jest.fn();
          const { openMenu } = renderDatePicker({
            handleValidation,
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          userEvent.click(firstCell!);
          expect(handleValidation).toHaveBeenCalledWith(
            newUTC(2023, Month.December, 1),
          );
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

        test('does nothing if the cell is out-of-range', async () => {
          const onDateChange = jest.fn();
          const { openMenu } = renderDatePicker({
            onDateChange,
            value: new Date(Date.UTC(2023, Month.September, 15)),
            min: new Date(Date.UTC(2023, Month.September, 10)),
          });
          const { calendarCells } = await openMenu();
          const firstCell = calendarCells?.[0];
          expect(firstCell).toHaveAttribute('aria-disabled', 'true');
          userEvent.click(firstCell!, {}, { skipPointerEventsCheck: true });
          expect(onDateChange).not.toHaveBeenCalled();
        });
      },
    );
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

      test('updates the displayed month to the max month and year when the value is after the max', async () => {
        const { openMenu } = renderDatePicker({
          max: newUTC(2022, Month.January, 5),
          value: newUTC(2023, Month.January, 5),
        });
        const { leftChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2023');
        userEvent.click(leftChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'January 2022');
        expect(monthSelect).toHaveValue(Month.January.toString());
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

      test('updates the displayed month to the min month and year when the value is before the min ', async () => {
        const { openMenu } = renderDatePicker({
          min: newUTC(2023, Month.December, 26),
          value: newUTC(2022, Month.November, 26),
        });
        const { rightChevron, monthSelect, yearSelect, calendarGrid } =
          await openMenu();
        expect(calendarGrid).toHaveAttribute('aria-label', 'November 2022');
        userEvent.click(rightChevron!);
        expect(calendarGrid).toHaveAttribute('aria-label', 'December 2023');
        expect(monthSelect).toHaveValue(Month.December.toString());
        expect(yearSelect).toHaveValue('2023');
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
