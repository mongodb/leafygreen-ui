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
      queryLoaderElement,
      queryMeterElement,
      getBarFillElement,
      getBarTrackElement,
      getIconElement,
    } = getTestUtils();

    expect(queryLoaderElement()).toBeInTheDocument();
    expect(queryMeterElement()).toBeNull();

    expect(getBarFillElement()).toBeInTheDocument();
    expect(getBarTrackElement()).toBeInTheDocument();
    expect(getIconElement()).toBeInTheDocument();
  });

  it('returns all expected elements when meter type is rendered', () => {
    render(
      <ProgressBar
        type="meter"
        value={50}
        label="My Progress"
        formatValue="number"
      />,
    );

    const {
      queryLoaderElement,
      queryMeterElement,
      getBarFillElement,
      getBarTrackElement,
      getIconElement,
    } = getTestUtils();

    expect(queryLoaderElement()).toBeNull();
    expect(queryMeterElement()).toBeInTheDocument();

    expect(getBarFillElement()).toBeInTheDocument();
    expect(getBarTrackElement()).toBeInTheDocument();
    expect(getIconElement()).toBeNull();
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

    expect(first.queryLoaderElement()).toBeInTheDocument();
    expect(first.queryMeterElement()).toBeNull();
    expect(first.getBarFillElement()).toBeInTheDocument();
    expect(first.getBarTrackElement()).toBeInTheDocument();

    expect(second.queryLoaderElement()).toBeNull();
    expect(second.queryMeterElement()).toBeInTheDocument();
    expect(second.getBarFillElement()).toBeInTheDocument();
    expect(second.getBarTrackElement()).toBeInTheDocument();
  });
});
