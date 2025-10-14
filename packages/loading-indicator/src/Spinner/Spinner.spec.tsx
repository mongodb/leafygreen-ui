import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Size } from '@leafygreen-ui/tokens';

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

  test('renders with custom size', () => {
    render(<Spinner size={Size.Large} />);
    const { getSpinner } = getTestUtils();

    expect(getSpinner()).toBeInTheDocument();
  });

  test('renders with custom size in pixels', () => {
    render(<Spinner size={100} />);
    const { getSpinner } = getTestUtils();
    const spinner = getSpinner();

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('viewBox', '0 0 100 100');
  });

  test('renders with colorOverride', () => {
    render(<Spinner colorOverride="red" />);
    const { getSpinner } = getTestUtils();

    expect(getSpinner()).toBeInTheDocument();
  });
});
