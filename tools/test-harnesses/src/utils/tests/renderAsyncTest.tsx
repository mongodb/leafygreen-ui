import React, { useState } from 'react';

export const renderAsyncTest = (element: React.ReactNode, render: any) => {
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
