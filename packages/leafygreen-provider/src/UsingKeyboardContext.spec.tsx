import React, { useContext } from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UsingKeyboardProvider, {
  NavigationKeyCodes,
  useUsingKeyboardContext,
  UsingKeyboardContext,
} from './UsingKeyboardContext';

const childTestID = 'using-keyboard-provider';
const buttonTestId = 'test-button';

function TestContextComponent() {
  const { usingKeyboard, setUsingKeyboard = () => {} } =
    useContext(UsingKeyboardContext);

  return (
    <>
      <div data-testid={childTestID}>
        {usingKeyboard !== undefined ? usingKeyboard.toString() : ''}
      </div>
      <button
        onClick={() => setUsingKeyboard(true)}
        data-testid={buttonTestId}
      />
    </>
  );
}

function renderProvider() {
  const utils = render(
    <UsingKeyboardProvider>
      <TestContextComponent />
    </UsingKeyboardProvider>,
  );
  const testChild = utils.getByTestId(childTestID);
  return { ...utils, testChild };
}

describe('packages/leafygreen-provider/UsingKeyboardProvider', () => {
  test('only renders children in the DOM', () => {
    const { container, testChild } = renderProvider();
    expect(container.firstChild).toBe(testChild);
  });

  test('usingKeyboard is initialized as true', () => {
    const { testChild } = renderProvider();
    expect(testChild.textContent).toBe('true');
  });

  Object.values(NavigationKeyCodes).forEach(keyCode => {
    test(`usingKeyboard is true after keydown event with keyCode: "${keyCode}" fires`, () => {
      const { testChild } = renderProvider();
      fireEvent.keyDown(document, {
        bubbles: true,
        keyCode: keyCode.toString(),
      });

      expect(testChild.textContent).toBe('true');
    });
  });

  test(`usingKeyboard is true after userEvent.tab`, () => {
    const { testChild } = renderProvider();
    userEvent.tab();
    expect(testChild.textContent).toBe('true');
  });

  test(`usingKeyboard is false after mousedown event fires`, () => {
    const { testChild } = renderProvider();
    fireEvent.mouseDown(document, { bubbles: true });
    expect(testChild.textContent).toBe('false');
  });

  test(`usingKeyboard is false after userEvent.click`, () => {
    const { testChild } = renderProvider();
    userEvent.click(testChild);
    expect(testChild.textContent).toBe('false');
  });

  test('when passed true, setUsingKeyboard sets usingKeyboard to true', () => {
    const { testChild, getByTestId } = renderProvider();

    // The button's click handler fires setUsingKeyboard(true)
    fireEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('true');
  });
});

function TestUseUsingKeyboardComponent({
  id,
  buttonId,
}: {
  id: string;
  buttonId?: string;
}) {
  const { usingKeyboard, setUsingKeyboard } = useUsingKeyboardContext();

  return (
    <>
      <div data-testid={id}>{usingKeyboard + ''}</div>
      <button
        data-testid={buttonId || ''}
        onClick={() => setUsingKeyboard(true)}
      />
    </>
  );
}

function renderUsingKeyboardComponent() {
  const utils = render(<TestUseUsingKeyboardComponent id={childTestID} />);
  const child = utils.getByTestId(childTestID);
  return { ...utils, child };
}

describe('useUsingKeyboardContext', () => {
  test('when child is not a descendent of UsingKeyboardProvider, usingKeyboard is true', () => {
    const { child } = renderUsingKeyboardComponent();

    expect(child.textContent).toBe('true');
  });

  describe('when child is a descendent of UsingKeyboardProvider', () => {
    // We use this function in each test to avoid events we fire from causing side-effects in other tests
    function renderTestComponent() {
      const renderedComponent = render(
        <UsingKeyboardProvider>
          <TestUseUsingKeyboardComponent
            id={childTestID}
            buttonId={buttonTestId}
          />
        </UsingKeyboardProvider>,
      );

      return {
        testChildElement: renderedComponent.getByTestId(childTestID),
        buttonElement: renderedComponent.getByTestId(buttonTestId),
      };
    }

    test('before interaction, usingKeyboard is true', () => {
      const { testChildElement } = renderTestComponent();
      expect(testChildElement.textContent).toBe('true');
    });

    test(`usingKeyboard is true after userEvent.tab`, () => {
      const { testChildElement } = renderTestComponent();
      userEvent.tab();
      expect(testChildElement.textContent).toBe('true');
    });

    test(`usingKeyboard is false after mousedown event fires`, () => {
      const { testChildElement } = renderTestComponent();
      fireEvent.mouseDown(document, { bubbles: true });
      expect(testChildElement.textContent).toBe('false');
    });

    test(`usingKeyboard is false after userEvent.click`, () => {
      const { testChildElement } = renderTestComponent();
      userEvent.click(testChildElement);
      expect(testChildElement.textContent).toBe('false');
    });

    test('after calling setUsingKeyboard passing true, usingKeyboard is true', () => {
      const { testChildElement, buttonElement } = renderTestComponent();

      fireEvent.click(buttonElement);

      expect(testChildElement.textContent).toBe('true');
    });
  });
});
