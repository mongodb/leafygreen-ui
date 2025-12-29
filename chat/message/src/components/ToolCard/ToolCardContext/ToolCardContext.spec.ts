import React from 'react';
import { render, screen } from '@testing-library/react';

import { State } from '../shared.types';

import { ToolCardContext, useToolCardContext } from './ToolCardContext';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { isExpanded, showExpandButton, state, toggleExpand } =
    useToolCardContext();
  return React.createElement(
    'div',
    {},
    React.createElement(
      'div',
      { 'data-testid': 'is-expanded' },
      String(isExpanded),
    ),
    React.createElement(
      'div',
      { 'data-testid': 'show-expand-button' },
      String(showExpandButton),
    ),
    React.createElement('div', { 'data-testid': 'state' }, state),
    React.createElement(
      'button',
      { 'data-testid': 'toggle-button', onClick: toggleExpand },
      'Toggle',
    ),
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
      React.createElement(
        ToolCardContext.Provider,
        { value: contextValue },
        React.createElement(TestComponent),
      ),
    );

    expect(screen.getByTestId('is-expanded')).toHaveTextContent('true');
    expect(screen.getByTestId('show-expand-button')).toHaveTextContent('true');
    expect(screen.getByTestId('state')).toHaveTextContent(State.Running);
  });

  test('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(React.createElement(TestComponent));
    }).toThrow(
      'useToolCardContext must be used within a ToolCardContextProvider',
    );

    console.error = originalError;
  });
});
