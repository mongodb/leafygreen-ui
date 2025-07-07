import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { getTestUtils, renderPreviewCard } from '../testing';

import { PreviewCard } from './PreviewCard';

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
    const { getContent, getToggle } = getTestUtils();
    const toggleButton = getToggle();

    expect(getContent()).toBeVisible();
    expect(toggleButton).toBeVisible();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('expands and collapses in uncontrolled mode', () => {
    renderPreviewCard();
    const { getToggle } = getTestUtils();
    const toggleButton = getToggle();

    expect(toggleButton).toHaveTextContent('View more');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent('View less');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    userEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent('View more');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('works in controlled mode', () => {
    const onOpenChange = jest.fn();
    const { rerender } = renderPreviewCard({
      isOpen: false,
      onOpenChange,
    });
    const { getToggle } = getTestUtils();
    let toggleButton = getToggle();

    userEvent.click(toggleButton);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(toggleButton).toHaveTextContent('View more');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <PreviewCard isOpen={true} onOpenChange={onOpenChange}>
        Content
      </PreviewCard>,
    );
    toggleButton = getToggle();

    expect(toggleButton).toHaveTextContent('View less');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  // JSDOM doesn't fully support inert: https://github.com/jsdom/jsdom/issues/3605
  // this test is used as a stopgap until the below skipped test can be used
  test('card is inert when collapsed', () => {
    renderPreviewCard();
    const { getContent } = getTestUtils();
    const card = getContent();
    expect(card).toHaveAttribute('inert');
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('focuses the toggle button first when collapsed', () => {
    renderPreviewCard();
    const { getToggle } = getTestUtils();

    userEvent.tab();

    const toggleButton = getToggle();
    const focusableButton = screen.getByRole('button', {
      name: 'Focusable',
    });
    expect(toggleButton).toHaveFocus();
    expect(focusableButton).not.toHaveFocus();
  });

  test('moves focus to the first focusable element when expanded', async () => {
    renderPreviewCard();
    const { getToggle } = getTestUtils();
    const toggleButton = getToggle();

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

    const { getToggle } = getTestUtils();
    const toggleButton = getToggle();

    expect(toggleButton).toBeVisible();
    expect(toggleButton).toHaveTextContent('Show');

    userEvent.click(toggleButton);

    expect(toggleButton).toBeVisible();
    expect(toggleButton).toHaveTextContent('Hide');
  });

  test('has correct aria attributes', () => {
    renderPreviewCard({ children: 'Content', isOpen: true });
    const { getContent, getToggle } = getTestUtils();
    const content = getContent();
    const toggleButton = getToggle();

    expect(content).toBeVisible();
    expect(toggleButton).toHaveAttribute('aria-controls', content?.id);
    expect(content).toHaveAttribute('aria-labelledby', toggleButton.id);
    expect(content).toHaveAttribute('role', 'region');
  });
});
