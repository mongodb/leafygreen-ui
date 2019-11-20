import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import UsingKeyboardProvider, {
  NavigationKeyCodes,
  UsingKeyboardContext,
} from './UsingKeyboardProvider';

afterAll(cleanup);

describe('packages/leafygreen-provider/UsingKeyboardProvider', () => {
  const childTestID = 'using-keyboard-provider';
  const buttonTestId = 'test-button'

  function TestContextComponent() {
    const {
      usingKeyboard,
      setUsingKeyboard = () => {},
    } = useContext(UsingKeyboardContext);

    return (
      <>
        <div data-testid={childTestID}>
          {usingKeyboard !== undefined ? usingKeyboard.toString() : ''}
        </div>
        <button onClick={() => setUsingKeyboard(true)} data-testid={buttonTestId}/>
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

  test ('when passed true, setUsingKeyboard sets usingKeyboard to true', () => {
    // The button's click handler fires setUsingKeyboard(true)
    fireEvent.click(getByTestId(buttonTestId));

    expect(testChild.textContent).toBe('true');
  })
});
