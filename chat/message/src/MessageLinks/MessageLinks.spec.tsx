import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MessageLinks } from './MessageLinks';
import { MessageLinksProps } from './MessageLinks.types';

// Mock RichLinksArea component
jest.mock('@lg-chat/rich-links', () => ({
  RichLinksArea: jest.fn(({ links, onLinkClick, ...props }) => (
    <div data-testid="rich-links-area" {...props}>
      {links.map((link: any, index: number) => (
        <a key={index} href={link.href} onClick={onLinkClick}>
          {link.children}
        </a>
      ))}
    </div>
  )),
}));

const mockLinks = [
  { children: 'Link 1', href: 'https://example.com/1' },
  { children: 'Link 2', href: 'https://example.com/2' },
  { children: 'Link 3', href: 'https://example.com/3' },
];

const defaultProps: MessageLinksProps = {
  links: mockLinks,
};

const renderMessageLinks = (
  props: Partial<MessageLinksProps> = {},
  variant: Variant = Variant.Compact,
) => {
  return render(
    <LeafyGreenChatProvider variant={variant}>
      <MessageLinks {...defaultProps} {...props} />
    </LeafyGreenChatProvider>,
  );
};

describe('MessageLinks', () => {
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
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessageLinks();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has proper ARIA attributes', () => {
      const { container } = renderMessageLinks();

      const toggleButton = screen.getByRole('button');
      // Use container.querySelector since the region might be hidden
      const contentRegion = container.querySelector('[role="region"]');
      const heading = screen.getByText('Related Resources');

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).toHaveAttribute('aria-controls');
      expect(toggleButton).toHaveAttribute(
        'aria-label',
        'Expand Related Resources',
      );

      expect(contentRegion).toHaveAttribute('aria-labelledby', heading.id);
      expect(contentRegion).toHaveAttribute(
        'id',
        toggleButton.getAttribute('aria-controls'),
      );
    });
  });

  describe('rendering', () => {
    test('renders with default heading text', () => {
      renderMessageLinks();
      expect(screen.getByText('Related Resources')).toBeInTheDocument();
    });

    test('renders with custom heading text', () => {
      const customHeading = 'Custom Links';
      renderMessageLinks({ headingText: customHeading });
      expect(screen.getByText(customHeading)).toBeInTheDocument();
    });

    test('renders toggle button', () => {
      renderMessageLinks();
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
    });

    test('renders RichLinksArea with provided links', () => {
      renderMessageLinks();
      const richLinksArea = screen.getByTestId('rich-links-area');
      expect(richLinksArea).toBeInTheDocument();

      // Check that links are passed to RichLinksArea
      mockLinks.forEach(link => {
        expect(screen.getByText(link.children)).toBeInTheDocument();
      });
    });
  });

  describe('expand/collapse behavior', () => {
    test('starts in collapsed state by default', () => {
      const { container } = renderMessageLinks();
      const toggleButton = screen.getByRole('button');
      const contentRegion = container.querySelector('[role="region"]');

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).toHaveAttribute(
        'aria-label',
        'Expand Related Resources',
      );
      expect(contentRegion).not.toBeVisible();
    });

    test('expands when toggle button is clicked', async () => {
      const { container } = renderMessageLinks();

      const toggleButton = screen.getByRole('button');
      const contentRegion = container.querySelector('[role="region"]');

      await userEvent.click(toggleButton);

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      expect(toggleButton).toHaveAttribute(
        'aria-label',
        'Collapse Related Resources',
      );

      // Content should become visible (opacity and visibility change immediately, height animates)
      await waitFor(() => {
        expect(contentRegion).toBeVisible();
      });
    });

    test('collapses when toggle button is clicked again', async () => {
      const { container } = renderMessageLinks();

      const toggleButton = screen.getByRole('button');
      const contentRegion = container.querySelector('[role="region"]');

      // First click to expand
      await userEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });

      // Second click to collapse
      await userEvent.click(toggleButton);

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).toHaveAttribute(
        'aria-label',
        'Expand Related Resources',
      );
      expect(contentRegion).not.toBeVisible();
    });
  });

  describe('callback handling', () => {
    test('calls onLinkClick when link is clicked', async () => {
      const mockOnLinkClick = jest.fn();

      renderMessageLinks({ onLinkClick: mockOnLinkClick });

      const toggleButton = screen.getByRole('button');
      await userEvent.click(toggleButton);

      // Wait for expansion and then click a link
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });

      const firstLink = screen.getByText('Link 1');
      await userEvent.click(firstLink);

      expect(mockOnLinkClick).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    test('toggle button is focusable', () => {
      renderMessageLinks();
      const toggleButton = screen.getByRole('button');

      toggleButton.focus();
      expect(toggleButton).toHaveFocus();
    });

    test('can be activated with Enter key', async () => {
      renderMessageLinks();

      const toggleButton = screen.getByRole('button');
      toggleButton.focus();

      await userEvent.keyboard('{Enter}');

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('can be activated with Space key', async () => {
      renderMessageLinks();

      const toggleButton = screen.getByRole('button');
      toggleButton.focus();

      await userEvent.keyboard(' ');

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('edge cases', () => {
    test('handles empty links array', () => {
      renderMessageLinks({ links: [] });

      expect(screen.queryByText('Related Resources')).toBeNull();
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.queryByTestId('rich-links-area')).toBeNull();
    });

    test('handles missing onLinkClick prop', async () => {
      renderMessageLinks({ onLinkClick: undefined });

      const toggleButton = screen.getByRole('button');
      await userEvent.click(toggleButton);

      // Should still expand without errors
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    test('updates height when links change', async () => {
      const { rerender } = renderMessageLinks();

      const newLinks = [
        ...mockLinks,
        { children: 'Link 4', href: 'https://example.com/4' },
        { children: 'Link 5', href: 'https://example.com/5' },
      ];

      rerender(
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <MessageLinks {...defaultProps} links={newLinks} />
        </LeafyGreenChatProvider>,
      );

      // Should still work with new links
      expect(screen.getByText('Link 4')).toBeInTheDocument();
      expect(screen.getByText('Link 5')).toBeInTheDocument();
    });
  });
});
