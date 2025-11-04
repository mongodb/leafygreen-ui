import React from 'react';

import { isReact17, renderHook } from '@leafygreen-ui/testing-lib';

import {
  DateInputBoxProvider,
  useDateInputBoxContext,
} from './DateInputBoxContext';

describe('DateInputBoxContext', () => {
  test('throws error when used outside of DateInputBoxProvider', () => {
    /**
     * The version of `renderHook` imported from "@testing-library/react-hooks", (used in React 17)
     * has an error boundary, and doesn't throw errors as expected:
     * https://github.com/testing-library/react-hooks-testing-library/blob/main/src/index.ts#L5
     * */
    if (isReact17()) {
      const { result } = renderHook(() => useDateInputBoxContext());
      expect(result.error.message).toEqual(
        'useDateInputBoxContext must be used within a DateInputBoxProvider',
      );
    } else {
      expect(() => renderHook(() => useDateInputBoxContext())).toThrow(
        'useDateInputBoxContext must be used within a DateInputBoxProvider',
      );
    }
  });

  test('provides context values that match the props passed to the provider', () => {
    const value = new Date();
    const { result } = renderHook(() => useDateInputBoxContext(), {
      wrapper: ({ children }) => (
        <DateInputBoxProvider value={value}>{children}</DateInputBoxProvider>
      ),
    });
    expect(result.current.value).toEqual(value);
  });
});
