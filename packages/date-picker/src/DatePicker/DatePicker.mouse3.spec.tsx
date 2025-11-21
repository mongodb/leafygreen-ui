import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { renderDatePicker } from './DatePicker.testutils';

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
  afterAll(() => {
    jest.useRealTimers();
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
