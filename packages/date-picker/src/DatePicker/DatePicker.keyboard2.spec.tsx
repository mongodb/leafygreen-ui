import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import {
  eventContainingTargetValue,
  tabNTimes,
} from '@leafygreen-ui/testing-lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { renderDatePicker } from './DatePicker.testutils';

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

describe('DatePicker keyboard interaction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('focuses the current value', () => {
    test("when month returns to value's month", async () => {
      const { openMenu, findAllByRole } = renderDatePicker({
        value: testToday,
      });

      const { queryCellByDate, monthSelect } = await openMenu();
      expect(queryCellByDate(testToday)).toHaveFocus();

      let options: Array<HTMLElement>;

      userEvent.click(monthSelect!);
      options = await findAllByRole('option');
      const _jan = options[0];
      userEvent.click(_jan);
      userEvent.click(monthSelect!);
      options = await findAllByRole('option');
      const _dec = options[11];
      userEvent.click(_dec);
      tabNTimes(2);
      expect(queryCellByDate(testToday)).toHaveFocus();
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
      tabNTimes(3);
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
    test.todo('within a form, does not submit form');
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
      const { openMenu, queryAllByRole, findAllByRole } = renderDatePicker();
      const { monthSelect, menuContainerEl } = await openMenu();

      tabNTimes(3);
      expect(monthSelect).toHaveFocus();

      userEvent.keyboard('[Enter]');
      await waitFor(() => {
        jest.advanceTimersByTime(transitionDuration.default);
      });

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

  describe('Backspace key', () => {
    test('fires segment change handler after typing a value', () => {
      const onChange = jest.fn();
      const { dayInput } = renderDatePicker({ onChange });
      userEvent.type(dayInput, '26{backspace}');
      expect(onChange).toHaveBeenCalledWith(eventContainingTargetValue(''));
    });

    test('resets the input', () => {
      const { dayInput } = renderDatePicker();
      userEvent.type(dayInput, '26{backspace}');
      expect(dayInput.value).toBe('');
    });

    test('keeps the focus in the current input', () => {
      const { monthInput } = renderDatePicker();
      userEvent.type(monthInput, '11');
      userEvent.type(monthInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });

    test('focuses the previous segment after pressing backspace twice', () => {
      const { monthInput, yearInput } = renderDatePicker();
      userEvent.type(monthInput, '11');
      userEvent.type(monthInput, '{backspace}{backspace}');
      expect(yearInput).toHaveFocus();
    });

    test('focuses the previous segment if current segment is empty', () => {
      const { yearInput, monthInput } = renderDatePicker();
      userEvent.type(monthInput, '{backspace}');
      expect(yearInput).toHaveFocus();
    });
  });
});
