import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import { cx, css, keyframes } from '@leafygreen-ui/emotion';

const progressBackgroundBase = '#22B7EB';
const progressBackgroundSecondary = '#1FACE5'
const toastWidth = 400;

const progressBarBackgroundStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
`;

const backgroundShimmer = keyframes`
  0% {
    background-position: ${-toastWidth}px;
  }

  100% {
    background-position: ${toastWidth * 2}px;
  }
`;

const progressBarStyle = css`
  overflow: hidden;
  height: 6px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${progressBackgroundBase};
  background-image: linear-gradient(
    90deg,
    ${progressBackgroundBase} 0px,
    #cce8f4 ${toastWidth / 2}px,
    ${progressBackgroundSecondary} ${toastWidth}px
  );
  background-size: 600px;
  animation: ${backgroundShimmer} 4s infinite linear;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
}

function ToastProgressBar({ progress }: ProgressBarProps) {
  const normalizedProgress = clamp(progress, 0, 1) * 100;

  return (
    <div
      className={progressBarBackgroundStyle}
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cx(
          progressBarStyle,
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
