import React, { PropsWithChildren, useState } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import {
  PopoverContext,
  usePopoverContext,
} from '@leafygreen-ui/leafygreen-provider';

import { Month, newUTC } from '../../../shared';
import {
  DatePickerContext,
  defaultDatePickerContext,
} from '../../../shared/components';
import {
  SingleDateContext,
  SingleDateContextProps,
} from '../../SingleDateContext';

import { DatePickerMenuHeader } from '.';

const MockDatePickerProvider = DatePickerContext.Provider;
const MockSingleDateProvider = SingleDateContext.Provider;

describe('packages/date-picker/menu/header', () => {
  describe('Rendering', () => {
    describe('Some month options are disabled', () => {
      test('When `month` and `min` are the same year, earlier month options are disabled', async () => {
        const { getByLabelText, findAllByRole } = render(
          <MockDatePickerProvider
            value={{
              ...defaultDatePickerContext,
              min: newUTC(2022, Month.March, 10),
            }}
          >
            <MockSingleDateProvider
              value={
                {
                  month: newUTC(2022, Month.July, 1),
                } as SingleDateContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockSingleDateProvider>
          </MockDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month');

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
          <MockDatePickerProvider
            value={{
              ...defaultDatePickerContext,
              max: newUTC(2024, Month.September, 10),
            }}
          >
            <MockSingleDateProvider
              value={
                {
                  month: newUTC(2024, Month.July, 1),
                } as SingleDateContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockSingleDateProvider>
          </MockDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month');

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
          <MockDatePickerProvider
            value={{
              ...defaultDatePickerContext,
              min: newUTC(2022, Month.March, 10),
              max: newUTC(2024, Month.September, 10),
            }}
          >
            <MockSingleDateProvider
              value={
                {
                  month: newUTC(2023, Month.July, 5),
                } as SingleDateContextProps
              }
            >
              <DatePickerMenuHeader setMonth={() => {}} />
            </MockSingleDateProvider>
          </MockDatePickerProvider>,
        );

        const monthSelect = getByLabelText('Select month');

        userEvent.click(monthSelect);

        const options = await findAllByRole('option');

        for (const element of options) {
          expect(element).toBeInTheDocument();

          expect(element).not.toHaveAttribute('aria-disabled', 'true');
        }
      });
    });
  });

  describe('Interaction', () => {
    const mockSetIsPopoverOpen = jest.fn();

    beforeEach(() => {
      mockSetIsPopoverOpen.mockClear();
    });

    const AllMockProviders = ({ children }: PropsWithChildren<{}>) => {
      const [isPopoverOpen, _setIsPopoverOpen] = useState(false);

      const setIsPopoverOpen = (action: React.SetStateAction<boolean>) => {
        mockSetIsPopoverOpen(action);
        _setIsPopoverOpen(action);
      };

      return (
        <MockDatePickerProvider
          value={{
            ...defaultDatePickerContext,
          }}
        >
          <MockSingleDateProvider
            value={
              {
                month: newUTC(2022, Month.July, 1),
              } as SingleDateContextProps
            }
          >
            <PopoverContext.Provider
              value={{
                isPopoverOpen,
                setIsPopoverOpen,
              }}
            >
              {children}
            </PopoverContext.Provider>
          </MockSingleDateProvider>
        </MockDatePickerProvider>
      );
    };

    test('opening & closing a select menu calls `setIsPopoverOpen` in PopoverContext', async () => {
      const { getByLabelText } = render(
        <AllMockProviders>
          <DatePickerMenuHeader setMonth={() => {}} />
        </AllMockProviders>,
      );

      const monthSelect = getByLabelText('Select month');
      userEvent.click(monthSelect);
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true),
      );
      userEvent.click(monthSelect);
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(false),
      );
    });

    test('Hook returns correct values', async () => {
      const { result } = renderHook(usePopoverContext, {
        wrapper: AllMockProviders,
      });

      expect(result.current.isPopoverOpen).toBe(false);
      expect(result.current.setIsPopoverOpen).toBeDefined();

      act(() => result.current.setIsPopoverOpen(true));
      expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true);
      expect(result.current.isPopoverOpen).toBe(true);
    });
  });
});
