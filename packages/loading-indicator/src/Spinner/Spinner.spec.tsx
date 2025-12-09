import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing';

import { Spinner } from '.';

describe('packages/loading-spinner', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Spinner />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders with default props', () => {
    render(<Spinner />);
    const { getSpinner } = getTestUtils();

    expect(getSpinner()).toBeInTheDocument();
  });

  test('renders with colorOverride', () => {
    render(<Spinner colorOverride="red" />);
    const { getSpinner } = getTestUtils();

    expect(getSpinner()).toBeInTheDocument();
  });

  test('wraps spinner in a div element', () => {
    render(<Spinner />);
    const { getSpinner } = getTestUtils();
    const spinner = getSpinner();

    expect(spinner.tagName).toBe('DIV');
    expect(spinner.querySelector('svg')).toBeInTheDocument();
  });

  describe('description prop', () => {
    test('renders description text when provided', () => {
      render(<Spinner description="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('does not render description when not provided', () => {
      render(<Spinner />);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  describe('props pass-through', () => {
    test('passes className to wrapper div', () => {
      render(<Spinner className="custom-class" />);
      const { getSpinner } = getTestUtils();
      const spinner = getSpinner();

      expect(spinner).toHaveClass('custom-class');
    });

    test('passes other props to wrapper div', () => {
      render(<Spinner data-custom="test-value" />);
      const { getSpinner } = getTestUtils();
      const spinner = getSpinner();

      expect(spinner).toHaveAttribute('data-custom', 'test-value');
    });

    test('passes svgProps to svg element', () => {
      render(
        <Spinner svgProps={{ 'aria-label': 'Loading spinner', role: 'img' }} />,
      );
      const { getSpinner } = getTestUtils();
      const svg = getSpinner().querySelector('svg');

      expect(svg).toHaveAttribute('aria-label', 'Loading spinner');
      expect(svg).toHaveAttribute('role', 'img');
    });

    test('passes className into svg', () => {
      render(<Spinner svgProps={{ className: 'svg-custom-class' }} />);
      const { getSpinner } = getTestUtils();
      const svg = getSpinner().querySelector('svg');

      expect(svg).toHaveClass('svg-custom-class');
    });
  });
});
