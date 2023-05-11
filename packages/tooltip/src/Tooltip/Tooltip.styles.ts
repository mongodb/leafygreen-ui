import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  fontWeights,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { borderRadius, notchWidth } from './tooltipConstants';

// The typographic styles below are largely copied from the Body component.
// We can't use the Body component here due to it rendering a paragraph tag,
// Which would conflict with any children passed to it containing a div.
export const baseTypeStyle = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.gray.light1};
  font-weight: ${fontWeights.regular};
  width: 100%;
  overflow-wrap: anywhere;
`;

export const baseStyles = css`
  display: flex;
  align-items: center;
  border-radius: ${borderRadius}px;
  padding: 12px ${borderRadius}px;
  box-shadow: 0px 2px 4px -1px ${transparentize(0.85, palette.black)};
  cursor: default;
  width: fit-content;
  max-width: 256px;
`;

export const positionRelative = css`
  position: relative;
`;

export const colorSet = {
  [Theme.Light]: {
    tooltip: css`
      background-color: ${palette.black};
      color: ${palette.gray.light1};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.black,
  },
  [Theme.Dark]: {
    tooltip: css`
      background-color: ${palette.gray.light2};
      color: ${palette.black};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.gray.light2,
  },
};

export const minSize = notchWidth + 2 * borderRadius;
export const minHeightStyle = css`
  min-height: ${minSize}px;
`;

export const transitionDelay = css`
  transition-delay: ${transitionDuration.slowest}ms;
`;
