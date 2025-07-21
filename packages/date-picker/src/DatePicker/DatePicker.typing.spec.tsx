import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';
import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
import { eventContainingTargetValue } from '@leafygreen-ui/testing-lib';

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

const lgFormFieldIds = getLgFormFieldIds();

describe('DatePicker typing interaction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
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

    describe('into a single segment', () => {
      test('does not fire a value change handler', async () => {
        const onDateChange = jest.fn();
        const { yearInput } = renderDatePicker({
          onDateChange,
        });
        userEvent.type(yearInput, '2023');
        await waitFor(() => expect(onDateChange).not.toHaveBeenCalled());
      });

      test('does not fire a validation handler', async () => {
        const handleValidation = jest.fn();
        const { yearInput } = renderDatePicker({
          handleValidation,
        });
        userEvent.type(yearInput, '2023');
        await waitFor(() => expect(handleValidation).not.toHaveBeenCalled());
      });

      test('fires a segment change handler', async () => {
        const onChange = jest.fn();
        const { yearInput } = renderDatePicker({
          onChange,
        });
        userEvent.type(yearInput, '2023');
        await waitFor(() =>
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('2023'),
          ),
        );
      });

      test('does not immediately format the segment (year)', async () => {
        const onChange = jest.fn();
        const { yearInput } = renderDatePicker({ onChange });
        userEvent.type(yearInput, '20');
        await waitFor(() => {
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('20'),
          );
          expect(yearInput.value).toBe('20');
        });
      });

      test('does not immediately format the segment (day)', async () => {
        const onChange = jest.fn();
        const { dayInput } = renderDatePicker({ onChange });
        userEvent.type(dayInput, '2');
        await waitFor(() => {
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('2'),
          );
          expect(dayInput.value).toBe('2');
        });
      });

      test('allows typing multiple digits', async () => {
        const onChange = jest.fn();
        const { dayInput } = renderDatePicker({ onChange });
        userEvent.type(dayInput, '26');
        await waitFor(() => {
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('26'),
          );
          expect(dayInput.value).toBe('26');
        });
      });

      describe('typing space', () => {
        describe('single space', () => {
          describe('does not fire a segment value change', () => {
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

              const { yearInput, monthInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '2023{space}');
              expect(yearInput.value).toBe('2023');
              expect(monthInput).toHaveFocus();
            });

            test('between a value', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '202{space}3');
              expect(yearInput.value).toBe('3');
            });

            test('in multiple spots', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '2{space}0{space}2{space}3{space}');
              expect(yearInput.value).toBe('');
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
            test('when there is no value', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '{space}{space}');
              expect(onChange).not.toHaveBeenCalled();
            });
          });

          describe('fires a segment value change', () => {
            test('when typing another digit', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '{space}{space}2');
              expect(onChange).toHaveBeenCalledWith(
                eventContainingTargetValue('2'),
              );
            });

            test('when the value prop is set', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
                value: newUTC(2023, Month.December, 25),
              });
              userEvent.type(yearInput, '{space}{space}');
              expect(yearInput.value).toBe('');
              expect(onChange).toHaveBeenCalled();
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

              const { yearInput, monthInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '2023{space}{space}');
              expect(yearInput.value).toBe('2023');
              expect(monthInput).toHaveFocus();
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
              expect(yearInput.value).toBe('');
            });

            test('between a value', () => {
              const onChange = jest.fn();

              const { yearInput } = renderDatePicker({
                onChange,
              });
              userEvent.type(yearInput, '202{space}{space}3');
              expect(yearInput.value).toBe('3');
            });
          });
        });
      });

      describe('auto-formatting & auto-focus', () => {
        describe('for ISO format', () => {
          const locale = SupportedLocales.ISO_8601;

          test('when year value is explicit, focus advances to month', () => {
            const { yearInput, monthInput } = renderDatePicker({
              locale,
            });
            userEvent.type(yearInput, '1999');
            expect(monthInput).toHaveFocus();
          });
          test('when year value is before MIN, focus still advances', () => {
            const { yearInput, monthInput } = renderDatePicker({
              locale,
            });
            userEvent.type(yearInput, '1944');
            expect(monthInput).toHaveFocus();
          });
          test('when year value is after MAX, focus still advances', () => {
            const { yearInput, monthInput } = renderDatePicker({
              locale,
            });
            userEvent.type(yearInput, '2048');
            expect(monthInput).toHaveFocus();
          });
          test('when month value is explicit, focus advances to day', () => {
            const { monthInput, dayInput } = renderDatePicker({
              locale,
            });
            userEvent.type(monthInput, '5');
            expect(dayInput).toHaveFocus();
          });
          test('when day value is explicit, format the day', async () => {
            const { dayInput } = renderDatePicker({
              locale,
            });
            userEvent.type(dayInput, '5');
            expect(dayInput).toHaveFocus();
            await waitFor(() => expect(dayInput).toHaveValue('05'));
          });

          test('when year value is ambiguous, focus does NOT advance', () => {
            const { yearInput } = renderDatePicker({ locale });
            userEvent.type(yearInput, '200');
            expect(yearInput).toHaveFocus();
          });
          test('when month value is ambiguous, focus does NOT advance', () => {
            const { monthInput } = renderDatePicker({
              locale,
            });
            userEvent.type(monthInput, '1');
            expect(monthInput).toHaveFocus();
          });
          test('when day value is ambiguous, segment is NOT formatted', async () => {
            const { dayInput } = renderDatePicker({
              locale,
            });
            userEvent.type(dayInput, '2');
            expect(dayInput).toHaveFocus();
            await waitFor(() => expect(dayInput).toHaveValue('2'));
          });

          test('when day value is explicit, segment is formatted', async () => {
            const { dayInput } = renderDatePicker({
              locale,
            });
            userEvent.type(dayInput, '26');
            expect(dayInput).toHaveFocus();
            await waitFor(() => expect(dayInput).toHaveValue('26'));
          });
        });

        describe('for en-US format', () => {
          const locale = SupportedLocales.en_US;

          test('when month value is explicit, focus advances to day', () => {
            const { monthInput, dayInput } = renderDatePicker({
              locale,
            });
            userEvent.type(monthInput, '5');
            expect(dayInput).toHaveFocus();
          });
          test('when day value is explicit, focus advances to year', () => {
            const { dayInput, yearInput } = renderDatePicker({
              locale,
            });
            userEvent.type(dayInput, '5');
            expect(yearInput).toHaveFocus();
          });
          test('when year value is explicit, segment value is set', () => {
            const { yearInput } = renderDatePicker({
              locale,
            });
            userEvent.type(yearInput, '1999');
            expect(yearInput).toHaveFocus();
            expect(yearInput).toHaveValue('1999');
          });

          test('when month value is ambiguous, focus does NOT advance', () => {
            const { monthInput } = renderDatePicker({ locale });
            userEvent.type(monthInput, '1');
            expect(monthInput).toHaveFocus();
          });
          test('when day value is ambiguous, focus does NOT advance', () => {
            const { dayInput } = renderDatePicker({ locale });
            userEvent.type(dayInput, '2');
            expect(dayInput).toHaveFocus();
          });
          test('when year value is ambiguous, segment does not format', async () => {
            const { yearInput } = renderDatePicker({
              locale,
            });
            userEvent.type(yearInput, '200');
            expect(yearInput).toHaveFocus();
            await waitFor(() => expect(yearInput).toHaveValue('200'));
          });
        });
      });
    });

    describe('typing a full date value', () => {
      describe('if the date is valid', () => {
        test('fires value change handler for explicit values', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2003');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');

          await waitFor(() =>
            expect(onDateChange).toHaveBeenCalledWith(
              expect.objectContaining(newUTC(2003, Month.December, 26)),
            ),
          );
        });

        test('does not fire value change handler for ambiguous values', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2003');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '2');

          await waitFor(() => expect(onDateChange).not.toHaveBeenCalled());
        });

        test('properly renders the input', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2003');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '26');
          await waitFor(() => {
            expect(yearInput).toHaveValue('2003');
            expect(monthInput).toHaveValue('12');
            expect(dayInput).toHaveValue('26');
          });
        });
      });

      describe('if the value is not a valid date', () => {
        // E.g. Feb 31 2020
        test('the input is rendered with the typed date', async () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '02');
          userEvent.type(dayInput, '31');
          await waitFor(() => {
            expect(yearInput).toHaveValue('2020');
            expect(monthInput).toHaveValue('02');
            expect(dayInput).toHaveValue('31');
          });
        });

        test('an error is displayed', () => {
          const {
            yearInput,
            monthInput,
            dayInput,
            inputContainer,
            queryByTestId,
          } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '02');
          userEvent.type(dayInput, '31');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent(
            '2020-02-31 is not a valid date',
          );
        });
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

        test('properly renders input if value is after MAX', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2048');
          userEvent.type(monthInput, '12');
          userEvent.type(dayInput, '23');

          await waitFor(() => {
            expect(yearInput).toHaveValue('2048');
            expect(monthInput).toHaveValue('12');
            expect(dayInput).toHaveValue('23');
          });
        });

        test('fire a value change handler if value is before MIN', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '1969');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '20');
          await waitFor(() =>
            expect(onDateChange).toHaveBeenCalledWith(
              expect.objectContaining(newUTC(1969, Month.July, 20)),
            ),
          );
        });

        test('properly renders input if value is before MIN', async () => {
          const onDateChange = jest.fn();
          const { yearInput, monthInput, dayInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '1969');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '20');
          await waitFor(() => {
            expect(yearInput).toHaveValue('1969');
            expect(monthInput).toHaveValue('07');
            expect(dayInput).toHaveValue('20');
          });
        });
      });
    });

    describe('updating a segment', () => {
      describe('backspace', () => {
        test('clearing the segment updates the input', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          userEvent.type(yearInput, '{backspace}');
          expect(yearInput).toHaveValue('');
        });

        test('keeps the focus inside the segment if it is not empty', () => {
          const { monthInput } = renderDatePicker({});

          userEvent.type(monthInput, '0');
          userEvent.type(monthInput, '{backspace}');

          expect(monthInput).toHaveValue('');
          expect(monthInput).toHaveFocus();
        });

        test('moves the focus to the next segment', () => {
          const { yearInput, monthInput } = renderDatePicker({});

          userEvent.type(monthInput, '0');
          userEvent.type(monthInput, '{backspace}{backspace}');

          expect(monthInput).toHaveValue('');
          expect(yearInput).toHaveFocus();
        });

        test('clearing and typing a new value does not format the input', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          userEvent.type(yearInput, '{backspace}');
          userEvent.type(yearInput, '2');
          expect(yearInput).toHaveValue('2');
        });

        test('deleting characters does not format the segment', () => {
          const { yearInput, monthInput, dayInput } = renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '7');
          userEvent.type(dayInput, '4');

          userEvent.type(yearInput, '{backspace}');
          expect(yearInput).toHaveValue('');
        });
      });

      describe('typing new characters', () => {
        test('updates the value', async () => {
          const { monthInput } = renderDatePicker({});
          userEvent.type(monthInput, '1');
          userEvent.tab();
          await waitFor(() => expect(monthInput).toHaveValue('01'));
          userEvent.type(monthInput, '2');
          await waitFor(() => expect(monthInput).toHaveValue('02'));
        });

        test('if the resulting value is incomplete and invalid, clears the input', async () => {
          const { monthInput } = renderDatePicker({});
          userEvent.type(monthInput, '0');
          userEvent.tab();
          await waitFor(() => expect(monthInput).toHaveValue(''));
        });

        test('if the resulting value is invalid, formats the first digit and the second digit is inputted into the next input', async () => {
          const { monthInput, dayInput } = renderDatePicker({});
          userEvent.type(monthInput, '32');
          await waitFor(() => {
            expect(monthInput).toHaveValue('03');
            expect(dayInput).toHaveValue('2');
          });
        });
      });
    });

    describe('on segment un-focus/blur', () => {
      test('fires a segment change handler', () => {
        const onChange = jest.fn();
        const { yearInput } = renderDatePicker({ onChange });
        userEvent.type(yearInput, '2023');
        userEvent.tab();
        expect(onChange).toHaveBeenCalledWith(
          eventContainingTargetValue('2023'),
        );
      });

      test('formats the segment', () => {
        const onChange = jest.fn();
        const { dayInput } = renderDatePicker({ onChange });
        userEvent.type(dayInput, '2');
        userEvent.tab();
        expect(onChange).toHaveBeenCalledWith(eventContainingTargetValue('02'));
        expect(dayInput.value).toBe('02');
      });

      describe('if the date value is incomplete', () => {
        test('does not fire a value change handler', () => {
          const onDateChange = jest.fn();
          const { yearInput } = renderDatePicker({
            onDateChange,
          });
          userEvent.type(yearInput, '2023');
          userEvent.tab();
          expect(onDateChange).not.toHaveBeenCalled();
        });
      });

      describe('if the date value is valid', () => {
        test('fires a value change handler', () => {
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
  });
});
