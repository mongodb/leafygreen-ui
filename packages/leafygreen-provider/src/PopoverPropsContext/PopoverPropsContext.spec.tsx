import React from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  PopoverPropsProvider,
  usePopoverPropsContext,
} from './PopoverPropsContext';

const childTestId = 'test-child';

describe('packages/leafygreen-provider/PopoverPropsContext', () => {
  test('only renders children in the DOM', () => {
    const { container, getByTestId } = render(
      <PopoverPropsProvider>
        <div data-testid={childTestId}>Child element</div>
      </PopoverPropsProvider>,
    );
    const testChild = getByTestId(childTestId);

    expect(container.firstChild).toBe(testChild);
  });
});

describe('usePopoverPropsContext', () => {
  test('passes provider props correctly', () => {
    const mockOnEnter = jest.fn();
    const customProps = {
      onEnter: mockOnEnter,
      popoverZIndex: 2,
      usePortal: true,
    };
    const { result } = renderHook(usePopoverPropsContext, {
      wrapper: ({ children }) => (
        <PopoverPropsProvider {...customProps}>{children}</PopoverPropsProvider>
      ),
    });

    expect(result.current).toHaveProperty('onEnter', mockOnEnter);
    expect(result.current).toHaveProperty('popoverZIndex', 2);
    expect(result.current).toHaveProperty('usePortal', true);
  });
});
