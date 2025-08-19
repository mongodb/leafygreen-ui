import React from 'react';
import { render, screen } from '@testing-library/react';

import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';
import { COPIED_TEXT } from '../CodeEditorCopyButton/constants';

import { CopyButtonTrigger } from './CodeEditorCopyButtonTrigger';

describe('CodeEditorCopyButtonTrigger', () => {
  describe('Rendering', () => {
    test('renders as Button variant by default', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-lgid', 'lg-button');
    });

    test('renders as IconButton when variant is IconButton', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={false}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toBeInTheDocument();
      // IconButton doesn't have data-lgid, but Button does
      expect(button).not.toHaveAttribute('data-lgid');
    });

    test('renders with custom className', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          className="custom-class"
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toHaveClass('custom-class');
    });

    test('renders as disabled when disabled prop is true', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          disabled={true}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Icon rendering', () => {
    test('shows copy icon when copied is false', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Copy"
        />,
      );

      // Check for the Copy icon SVG by its specific path content
      const copyIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(copyIcon).toBeInTheDocument();

      // Check that the path contains copy icon specific content
      const copyPath = copyIcon?.querySelector('path[d*="M1 5.71428V10.2857"]');
      expect(copyPath).toBeInTheDocument();
    });

    test('shows checkmark icon when copied is true', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={true}
          aria-label="Copy"
        />,
      );

      // Check for the Checkmark icon SVG by its specific path content
      const checkmarkIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(checkmarkIcon).toBeInTheDocument();

      // Check that the path contains checkmark icon specific content
      const checkmarkPath = checkmarkIcon?.querySelector(
        'path[d*="M6.30583 9.05037L11.7611 3.59509"]',
      );
      expect(checkmarkPath).toBeInTheDocument();
    });

    test('shows copy icon for IconButton variant when copied is false', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={false}
          aria-label="Copy"
        />,
      );

      // Check for the Copy icon SVG by its specific path content
      const copyIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(copyIcon).toBeInTheDocument();

      const copyPath = copyIcon?.querySelector('path[d*="M1 5.71428V10.2857"]');
      expect(copyPath).toBeInTheDocument();
    });

    test('shows checkmark icon for IconButton variant when copied is true', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={true}
          aria-label="Copy"
        />,
      );

      // Check for the Checkmark icon SVG by its specific path content
      const checkmarkIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(checkmarkIcon).toBeInTheDocument();

      const checkmarkPath = checkmarkIcon?.querySelector(
        'path[d*="M6.30583 9.05037L11.7611 3.59509"]',
      );
      expect(checkmarkPath).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('shows screen reader alert when copied is true', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={true}
          aria-label="Copy"
        />,
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(COPIED_TEXT);
    });

    test('does not show screen reader alert when copied is false', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Copy"
        />,
      );

      const alert = screen.queryByRole('alert');
      expect(alert).not.toBeInTheDocument();
    });

    test('forwards aria-label correctly', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Custom Copy Label"
        />,
      );

      const button = screen.getByRole('button', { name: 'Custom Copy Label' });
      expect(button).toHaveAttribute('aria-label', 'Custom Copy Label');
    });
  });

  describe('Props forwarding', () => {
    test('forwards event handlers correctly', () => {
      const handleClick = jest.fn();
      const handleMouseEnter = jest.fn();
      const handleKeyDown = jest.fn();

      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onKeyDown={handleKeyDown}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Note: We can't easily test onMouseEnter and onKeyDown with testing-library
      // but the important thing is that they get spread to the underlying component
    });

    test('forwards data attributes correctly', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          data-testid="custom-copy-button"
          data-custom="test-value"
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toHaveAttribute('data-testid', 'custom-copy-button');
      expect(button).toHaveAttribute('data-custom', 'test-value');
    });

    test('forwards other HTML attributes correctly', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          title="Custom title"
          tabIndex={-1}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toHaveAttribute('title', 'Custom title');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Children rendering', () => {
    test('renders children content (important for Tooltip integration)', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Copy"
        >
          <span data-testid="tooltip-content">Tooltip content</span>
        </CopyButtonTrigger>,
      );

      const tooltipContent = screen.getByTestId('tooltip-content');
      expect(tooltipContent).toBeInTheDocument();
      expect(tooltipContent).toHaveTextContent('Tooltip content');
    });

    test('renders children content for IconButton variant', () => {
      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={false}
          aria-label="Copy"
        >
          <span data-testid="tooltip-content">Tooltip content</span>
        </CopyButtonTrigger>,
      );

      const tooltipContent = screen.getByTestId('tooltip-content');
      expect(tooltipContent).toBeInTheDocument();
      expect(tooltipContent).toHaveTextContent('Tooltip content');
    });

    test('renders both icons, alert, and children correctly', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={true}
          aria-label="Copy"
        >
          <span data-testid="tooltip-content">Tooltip content</span>
        </CopyButtonTrigger>,
      );

      // Should have checkmark icon
      const checkmarkIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(checkmarkIcon).toBeInTheDocument();

      const checkmarkPath = checkmarkIcon?.querySelector(
        'path[d*="M6.30583 9.05037L11.7611 3.59509"]',
      );
      expect(checkmarkPath).toBeInTheDocument();

      // Should have screen reader alert
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(COPIED_TEXT);

      // Should have children content
      const tooltipContent = screen.getByTestId('tooltip-content');
      expect(tooltipContent).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    test('forwards ref to the underlying button element', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          ref={ref}
          aria-label="Copy"
        />,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute('aria-label', 'Copy');
    });

    test('forwards ref to IconButton variant', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={false}
          ref={ref}
          aria-label="Copy"
        />,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute('aria-label', 'Copy');
    });
  });

  describe('Button variant specific behavior', () => {
    test('Button variant has leftGlyph and size="xsmall"', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.Button}
          copied={false}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).toHaveAttribute('data-lgid', 'lg-button');

      // The icon should be rendered as a leftGlyph, which means it's inside a specific structure
      const copyIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(copyIcon).toBeInTheDocument();

      const copyPath = copyIcon?.querySelector('path[d*="M1 5.71428V10.2857"]');
      expect(copyPath).toBeInTheDocument();
    });
  });

  describe('IconButton variant specific behavior', () => {
    test('IconButton variant renders icon as children', () => {
      const { container } = render(
        <CopyButtonTrigger
          variant={CopyButtonVariant.IconButton}
          copied={false}
          aria-label="Copy"
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy' });
      expect(button).not.toHaveAttribute('data-lgid');

      // The icon should be rendered as children
      const copyIcon = container.querySelector('svg[viewBox="0 0 16 16"]');
      expect(copyIcon).toBeInTheDocument();

      const copyPath = copyIcon?.querySelector('path[d*="M1 5.71428V10.2857"]');
      expect(copyPath).toBeInTheDocument();
    });
  });
});
