import React from 'react';
import { render } from '@testing-library/react';

import { ProgressBar } from '../ProgressBar';

import { getTestUtils } from './getTestUtils';

describe('getTestUtils', () => {
  test('returns all expected elements when loader type is rendered', () => {
    render(
      <ProgressBar
        type="loader"
        value={0.5}
        label="My Progress"
        formatValue="number"
        showIcon
      />,
    );

    const { getBar, getBarFill, getBarTrack, queryIcon, queryLabel } =
      getTestUtils();

    expect(getBar()).toBeInTheDocument();
    expect(getBar()).toHaveAttribute('role', 'progressbar');

    expect(getBarFill()).toBeInTheDocument();
    expect(getBarFill()).toHaveStyle({ width: '50%' });
    expect(getBarTrack()).toBeInTheDocument();

    expect(queryIcon()).toBeInTheDocument();
    expect(queryLabel()).toBeInTheDocument();
  });

  test('returns all expected elements when meter type is rendered', () => {
    render(
      <ProgressBar
        type="meter"
        value={0.5}
        description="Sample description"
        formatValue="number"
        aria-label="required label"
      />,
    );

    const { getBar, getBarFill, getBarTrack, queryIcon, queryDescription } =
      getTestUtils();

    expect(getBar()).toBeInTheDocument();
    expect(getBar()).toHaveAttribute('role', 'meter');

    expect(getBarFill()).toBeInTheDocument();
    expect(getBarFill()).toHaveStyle({ width: '50%' });
    expect(getBarTrack()).toBeInTheDocument();

    expect(queryIcon()).toBeNull();
    expect(queryDescription()).toBeInTheDocument();
  });

  test('can differentiate multiple progress bars using lgId', () => {
    render(
      <>
        <ProgressBar
          type="loader"
          value={0.3}
          label="First Progress"
          formatValue="number"
          data-lgid="lg-progress_1"
        />
        <ProgressBar
          type="meter"
          value={0.7}
          label="Second Progress"
          formatValue="number"
          data-lgid="lg-progress_2"
          showIcon={true}
        />
      </>,
    );

    const first = getTestUtils('lg-progress_1');
    const second = getTestUtils('lg-progress_2');

    expect(first.getBar()).toBeInTheDocument();
    expect(first.getBar()).toHaveAttribute('role', 'progressbar');
    expect(first.getBarFill()).toBeInTheDocument();
    expect(first.getBarFill()).toHaveStyle({ width: '30%' });
    expect(first.queryIcon()).toBeNull();

    expect(second.getBar()).toBeInTheDocument();
    expect(second.getBar()).toHaveAttribute('role', 'meter');
    expect(second.getBarFill()).toBeInTheDocument();
    expect(second.getBarFill()).toHaveStyle({ width: '70%' });
    expect(second.queryIcon()).toBeInTheDocument();
  });
});
