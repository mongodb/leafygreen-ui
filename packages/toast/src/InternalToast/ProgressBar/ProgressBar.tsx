import React from 'react';
import clamp from 'lodash/clamp';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';

import {
  progressBarBackgroundStyle,
  progressBarBackgroundThemeStyle,
  progressBarStyle,
  progressBarThemeStyle,
} from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
  theme: Theme;
}

/**
 * The progress bar for `variant = 'progress'` toasts
 *
 * @internal
 */
function ToastProgressBar({ progress, theme }: ProgressBarProps) {
  const normalizedProgress = clamp(progress, 0, 1) * 100;

  return (
    <div
      className={cx(
        progressBarBackgroundStyle,
        progressBarBackgroundThemeStyle[theme],
      )}
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cx(
          progressBarStyle,
          progressBarThemeStyle[theme],
          css`
            width: ${normalizedProgress}%;
          `,
        )}
      />
    </div>
  );
}

ToastProgressBar.displayName = 'ToastProgressBar';

ToastProgressBar.propTypes = {
  progress: PropTypes.number,
};

export default ToastProgressBar;
