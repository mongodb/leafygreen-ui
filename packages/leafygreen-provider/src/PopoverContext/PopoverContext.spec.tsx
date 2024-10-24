import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { PopoverProvider, usePopoverContext } from './PopoverContext';
import { type PopoverProviderProps } from './PopoverContext.types';

const childTestId = 'test-child';

describe('packages/leafygreen-provider/PopoverContext', () => {
  test('only renders children in the DOM', () => {
    const { container, getByTestId } = render(
      <PopoverProvider>
        <div data-testid={childTestId}>Child element</div>
      </PopoverProvider>,
    );
    const testChild = getByTestId(childTestId);

    expect(container.firstChild).toBe(testChild);
  });
});

describe('usePopoverContext', () => {
  test('passes provider props correctly', () => {
    const mockOnEnter = jest.fn();
    const customProps = {
      onEnter: mockOnEnter,
      popoverZIndex: 2,
      usePortal: true,
    };
    const { result } = renderHook(usePopoverContext, {
      wrapper: ({ children }) => (
        <PopoverProvider {...customProps}>{children}</PopoverProvider>
      ),
    });

    expect(result.current).toHaveProperty('onEnter', mockOnEnter);
    expect(result.current).toHaveProperty('popoverZIndex', 2);
    expect(result.current).toHaveProperty('usePortal', true);
  });
});
