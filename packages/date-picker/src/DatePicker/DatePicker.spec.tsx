import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';
import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';

import { renderDatePicker } from './DatePicker.testutils';
import { DatePicker } from '.';

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
 * These are broken into separate sub-spec files (keyboard, mouse, typing) in order to mitigate long-running tests.
 */

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

const lgFormFieldIds = getLgFormFieldIds();

describe('packages/date-picker', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.setSystemTime(testToday);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    /// Note: Many rendering tests should be handled by Chromatic

    describe('Input', () => {
      test('renders label', () => {
        const { getByText } = render(<DatePicker label="Label" />);
        const label = getByText('Label');
        expect(label).toBeInTheDocument();
      });

      test('warn when no labels are passed in', () => {
        const consoleSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        /* @ts-expect-error - needs label/aria-label/aria-labelledby */
        render(<DatePicker />);
        expect(consoleSpy).toHaveBeenCalledWith(
          'For screen-reader accessibility, label, aria-labelledby, or aria-label must be provided to DatePicker component',
        );
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

      test('formField contains aria-label when a label is not provided', () => {
        const { getByRole } = render(
          <DatePicker aria-label="Label" data-testid="lg-date-picker" />,
        );
        const inputContainer = getByRole('combobox');
        expect(inputContainer).toHaveAttribute('aria-label', 'Label');
      });

      test('formField contains aria-labelledby when a label is not provided', () => {
        const { getByRole } = render(
          <DatePicker aria-labelledby="Label" data-testid="lg-date-picker" />,
        );
        const inputContainer = getByRole('combobox');
        expect(inputContainer).toHaveAttribute('aria-labelledby', 'Label');
      });

      test('formField only contains a label if label, aria-label, and aria-labelledby are passes', () => {
        const { getByRole, getByTestId } = render(
          <DatePicker
            label="Label"
            aria-labelledby="AriaLabelledby"
            aria-label="AriaLabel"
            data-testid="lg-date-picker"
          />,
        );
        const formField = getByTestId('lg-date-picker');
        const inputContainer = getByRole('combobox');
        expect(formField.querySelector('label')).toBeInTheDocument();
        expect(formField.querySelector('label')).toHaveTextContent('Label');
        expect(inputContainer).not.toHaveAttribute(
          'aria-labelledby',
          'AriaLabelledby',
        );
        expect(inputContainer).not.toHaveAttribute('aria-label', 'AriaLabel');
      });

      test('renders 3 inputs', () => {
        const { dayInput, monthInput, yearInput } = renderDatePicker();
        expect(dayInput).toBeInTheDocument();
        expect(monthInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
      });

      describe('rendering values', () => {
        test('renders `value` prop', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            value: newUTC(2023, Month.December, 25),
          });
          expect(dayInput.value).toEqual('25');
          expect(monthInput.value).toEqual('12');
          expect(yearInput.value).toEqual('2023');
        });

        test('renders `initialValue` prop', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            initialValue: newUTC(2023, Month.December, 25),
          });
          expect(dayInput.value).toEqual('25');
          expect(monthInput.value).toEqual('12');
          expect(yearInput.value).toEqual('2023');
        });

        test('renders nothing when  `value` is null', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            value: null,
          });
          expect(dayInput.value).toEqual('');
          expect(monthInput.value).toEqual('');
          expect(yearInput.value).toEqual('');
        });

        test('renders nothing when `initialValue` is null', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            initialValue: null,
          });
          expect(dayInput.value).toEqual('');
          expect(monthInput.value).toEqual('');
          expect(yearInput.value).toEqual('');
        });

        test('renders nothing when  `value` is an invalid date', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            value: new Date('invalid'),
          });
          expect(dayInput.value).toEqual('');
          expect(monthInput.value).toEqual('');
          expect(yearInput.value).toEqual('');
        });

        test('renders nothing when `initialValue` is an invalid date', () => {
          const { dayInput, monthInput, yearInput } = renderDatePicker({
            initialValue: new Date('invalid'),
          });
          expect(dayInput.value).toEqual('');
          expect(monthInput.value).toEqual('');
          expect(yearInput.value).toEqual('');
        });

        describe('re-rendering with a new value', () => {
          test('updates inputs with new valid value', () => {
            const { dayInput, monthInput, yearInput, rerenderDatePicker } =
              renderDatePicker({
                value: newUTC(2023, Month.December, 25),
              });

            rerenderDatePicker({ value: newUTC(2024, Month.September, 10) });

            expect(dayInput.value).toEqual('10');
            expect(monthInput.value).toEqual('09');
            expect(yearInput.value).toEqual('2024');
          });

          test('clears inputs when value is `null`', () => {
            const { dayInput, monthInput, yearInput, rerenderDatePicker } =
              renderDatePicker({
                value: newUTC(2023, Month.December, 25),
              });

            rerenderDatePicker({ value: null });

            expect(dayInput.value).toEqual('');
            expect(monthInput.value).toEqual('');
            expect(yearInput.value).toEqual('');
          });

          test('renders previous input if value is invalid', () => {
            const { dayInput, monthInput, yearInput, rerenderDatePicker } =
              renderDatePicker({
                value: newUTC(2023, Month.December, 25),
              });

            rerenderDatePicker({ value: new Date('invalid') });

            expect(dayInput.value).toEqual('25');
            expect(monthInput.value).toEqual('12');
            expect(yearInput.value).toEqual('2023');
          });
        });
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
          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent('Custom error message');
        });

        test('does not render `errorMessage` when state is not set', () => {
          const { getByRole, queryByTestId } = render(
            <DatePicker label="Label" errorMessage="Custom error message" />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'false');
          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).not.toBeInTheDocument();
        });

        test('renders with internal error state when value is out of range', () => {
          const { queryByTestId, getByRole } = render(
            <DatePicker label="Label" value={newUTC(2100, 1, 1)} />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');

          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });

        test('external error message overrides internal error message', () => {
          const { queryByTestId, getByRole } = renderDatePicker({
            value: newUTC(2100, 1, 1),
            state: 'error',
            errorMessage: 'Custom error message',
          });
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');

          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toBeInTheDocument();
          expect(errorElement).toHaveTextContent('Custom error message');
        });

        test('renders internal message if external error message is not set', () => {
          const { inputContainer, queryByTestId } = renderDatePicker({
            value: newUTC(2100, 1, 1),
            state: 'error',
            errorMessage: undefined,
          });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(queryByTestId(lgFormFieldIds.errorMessage)).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });

        test('removing an external error displays an internal error when applicable', () => {
          const { inputContainer, rerenderDatePicker, queryByTestId } =
            renderDatePicker({
              value: newUTC(2100, Month.January, 1),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(queryByTestId(lgFormFieldIds.errorMessage)).toHaveTextContent(
            'Date must be before 2038-01-19',
          );

          rerenderDatePicker({ errorMessage: 'Some error', state: 'error' });

          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(queryByTestId(lgFormFieldIds.errorMessage)).toHaveTextContent(
            'Some error',
          );

          rerenderDatePicker({ state: 'none' });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(queryByTestId(lgFormFieldIds.errorMessage)).toHaveTextContent(
            'Date must be before 2038-01-19',
          );
        });

        test('internal error message updates when min value changes', () => {
          const { inputContainer, rerenderDatePicker, queryByTestId } =
            renderDatePicker({
              value: newUTC(1967, Month.March, 10),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toHaveTextContent(
            'Date must be after 1970-01-01',
          );

          rerenderDatePicker({ min: newUTC(1968, Month.July, 5) });

          expect(errorElement).toHaveTextContent(
            'Date must be after 1968-07-05',
          );
        });

        test('internal error message updates when max value changes', () => {
          const { inputContainer, rerenderDatePicker, queryByTestId } =
            renderDatePicker({
              value: newUTC(2050, Month.January, 1),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          const errorElement = queryByTestId(lgFormFieldIds.errorMessage);
          expect(errorElement).toHaveTextContent(
            'Date must be before 2038-01-19',
          );

          rerenderDatePicker({ max: newUTC(2048, Month.July, 5) });

          expect(errorElement).toHaveTextContent(
            'Date must be before 2048-07-05',
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

      test('renders the appropriate number of cells', async () => {
        const { openMenu } = renderDatePicker({
          value: new Date(Date.UTC(2024, Month.February, 14)),
        });
        const { calendarCells } = await openMenu();
        expect(calendarCells).toHaveLength(29);
      });

      describe('when disabled is toggled to `true`', () => {
        test('menu closes if open', async () => {
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
            test('when the value is before the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 1)),
                value: new Date(Date.UTC(2022, Month.December, 1)),
              });

              const { leftChevron } = await openMenu();
              expect(leftChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the value is the same as the min', async () => {
              const { openMenu } = renderDatePicker({
                min: new Date(Date.UTC(2023, Month.December, 10)),
                value: new Date(Date.UTC(2023, Month.December, 1)),
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
            test('when the value is after the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2025, Month.December, 1)),
              });

              const { rightChevron } = await openMenu();
              expect(rightChevron).toHaveAttribute('aria-disabled', 'true');
            });
            test('when the value is the same as the max', async () => {
              const { openMenu } = renderDatePicker({
                max: new Date(Date.UTC(2024, Month.January, 2)),
                value: new Date(Date.UTC(2024, Month.January, 1)),
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

      describe('when menu opens', () => {});
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
        expect(dayInput.value).toEqual('25');
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

  describe('fires Popover callbacks', () => {
    test('opening the calendar fires the `onEnter*` callbacks', async () => {
      const onEnter = jest.fn();
      const onEntering = jest.fn();
      const onEntered = jest.fn();

      const { inputContainer } = renderDatePicker({
        onEnter,
        onEntering,
        onEntered,
      });
      userEvent.click(inputContainer);

      expect(onEnter).toHaveBeenCalled();
      expect(onEntering).toHaveBeenCalled();
      await waitFor(() => expect(onEntered).toHaveBeenCalled());
    });

    test('closing the calendar fires the `onExit*` callbacks', async () => {
      const onExit = jest.fn();
      const onExiting = jest.fn();
      const onExited = jest.fn();
      const { calendarButton } = renderDatePicker({
        onExit,
        onExiting,
        onExited,
        initialOpen: true,
      });
      userEvent.click(calendarButton);

      expect(onExit).toHaveBeenCalled();
      expect(onExiting).toHaveBeenCalled();
      await waitFor(() => expect(onExited).toHaveBeenCalled());
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Types behave as expected', () => {
    <>
      {/* @ts-expect-error - needs label/aria-label/aria-labelledby */}
      <DatePicker />

      <DatePicker label="Pick a date" />
      <DatePicker aria-label="Pick a date" />
      <DatePicker aria-labelledby="Pick a date" />
      <DatePicker
        label="Pick a date"
        min={new Date()}
        max={new Date()}
        value={new Date()}
        onDateChange={() => {}}
        initialValue={new Date()}
        handleValidation={() => {}}
        onChange={() => {}}
        locale={SupportedLocales.ISO_8601}
        timeZone="utc"
        baseFontSize={13}
        disabled={false}
        size="default"
        state="none"
        errorMessage="?"
        initialOpen={false}
        autoComplete="off"
        darkMode={false}
        align="bottom"
        justify="start"
        spacing={10}
        adjustOnMutation={true}
        onEnter={() => {}}
        onEntering={() => {}}
        onEntered={() => {}}
        onExit={() => {}}
        onExiting={() => {}}
        onExited={() => {}}
      />
    </>;
  });
});
