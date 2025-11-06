import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TitleBar } from './TitleBar';
import { type TitleBarProps } from './TitleBar.types';

const TITLE_TEXT = 'LeafyGreen Chat';

const renderTitleBar = (
  props: Partial<TitleBarProps> = {},
  variant: Variant,
) => {
  return render(
    <LeafyGreenChatProvider variant={variant}>
      <TitleBar title={TITLE_TEXT} {...props} />
    </LeafyGreenChatProvider>,
  );
};

describe('TitleBar', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('a11y', () => {
    test('Compact variant does not have basic accessibility issues', async () => {
      const { container } = renderTitleBar({}, Variant.Compact);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('Spacious variant does not have basic accessibility issues', async () => {
      const { container } = renderTitleBar({}, Variant.Spacious);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Compact variant', () => {
    test('renders title text', () => {
      renderTitleBar({}, Variant.Compact);
      expect(screen.getByText(TITLE_TEXT)).toBeInTheDocument();
    });

    test('renders badge when badgeText is provided', () => {
      renderTitleBar({ badgeText: 'Beta' }, Variant.Compact);
      expect(screen.getByText('Beta')).toBeInTheDocument();
    });

    test('does not render Avatar', () => {
      renderTitleBar({}, Variant.Compact);
      // Avatar should not be rendered in compact variant
      expect(screen.queryByTestId('mongo-avatar')).not.toBeInTheDocument();
    });

    test('does not render IconButton', () => {
      renderTitleBar({ onClose: () => {} }, Variant.Compact);
      expect(
        screen.queryByRole('button', { name: 'Close chat' }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Spacious variant', () => {
    test('renders Avatar', () => {
      renderTitleBar({}, Variant.Spacious);
      // Avatar should be rendered in spacious variant
      expect(screen.getByTestId('mongo-avatar')).toBeInTheDocument();
    });

    test('renders IconButton when onClose is provided', () => {
      const handleClose = jest.fn();
      renderTitleBar({ onClose: handleClose }, Variant.Spacious);
      const closeButton = screen.getByRole('button', { name: 'Close chat' });
      expect(closeButton).toBeInTheDocument();
    });

    test('does not render IconButton when onClose is not provided', () => {
      renderTitleBar({}, Variant.Spacious);
      expect(
        screen.queryByRole('button', { name: 'Close chat' }),
      ).not.toBeInTheDocument();
    });

    test('renders custom icon when iconSlot is provided', () => {
      const CustomIcon = () => <span data-testid="custom-icon">×</span>;
      renderTitleBar(
        { iconSlot: <CustomIcon />, onClose: () => {} },
        Variant.Spacious,
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });
});
