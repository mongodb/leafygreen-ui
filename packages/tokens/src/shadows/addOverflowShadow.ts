import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const Side = {
  Top: 'top',
  Left: 'left',
  Right: 'right',
  Bottom: 'bottom',
} as const;
export type Side = (typeof Side)[keyof typeof Side];

const BLUR_RADIUS = 16;
const SHORT_SIDE_SIZE = 36;

const shadowThemeColor: Record<Theme, string> = {
  [Theme.Light]: palette.gray.dark1,
  [Theme.Dark]: palette.black,
};

const shadowOffset: Record<Theme, number> = {
  [Theme.Light]: 2,
  [Theme.Dark]: 16,
};

const getZIndex = ({
  isInside,
  side,
}: {
  isInside: boolean;
  side: Side;
}): string => {
  if (!isInside) {
    return '-1';
  }

  if (side === Side.Top || side === Side.Left) {
    return '1';
  }

  return 'initial';
};

const getPositionStyles = ({
  isInside,
  shadowColor,
  shadowOffsetVal,
  side,
}: {
  isInside: boolean;
  shadowColor: string;
  shadowOffsetVal: number;
  side: Side;
}) => {
  const sidePosition = isInside ? `-${SHORT_SIDE_SIZE}px` : '0';

  const zIndex = getZIndex({ isInside, side });

  const commonStyles = `
    content: '';
    position: absolute;
    border-radius: 40%;
    z-index: ${zIndex};
  `;

  switch (side) {
    case Side.Top:
      return `
        ${commonStyles}
        top: ${sidePosition};
        left: 0;
        right: 0;
        width: 96%;
        height: ${SHORT_SIDE_SIZE}px;
        margin: 0 auto;
        box-shadow: 0 ${
          isInside ? '' : '-'
        }${shadowOffsetVal}px ${BLUR_RADIUS}px ${shadowColor};
      `;
    case Side.Left:
      return `
        ${commonStyles}
        top: 0;
        bottom: 0;
        left: ${sidePosition};
        width: ${SHORT_SIDE_SIZE}px;
        height: 96%;
        margin: auto 0;
        box-shadow: ${
          isInside ? '' : '-'
        }${shadowOffsetVal}px 0 ${BLUR_RADIUS}px ${shadowColor};
      `;
    case Side.Right:
      return `
        ${commonStyles}
        top: 0;
        bottom: 0;
        right: ${sidePosition};
        width: ${SHORT_SIDE_SIZE}px;
        height: 96%;
        margin: auto 0;
        box-shadow: ${
          isInside ? '-' : ''
        }${shadowOffsetVal}px 0 ${BLUR_RADIUS}px ${shadowColor};
      `;
    case Side.Bottom:
      return `
        ${commonStyles}
        bottom: ${sidePosition};
        left: 0;
        right: 0;
        width: 96%;
        height: ${SHORT_SIDE_SIZE}px;
        margin: 0 auto;
        box-shadow: 0 ${
          isInside ? '-' : ''
        }${shadowOffsetVal}px ${BLUR_RADIUS}px ${shadowColor};
      `;
    default:
      return '';
  }
};

export const addOverflowShadow = ({
  isInside,
  side,
  theme,
}: {
  isInside: boolean;
  side: Side;
  theme: Theme;
}) => {
  const pseudoElement =
    side === Side.Top || side === Side.Left ? '::before' : '::after';
  const shadowColor = transparentize(0.7, shadowThemeColor[theme]);
  const shadowOffsetVal = shadowOffset[theme];

  return css`
    position: relative;
    ${pseudoElement} {
      ${getPositionStyles({ isInside, shadowColor, shadowOffsetVal, side })}
    }
  `;
};
