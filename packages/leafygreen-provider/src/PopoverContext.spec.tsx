import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { PopoverProvider, usePopoverContext } from '.';

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

  test('isPopoverOpen is initialized as false', () => {
    const { testChild } = renderProvider();
    expect(testChild.textContent).toBe('false');
  });

  test('when passed true, setIsPopoverOpen sets isPopoverOpen to true', () => {
    const { testChild, getByTestId } = renderProvider();

    // The button's click handler fires setIsPopoverOpen(true)
    fireEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('true');
  });
});

function renderUsePopoverContext() {
  const utils = render(<TestContextComponent />);
  const testChild = utils.getByTestId(childTestID);
  return { ...utils, testChild };
}

describe('usePopoverContext', () => {
  test('when child is not a descendent of PopoverProvider, isPopoverOpen is false', () => {
    const { testChild } = renderUsePopoverContext();
    expect(testChild.textContent).toBe('false');
  });

  test('when child is not a descendent of PopoverProvider, isPopoverOpen is false when setIsPopoverOpen sets isPopoverOpen to true', () => {
    const { testChild, getByTestId } = renderUsePopoverContext();

    // The button's click handler fires setIsPopoverOpen(true)
    fireEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('false');
  });
});
