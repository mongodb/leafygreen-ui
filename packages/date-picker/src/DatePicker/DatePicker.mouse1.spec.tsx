import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import {
  mockTimeZone,
  testTimeZones,
  undefinedTZ,
} from '@leafygreen-ui/date-utils/testing';

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
});
