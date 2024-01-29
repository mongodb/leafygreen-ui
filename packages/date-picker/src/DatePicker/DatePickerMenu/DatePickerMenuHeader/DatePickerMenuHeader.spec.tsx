import React, { createRef, PropsWithChildren, useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import { transitionDuration } from '@leafygreen-ui/tokens';

import {} from '../../../shared/components';
import {
  defaultSharedDatePickerContext,
  SharedDatePickerContext,
} from '../../../shared/context';
import {
  DatePickerContext,
  DatePickerContextProps,
} from '../../DatePickerContext';

import { DatePickerMenuHeader } from '.';

const MockSharedDatePickerProvider = SharedDatePickerContext.Provider;
const MockDatePickerProvider = DatePickerContext.Provider;
const mockRefs = {
  chevronButtonRefs: {
    left: createRef<HTMLButtonElement>(),
    right: createRef<HTMLButtonElement>(),
  },
};

describe('packages/date-picker/menu/header', () => {
  describe('Rendering', () => {
    describe('Some month options are disabled', () => {
      test('When `month` and `min` are the same year, earlier month options are disabled', async () => {
        const { getByLabelText, findAllByRole } = render(
          <MockSharedDatePickerProvider
            value={{
              ...defaultSharedDatePickerContext,
              min: newUTC(2022, Month.March, 10),
            }}
          >
            <MockDatePickerProvider
              value={
                {
                  refs: mockRefs,
                  month: newUTC(2022, Month.July, 1),
                } as DatePickerContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockDatePickerProvider>
          </MockSharedDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month', {
          exact: false,
        });

        userEvent.click(monthSelect);

        const options = await findAllByRole('option');

        for (const element of options) {
          expect(element).toBeInTheDocument();
          const monthIndex = Number(element.getAttribute('value'));

          if (monthIndex < Month.March) {
            expect(element).toHaveAttribute('aria-disabled', 'true');
          }
        }
      });

      test('When `month` and `max` are the same year, later month options are disabled', async () => {
        const { getByLabelText, findAllByRole } = render(
          <MockSharedDatePickerProvider
            value={{
              ...defaultSharedDatePickerContext,
              max: newUTC(2024, Month.September, 10),
            }}
          >
            <MockDatePickerProvider
              value={
                {
                  refs: mockRefs,
                  month: newUTC(2024, Month.July, 1),
                } as DatePickerContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockDatePickerProvider>
          </MockSharedDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month', {
          exact: false,
        });

        userEvent.click(monthSelect);

        const options = await findAllByRole('option');

        for (const element of options) {
          expect(element).toBeInTheDocument();
          const monthIndex = Number(element.getAttribute('value'));

          if (monthIndex > Month.September) {
            expect(element).toHaveAttribute('aria-disabled', 'true');
          }
        }
      });

      test('When `month` and `max`/`min` are different years, no month options are disabled', async () => {
        const { getByLabelText, findAllByRole } = render(
          <MockSharedDatePickerProvider
            value={{
              ...defaultSharedDatePickerContext,
              min: newUTC(2022, Month.March, 10),
              max: newUTC(2024, Month.September, 10),
            }}
          >
            <MockDatePickerProvider
              value={
                {
                  refs: mockRefs,
                  month: newUTC(2023, Month.July, 5),
                } as DatePickerContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockDatePickerProvider>
          </MockSharedDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month', {
          exact: false,
        });

        userEvent.click(monthSelect);

        const options = await findAllByRole('option');

        for (const element of options) {
          expect(element).toBeInTheDocument();

          expect(element).not.toHaveAttribute('aria-disabled', 'true');
        }
      });

      describe('When `year` is after `max`', () => {
        test('all options are disabled', async () => {
          const { getByLabelText, findAllByRole } = render(
            <MockSharedDatePickerProvider
              value={{
                ...defaultSharedDatePickerContext,
                min: newUTC(2022, Month.March, 10),
                max: newUTC(2024, Month.September, 10),
              }}
            >
              <MockDatePickerProvider
                value={
                  {
                    refs: mockRefs,
                    month: newUTC(2025, Month.July, 5),
                  } as DatePickerContextProps
                }
              >
                <DatePickerMenuHeader setMonth={() => {}} />
              </MockDatePickerProvider>
            </MockSharedDatePickerProvider>,
          );

          const monthSelect = getByLabelText('Select month', {
            exact: false,
          });

          userEvent.click(monthSelect);

          const options = await findAllByRole('option');

          for (const element of options) {
            expect(element).toBeInTheDocument();

            expect(element).toHaveAttribute('aria-disabled', 'true');
          }
        });

        test('placeholder text renders the invalid month/year', async () => {
          const { getByLabelText } = render(
            <MockSharedDatePickerProvider
              value={{
                ...defaultSharedDatePickerContext,
                min: newUTC(2022, Month.March, 10),
                max: newUTC(2024, Month.September, 10),
              }}
            >
              <MockDatePickerProvider
                value={
                  {
                    refs: mockRefs,
                    month: newUTC(2025, Month.July, 5),
                  } as DatePickerContextProps
                }
              >
                <DatePickerMenuHeader setMonth={() => {}} />
              </MockDatePickerProvider>
            </MockSharedDatePickerProvider>,
          );

          const monthSelect = getByLabelText('Select month', {
            exact: false,
          });
          const yearSelect = getByLabelText('Select year', {
            exact: false,
          });

          expect(monthSelect).toHaveTextContent('Jul');
          expect(yearSelect).toHaveTextContent('2025');
        });
      });

      describe('When `year` is before `min`', () => {
        test('all options are disabled', async () => {
          const { getByLabelText, findAllByRole } = render(
            <MockSharedDatePickerProvider
              value={{
                ...defaultSharedDatePickerContext,
                min: newUTC(2022, Month.March, 10),
                max: newUTC(2024, Month.September, 10),
              }}
            >
              <MockDatePickerProvider
                value={
                  {
                    refs: mockRefs,
                    month: newUTC(2021, Month.July, 5),
                  } as DatePickerContextProps
                }
              >
                <DatePickerMenuHeader setMonth={() => {}} />
              </MockDatePickerProvider>
            </MockSharedDatePickerProvider>,
          );

          const monthSelect = getByLabelText('Select month', {
            exact: false,
          });

          userEvent.click(monthSelect);

          const options = await findAllByRole('option');

          for (const element of options) {
            expect(element).toBeInTheDocument();

            expect(element).toHaveAttribute('aria-disabled', 'true');
          }
        });

        test('placeholder text renders the invalid month/year', async () => {
          const { getByLabelText } = render(
            <MockSharedDatePickerProvider
              value={{
                ...defaultSharedDatePickerContext,
                min: newUTC(2022, Month.March, 10),
                max: newUTC(2024, Month.September, 10),
              }}
            >
              <MockDatePickerProvider
                value={
                  {
                    refs: mockRefs,
                    month: newUTC(2021, Month.July, 5),
                  } as DatePickerContextProps
                }
              >
                <DatePickerMenuHeader setMonth={() => {}} />
              </MockDatePickerProvider>
            </MockSharedDatePickerProvider>,
          );

          const monthSelect = getByLabelText('Select month', {
            exact: false,
          });
          const yearSelect = getByLabelText('Select year', {
            exact: false,
          });

          expect(monthSelect).toHaveTextContent('Jul');
          expect(yearSelect).toHaveTextContent('2021');
        });
      });
    });
  });

  describe('Interaction', () => {
    const mockSetIsSelectOpen = jest.fn();

    beforeEach(() => {
      mockSetIsSelectOpen.mockClear();
      jest.useFakeTimers();
    });

    const AllMockProviders = ({ children }: PropsWithChildren<{}>) => {
      const [isSelectOpen, _setIsSelectOpen] = useState(false);

      const setIsSelectOpen = (action: React.SetStateAction<boolean>) => {
        mockSetIsSelectOpen(action);
        _setIsSelectOpen(action);
      };

      return (
        <MockSharedDatePickerProvider
          value={{
            ...defaultSharedDatePickerContext,
            isSelectOpen,
            setIsSelectOpen,
          }}
        >
          <MockDatePickerProvider
            value={
              {
                refs: mockRefs,
                month: newUTC(2022, Month.July, 1),
              } as DatePickerContextProps
            }
          >
            {children}
          </MockDatePickerProvider>
        </MockSharedDatePickerProvider>
      );
    };

    test('opening & closing a select menu calls `setIsSelectOpen` in SharedDatePickerContext', async () => {
      const { getByLabelText } = render(
        <AllMockProviders>
          <DatePickerMenuHeader setMonth={() => {}} />
        </AllMockProviders>,
      );

      const monthSelect = getByLabelText('Select month', {
        exact: false,
      });
      userEvent.click(monthSelect);
      await waitFor(() => {
        jest.advanceTimersByTime(transitionDuration.default);
        expect(mockSetIsSelectOpen).toHaveBeenCalledWith(true);
      });
      userEvent.click(monthSelect);

      await waitFor(() => {
        jest.advanceTimersByTime(transitionDuration.default);
        expect(mockSetIsSelectOpen).toHaveBeenCalledWith(false);
      });
    });
  });
});
