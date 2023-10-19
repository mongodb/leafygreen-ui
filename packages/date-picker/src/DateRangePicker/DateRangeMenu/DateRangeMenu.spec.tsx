import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { subDays } from 'date-fns';

import { MIN_DATE, Month } from '../../constants';
import { DatePickerProvider } from '../../DatePickerContext';
import { DateRangeType } from '../../types';
import { newUTC } from '../../utils';
import {
  DateRangeProvider,
  type DateRangeProviderProps,
} from '../DateRangeContext';

import { DateRangeMenu, type DateRangeMenuProps } from '.';

const renderDateRangeMenu = (
  props?: Partial<DateRangeMenuProps>,
  context?: Partial<DateRangeProviderProps>,
) => {
  const defaultContext = {
    value: undefined,
    setValue: () => {},
    handleValidation: () => {},
    rootRef: {} as React.Ref<any>,
  };

  const results = render(
    <DatePickerProvider value={{ label: '', initialOpen: true }}>
      <DateRangeProvider {...defaultContext} {...context}>
        <DateRangeMenu {...props} />
      </DateRangeProvider>
    </DatePickerProvider>,
  );

  return {
    ...results,
  };
};

const testToday = newUTC(2023, Month.December, 26);

describe('packages/date-picker/date-range-picker/menu', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

  const quickSelectButtonTestCases = [
    ['Today', [testToday, testToday]],
    ['Yesterday', [subDays(testToday, 1), subDays(testToday, 1)]],
    ['Last 7 days', [subDays(testToday, 7), testToday]],
    ['Last 30 days', [subDays(testToday, 30), testToday]],
    ['Last 90 days', [subDays(testToday, 90), testToday]],
    ['Last 12 months', [subDays(testToday, 365), testToday]],
    ['All time', [MIN_DATE, testToday]],
  ].map((arr, i) => [i, ...arr]) as Array<[number, string, DateRangeType]>;

  describe('Rendering', () => {
    describe('Quick select buttons', () => {
      test('Renders correct label: %p', () => {
        const { getAllByTestId } = renderDateRangeMenu({
          showQuickSelection: true,
        });
        const quickSelectButtons = getAllByTestId(
          'lg-date_picker-menu-quick-range-button',
        );

        for (let i = 0; i < quickSelectButtonTestCases.length; i++) {
          expect(quickSelectButtons[i]).toHaveAttribute('aria-label', i);
        }
      });
    });
  });

  describe('Mouse Interaction', () => {
    describe('Quick Select', () => {
      describe('Buttons fire the correct change & validation handlers', () => {
        const onRangeChange = jest.fn();
        const handleValidation = jest.fn();
        let quickSelectButtons: Array<HTMLElement>;

        beforeEach(() => {
          onRangeChange.mockClear();
          handleValidation.mockClear();
          const { getAllByTestId } = renderDateRangeMenu(
            { showQuickSelection: true },
            { setValue: onRangeChange, handleValidation },
          );
          quickSelectButtons = getAllByTestId(
            'lg-date_picker-menu-quick-range-button',
          );
        });

        test.each(quickSelectButtonTestCases)(
          '%p button',
          (i, _label, payload) => {
            userEvent.click(quickSelectButtons[i]);
            expect(onRangeChange).toHaveBeenCalledWith(payload);
            expect(handleValidation).toHaveBeenCalledWith(payload);
          },
        );
      });
    });
  });

  describe('Keyboard Interaction', () => {
    describe('Arrow keys', () => {
      test.todo('');
    });
  });
});
