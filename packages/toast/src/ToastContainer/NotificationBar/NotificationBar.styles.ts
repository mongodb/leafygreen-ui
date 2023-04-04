import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../../constants';

export const notificationBarStyles = css`
  border: unset;
  outline: unset;

  position: absolute;
  left: ${TOAST_CONSTANTS.inset}px;
  bottom: ${TOAST_CONSTANTS.inset}px;
  width: ${TOAST_CONSTANTS.maxWidth}px;
  height: ${TOAST_CONSTANTS.notificationBarHeight}px;
  z-index: 0;

  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  border-radius: ${spacing[2]}px;
  cursor: pointer;

  opacity: 0;
  transform: translate3d(0, ${TOAST_CONSTANTS.yOffset}px, -400px);
  transition: ${transitionDuration.slower}ms ease-in-out;
  transition-property: background-color, opacity, transform;
`;

export const notificationBarThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.dark2};
    color: ${palette.white};

    &:hover {
      background-color: ${palette.gray.dark3};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light1};
    color: ${palette.black};

    &:hover {
      background-color: ${palette.gray.light2};
    }
  `,
};

export const notificationBarTransitionStyles: Partial<
  Record<TransitionStatus, string>
> = {
  entered: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `,
  entering: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `,
  exited: css`
    transform: translate3d(
      0,
      ${TOAST_CONSTANTS.shortStackCount * TOAST_CONSTANTS.yOffset}px,
      -${(TOAST_CONSTANTS.shortStackCount + 1) * TOAST_CONSTANTS.zOffset}px
    );
    opacity: 0;
  `,
  exiting: css`
    transform: translate3d(
      0,
      ${TOAST_CONSTANTS.shortStackCount * TOAST_CONSTANTS.yOffset}px,
      -${(TOAST_CONSTANTS.shortStackCount + 1) * TOAST_CONSTANTS.zOffset}px
    );
    opacity: 0;
  `,
};
