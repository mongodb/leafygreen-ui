import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';
import { getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select/testing';

import { TWENTY_FOUR_HOURS_TEXT } from '../constants';
import { TimeInputProvider } from '../Context/TimeInputContext/TimeInputContext';
import { TimeInputProviderProps } from '../Context/TimeInputContext/TimeInputContext.types';
import { TimeInputDisplayProvider } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { TimeInputDisplayProviderProps } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext.types';
import { getLgIds } from '../utils/getLgIds';

import { TimeInputInputs, TimeInputInputsProps } from '.';

const lgIds = getLgIds();

const renderTimeInputInputs = ({
  displayProps,
  providerProps,
  inputsProps,
}: {
  displayProps?: Partial<TimeInputDisplayProviderProps>;
  providerProps?: Partial<TimeInputProviderProps>;
  inputsProps?: Partial<TimeInputInputsProps>;
}) => {
  const defaultProviderProps: TimeInputProviderProps = {
    value: undefined,
    setValue: jest.fn(),
  };

  const mergedProviderProps = { ...defaultProviderProps, ...providerProps };

  const result = render(
    <TimeInputDisplayProvider {...displayProps}>
      <TimeInputProvider {...mergedProviderProps}>
        <TimeInputInputs {...inputsProps} />
      </TimeInputProvider>
    </TimeInputDisplayProvider>,
  );

  const rerenderTimeInputInputs = ({
    newDisplayProps,
    newProviderProps,
    newInputsProps,
  }: {
    newDisplayProps?: Partial<TimeInputDisplayProviderProps>;
    newProviderProps?: Partial<TimeInputProviderProps>;
    newInputsProps?: Partial<TimeInputInputsProps>;
  }) => {
    result.rerender(
      <TimeInputDisplayProvider {...displayProps} {...newDisplayProps}>
        <TimeInputProvider {...mergedProviderProps} {...newProviderProps}>
          <TimeInputInputs {...inputsProps} {...newInputsProps} />
        </TimeInputProvider>
      </TimeInputDisplayProvider>,
    );
  };

  // TODO: replace with test harnesses
  const hourInput = result.container.querySelector(
    'input[aria-label="hour"]',
  ) as HTMLInputElement;
  const minuteInput = result.container.querySelector(
    'input[aria-label="minute"]',
  ) as HTMLInputElement;
  const secondInput = result.container.querySelector(
    'input[aria-label="second"]',
  ) as HTMLInputElement;

  if (!(hourInput && minuteInput && secondInput)) {
    throw new Error('Some or all input segments are missing');
  }

  return {
    ...result,
    rerenderTimeInputInputs,
    hourInput,
    minuteInput,
    secondInput,
  };
};

describe('packages/time-input-inputs', () => {
  beforeEach(() => {
    // Mock the current date/time in UTC
    jest.useFakeTimers().setSystemTime(
      new Date(Date.UTC(2025, Month.January, 1, 0, 0, 0)), // January 1, 2025 00:00:00 UTC
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    test('Renders empty segments when the value is null', () => {
      const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
        providerProps: { value: null },
      });
      expect(hourInput.value).toBe('');
      expect(minuteInput.value).toBe('');
      expect(secondInput.value).toBe('');
    });

    test('Renders filled segments when a value is passed', () => {
      const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
        providerProps: { value: new Date('2025-01-01T00:00:00Z') },
        displayProps: {
          timeZone: 'UTC',
        },
      });
      expect(hourInput.value).toBe('00');
      expect(minuteInput.value).toBe('00');
      expect(secondInput.value).toBe('00');
    });

    test('Renders empty segments when an invalid value is passed', () => {
      const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
        providerProps: { value: new Date('invalid') },
      });
      expect(hourInput.value).toBe('');
      expect(minuteInput.value).toBe('');
      expect(secondInput.value).toBe('');
    });

    describe('Different time zones', () => {
      describe('UTC', () => {
        describe('en_US (12 hour format)', () => {
          test('Renders the segments and select unit', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'UTC',
                  locale: SupportedLocales.en_US,
                },
              });

            const selectTestUtils = getSelectTestUtils(lgIds.select);

            // February 20, 2025 00:00:00 UTC in en_US is February 20, 2025 12:00:00 AM (UTC-5 hours)
            expect(hourInput.value).toBe('12');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
            expect(selectTestUtils.getInputValue()).toBe('AM');
          });
        });
        describe('ISO_8601 (24 hour format)', () => {
          test('Renders the segments', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'UTC',
                  locale: SupportedLocales.ISO_8601,
                },
              });

            // February 20, 2025 00:00:00 UTC in ISO_8601 is February 20, 2025 00:00:00 (UTC+0 hours)
            expect(hourInput.value).toBe('00');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
          });
        });
      });
      describe('America/New_York', () => {
        describe('en_US (12 hour format)', () => {
          test('Renders the segments and select unit', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'America/New_York',
                  locale: SupportedLocales.en_US,
                },
              });

            const selectTestUtils = getSelectTestUtils(lgIds.select);

            // February 20, 2025 00:00:00 UTC in America/New_York is February 19, 2025 7:00:00 PM (UTC-5 hours)
            expect(hourInput.value).toBe('07');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
            expect(selectTestUtils.getInputValue()).toBe('PM');
          });
        });
        describe('ISO_8601 (24 hour format)', () => {
          test('Renders the segments', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'America/New_York',
                  locale: SupportedLocales.ISO_8601,
                },
              });

            // February 20, 2025 00:00:00 UTC in America/New_York is February 19, 2025 19:00:00 (UTC-5 hours)
            expect(hourInput.value).toBe('19');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
          });
        });
      });
      describe('Pacific/Kiritimati', () => {
        describe('en_US (12 hour format)', () => {
          test('Renders the segments and select unit', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'Pacific/Kiritimati',
                  locale: SupportedLocales.en_US,
                },
              });

            const selectTestUtils = getSelectTestUtils(lgIds.select);

            // February 20, 2025 00:00:00 UTC in Pacific/Kiritimati is February 20, 2025 2:00:00 PM (UTC+14 hours)
            expect(hourInput.value).toBe('02');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
            expect(selectTestUtils.getInputValue()).toBe('PM');
          });
        });
        describe('ISO_8601 (24 hour format)', () => {
          test('Renders the segments', () => {
            const { hourInput, minuteInput, secondInput } =
              renderTimeInputInputs({
                providerProps: {
                  value: new Date(newUTC(2025, Month.February, 20, 0, 0, 0)), // February 20, 2025 00:00:00 UTC
                },
                displayProps: {
                  timeZone: 'Pacific/Kiritimati',
                  locale: SupportedLocales.ISO_8601,
                },
              });

            // February 20, 2025 00:00:00 UTC in Pacific/Kiritimati is February 20, 2025 14:00:00 (UTC+14 hours)
            expect(hourInput.value).toBe('14');
            expect(minuteInput.value).toBe('00');
            expect(secondInput.value).toBe('00');
          });
        });
      });
    });

    describe('24 hour format', () => {
      test('does not render the select', () => {
        const { queryByTestId } = renderTimeInputInputs({
          displayProps: {
            locale: SupportedLocales.ISO_8601,
          },
        });
        expect(queryByTestId(lgIds.select)).not.toBeInTheDocument();
      });

      test('renders 24 Hour label ', () => {
        const { getByText } = renderTimeInputInputs({
          displayProps: {
            locale: SupportedLocales.ISO_8601,
          },
        });
        expect(getByText(TWENTY_FOUR_HOURS_TEXT)).toBeInTheDocument();
      });
    });

    describe('12 hour format', () => {
      test('renders the select', () => {
        renderTimeInputInputs({
          displayProps: {
            locale: SupportedLocales.en_US,
          },
        });
        const selectTestUtils = getSelectTestUtils(lgIds.select);
        expect(selectTestUtils.getInput()).toBeInTheDocument();
      });

      test('does not render 24 Hour label', () => {
        const { queryByText } = renderTimeInputInputs({
          displayProps: {
            locale: SupportedLocales.en_US,
          },
        });
        expect(queryByText(TWENTY_FOUR_HOURS_TEXT)).not.toBeInTheDocument();
      });
    });
  });

  describe('Re-rendering', () => {
    test('With new value updates the segments and select unit', () => {
      const { hourInput, minuteInput, secondInput, rerenderTimeInputInputs } =
        renderTimeInputInputs({
          providerProps: { value: new Date('2025-01-01T00:00:00Z') },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });
      const selectTestUtils = getSelectTestUtils(lgIds.select);

      expect(hourInput.value).toBe('12');
      expect(minuteInput.value).toBe('00');
      expect(secondInput.value).toBe('00');
      expect(selectTestUtils.getInputValue()).toBe('AM');

      rerenderTimeInputInputs({
        newProviderProps: { value: new Date('2025-01-02T20:20:20Z') },
      });
      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('20');
      expect(selectTestUtils.getInputValue()).toBe('PM');
    });

    test('With null clears the segments and keeps the select unit value', () => {
      const { hourInput, minuteInput, secondInput, rerenderTimeInputInputs } =
        renderTimeInputInputs({
          providerProps: { value: new Date('2025-01-01T00:00:00Z') },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });
      const selectTestUtils = getSelectTestUtils(lgIds.select);
      expect(hourInput.value).toBe('12');
      expect(minuteInput.value).toBe('00');
      expect(secondInput.value).toBe('00');
      expect(selectTestUtils.getInputValue()).toBe('AM');

      rerenderTimeInputInputs({
        newProviderProps: { value: null },
      });

      expect(hourInput.value).toBe('');
      expect(minuteInput.value).toBe('');
      expect(secondInput.value).toBe('');
      expect(selectTestUtils.getInputValue()).toBe('AM');
    });

    test('With invalid value does not update the segments or select unit', () => {
      const { hourInput, minuteInput, secondInput, rerenderTimeInputInputs } =
        renderTimeInputInputs({
          providerProps: { value: new Date('2025-01-01T20:20:30Z') },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });
      const selectTestUtils = getSelectTestUtils(lgIds.select);
      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('30');
      expect(selectTestUtils.getInputValue()).toBe('PM');

      rerenderTimeInputInputs({
        newProviderProps: { value: new Date('invalid') },
      });

      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('30');
      expect(selectTestUtils.getInputValue()).toBe('PM');
    });

    describe('TimeZone', () => {
      describe('UTC to America/New_York', () => {
        describe('en_US (12 hour format)', () => {
          test('updates the segments and select unit but does not call the value setter', () => {
            const setValue = jest.fn();
            const {
              hourInput,
              minuteInput,
              secondInput,
              rerenderTimeInputInputs,
            } = renderTimeInputInputs({
              providerProps: {
                value: new Date('2025-01-01T02:20:30Z'),
              },
              displayProps: {
                timeZone: 'UTC',
                locale: SupportedLocales.en_US,
              },
            });
            const selectTestUtils = getSelectTestUtils(lgIds.select);
            expect(hourInput.value).toBe('02');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');
            expect(selectTestUtils.getInputValue()).toBe('AM');

            rerenderTimeInputInputs({
              newDisplayProps: {
                timeZone: 'America/New_York',
              },
              newProviderProps: { setValue },
            });
            expect(hourInput.value).toBe('09');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');
            expect(selectTestUtils.getInputValue()).toBe('PM');

            expect(setValue).not.toHaveBeenCalled();
          });
        });
        describe('ISO_8601 (24 hour format)', () => {
          test('updates the segments but does not call the value setter', () => {
            const setValue = jest.fn();
            const {
              hourInput,
              minuteInput,
              secondInput,
              rerenderTimeInputInputs,
            } = renderTimeInputInputs({
              providerProps: { value: new Date('2025-01-01T02:20:30Z') },
              displayProps: {
                timeZone: 'UTC',
                locale: SupportedLocales.ISO_8601,
              },
            });
            expect(hourInput.value).toBe('02');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');

            rerenderTimeInputInputs({
              newDisplayProps: {
                timeZone: 'America/New_York',
              },
              newProviderProps: { setValue },
            });
            // 2025-01-01T02:20:30Z in America/New_York is December 31, 2024 21:20:30 (UTC-5 hours)
            expect(hourInput.value).toBe('21');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');

            expect(setValue).not.toHaveBeenCalled();
          });
        });
      });
      describe('UTC to Pacific/Kiritimati', () => {
        describe('en_US (12 hour format)', () => {
          test('updates the segments and select unit but does not call the value setter', () => {
            const setValue = jest.fn();
            const {
              hourInput,
              minuteInput,
              secondInput,
              rerenderTimeInputInputs,
            } = renderTimeInputInputs({
              providerProps: { value: new Date('2025-01-01T02:20:30Z') },
              displayProps: {
                timeZone: 'UTC',
                locale: SupportedLocales.en_US,
              },
            });
            const selectTestUtils = getSelectTestUtils(lgIds.select);
            expect(hourInput.value).toBe('02');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');
            expect(selectTestUtils.getInputValue()).toBe('AM');

            rerenderTimeInputInputs({
              newDisplayProps: {
                timeZone: 'Pacific/Kiritimati',
              },
              newProviderProps: { setValue },
            });
            // 2025-01-01T02:20:30Z in Pacific/Kiritimati is January 1, 2025 16:20:30 (UTC+14 hours) = 4:20:30 PM
            expect(hourInput.value).toBe('04');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');
            expect(selectTestUtils.getInputValue()).toBe('PM');

            expect(setValue).not.toHaveBeenCalled();
          });
        });
        describe('ISO_8601 (24 hour format)', () => {
          test('updates the segments but does not call the value setter', () => {
            const setValue = jest.fn();
            const {
              hourInput,
              minuteInput,
              secondInput,
              rerenderTimeInputInputs,
            } = renderTimeInputInputs({
              providerProps: { value: new Date('2025-01-01T02:20:30Z') },
              displayProps: {
                timeZone: 'UTC',
                locale: SupportedLocales.ISO_8601,
              },
            });
            expect(hourInput.value).toBe('02');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');

            rerenderTimeInputInputs({
              newDisplayProps: {
                timeZone: 'Pacific/Kiritimati',
              },
              newProviderProps: { setValue },
            });
            // 2025-01-01T02:20:30Z in Pacific/Kiritimati is January 1, 2025 16:20:30 (UTC+14 hours)
            expect(hourInput.value).toBe('16');
            expect(minuteInput.value).toBe('20');
            expect(secondInput.value).toBe('30');

            expect(setValue).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('Typing', () => {
    describe('Segment change handler', () => {
      describe('Single segment', () => {
        test.todo('is called when typing into a segment');
        test.todo('is called when deleting a segment');
      });
    });

    describe('Value setter', () => {
      describe('Single segment', () => {
        // component is not dirty yet
        test('is not called when typing into a segment', () => {
          const setValue = jest.fn();
          const { hourInput } = renderTimeInputInputs({
            providerProps: { value: null, setValue },
            displayProps: {
              timeZone: 'UTC',
              locale: SupportedLocales.en_US,
            },
          });

          userEvent.type(hourInput, '08');
          expect(setValue).not.toHaveBeenCalled();
        });
        test('is called when pressing backspace in a single segment (null date)', () => {
          const setValue = jest.fn();
          const { hourInput } = renderTimeInputInputs({
            providerProps: { value: null, setValue },
            displayProps: {
              timeZone: 'UTC',
            },
          });
          userEvent.type(hourInput, '08');
          userEvent.type(hourInput, '{backspace}');
          expect(setValue).toHaveBeenCalledWith(null);
        });
      });

      describe('With no initial value', () => {
        describe('With different time zones', () => {
          describe('UTC', () => {
            test('is called when typing an explicit value', () => {
              const setValue = jest.fn();

              const { hourInput, minuteInput, secondInput } =
                renderTimeInputInputs({
                  providerProps: { value: null, setValue },
                  displayProps: {
                    timeZone: 'UTC',
                  },
                });
              userEvent.type(hourInput, '08');
              userEvent.type(minuteInput, '20');
              userEvent.type(secondInput, '30');

              // Without a value, new Date() will be used to get the current date.
              // 2025-01-01T00:00:00Z UTC is January 1, 2025 00:00:00 in UTC (UTC+0 hours)
              expect(setValue).toHaveBeenCalledWith(
                new Date('2025-01-01T08:20:30Z'),
              );
            });
          });

          describe('America/New_York', () => {
            test('is called when typing an explicit value', () => {
              const setValue = jest.fn();

              const { hourInput, minuteInput, secondInput } =
                renderTimeInputInputs({
                  providerProps: { value: null, setValue },
                  displayProps: {
                    timeZone: 'America/New_York',
                  },
                });
              userEvent.type(hourInput, '08');
              userEvent.type(minuteInput, '20');
              userEvent.type(secondInput, '30');

              // Without a value, new Date() will be used to get the current date in the time zone.
              // current date is january 1, 2025 00:00:00 in UTC is December 31, 2024 in America/New_York
              // December 31, 2024 08:20:30 America/New_York is December 31, 2024 13:20:30 in UTC (UTC-5 hours)
              expect(setValue).toHaveBeenCalledWith(
                new Date('2024-12-31T13:20:30Z'),
              );
            });
          });

          describe('Pacific/Kiritimati', () => {
            test('is called when typing an explicit value', () => {
              const setValue = jest.fn();

              const { hourInput, minuteInput, secondInput } =
                renderTimeInputInputs({
                  providerProps: { value: null, setValue },
                  displayProps: {
                    timeZone: 'Pacific/Kiritimati',
                  },
                });
              userEvent.type(hourInput, '08');
              userEvent.type(minuteInput, '20');
              userEvent.type(secondInput, '30');

              // Without a value, new Date() will be used to get the current date in the time zone.
              // current date is january 1, 2025 00:00:00 in UTC is January 1, 2025 in Pacific/Kiritimati
              // January 1, 2025 08:20:30 Pacific/Kiritimati is December 31, 2024 18:20:30 in UTC (UTC+14 hours)
              expect(setValue).toHaveBeenCalledWith(
                new Date('2024-12-31T18:20:30Z'),
              );
            });
          });
        });

        test('is not called when typing an ambiguous value', () => {
          const setValue = jest.fn();
          const { hourInput, minuteInput, secondInput } = renderTimeInputInputs(
            {
              providerProps: { value: null, setValue },
              displayProps: {
                timeZone: 'UTC',
              },
            },
          );
          userEvent.type(hourInput, '08');
          userEvent.type(minuteInput, '20');
          userEvent.type(secondInput, '3');

          expect(setValue).not.toHaveBeenCalled();
        });
      });

      describe('With initial value', () => {
        test('is called when an explicit value is entered in a segment', () => {
          const setValue = jest.fn();

          const { hourInput, minuteInput, secondInput } = renderTimeInputInputs(
            {
              providerProps: {
                value: new Date('2025-01-01T08:20:30Z'),
                setValue,
              },
              displayProps: {
                timeZone: 'UTC',
              },
            },
          );
          expect(hourInput.value).toBe('08');
          expect(minuteInput.value).toBe('20');
          expect(secondInput.value).toBe('30');

          userEvent.type(hourInput, '09');

          expect(setValue).toHaveBeenCalledWith(
            new Date('2025-01-01T09:20:30Z'),
          );
        });
        test('is not called when an ambiguous value is entered in a segment', () => {
          const setValue = jest.fn();

          const { hourInput, minuteInput, secondInput } = renderTimeInputInputs(
            {
              providerProps: {
                value: new Date('2025-01-01T08:20:30Z'),
                setValue,
              },
              displayProps: {
                timeZone: 'UTC',
              },
            },
          );

          expect(hourInput.value).toBe('08');
          expect(minuteInput.value).toBe('20');
          expect(secondInput.value).toBe('30');

          userEvent.type(hourInput, '0');

          expect(setValue).not.toHaveBeenCalled();
        });

        test('is called when all inputs are cleared', () => {
          const setValue = jest.fn();
          const { hourInput, minuteInput, secondInput } = renderTimeInputInputs(
            {
              providerProps: {
                value: new Date('2025-01-01T08:20:30Z'),
                setValue,
              },
              displayProps: {
                timeZone: 'UTC',
              },
            },
          );

          expect(hourInput.value).toBe('08');
          expect(minuteInput.value).toBe('20');
          expect(secondInput.value).toBe('30');

          userEvent.type(secondInput, '{backspace}{backspace}');
          userEvent.type(minuteInput, '{backspace}{backspace}');
          userEvent.type(hourInput, '{backspace}{backspace}');
          expect(setValue).toHaveBeenCalledWith(null);
        });

        test('is called when the new date is invalid', () => {
          const setValue = jest.fn();
          const { hourInput, minuteInput, secondInput } = renderTimeInputInputs(
            {
              providerProps: {
                value: new Date('2025-01-01T08:20:30Z'),
                setValue,
              },
              displayProps: {
                timeZone: 'UTC',
              },
            },
          );

          expect(hourInput.value).toBe('08');
          expect(minuteInput.value).toBe('20');
          expect(secondInput.value).toBe('30');

          userEvent.type(secondInput, '{backspace}{backspace}');
          expect(setValue).toHaveBeenCalled();

          // Returns invalid date object
          const calledWith = setValue.mock.calls[0][0];
          expect(calledWith).toBeInstanceOf(Date);
          expect(calledWith.getTime()).toBeNaN();

          expect(hourInput.value).toBe('08');
          expect(minuteInput.value).toBe('20');
          expect(secondInput.value).toBe('');
        });
      });
    });
  });

  describe('Select', () => {
    test('calls the value setter when the select unit is changed if the segments are filled', () => {
      const setValue = jest.fn();

      const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
        providerProps: { value: new Date('2025-01-01T08:20:30Z'), setValue },
        displayProps: {
          timeZone: 'UTC',
          locale: SupportedLocales.en_US,
        },
      });

      const selectTestUtils = getSelectTestUtils(lgIds.select);

      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('30');
      expect(selectTestUtils.getInputValue()).toBe('AM');

      userEvent.click(selectTestUtils.getInput());
      userEvent.click(selectTestUtils.getOptionByValue('PM')!);
      expect(setValue).toHaveBeenCalledWith(new Date('2025-01-01T20:20:30Z'));

      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('30');
      expect(selectTestUtils.getInputValue()).toBe('PM');
    });

    test('does not call the value setter when the select unit is the same', () => {
      const setValue = jest.fn();

      const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
        providerProps: { value: new Date('2025-01-01T08:20:30Z'), setValue },
        displayProps: {
          timeZone: 'UTC',
          locale: SupportedLocales.en_US,
        },
      });

      const selectTestUtils = getSelectTestUtils(lgIds.select);

      expect(hourInput.value).toBe('08');
      expect(minuteInput.value).toBe('20');
      expect(secondInput.value).toBe('30');
      expect(selectTestUtils.getInputValue()).toBe('AM');

      userEvent.click(selectTestUtils.getInput());
      userEvent.click(selectTestUtils.getOptionByValue('AM')!);
      expect(setValue).not.toHaveBeenCalled();
    });

    describe('no initial value', () => {
      test('calls the value setter when the select unit is changed and all the segments are empty', () => {
        const setValue = jest.fn();
        const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
          providerProps: { value: null, setValue },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });

        const selectTestUtils = getSelectTestUtils(lgIds.select);

        expect(hourInput.value).toBe('');
        expect(minuteInput.value).toBe('');
        expect(secondInput.value).toBe('');
        expect(selectTestUtils.getInputValue()).toBe('AM');

        userEvent.click(selectTestUtils.getInput());
        userEvent.click(selectTestUtils.getOptionByValue('PM')!);
        expect(setValue).toHaveBeenCalledWith(null);

        expect(hourInput.value).toBe('');
        expect(minuteInput.value).toBe('');
        expect(secondInput.value).toBe('');
        expect(selectTestUtils.getInputValue()).toBe('PM');
      });
    });

    describe('with initial value', () => {
      test('calls the value setter when the select unit is changed and all the segments are empty', () => {
        const setValue = jest.fn();
        const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
          providerProps: { value: new Date('2025-01-01T08:20:30Z'), setValue },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });

        const selectTestUtils = getSelectTestUtils(lgIds.select);

        expect(hourInput.value).toBe('08');
        expect(minuteInput.value).toBe('20');
        expect(secondInput.value).toBe('30');
        expect(selectTestUtils.getInputValue()).toBe('AM');

        userEvent.click(selectTestUtils.getInput());
        userEvent.click(selectTestUtils.getOptionByValue('PM')!);
        expect(setValue).toHaveBeenCalledWith(new Date('2025-01-01T20:20:30Z'));

        expect(hourInput.value).toBe('08');
        expect(minuteInput.value).toBe('20');
        expect(secondInput.value).toBe('30');
        expect(selectTestUtils.getInputValue()).toBe('PM');
      });

      test('calls the value setter if some segments are empty', () => {
        const setValue = jest.fn();
        const { hourInput, minuteInput, secondInput } = renderTimeInputInputs({
          providerProps: { value: new Date('2025-01-01T08:20:30Z'), setValue },
          displayProps: {
            timeZone: 'UTC',
            locale: SupportedLocales.en_US,
          },
        });

        const selectTestUtils = getSelectTestUtils(lgIds.select);

        expect(hourInput.value).toBe('08');
        expect(minuteInput.value).toBe('20');
        expect(secondInput.value).toBe('30');
        expect(selectTestUtils.getInputValue()).toBe('AM');

        userEvent.type(secondInput, '{backspace}{backspace}');

        userEvent.click(selectTestUtils.getInput());
        userEvent.click(selectTestUtils.getOptionByValue('PM')!);
        expect(setValue).toHaveBeenCalled();

        // Returns invalid date object
        const calledWith = setValue.mock.calls[0][0];
        expect(calledWith).toBeInstanceOf(Date);
        expect(calledWith.getTime()).toBeNaN();
      });
    });
  });
});
