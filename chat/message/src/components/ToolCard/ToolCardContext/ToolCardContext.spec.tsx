import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { State } from '../shared.types';

import { ToolCardProvider, useToolCardContext } from './ToolCardContext';

const TestComponent: React.FC = () => {
  const { isExpanded, showExpandButton, state, toggleExpand } =
    useToolCardContext();
  return (
    <div>
      <div data-testid="is-expanded">{String(isExpanded)}</div>
      <div data-testid="show-expand-button">{String(showExpandButton)}</div>
      <div data-testid="state">{state}</div>
      <button data-testid="toggle-button" onClick={toggleExpand}>
        Toggle
      </button>
    </div>
  );
};

describe('ToolCardContext', () => {
  test('provides context values to children', () => {
    const mockToggleExpand = jest.fn();
    const contextValue = {
      isExpanded: true,
      showExpandButton: true,
      state: State.Running,
      toggleExpand: mockToggleExpand,
    };

    render(
      <ToolCardProvider value={contextValue}>
        <TestComponent />
      </ToolCardProvider>,
    );

    expect(screen.getByTestId('is-expanded')).toHaveTextContent('true');
    expect(screen.getByTestId('show-expand-button')).toHaveTextContent('true');
    expect(screen.getByTestId('state')).toHaveTextContent(State.Running);
  });

  test('calls toggleExpand when toggle button is clicked', async () => {
    const mockToggleExpand = jest.fn();
    const contextValue = {
      isExpanded: false,
      showExpandButton: true,
      state: State.Idle,
      toggleExpand: mockToggleExpand,
    };

    render(
      <ToolCardProvider value={contextValue}>
        <TestComponent />
      </ToolCardProvider>,
    );

    const toggleButton = screen.getByTestId('toggle-button');
    await userEvent.click(toggleButton);

    expect(mockToggleExpand).toHaveBeenCalledTimes(1);
  });

  test('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      'useToolCardContext must be used within a ToolCardContextProvider',
    );

    console.error = originalError;
  });
});
