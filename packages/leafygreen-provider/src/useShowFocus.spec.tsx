import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import UsingKeyboardProvider, {
  NavigationKeyCodes,
  useShowFocus,
} from './UsingKeyboardProvider';

afterAll(cleanup);

const genID = () => Math.round(Math.random() * 1000000).toString();

describe('useShowFocus', () => {
  function TestUseShowFocusComponent({ id }: { id: string }) {
    const showFocus = useShowFocus();

    return <div data-testid={id}>{showFocus.toString()}</div>;
  }

  test('when child is not a descendent of UsingKeyboardProvider, useShowFocus always returns true', () => {
    const childTestId = genID();
    const { getByTestId } = render(
      <TestUseShowFocusComponent id={childTestId} />,
    );

    // Test initial state
    expect(getByTestId(childTestId).textContent).toBe('true');

    // Test state when unsupported event fires
    fireEvent.keyDown(document, {
      bubbles: true,
      keyCode: '65', // Letter "a"
    });

    expect(getByTestId(childTestId).textContent).toBe('true');

    // Test state when supported event fires
    fireEvent.keyDown(document, {
      bubbles: true,
      keyCode: NavigationKeyCodes.tab.toString(),
    });

    expect(getByTestId(childTestId).textContent).toBe('true');
  });

  describe('when child is a descendent of UsingKeyboardProvider', () => {
    // We use this function in each test to avoid events we fire from causing side-effects in other tests
    function renderTestComponent() {
      const childTestId = genID();

      const renderedComponent = render(
        <UsingKeyboardProvider>
          <TestUseShowFocusComponent id={childTestId} />
        </UsingKeyboardProvider>,
      );

      return renderedComponent.getByTestId(childTestId);
    }

    test('before user interaction, showFocus is false', () => {
      const testChildElement = renderTestComponent();

      expect(testChildElement.textContent).toBe('false');
    });

    test('after non-navigational keyboard interaction, showFocus is false', () => {
      const testChildElement = renderTestComponent();

      fireEvent.keyDown(document, {
        bubbles: true,
        keyCode: '65', // Letter "a"
      });

      expect(testChildElement.textContent).toBe('false');
    });

    test('after navigational keyboard interaction, showFocus is true', () => {
      const testChildElement = renderTestComponent();

      fireEvent.keyDown(document, {
        bubbles: true,
        keyCode: NavigationKeyCodes.tab.toString(),
      });

      expect(testChildElement.textContent).toBe('true');
    });
  });
});
