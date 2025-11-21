import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';
import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
import { tabNTimes } from '@leafygreen-ui/testing-lib';

import {
  expectedTabStopLabels,
  findTabStopElementMap,
  renderDatePicker,
} from './DatePicker.testutils';

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

const lgFormFieldIds = getLgFormFieldIds();

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
  afterAll(() => {
    jest.useRealTimers();
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
                renderResult.inputContainer.contains(document.activeElement),
              ).toBeFalsy();
            }

            const errorElement = renderResult.queryByTestId(
              lgFormFieldIds.errorMessage,
            );

            await waitFor(() => expect(errorElement).not.toBeInTheDocument());
            userEvent.tab();
          }
        });
      });

      describe('when menu is open with en-US format', () => {
        const tabStops = expectedTabStopLabels['openENUSFormat'];

        test(`Tab order proceeds as expected`, async () => {
          const renderResult = renderDatePicker({
            initialOpen: true,
            locale: SupportedLocales.en_US,
          });

          for (const label of tabStops) {
            const elementMap = await findTabStopElementMap(renderResult);
            const element = elementMap[label];

            if (element !== null) {
              expect(element).toHaveFocus();
            } else {
              expect(
                renderResult.inputContainer.contains(document.activeElement),
              ).toBeFalsy();
            }

            const errorElement = renderResult.queryByTestId(
              lgFormFieldIds.errorMessage,
            );

            await waitFor(() => expect(errorElement).not.toBeInTheDocument());

            userEvent.tab();
            // There are side-effects triggered on CSS transition-end events.
            // Fire this event here to ensure these side-effects don't impact Tab order
            if (element) fireEvent.transitionEnd(element);
          }
        });
      });

      describe('when menu is open with iso-8601 format', () => {
        const tabStops = expectedTabStopLabels['openISOFormat'];

        test(`Tab order proceeds as expected`, async () => {
          const renderResult = renderDatePicker({
            initialOpen: true,
            locale: SupportedLocales.ISO_8601,
          });

          for (const label of tabStops) {
            const elementMap = await findTabStopElementMap(renderResult);
            const element = elementMap[label];

            if (element !== null) {
              expect(element).toHaveFocus();
            } else {
              expect(
                renderResult.inputContainer.contains(document.activeElement),
              ).toBeFalsy();
            }

            const errorElement = renderResult.queryByTestId(
              lgFormFieldIds.errorMessage,
            );

            await waitFor(() => expect(errorElement).not.toBeInTheDocument());

            userEvent.tab();
            // There are side-effects triggered on CSS transition-end events.
            // Fire this event here to ensure these side-effects don't impact Tab order
            if (element) fireEvent.transitionEnd(element);
          }
        });
      });
    });
  });
});
