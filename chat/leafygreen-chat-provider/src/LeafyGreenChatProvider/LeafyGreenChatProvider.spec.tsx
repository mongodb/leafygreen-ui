import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  LeafyGreenChatProvider,
  useLeafyGreenChatContext,
} from './LeafyGreenChatProvider';
import { Variant } from './LeafyGreenChatProvider.types';

beforeAll(() => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

const TestComponent = () => {
  const { variant } = useLeafyGreenChatContext();
  return <div data-testid="test-component">{variant}</div>;
};

describe('LeafyGreenChatProvider', () => {
  it('provides the default variant to the context', () => {
    render(
      <LeafyGreenChatProvider>
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testComponent = screen.getByTestId('test-component');
    expect(testComponent.textContent).toBe(Variant.Spacious);
  });

  it('provides the specified variant to the context', () => {
    render(
      <LeafyGreenChatProvider variant={Variant.Compact}>
        <TestComponent />
      </LeafyGreenChatProvider>,
    );

    const testComponent = screen.getByTestId('test-component');
    expect(testComponent.textContent).toBe(Variant.Compact);
  });
});
