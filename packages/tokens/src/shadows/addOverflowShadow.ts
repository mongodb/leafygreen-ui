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
  [Theme.Light]: 8,
  [Theme.Dark]: 16,
};

const getPseudoElement = (side: Side, isInside: boolean) => {
  if ((side === Side.Right || side === Side.Bottom) && !isInside)
    return ':after';
  if ((side === Side.Top || side === Side.Left) && isInside) return ':before';
  return !isInside ? '::before' : '::after';
};

const getPositionStyles = (
  side: Side,
  isInside: boolean,
  shadowOffsetVal: number,
  shadowColor: string,
) => {
  const sidePosition = isInside ? `-${SHORT_SIDE_SIZE}px` : '0';
  const commonStyles = `
    content: '';
    position: absolute;
    margin: auto;
    border-radius: 40%;
    z-index: ${isInside ? 'initial' : -1};
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
  const pseudoElement = getPseudoElement(side, isInside);
  const shadowColor = transparentize(0.7, shadowThemeColor[theme]);
  const shadowOffsetVal = shadowOffset[theme];

  return css`
    position: relative;
    ${pseudoElement} {
      ${getPositionStyles(side, isInside, shadowOffsetVal, shadowColor)}
    }
  `;
};
