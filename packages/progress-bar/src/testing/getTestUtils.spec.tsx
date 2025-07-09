import React from 'react';
import { render } from '@testing-library/react';

import { ProgressBar } from '../ProgressBar';

import { getTestUtils } from './getTestUtils';

describe('getTestUtils', () => {
  it('returns all expected elements when loader type is rendered', () => {
    render(
      <ProgressBar
        type="loader"
        value={50}
        label="My Progress"
        formatValue="number"
        showIcon
      />,
    );

    const {
      queryLoader,
      queryMeter,
      getBarFill,
      getBarTrack,
      queryIcon,
      queryLabel,
    } = getTestUtils();

    expect(queryLoader()).toBeInTheDocument();
    expect(queryMeter()).toBeNull();

    expect(getBarFill()).toBeInTheDocument();
    expect(getBarTrack()).toBeInTheDocument();
    expect(queryIcon()).toBeInTheDocument();
    expect(queryLabel()).toBeInTheDocument();
  });

  it('returns all expected elements when meter type is rendered', () => {
    render(
      <ProgressBar
        type="meter"
        value={50}
        description="Yada yada..."
        formatValue="number"
      />,
    );

    const {
      queryLoader,
      queryMeter,
      getBarFill,
      getBarTrack,
      queryIcon,
      queryDescription,
    } = getTestUtils();

    expect(queryLoader()).toBeNull();
    expect(queryMeter()).toBeInTheDocument();

    expect(getBarFill()).toBeInTheDocument();
    expect(getBarTrack()).toBeInTheDocument();
    expect(queryIcon()).toBeNull();
    expect(queryDescription()).toBeInTheDocument();
  });

  it('can differentiate multiple progress bars using lgId', () => {
    render(
      <>
        <ProgressBar
          type="loader"
          value={30}
          label="First Progress"
          formatValue="number"
          data-lgid="lg-progress-1"
        />
        <ProgressBar
          type="meter"
          value={70}
          label="Second Progress"
          formatValue="number"
          data-lgid="lg-progress-2"
        />
      </>,
    );

    const first = getTestUtils('lg-progress-1');
    const second = getTestUtils('lg-progress-2');

    expect(first.queryLoader()).toBeInTheDocument();
    expect(first.queryMeter()).toBeNull();
    expect(first.getBarFill()).toBeInTheDocument();
    expect(first.getBarTrack()).toBeInTheDocument();

    expect(second.queryLoader()).toBeNull();
    expect(second.queryMeter()).toBeInTheDocument();
    expect(second.getBarFill()).toBeInTheDocument();
    expect(second.getBarTrack()).toBeInTheDocument();
  });
});
