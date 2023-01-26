import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

interface ColorSet {
  containerStyle: string;
  clickableStyle: string;
}

const lightBaseBoxShadow = `0 4px 10px -4px ${transparentize(
  0.7,
  palette.black,
)}`;
const lightHoverBoxShadow = `0 4px 20px -4px ${transparentize(
  0.8,
  palette.black,
)}`;
const lightFocusBoxShadow = focusRing.light.default;
const darkBaseBoxShadow = `0 4px 20px -4px #01121A`;
const darkHoverBoxShadow = `0 4px 20px -4px ${transparentize(0.3, '#000000')}`;
const darkFocusBoxShadow = focusRing.dark.default;

export const colorSet: Record<Theme, ColorSet> = {
  [Theme.Light]: {
    containerStyle: css`
      border: 1px solid ${palette.gray.light2};
      box-shadow: ${lightBaseBoxShadow};
      background-color: ${palette.white};
      color: ${palette.gray.dark3};
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${lightFocusBoxShadow}, ${lightBaseBoxShadow};
      }

      &:hover,
      &:active {
        border: 1px solid ${palette.gray.light2};
        box-shadow: ${lightHoverBoxShadow};

        &:focus {
          box-shadow: ${lightFocusBoxShadow}, ${lightHoverBoxShadow};
        }
      }
    `,
  },
  [Theme.Dark]: {
    containerStyle: css`
      border: 1px solid ${palette.gray.dark2};
      box-shadow: ${darkBaseBoxShadow};
      background-color: ${palette.black};
      color: ${palette.white};
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${darkBaseBoxShadow}, ${darkFocusBoxShadow};
      }

      &:hover {
        box-shadow: ${darkHoverBoxShadow};

        &:focus {
          box-shadow: ${darkHoverBoxShadow}, ${darkFocusBoxShadow};
        }
      }
    `,
  },
};

export const containerStyle = css`
  position: relative;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border, box-shadow;
  border-radius: 24px;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  padding: 24px;
  min-height: 68px; // 48px + 20px (padding + line-height)
`;
