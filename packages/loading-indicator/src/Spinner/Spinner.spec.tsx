import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../testing';

import { SpinnerSize } from './Spinner.types';
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
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    render(<Spinner size={SpinnerSize.Large} />);
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });

  test('renders with custom size in pixels', () => {
    render(<Spinner size={100} />);
    const { getLoadingSpinner } = getTestUtils();
    const spinner = getLoadingSpinner();

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('viewBox', '0 0 100 100');
  });

  test('renders with colorOverride', () => {
    render(<Spinner colorOverride="red" />);
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });
});
