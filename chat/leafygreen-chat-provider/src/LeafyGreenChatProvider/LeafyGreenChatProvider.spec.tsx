import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  LeafyGreenChatProvider,
  useLeafyGreenChatContext,
} from './LeafyGreenChatProvider';

const TestComponent = () => {
  const { assistantName } = useLeafyGreenChatContext();
  return <div data-testid="test-assistant-name">{assistantName}</div>;
};

describe('LeafyGreenChatProvider', () => {
  test('provides the default assistantName to the context', () => {
    render(
      <LeafyGreenChatProvider>
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testAssistantName = screen.getByTestId('test-assistant-name');
    expect(testAssistantName.textContent).toBe('MongoDB Assistant');
  });

  test('provides the specified assistantName to the context', () => {
    render(
      <LeafyGreenChatProvider assistantName="Custom Assistant">
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testAssistantName = screen.getByTestId('test-assistant-name');
    expect(testAssistantName.textContent).toBe('Custom Assistant');
  });
});
