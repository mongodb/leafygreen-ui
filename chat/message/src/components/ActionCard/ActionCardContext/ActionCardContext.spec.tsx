import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ActionCardProvider, useActionCardContext } from './ActionCardContext';

const TestComponent: React.FC = () => {
  const { isExpanded, toggleExpand } = useActionCardContext();
  return (
    <div>
      <div data-testid="is-expanded">{String(isExpanded)}</div>
      <button data-testid="toggle-button" onClick={toggleExpand}>
        Toggle
      </button>
    </div>
  );
};

describe('ActionCardContext', () => {
  test('provides context values to children', () => {
    const mockToggleExpand = jest.fn();
    const contextValue = {
      isExpanded: true,
      toggleExpand: mockToggleExpand,
    };

    render(
      <ActionCardProvider value={contextValue}>
        <TestComponent />
      </ActionCardProvider>,
    );

    expect(screen.getByTestId('is-expanded')).toHaveTextContent('true');
  });

  test('calls toggleExpand when toggle button is clicked', async () => {
    const mockToggleExpand = jest.fn();
    const contextValue = {
      isExpanded: false,
      toggleExpand: mockToggleExpand,
    };

    render(
      <ActionCardProvider value={contextValue}>
        <TestComponent />
      </ActionCardProvider>,
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
      'useActionCardContext must be used within a ActionCardContextProvider',
    );

    console.error = originalError;
  });
});
