import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { PopoverProvider, usePopoverContext } from './PopoverContext';

const childTestID = 'modal-popover-provider';
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

function renderProvider() {
  const utils = render(
    <PopoverProvider>
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

    expect(result.current.isPopoverOpen).toBe(true);
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
