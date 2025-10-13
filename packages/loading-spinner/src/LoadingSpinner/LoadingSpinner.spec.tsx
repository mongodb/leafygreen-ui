import React from 'react';
import { render } from '@testing-library/react';

import { getTestUtils } from '../testing';

import { LoadingSpinnerSize } from './LoadingSpinner.types';
import { LoadingSpinner } from '.';

describe('packages/loading-spinner', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    render(<LoadingSpinner size={LoadingSpinnerSize.Large} />);
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });

  test('renders with custom size in pixels', () => {
    render(<LoadingSpinner size={100} />);
    const { getLoadingSpinner } = getTestUtils();
    const spinner = getLoadingSpinner();

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('viewBox', '0 0 100 100');
  });

  test('renders with colorOverride', () => {
    render(<LoadingSpinner colorOverride="red" />);
    const { getLoadingSpinner } = getTestUtils();

    expect(getLoadingSpinner()).toBeInTheDocument();
  });
});
