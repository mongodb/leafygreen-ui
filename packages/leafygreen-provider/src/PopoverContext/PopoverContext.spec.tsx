import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  PopoverProvider,
  type PopoverProviderProps,
  usePopoverContext,
} from '.';

const childTestID = 'popover-provider';
const buttonTestId = 'test-button';

function TestContextComponent() {
  const { isPopoverOpen, setIsPopoverOpen } = usePopoverContext();

  return (
    <>
      <div data-testid={childTestID}>
        {isPopoverOpen !== undefined ? isPopoverOpen.toString() : ''}
      </div>
      <button
        onClick={() => setIsPopoverOpen(true)}
        data-testid={buttonTestId}
      />
    </>
  );
}

function renderProvider(props?: PopoverProviderProps) {
  const utils = render(
    <PopoverProvider {...props}>
      <TestContextComponent />
    </PopoverProvider>,
  );
  const testChild = utils.getByTestId(childTestID);
  return { ...utils, testChild };
}

describe('packages/leafygreen-provider/PopoverContext', () => {
  test('only renders children in the DOM', () => {
    const { container, testChild } = renderProvider();
    expect(container.firstChild).toBe(testChild);
  });

  test('`isPopoverOpen` is initialized as false', () => {
    const { testChild } = renderProvider();
    expect(testChild.textContent).toBe('false');
  });

  test('when passed true, `setIsPopoverOpen` sets `isPopoverOpen` to true', () => {
    const { testChild, getByTestId } = renderProvider();

    // The button's click handler fires setIsPopoverOpen(true)
    userEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('true');
  });
});

describe('usePopoverContext', () => {
  test('`isPopoverOpen` is `false` by default', () => {
    const { result } = renderHook(usePopoverContext);
    expect(result.current.isPopoverOpen).toBeFalsy();
  });

  test('`setIsPopoverOpen` updates the value of `isPopoverOpen`', async () => {
    const { result, rerender } = renderHook(usePopoverContext, {
      wrapper: ({ children }) => <PopoverProvider>{children}</PopoverProvider>,
    });

    act(() => result.current.setIsPopoverOpen(true));
    rerender();
    await waitFor(() => {
      expect(result.current.isPopoverOpen).toBe(true);
    });
  });

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

  describe('with test component', () => {
    function renderTestComponent() {
      const utils = render(<TestContextComponent />);
      const testChild = utils.getByTestId(childTestID);
      return { ...utils, testChild };
    }

    test('when child is not a descendent of PopoverProvider, isPopoverOpen is false', () => {
      const { testChild } = renderTestComponent();
      expect(testChild.textContent).toBe('false');
    });

    test('when child is not a descendent of PopoverProvider, isPopoverOpen is false when setIsPopoverOpen sets isPopoverOpen to true', () => {
      const { testChild, getByTestId } = renderTestComponent();

      // The button's click handler fires setIsPopoverOpen(true)
      userEvent.click(getByTestId(buttonTestId));

      expect(testChild.textContent).toBe('false');
    });
  });
});
