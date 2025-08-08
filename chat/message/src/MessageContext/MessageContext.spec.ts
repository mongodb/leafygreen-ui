import React from 'react';
import { render, screen } from '@testing-library/react';

import { MessageContext, useMessageContext } from '../MessageContext';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { messageBody } = useMessageContext();
  return React.createElement(
    'div',
    { 'data-testid': 'message-body' },
    messageBody,
  );
};

describe('MessageContext', () => {
  test('provides messageBody to children', () => {
    const testMessageBody = 'Test message content';

    render(
      React.createElement(
        MessageContext.Provider,
        { value: { messageBody: testMessageBody } },
        React.createElement(TestComponent),
      ),
    );

    expect(screen.getByTestId('message-body')).toHaveTextContent(
      testMessageBody,
    );
  });

  test('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(React.createElement(TestComponent));
    }).toThrow(
      'useMessageContext must be used within a MessageContextProvider',
    );

    console.error = originalError;
  });

  test('handles undefined messageBody', () => {
    render(
      React.createElement(
        MessageContext.Provider,
        { value: { messageBody: undefined } },
        React.createElement(TestComponent),
      ),
    );

    expect(screen.getByTestId('message-body')).toHaveTextContent('');
  });
});
