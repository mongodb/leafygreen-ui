import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { PreviewCard } from './PreviewCard';
import { PreviewCardProps } from './PreviewCard.types';

const renderPreviewCard = (props: PreviewCardProps = {}) =>
  render(
    <PreviewCard {...props}>
      {props?.children ?? (
        <>
          <div>Content</div>
          <button>Focusable</button>
        </>
      )}
    </PreviewCard>,
  );

describe('packages/preview-card', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPreviewCard();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  test('renders with default props', () => {
    renderPreviewCard();
    expect(screen.getByText('Content')).toBeInTheDocument();
    const toggleButton = screen.getByRole('button', { name: 'View more' });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('expands and collapses in uncontrolled mode', () => {
    renderPreviewCard();

    const toggleButton = screen.getByRole('button', { name: 'View more' });
    userEvent.click(toggleButton);

    expect(
      screen.getByRole('button', { name: 'View less' }),
    ).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    userEvent.click(toggleButton);

    expect(
      screen.getByRole('button', { name: 'View more' }),
    ).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('works in controlled mode', () => {
    const onOpenChange = jest.fn();
    const { rerender } = renderPreviewCard({
      isOpen: false,
      onOpenChange,
    });

    const toggleButton = screen.getByRole('button', { name: 'View more' });
    userEvent.click(toggleButton);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('button', { name: 'View more' }),
    ).toBeInTheDocument();

    rerender(
      <PreviewCard isOpen={true} onOpenChange={onOpenChange}>
        Content
      </PreviewCard>,
    );
    expect(
      screen.getByRole('button', { name: 'View less' }),
    ).toBeInTheDocument();
  });

  test('moves focus to the first focusable element when opened', async () => {
    renderPreviewCard();

    const toggleButton = screen.getByRole('button', { name: 'View more' });
    userEvent.click(toggleButton);

    const focusableButton = await screen.findByRole('button', {
      name: 'Focusable',
    });
    waitFor(() => expect(focusableButton).toHaveFocus());
  });

  test('renders with custom button texts', () => {
    renderPreviewCard({
      viewMoreText: 'Show',
      viewLessText: 'Hide',
    });
    const toggleButton = screen.getByRole('button', { name: 'Show' });
    expect(toggleButton).toBeInTheDocument();

    userEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument();
  });

  test('has correct aria attributes', () => {
    renderPreviewCard({ children: 'Content' });
    const toggleButton = screen.getByRole('button', { name: 'View more' });
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-controls', content?.id);
    expect(content).toHaveAttribute('aria-labelledby', toggleButton.id);
    expect(content).toHaveAttribute('role', 'region');
  });
});
