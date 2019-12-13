import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import UsingKeyboardProvider, {
  useUsingKeyboardContext,
} from './UsingKeyboardProvider';

afterAll(cleanup);

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
