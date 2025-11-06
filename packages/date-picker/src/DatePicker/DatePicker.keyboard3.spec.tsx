import { waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
import { getValueFormatter } from '@leafygreen-ui/input-box';
import { eventContainingTargetValue } from '@leafygreen-ui/testing-lib';

import { DateSegment } from '../shared';
import { charsPerSegment, defaultMax, defaultMin } from '../shared/constants';
import {
  getFormattedDateString,
  getFormattedSegmentsFromDate,
} from '../shared/utils';

import {
  renderDatePicker,
  RenderDatePickerResult,
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

  describe('arrow keys interaction when Input is focused', () => {
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
      const formatter = getValueFormatter({
        charsPerSegment: charsPerSegment[segment],
      });
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
});
