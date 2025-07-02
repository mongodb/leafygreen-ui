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
      getLoaderElement,
      getMeterElement,
      getBarFillElement,
      getBarTrackElement,
      getIconElement,
    } = getTestUtils();

    expect(getLoaderElement()).toBeInTheDocument();
    expect(getMeterElement()).toBeNull();

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
      getLoaderElement,
      getMeterElement,
      getBarFillElement,
      getBarTrackElement,
      getIconElement,
    } = getTestUtils();

    expect(getLoaderElement()).toBeNull();
    expect(getMeterElement()).toBeInTheDocument();

    expect(getBarFillElement()).toBeInTheDocument();
    expect(getBarTrackElement()).toBeInTheDocument();
    expect(getIconElement()).toBeNull();
  });
});
