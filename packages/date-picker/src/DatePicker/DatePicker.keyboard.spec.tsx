import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';
import { mockTimeZone } from '@leafygreen-ui/date-utils/testing';
import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
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
      await waitFor(() => jest.advanceTimersByTime(transitionDuration.default));

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

        test('focuses the previous segment when the segment has a value', () => {
          const { yearInput, monthInput } = renderDatePicker({
            value: testToday,
          });
          userEvent.click(monthInput);
          userEvent.keyboard('{arrowleft}');
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

        test('focuses the next segment when the segment has a value', () => {
          const { yearInput, monthInput } = renderDatePicker({
            value: testToday,
          });
          userEvent.click(yearInput);
          userEvent.keyboard('{arrowright}');
          expect(monthInput).toHaveFocus();
        });

        test('focuses the next segment when the value starts with 0', () => {
          const { monthInput, dayInput } = renderDatePicker({});
          userEvent.type(monthInput, '0{arrowright}');
          expect(dayInput).toHaveFocus();
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
                expect(handleValidation).toHaveBeenCalledWith(expectedValue);
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
                        lgFormFieldIds.errorMessage,
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
                        lgFormFieldIds.errorMessage,
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
                        lgFormFieldIds.errorMessage,
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
                'iso-8601',
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
                expect(handleValidation).toHaveBeenCalledWith(expectedValue);
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
                        lgFormFieldIds.errorMessage,
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
                        lgFormFieldIds.errorMessage,
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
                        lgFormFieldIds.errorMessage,
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
                'iso-8601',
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
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
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
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
        });

        test('does not update month when month does not need to change', async () => {
          const { openMenu } = renderDatePicker({
            value: newUTC(2023, Month.September, 10),
          });
          const { calendarGrid } = await openMenu();

          userEvent.tab();
          userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');
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
