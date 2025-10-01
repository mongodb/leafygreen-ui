import React from 'react';
import { act } from '@testing-library/react';

import { SupportedLocales } from '@leafygreen-ui/date-utils';
import { Theme } from '@leafygreen-ui/lib';
import { renderHook } from '@leafygreen-ui/testing-lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Size } from '../../TimeInput/TimeInput.types';

import {
  TimeInputDisplayProvider,
  useTimeInputDisplayContext,
} from './TimeInputDisplayContext';
import { type TimeInputDisplayProviderProps } from './TimeInputDisplayContext.types';
import { defaultTimeInputDisplayContext } from './TimePickerDisplayContext.utils';

const renderTimeInputDisplayProvider = (
  props?: Partial<TimeInputDisplayProviderProps>,
) => {
  const { result, rerender } = renderHook(() => useTimeInputDisplayContext(), {
    wrapper: ({ children }: { children?: React.ReactNode }) => (
      <TimeInputDisplayProvider {...props}>{children}</TimeInputDisplayProvider>
    ),
  });

  return { result, rerender };
};

describe('packages/time-input-display-context', () => {
  describe('useTimeInputDisplayContext', () => {
    test('provides all default context values when no props are passed', () => {
      const { result } = renderTimeInputDisplayProvider({});

      // Test all default values from defaultTimeInputDisplayContext
      expect(result.current.ariaLabelProp).toBe(
        defaultTimeInputDisplayContext.ariaLabelProp,
      );
      expect(result.current.ariaLabelledbyProp).toBe(
        defaultTimeInputDisplayContext.ariaLabelledbyProp,
      );
      expect(result.current.label).toBe(defaultTimeInputDisplayContext.label);
      expect(result.current.description).toBe(
        defaultTimeInputDisplayContext.description,
      );
      expect(result.current.locale).toBe(defaultTimeInputDisplayContext.locale);
      expect(result.current.timeZone).toBe(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      );
      expect(result.current.min).toEqual(defaultTimeInputDisplayContext.min);
      expect(result.current.max).toEqual(defaultTimeInputDisplayContext.max);
      expect(result.current.baseFontSize).toBe(BaseFontSize.Body1);
      expect(result.current.disabled).toBe(
        defaultTimeInputDisplayContext.disabled,
      );
      expect(result.current.size).toBe(defaultTimeInputDisplayContext.size);
      expect(result.current.errorMessage).toBe(
        defaultTimeInputDisplayContext.errorMessage,
      );
      expect(result.current.darkMode).toBe(
        defaultTimeInputDisplayContext.darkMode,
      );
      expect(result.current.theme).toBe(defaultTimeInputDisplayContext.theme);
      expect(result.current.isDirty).toBe(
        defaultTimeInputDisplayContext.isDirty,
      );
      expect(typeof result.current.setIsDirty).toBe('function');
    });

    test('overrides default values with provided props', () => {
      const customProps: Partial<TimeInputDisplayProviderProps> = {
        label: 'Custom Label',
        'aria-label': 'Custom Aria Label',
        'aria-labelledby': 'custom-labelledby',
        description: 'Custom description',
        locale: SupportedLocales.en_US,
        timeZone: 'America/New_York',
        disabled: true,
        size: Size.Large,
        errorMessage: 'Custom error message',
        darkMode: true,
      };

      const { result } = renderTimeInputDisplayProvider(customProps);

      expect(result.current.label).toBe('Custom Label');
      expect(result.current.ariaLabelProp).toBe('Custom Aria Label');
      expect(result.current.ariaLabelledbyProp).toBe('custom-labelledby');
      expect(result.current.description).toBe('Custom description');
      expect(result.current.locale).toBe(SupportedLocales.en_US);
      expect(result.current.timeZone).toBe('America/New_York');
      expect(result.current.disabled).toBe(true);
      expect(result.current.size).toBe(Size.Large);
      expect(result.current.errorMessage).toBe('Custom error message');
      expect(result.current.darkMode).toBe(true);
      expect(result.current.theme).toBe(Theme.Dark);
    });

    describe('isDirty', () => {
      test('is `false` by default', () => {
        const { result } = renderTimeInputDisplayProvider();
        expect(result.current.isDirty).toBe(false);
      });

      test('setter updates the value to `true`', () => {
        const { result } = renderTimeInputDisplayProvider();
        expect(result.current.isDirty).toBe(false);
        act(() => {
          result.current.setIsDirty(true);
        });
        expect(result.current.isDirty).toBe(true);
      });

      test('setter updates with function update', () => {
        const { result } = renderTimeInputDisplayProvider();
        expect(result.current.isDirty).toBe(false);
        act(() => {
          result.current.setIsDirty(prev => !prev);
        });
        expect(result.current.isDirty).toBe(true);
      });
    });
  });
});
