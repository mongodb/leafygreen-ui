import { screen } from '@testing-library/react';

// TODO: take lg-id in case consumer wants to test multiple progress bars on screen!
export const PROGRESS_BAR_TEST_IDS = {
  fill: 'progress-bar-fill',
  track: 'progress-bar-track',
};

export const getTestUtils = () => {
  const loaderElement = screen.queryByRole('progressbar');
  const meterElement = screen.queryByRole('meter');

  const barFillElement = screen.queryByTestId(PROGRESS_BAR_TEST_IDS.fill);
  const barTrackElement = screen.queryByTestId(PROGRESS_BAR_TEST_IDS.track);
  const iconElement = screen.queryByRole('img');

  return {
    getLoaderElement: () => loaderElement,
    getMeterElement: () => meterElement,
    getBarFillElement: () => barFillElement,
    getBarTrackElement: () => barTrackElement,
    getIconElement: () => iconElement,
  };
};
