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

import { getISODate, Month, newUTC } from '@leafygreen-ui/date-utils';
import {
  mockTimeZone,
  testTimeZones,
  undefinedTZ,
} from '@leafygreen-ui/date-utils/src/testing';
import {
  eventContainingTargetValue,
  tabNTimes,
} from '@leafygreen-ui/testing-lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { DateSegment } from '../shared';
import { defaultMax, defaultMin } from '../shared/constants';
import {
  getFormattedDateString,
  getFormattedSegmentsFromDate,
  getValueFormatter,
} from '../shared/utils';

import {
  expectedTabStopLabels,
  findTabStopElementMap,
  renderDatePicker,
  RenderDatePickerResult,
  RenderMenuResult,
} from './DatePicker.testutils';
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
 */

// Set the current time to noon UTC on 2023-12-25
const testToday = newUTC(2023, Month.December, 25, 12);

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
          const { queryByTestId, getByRole } = render(
            <DatePicker label="Label" value={newUTC(2100, 1, 1)} />,
          );
          const inputContainer = getByRole('combobox');
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');

          const errorElement = queryByTestId('lg-form_field-error_message');
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

          const errorElement = queryByTestId('lg-form_field-error_message');
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
          expect(
            queryByTestId('lg-form_field-error_message'),
          ).toHaveTextContent('Date must be before 2038-01-19');
        });

        test('removing an external error displays an internal error when applicable', () => {
          const { inputContainer, rerenderDatePicker, queryByTestId } =
            renderDatePicker({
              value: newUTC(2100, Month.January, 1),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(
            queryByTestId('lg-form_field-error_message'),
          ).toHaveTextContent('Date must be before 2038-01-19');

          rerenderDatePicker({ errorMessage: 'Some error', state: 'error' });

          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(
            queryByTestId('lg-form_field-error_message'),
          ).toHaveTextContent('Some error');

          rerenderDatePicker({ state: 'none' });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          expect(
            queryByTestId('lg-form_field-error_message'),
          ).toHaveTextContent('Date must be before 2038-01-19');
        });

        test('internal error message updates when min value changes', () => {
          const { inputContainer, rerenderDatePicker, queryByTestId } =
            renderDatePicker({
              value: newUTC(1967, Month.March, 10),
            });
          expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
          const errorElement = queryByTestId('lg-form_field-error_message');
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
          const errorElement = queryByTestId('lg-form_field-error_message');
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

      test('appends to the end of the DOM', async () => {
        const { findMenuElements, container } = renderDatePicker({
          initialOpen: true,
        });
        const { menuContainerEl } = await findMenuElements();
        expect(container).not.toContain(menuContainerEl);
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
                    const { calendarButton, waitForMenuToOpen } =
                      renderDatePicker({
                        timeZone: props.tz,
                      });
                    userEvent.click(calendarButton);
                    const { queryCellByISODate } = await waitForMenuToOpen();
                    expect(queryCellByISODate(dec24ISO)).toHaveFocus();
                  });

                  test('menu opens to current month', async () => {
                    const { calendarButton, waitForMenuToOpen } =
                      renderDatePicker({
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
                    const { calendarButton, waitForMenuToOpen } =
                      renderDatePicker({
                        value: testValue,
                        timeZone: props.tz,
                      });
                    userEvent.click(calendarButton);
                    const { queryCellByISODate } = await waitForMenuToOpen();
                    expect(queryCellByISODate('2024-09-10')).toHaveFocus();
                  });

                  test('menu opens to the month of that `value`', async () => {
                    const testValue = newUTC(2024, Month.September, 10);
                    const { calendarButton, waitForMenuToOpen } =
                      renderDatePicker({
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
                expect(yearInput.value).toBe(
                  testToday.getUTCFullYear().toString(),
                );
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

    describe('Keyboard navigation', () => {
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
          tabNTimes(3);
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
                    renderResult.inputContainer.contains(
                      document.activeElement,
                    ),
                  ).toBeFalsy();
                }

                const errorElement = renderResult.queryByTestId(
                  'lg-form_field-error_message',
                );

                await waitFor(() =>
                  expect(errorElement).not.toBeInTheDocument(),
                );
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

                const errorElement = renderResult.queryByTestId(
                  'lg-form_field-error_message',
                );

                await waitFor(() =>
                  expect(errorElement).not.toBeInTheDocument(),
                );

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

      describe('Backspace key', () => {
        test('deletes any value in the input', () => {
          const { dayInput } = renderDatePicker();
          userEvent.type(dayInput, '26{backspace}');
          expect(dayInput.value).toBe('2');
          userEvent.tab();
          expect(dayInput.value).toBe('02');
        });

        test('deletes the whole value on multiple presses', () => {
          const { monthInput } = renderDatePicker();
          userEvent.type(monthInput, '11');
          userEvent.type(monthInput, '{backspace}{backspace}');
          expect(monthInput.value).toBe('');
        });

        test('focuses the previous segment if current segment is empty', () => {
          const { yearInput, monthInput } = renderDatePicker();
          userEvent.type(monthInput, '{backspace}');
          expect(yearInput).toHaveFocus();
        });
      });

      /**
       * Arrow Keys behavior changes based on whether the input or menu is focused
       */
      describe('Arrow key', () => {
        describe('Input', () => {
          describe('Left Arrow', () => {
            test('focuses the previous segment when the segment is empty', () => {
              const { yearInput, monthInput } = renderDatePicker();
              userEvent.click(monthInput);
              userEvent.keyboard('{arrowleft}');
              expect(yearInput).toHaveFocus();
            });

            test('moves the cursor when the segment has a value', () => {
              const { monthInput } = renderDatePicker({
                value: testToday,
              });
              userEvent.click(monthInput);
              userEvent.keyboard('{arrowleft}');
              expect(monthInput).toHaveFocus();
            });

            test('moves the cursor when the value starts with 0', () => {
              const { monthInput } = renderDatePicker({});
              userEvent.type(monthInput, '04{arrowleft}{arrowleft}');
              expect(monthInput).toHaveFocus();
            });

            test('moves the cursor when the value is 0', () => {
              const { monthInput } = renderDatePicker({});
              userEvent.type(monthInput, '0{arrowleft}');
              expect(monthInput).toHaveFocus();
            });

            test('moves the cursor to the previous segment when the value is 0', () => {
              const { yearInput, monthInput } = renderDatePicker({});
              userEvent.type(monthInput, '0{arrowleft}{arrowleft}');
              expect(yearInput).toHaveFocus();
            });

            test('focuses the previous segment if the cursor is at the start of the input text', () => {
              const { yearInput, monthInput } = renderDatePicker({
                value: testToday,
              });
              userEvent.click(monthInput);
              userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
              expect(yearInput).toHaveFocus();
            });
          });

          describe('Right Arrow', () => {
            test('focuses the next segment when the segment is empty', () => {
              const { yearInput, monthInput } = renderDatePicker();
              userEvent.click(yearInput);
              userEvent.keyboard('{arrowright}');
              expect(monthInput).toHaveFocus();
            });

            test('focuses the next segment if the cursor is at the start of the input text', () => {
              const { yearInput, monthInput } = renderDatePicker({
                value: testToday,
              });
              userEvent.click(yearInput);
              userEvent.keyboard('{arrowright}');
              expect(monthInput).toHaveFocus();
            });

            test('moves the cursor when the segment has a value', () => {
              const { yearInput } = renderDatePicker({
                value: testToday,
              });
              userEvent.click(yearInput);
              userEvent.keyboard('{arrowleft}{arrowright}');
              expect(yearInput).toHaveFocus();
            });
          });

          const segmentCases = ['year', 'month', 'day'] as Array<DateSegment>;
          describe.each(segmentCases)('%p segment', segment => {
            const formatter = getValueFormatter(segment);
            /** Utility only for this suite. Returns the day|month|year element from the render result */
            const getRelevantInput = (renderResult: RenderDatePickerResult) =>
              segment === 'year'
                ? renderResult.yearInput
                : segment === 'month'
                ? renderResult.monthInput
                : renderResult.dayInput;

            describe('Up Arrow', () => {
              describe('when no value has been set', () => {
                test('keeps the focus in the current segment', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard('{arrowup}');
                  expect(input).toHaveFocus();
                });

                test('updates segment value to the default min', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowup}`);
                  const expectedValue = formatter(defaultMin[segment]);
                  expect(input).toHaveValue(expectedValue);
                });

                test('updates segment value to the provided min year', () => {
                  const result = renderDatePicker({
                    min: newUTC(1967, Month.March, 10),
                  });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowup}`);
                  const expectedValue = formatter(
                    segment === 'year' ? 1967 : defaultMin[segment],
                  );
                  expect(input).toHaveValue(expectedValue);
                });

                test('keeps the focus in the current segment even if the value is valid', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard('{arrowup}{arrowup}{arrowup}');
                  expect(input).toHaveFocus();
                  const expectedValue = formatter(defaultMin[segment] + 2);
                  expect(input).toHaveValue(expectedValue);
                });

                test(`fires segment change handler`, () => {
                  const onChange = jest.fn();
                  const result = renderDatePicker({ onChange });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowup}`);
                  const expectedValue = formatter(defaultMin[segment]);
                  expect(onChange).toHaveBeenCalledWith(
                    eventContainingTargetValue(expectedValue),
                  );
                });

                test(`does not fire value change handler`, () => {
                  const onDateChange = jest.fn();
                  const result = renderDatePicker({ onDateChange });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowup}`);
                  expect(onDateChange).not.toHaveBeenCalled();
                });

                describe('when segment value is max', () => {
                  if (segment === 'year') {
                    test('does not roll over to the min value', () => {
                      const result = renderDatePicker();
                      const input = getRelevantInput(result);
                      const initialValue = formatter(defaultMax[segment]);
                      const expectedValue = formatter(defaultMax[segment] + 1);
                      userEvent.type(input, initialValue);
                      expect(input).toHaveValue(initialValue);
                      userEvent.click(input);
                      userEvent.keyboard('{arrowup}');
                      expect(input).toHaveValue(expectedValue);
                    });
                  } else {
                    test('rolls over to the min value', () => {
                      const result = renderDatePicker();
                      const input = getRelevantInput(result);
                      const initialValue = formatter(defaultMax[segment]);
                      const expectedValue = formatter(defaultMin[segment]);
                      userEvent.type(input, initialValue);
                      expect(input).toHaveValue(initialValue);
                      userEvent.click(input);
                      userEvent.keyboard('{arrowup}');
                      expect(input).toHaveValue(expectedValue);
                    });
                  }
                });
              });

              describe('when a value is set', () => {
                describe('when the value is valid', () => {
                  const onDateChange = jest.fn();
                  const handleValidation = jest.fn();
                  const initialValue = newUTC(2023, Month.September, 10);
                  const expectedValue = {
                    year: newUTC(2024, Month.September, 10),
                    month: newUTC(2023, Month.October, 10),
                    day: newUTC(2023, Month.September, 11),
                  }[segment];

                  beforeEach(() => {
                    const result = renderDatePicker({
                      onDateChange,
                      handleValidation,
                      value: initialValue,
                    });
                    const input = getRelevantInput(result);
                    userEvent.click(input);
                    userEvent.keyboard(`{arrowup}`);
                  });

                  test('fires value change handler', () => {
                    expect(onDateChange).toHaveBeenCalledWith(expectedValue);
                  });

                  test('fires validation handler', () => {
                    expect(handleValidation).toHaveBeenCalledWith(
                      expectedValue,
                    );
                  });
                });

                describe('if the new value would be invalid', () => {
                  // E.g. Feb 30 2020 or Feb 29 2021
                  switch (segment) {
                    case 'year': {
                      test('changing year sets error state', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.February, 29),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowup}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2021');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('29');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'true',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).toBeInTheDocument();
                          expect(errorElement).toHaveTextContent(
                            '2021-02-29 is not a valid date',
                          );
                        });
                      });

                      break;
                    }

                    case 'month': {
                      test('changing month sets error state', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.January, 31),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowup}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2020');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('31');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'true',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).toBeInTheDocument();
                          expect(errorElement).toHaveTextContent(
                            '2020-02-31 is not a valid date',
                          );
                        });
                      });

                      break;
                    }

                    case 'day': {
                      test('changing date rolls value over sooner', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.February, 29),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowup}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2020');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('01');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'false',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).not.toBeInTheDocument();
                        });
                      });
                      break;
                    }

                    default:
                      break;
                  }
                });

                describe('if new value would be out of range', () => {
                  const onDateChange = jest.fn();
                  const onSegmentChange = jest.fn();
                  const handleValidation = jest.fn();
                  const max = newUTC(2020, Month.August, 1);
                  const startValue = newUTC(2020, Month.August, 1);
                  const incrementedValues = {
                    year: newUTC(2021, Month.August, 1),
                    month: newUTC(2020, Month.September, 1),
                    day: newUTC(2020, Month.August, 2),
                  };
                  const expectedMessage = `Date must be before ${getFormattedDateString(
                    max,
                    'iso8601',
                  )}`;

                  let renderResult: RenderDatePickerResult;
                  let input: HTMLInputElement;

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

                    input = getRelevantInput(renderResult);

                    userEvent.click(input);
                    userEvent.keyboard(`{arrowup}`);
                  });

                  test('fires the segment change handler', () => {
                    const expectedInputValue = getFormattedSegmentsFromDate(
                      incrementedValues[segment],
                    )[segment];

                    expect(onSegmentChange).toHaveBeenCalledWith(
                      eventContainingTargetValue(expectedInputValue),
                    );
                  });

                  test('updates the input', () => {
                    const expectedInputValue = getFormattedSegmentsFromDate(
                      incrementedValues[segment],
                    )[segment];

                    expect(input).toHaveValue(expectedInputValue);
                  });

                  test('fires the change handler', () => {
                    expect(onDateChange).toHaveBeenCalledWith(
                      incrementedValues[segment],
                    );
                  });

                  test('fires the validation handler', () => {
                    expect(handleValidation).toHaveBeenCalledWith(
                      incrementedValues[segment],
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
              describe('when no value has been set', () => {
                test('keeps the focus in the current segment', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard('{arrowdown}');
                  expect(input).toHaveFocus();
                });

                test('updates segment value to the default max', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowdown}`);
                  const expectedValue = formatter(defaultMax[segment]);
                  expect(input).toHaveValue(expectedValue);
                });

                test('updates segment value to the provided max year', () => {
                  const result = renderDatePicker({
                    max: newUTC(2067, Month.March, 10),
                  });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowdown}`);
                  const expectedValue = formatter(
                    segment === 'year' ? 2067 : defaultMax[segment],
                  );
                  expect(input).toHaveValue(expectedValue);
                });

                test('keeps the focus in the current segment even if the value is valid', () => {
                  const result = renderDatePicker();
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
                  expect(input).toHaveFocus();
                  const expectedValue = formatter(defaultMax[segment] - 2);
                  expect(input).toHaveValue(expectedValue);
                });

                test(`fires segment change handler`, () => {
                  const onChange = jest.fn();
                  const result = renderDatePicker({ onChange });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowdown}`);
                  const expectedValue = formatter(defaultMax[segment]);
                  expect(onChange).toHaveBeenCalledWith(
                    eventContainingTargetValue(expectedValue),
                  );
                });

                test(`does not fire value change handler`, () => {
                  const onDateChange = jest.fn();
                  const result = renderDatePicker({ onDateChange });
                  const input = getRelevantInput(result);
                  userEvent.click(input);
                  userEvent.keyboard(`{arrowdown}`);
                  expect(onDateChange).not.toHaveBeenCalled();
                });

                describe('when segment value is min', () => {
                  if (segment === 'year') {
                    test('does not roll over to the max value', () => {
                      const result = renderDatePicker();
                      const input = getRelevantInput(result);
                      const initialValue = formatter(defaultMin[segment]);
                      const expectedValue = formatter(defaultMin[segment] - 1);
                      userEvent.type(input, initialValue);
                      expect(input).toHaveValue(initialValue);
                      userEvent.click(input);
                      userEvent.keyboard('{arrowdown}');
                      expect(input).toHaveValue(expectedValue);
                    });
                  } else {
                    test('rolls over to the max value', () => {
                      const result = renderDatePicker();
                      const input = getRelevantInput(result);
                      const initialValue = formatter(defaultMin[segment]);
                      const expectedValue = formatter(defaultMax[segment]);
                      userEvent.type(input, initialValue);
                      expect(input).toHaveValue(initialValue);
                      userEvent.click(input);
                      userEvent.keyboard('{arrowdown}');
                      expect(input).toHaveValue(expectedValue);
                    });
                  }
                });
              });

              describe('when a value is set', () => {
                describe('when the value is valid', () => {
                  const onDateChange = jest.fn();
                  const handleValidation = jest.fn();
                  const initialValue = newUTC(2023, Month.September, 10);
                  const expectedValue = {
                    year: newUTC(2022, Month.September, 10),
                    month: newUTC(2023, Month.August, 10),
                    day: newUTC(2023, Month.September, 9),
                  }[segment];

                  beforeEach(() => {
                    const result = renderDatePicker({
                      onDateChange,
                      handleValidation,
                      value: initialValue,
                    });
                    const input = getRelevantInput(result);
                    userEvent.click(input);
                    userEvent.keyboard(`{arrowdown}`);
                  });

                  test('fires value change handler', () => {
                    expect(onDateChange).toHaveBeenCalledWith(expectedValue);
                  });

                  test('fires validation handler', () => {
                    expect(handleValidation).toHaveBeenCalledWith(
                      expectedValue,
                    );
                  });
                });

                describe('if the new value would be invalid', () => {
                  // E.g. Feb 30 2020 or Feb 29 2021
                  switch (segment) {
                    case 'year': {
                      test('changing year sets error state', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.February, 29),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowdown}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2019');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('29');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'true',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).toBeInTheDocument();
                          expect(errorElement).toHaveTextContent(
                            '2019-02-29 is not a valid date',
                          );
                        });
                      });

                      break;
                    }

                    case 'month': {
                      test('changing month sets error state', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.March, 31),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowdown}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2020');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('31');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'true',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).toBeInTheDocument();
                          expect(errorElement).toHaveTextContent(
                            '2020-02-31 is not a valid date',
                          );
                        });
                      });

                      break;
                    }

                    case 'day': {
                      test('changing date rolls over to number of days-in-month', async () => {
                        const result = renderDatePicker({
                          value: newUTC(2020, Month.February, 1),
                        });
                        const input = getRelevantInput(result);
                        userEvent.click(input);
                        userEvent.keyboard('{arrowdown}');

                        await waitFor(() => {
                          expect(result.yearInput).toHaveValue('2020');
                          expect(result.monthInput).toHaveValue('02');
                          expect(result.dayInput).toHaveValue('29');
                          expect(result.inputContainer).toHaveAttribute(
                            'aria-invalid',
                            'false',
                          );
                          const errorElement = result.queryByTestId(
                            'lg-form_field-error_message',
                          );
                          expect(errorElement).not.toBeInTheDocument();
                        });
                      });
                      break;
                    }

                    default:
                      break;
                  }
                });

                describe('if new value would be out of range', () => {
                  const onDateChange = jest.fn();
                  const onSegmentChange = jest.fn();
                  const handleValidation = jest.fn();
                  const max = newUTC(2020, Month.August, 1);
                  const startValue = newUTC(2020, Month.August, 1);
                  const incrementedValues = {
                    year: newUTC(2021, Month.August, 1),
                    month: newUTC(2020, Month.September, 1),
                    day: newUTC(2020, Month.August, 2),
                  };
                  const expectedMessage = `Date must be before ${getFormattedDateString(
                    max,
                    'iso8601',
                  )}`;

                  let renderResult: RenderDatePickerResult;
                  let input: HTMLInputElement;

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

                    input = getRelevantInput(renderResult);

                    userEvent.click(input);
                    userEvent.keyboard(`{arrowup}`);
                  });

                  test('fires the segment change handler', () => {
                    const expectedInputValue = getFormattedSegmentsFromDate(
                      incrementedValues[segment],
                    )[segment];

                    expect(onSegmentChange).toHaveBeenCalledWith(
                      eventContainingTargetValue(expectedInputValue),
                    );
                  });

                  test('updates the input', () => {
                    const expectedInputValue = getFormattedSegmentsFromDate(
                      incrementedValues[segment],
                    )[segment];

                    expect(input).toHaveValue(expectedInputValue);
                  });

                  test('fires the change handler', () => {
                    expect(onDateChange).toHaveBeenCalledWith(
                      incrementedValues[segment],
                    );
                  });

                  test('fires the validation handler', () => {
                    expect(handleValidation).toHaveBeenCalledWith(
                      incrementedValues[segment],
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
        });

        describe('Menu', () => {
          beforeEach(() => {
            jest.setSystemTime(testToday);
            mockTimeZone('America/New_York', -5);
          });
          afterEach(() => {
            jest.restoreAllMocks();
          });

          describe('basic arrow key behavior', () => {
            let menuResult: RenderMenuResult;

            beforeEach(async () => {
              const renderResult = renderDatePicker({
                value: newUTC(2023, Month.September, 10),
              });
              menuResult = await renderResult.openMenu();
            });

            test('left arrow moves focus to the previous day', async () => {
              const { queryCellByISODate } = menuResult;
              userEvent.keyboard('{arrowleft}');
              const prevDay = queryCellByISODate('2023-09-09');
              await waitFor(() => expect(prevDay).toHaveFocus());
            });

            test('right arrow moves focus to the next day', async () => {
              const { queryCellByISODate } = menuResult;
              userEvent.keyboard('{arrowright}');
              const nextDay = queryCellByISODate('2023-09-11');
              await waitFor(() => expect(nextDay).toHaveFocus());
            });

            test('up arrow moves focus to the previous week', async () => {
              const { queryCellByISODate } = menuResult;
              userEvent.keyboard('{arrowup}');
              const prevWeek = queryCellByISODate('2023-09-03');
              await waitFor(() => expect(prevWeek).toHaveFocus());
            });

            test('down arrow moves focus to the next week', async () => {
              const { queryCellByISODate } = menuResult;
              userEvent.keyboard('{arrowdown}');
              const nextWeek = queryCellByISODate('2023-09-17');
              await waitFor(() => expect(nextWeek).toHaveFocus());
            });
          });

          describe('when switching between daylight savings and standard time', () => {
            // DST: Sun, Mar 12, 2023 – Sun, Nov 5, 2023

            const standardTimeEndDate = newUTC(2023, Month.March, 11, 22);
            const weekBeforeDTStart = newUTC(2023, Month.March, 5, 22);
            const daylightTimeStartDate = newUTC(2023, Month.March, 12, 22);
            const daylightTimeEndDate = newUTC(2023, Month.November, 5, 22);
            const weekAfterDTEnd = newUTC(2023, Month.November, 12, 22);
            const standardTimeStartDate = newUTC(2023, Month.November, 6, 22);

            describe('DST start (Mar 12 2023)', () => {
              test('left arrow moves focus to prev day', async () => {
                jest.setSystemTime(daylightTimeStartDate); // Mar 12
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                const currentDayCell = queryCellByISODate('2023-03-12'); // Mar 12
                await waitFor(() => expect(currentDayCell).toHaveFocus());

                userEvent.keyboard('{arrowleft}');
                const prevDayCell = queryCellByISODate('2023-03-11'); // Mar 11
                await waitFor(() => expect(prevDayCell).toHaveFocus());
              });

              test('right arrow moves focus to next day', async () => {
                jest.setSystemTime(standardTimeEndDate); // Mar 11
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                const currentDayCell = queryCellByISODate('2023-03-11'); // Mar 11
                await waitFor(() => expect(currentDayCell).toHaveFocus());

                userEvent.keyboard('{arrowright}');
                const nextDayCell = queryCellByISODate('2023-03-12'); // Mar 12
                await waitFor(() => expect(nextDayCell).toHaveFocus());
              });

              test('up arrow moves focus to the previous week', async () => {
                jest.setSystemTime(daylightTimeStartDate); // Mar 12
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowup}');
                const prevWeekCell = queryCellByISODate('2023-03-05'); // Mar 5
                await waitFor(() => expect(prevWeekCell).toHaveFocus());
              });

              test('down arrow moves focus to the next week', async () => {
                jest.setSystemTime(weekBeforeDTStart); // Mar 5
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowdown}');
                const nextWeekCell = queryCellByISODate('2023-03-12'); // Mar 12
                await waitFor(() => expect(nextWeekCell).toHaveFocus());
              });
            });

            describe('DST end (Nov 5 2023)', () => {
              test('left arrow moves focus to prev day', async () => {
                jest.setSystemTime(standardTimeStartDate); // Nov 6
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowleft}');
                const prevDayCell = queryCellByISODate('2023-11-05'); // Nov 5

                await waitFor(() => expect(prevDayCell).toHaveFocus());
              });

              test('right arrow moves focus to next day', async () => {
                jest.setSystemTime(daylightTimeEndDate); // Nov 5

                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowright}');

                const nextDayCell = queryCellByISODate('2023-11-06'); // Nov 6
                await waitFor(() => expect(nextDayCell).toHaveFocus());
              });

              test('up arrow moves focus to the previous week', async () => {
                jest.setSystemTime(weekAfterDTEnd); // Nov 12
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowup}');

                const prevWeekCell = queryCellByISODate('2023-11-05'); // Nov 5
                await waitFor(() => expect(prevWeekCell).toHaveFocus());
              });

              test('down arrow moves focus to the next week', async () => {
                jest.setSystemTime(daylightTimeEndDate); // Nov 5
                const { openMenu } = renderDatePicker();
                const { queryCellByISODate } = await openMenu();
                userEvent.keyboard('{arrowdown}');

                const nextWeekCell = queryCellByISODate('2023-11-12'); // Nov 12
                await waitFor(() => expect(nextWeekCell).toHaveFocus());
              });
            });
          });

          describe('when next day would be out of range', () => {
            const testValue = newUTC(2023, Month.September, 10);
            const isoString = '2023-09-10';

            test('left arrow does nothing', async () => {
              const { openMenu } = renderDatePicker({
                value: testValue,
                min: testValue,
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowleft}');
              await waitFor(() =>
                expect(queryCellByISODate(isoString)).toHaveFocus(),
              );
            });

            test('right arrow does nothing', async () => {
              const { openMenu } = renderDatePicker({
                value: testValue,
                max: testValue,
              });
              const { queryCellByISODate } = await openMenu();

              userEvent.keyboard('{arrowright}');
              await waitFor(() =>
                expect(queryCellByISODate(isoString)).toHaveFocus(),
              );
            });

            test('up arrow does nothing', async () => {
              const { openMenu } = renderDatePicker({
                value: testValue,
                min: addDays(testValue, -6),
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowup}');
              await waitFor(() =>
                expect(queryCellByISODate(isoString)).toHaveFocus(),
              );
            });
            test('down arrow does nothing', async () => {
              const { openMenu } = renderDatePicker({
                value: testValue,
                max: addDays(testValue, 6),
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowdown}');
              await waitFor(() =>
                expect(queryCellByISODate(isoString)).toHaveFocus(),
              );
            });
          });

          describe('update the displayed month', () => {
            test('left arrow updates displayed month to previous', async () => {
              const value = new Date(Date.UTC(2023, Month.September, 1));
              const { openMenu } = renderDatePicker({ value });
              const { calendarGrid } = await openMenu();

              userEvent.keyboard('{arrowleft}');
              expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
            });

            test('right arrow updates displayed month to next', async () => {
              const value = new Date(Date.UTC(2023, Month.September, 30));
              const { openMenu } = renderDatePicker({ value });
              const { calendarGrid } = await openMenu();
              userEvent.keyboard('{arrowright}');
              expect(calendarGrid).toHaveAttribute(
                'aria-label',
                'October 2023',
              );
            });

            test('up arrow updates displayed month to previous', async () => {
              const value = new Date(Date.UTC(2023, Month.September, 6));
              const { openMenu } = renderDatePicker({ value });
              const { calendarGrid } = await openMenu();

              userEvent.keyboard('{arrowup}');
              expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
            });

            test('down arrow updates displayed month to next', async () => {
              const value = new Date(Date.UTC(2023, Month.September, 25));
              const { openMenu } = renderDatePicker({ value });
              const { calendarGrid } = await openMenu();

              userEvent.keyboard('{arrowdown}');
              expect(calendarGrid).toHaveAttribute(
                'aria-label',
                'October 2023',
              );
            });

            test('does not update month when month does not need to change', async () => {
              const { openMenu } = renderDatePicker({
                value: newUTC(2023, Month.September, 10),
              });
              const { calendarGrid } = await openMenu();

              userEvent.tab();
              userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
              expect(calendarGrid).toHaveAttribute(
                'aria-label',
                'September 2023',
              );
            });
          });

          describe('when month should be updated', () => {
            test('left arrow focuses the previous day', async () => {
              const value = newUTC(2023, Month.September, 1);
              const { openMenu } = renderDatePicker({
                value,
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowleft}');
              const highlightedCell = queryCellByISODate('2023-08-31');
              await waitFor(() => expect(highlightedCell).toHaveFocus());
            });
            test('right arrow focuses the next day', async () => {
              const value = newUTC(2023, Month.September, 30);
              const { openMenu } = renderDatePicker({
                value,
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowright}');
              const highlightedCell = queryCellByISODate('2023-10-01');
              await waitFor(() => expect(highlightedCell).toHaveFocus());
            });
            test('up arrow focuses the previous week', async () => {
              const value = newUTC(2023, Month.September, 7);
              const { openMenu } = renderDatePicker({
                value,
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowup}');
              const highlightedCell = queryCellByISODate('2023-08-31');
              await waitFor(() => expect(highlightedCell).toHaveFocus());
            });
            test('down arrow focuses the next week', async () => {
              const value = newUTC(2023, Month.September, 24);
              const { openMenu } = renderDatePicker({
                value,
              });
              const { queryCellByISODate } = await openMenu();
              userEvent.keyboard('{arrowdown}');
              const highlightedCell = queryCellByISODate('2023-10-01');
              await waitFor(() => expect(highlightedCell).toHaveFocus());
            });
          });

          describe('focus-trap', () => {
            test('when a cell is focused, pressing tab moves the focus to the left chevron', async () => {
              const { openMenu } = renderDatePicker();
              const { todayCell, leftChevron } = await openMenu();
              expect(todayCell).toHaveFocus();
              userEvent.tab();
              expect(leftChevron).toHaveFocus();
            });

            test('when a cell is focused, pressing tab + shift moves the focus to the right chevron', async () => {
              const { openMenu } = renderDatePicker();
              const { todayCell, rightChevron } = await openMenu();
              expect(todayCell).toHaveFocus();
              userEvent.tab({ shift: true });
              expect(rightChevron).toHaveFocus();
            });

            test('when the left chevron is focused, pressing tab + shift moves the focus to todays cell', async () => {
              const { openMenu } = renderDatePicker();
              const { todayCell, leftChevron } = await openMenu();
              userEvent.tab();
              expect(leftChevron).toHaveFocus();
              userEvent.tab({ shift: true });
              expect(todayCell).toHaveFocus();
            });

            test('when the right chevron is focused, pressing tab moves the focus to todays cell', async () => {
              const { openMenu } = renderDatePicker();
              const { todayCell, rightChevron } = await openMenu();
              userEvent.tab({ shift: true });
              expect(rightChevron).toHaveFocus();
              userEvent.tab();
              expect(todayCell).toHaveFocus();
            });
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

        describe('auto-formatting & auto-focus', () => {
          describe('for ISO format', () => {
            const locale = 'iso8601';

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
            const locale = 'en-US';

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
            const errorElement = queryByTestId('lg-form_field-error_message');
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

            yearInput.setSelectionRange(0, 4);
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
        });

        describe('typing new characters', () => {
          test('even if the resulting value is valid, keeps the input as-is', async () => {
            const { monthInput } = renderDatePicker({});
            userEvent.type(monthInput, '1');
            userEvent.tab();
            await waitFor(() => expect(monthInput).toHaveValue('01'));
            userEvent.type(monthInput, '2');
            await waitFor(() => expect(monthInput).toHaveValue('01'));
          });

          test('if the resulting value is not valid, keeps the input as-is', async () => {
            const { monthInput } = renderDatePicker({});
            userEvent.type(monthInput, '6');
            await waitFor(() => expect(monthInput).toHaveValue('06'));
            userEvent.type(monthInput, '9');
            await waitFor(() => expect(monthInput).toHaveValue('06'));
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
          expect(onChange).toHaveBeenCalledWith(
            eventContainingTargetValue('02'),
          );
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

      describe('setting the date to an out-of-range value', () => {
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

      describe('Error messages', () => {
        test('Updating the input to a still-invalid date updates the error message', () => {
          const { yearInput, monthInput, dayInput, queryByTestId } =
            renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '02');
          userEvent.type(dayInput, '31');
          userEvent.tab();
          let errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).toHaveTextContent(
            '2020-02-31 is not a valid date',
          );

          userEvent.type(dayInput, '{backspace}0');
          userEvent.tab();
          errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).toHaveTextContent(
            '2020-02-30 is not a valid date',
          );

          userEvent.type(dayInput, '{backspace}{backspace}');
          userEvent.tab();
          errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).toHaveTextContent(
            '2020-02- is not a valid date',
          );
        });

        test('Clearing the input after an invalid date error message is displayed removes the message', () => {
          const { yearInput, monthInput, dayInput, queryByTestId } =
            renderDatePicker({});
          userEvent.type(yearInput, '2020');
          userEvent.type(monthInput, '02');
          userEvent.type(dayInput, '31');
          const errorElement = queryByTestId('lg-form_field-error_message');
          expect(errorElement).toHaveTextContent(
            '2020-02-31 is not a valid date',
          );

          userEvent.type(dayInput, '{backspace}{backspace}');
          userEvent.type(monthInput, '{backspace}{backspace}');
          userEvent.type(
            yearInput,
            '{backspace}{backspace}{backspace}{backspace}',
          );
          const errorElement2 = queryByTestId('lg-form_field-error_message');
          expect(errorElement2).not.toBeInTheDocument();
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

      {/* @ts-expect-error - does not accept usePortal prop */}
      <DatePicker usePortal />

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
        locale="iso8601"
        timeZone="utc"
        baseFontSize={13}
        disabled={false}
        size="default"
        state="none"
        errorMessage="?"
        initialOpen={false}
        autoComplete="off"
        darkMode={false}
        portalClassName=""
        scrollContainer={{} as HTMLElement}
        portalContainer={{} as HTMLElement}
        align="bottom"
        justify="start"
        spacing={10}
        adjustOnMutation={true}
        popoverZIndex={1}
        onEnter={() => {}}
        onEntering={() => {}}
        onEntered={() => {}}
        onExit={() => {}}
        onExiting={() => {}}
        onExited={() => {}}
        contentClassName=""
      />
    </>;
  });
});
