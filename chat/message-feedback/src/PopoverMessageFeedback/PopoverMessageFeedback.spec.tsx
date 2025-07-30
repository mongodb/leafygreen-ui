import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';

import { PopoverMessageFeedback } from '.';

const defaultProps = {
  label: 'Was this response helpful?',
  active: true,
  'data-testid': 'popover-message-feedback',
  onCancel: jest.fn(),
};

// Mock the ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('packages/popover-message-feedback', () => {
  test('renders null when LeafyGreenChatProvider variant is compact', () => {
    render(
      <LeafyGreenChatProvider variant={Variant.Compact}>
        <PopoverMessageFeedback {...defaultProps} />
      </LeafyGreenChatProvider>,
    );
    expect(screen.queryByTestId('popover-message-feedback')).toBeNull();
  });

  test('renders when LeafyGreenChatProvider variant is spacious', () => {
    render(
      <LeafyGreenChatProvider variant={Variant.Spacious}>
        <PopoverMessageFeedback {...defaultProps} />
      </LeafyGreenChatProvider>,
    );
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });
});
