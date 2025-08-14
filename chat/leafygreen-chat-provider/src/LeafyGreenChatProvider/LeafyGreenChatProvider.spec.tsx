import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  LeafyGreenChatProvider,
  useLeafyGreenChatContext,
} from './LeafyGreenChatProvider';
import { Variant } from './LeafyGreenChatProvider.types';

const TestComponent = () => {
  const { variant, assistantName } = useLeafyGreenChatContext();
  return (
    <div>
      <div data-testid="test-variant">{variant}</div>
      <div data-testid="test-assistant-name">{assistantName}</div>
    </div>
  );
};

describe('LeafyGreenChatProvider', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  test('provides the default variant and assistantName to the context', () => {
    render(
      <LeafyGreenChatProvider>
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testVariant = screen.getByTestId('test-variant');
    const testAssistantName = screen.getByTestId('test-assistant-name');
    expect(testVariant.textContent).toBe(Variant.Compact);
    expect(testAssistantName.textContent).toBe('MongoDB Assistant');
  });

  test('provides the specified variant and assistantName to the context', () => {
    render(
      <LeafyGreenChatProvider
        variant={Variant.Spacious}
        assistantName="Custom Assistant"
      >
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testVariant = screen.getByTestId('test-variant');
    const testAssistantName = screen.getByTestId('test-assistant-name');
    expect(testVariant.textContent).toBe(Variant.Spacious);
    expect(testAssistantName.textContent).toBe('Custom Assistant');
  });

  test('allows overriding only the assistantName', () => {
    render(
      <LeafyGreenChatProvider assistantName="Custom Assistant">
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testVariant = screen.getByTestId('test-variant');
    const testAssistantName = screen.getByTestId('test-assistant-name');
    expect(testVariant.textContent).toBe(Variant.Compact);
    expect(testAssistantName.textContent).toBe('Custom Assistant');
  });
});
