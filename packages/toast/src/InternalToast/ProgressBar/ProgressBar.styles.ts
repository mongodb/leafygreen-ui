import { css, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../../constants';

export const progressBarBackgroundStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${TOAST_CONSTANTS.progressBarHeight}px;
  background-color: ${palette.gray.light2};
`;

export const progressBarBackgroundThemeStyle: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.light1};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.dark2};
  `,
};

const backgroundShimmer = keyframes`
  0% {
    background-position: ${-TOAST_CONSTANTS.maxWidth}px;
  }

  100% {
    background-position: ${TOAST_CONSTANTS.maxWidth * 2}px;
  }
`;

export const progressBarStyle = css`
  overflow: hidden;
  height: ${TOAST_CONSTANTS.progressBarHeight}px;
  background-size: ${TOAST_CONSTANTS.maxWidth * 2}px;
  animation: ${backgroundShimmer} 4s infinite linear;
  transition: width ${transitionDuration.slower}ms ease-in-out;
`;

export const progressBarThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: #083c90;
    background-image: linear-gradient(
      90deg,
      #083c90 0px,
      #c3e7fe ${TOAST_CONSTANTS.maxWidth / 2}px,
      #083c90 ${TOAST_CONSTANTS.maxWidth}px
    );
  `,
  [Theme.Dark]: css`
    background-color: #0498ec;
    background-image: linear-gradient(
      90deg,
      #0498ec 0px,
      #c3e7fe ${TOAST_CONSTANTS.maxWidth / 2}px,
      #0498ec ${TOAST_CONSTANTS.maxWidth}px
    );
  `,
};
