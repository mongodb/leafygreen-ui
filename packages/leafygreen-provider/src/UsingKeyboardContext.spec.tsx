import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import UsingKeyboardProvider, {
  NavigationKeyCodes,
  UsingKeyboardContext,
  useUsingKeyboardContext,
} from './UsingKeyboardContext';

afterAll(cleanup);

describe('packages/leafygreen-provider/UsingKeyboardProvider', () => {
  const childTestID = 'using-keyboard-provider';
  const buttonTestId = 'test-button';

  function TestContextComponent() {
    const { usingKeyboard, setUsingKeyboard = () => {} } = useContext(
      UsingKeyboardContext,
    );

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

  const { container, getByTestId } = render(
    <UsingKeyboardProvider>
      <TestContextComponent />
    </UsingKeyboardProvider>,
  );

  const testChild = getByTestId(childTestID);

  test('only renders children in the DOM', () => {
    expect(container.firstChild).toBe(testChild);
  });

  test('usingKeyboard is initialized as false', () => {
    expect(testChild.textContent).toBe('false');
  });

  Object.values(NavigationKeyCodes).forEach(keyCode => {
    test(`usingKeyboard is true after keydown event with keyCode: "${keyCode}" fires`, () => {
      fireEvent.keyDown(document, {
        bubbles: true,
        keyCode: keyCode.toString(),
      });

      expect(testChild.textContent).toBe('true');
    });
  });

  test(`usingKeyboard is false after mousedown event fires`, () => {
    fireEvent.mouseDown(document, {
      bubbles: true,
    });

    expect(testChild.textContent).toBe('false');
  });

  test('when passed true, setUsingKeyboard sets usingKeyboard to true', () => {
    // The button's click handler fires setUsingKeyboard(true)
    fireEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('true');
  });
});

const genId = () => Math.round(Math.random() * 1000000).toString();

describe('useUsingKeyboardContext', () => {
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

  test('when child is not a descendent of UsingKeyboardProvider, usingKeyboard is true', () => {
    const childTestId = genId();
    const { getByTestId } = render(
      <TestUseUsingKeyboardComponent id={childTestId} />,
    );

    expect(getByTestId(childTestId).textContent).toBe('true');
  });

  describe('when child is a descendent of UsingKeyboardProvider', () => {
    // We use this function in each test to avoid events we fire from causing side-effects in other tests
    function renderTestComponent() {
      const childTestId = genId();
      const buttonId = genId();

      const renderedComponent = render(
        <UsingKeyboardProvider>
          <TestUseUsingKeyboardComponent id={childTestId} buttonId={buttonId} />
        </UsingKeyboardProvider>,
      );

      return {
        testChildElement: renderedComponent.getByTestId(childTestId),
        buttonElement: renderedComponent.getByTestId(buttonId),
      };
    }

    test('before interaction, usingKeyboard is false', () => {
      const { testChildElement } = renderTestComponent();

      expect(testChildElement.textContent).toBe('false');
    });

    test('after calling setUsingKeyboard passing true, usingKeyboard is true', () => {
      const { testChildElement, buttonElement } = renderTestComponent();

      fireEvent.click(buttonElement);

      expect(testChildElement.textContent).toBe('true');
    });
  });
});
