import React, { useState } from 'react';

interface RenderAsyncTestReturnType {
  openButton: HTMLButtonElement;
  asyncTestComponentId: string;
  [key: string]: any;
}

/**
 * An example of a modal-like component that opens after a delay.
 * This component can be utilized within a test suite to locate an element nested within another element that becomes visible after a delay.
 */
export const renderAsyncTest = (
  element: React.ReactNode,
  render: any,
): RenderAsyncTestReturnType => {
  const asyncTestComponentId = 'async-test-component';

  const AsyncTestWrapper = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      if (open) {
        setOpen(false);
        return;
      }

      setTimeout(() => {
        setOpen(true);
      }, 500);
    };

    return (
      <>
        <button
          data-testid="test-component-button"
          onClick={handleClick}
        ></button>
        {open && (
          <div data-testid={asyncTestComponentId}>
            <>
              <p>Inside Modal</p>
              {element}
            </>
          </div>
        )}
      </>
    );
  };

  const renderUtils = render(<AsyncTestWrapper />);
  const openButton = renderUtils.getByTestId('test-component-button');

  return {
    ...renderUtils,
    openButton,
    asyncTestComponentId,
  };
};
