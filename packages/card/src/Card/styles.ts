import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  boxShadows,
  color,
  focusRing,
  fontFamilies,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { ContentStyle } from './types';

interface ColorSet {
  containerStyle: string;
  clickableStyle: string;
}

const lightBaseBoxShadow = boxShadows[Theme.Light][1];
const lightHoverBoxShadow = boxShadows[Theme.Light][2];
const darkBaseBoxShadow = boxShadows[Theme.Dark][1];
const darkHoverBoxShadow = boxShadows[Theme.Dark][2];

const lightFocusBoxShadow = focusRing.light.default;
const darkFocusBoxShadow = focusRing.dark.default;

const colorSet: Record<Theme, ColorSet> = {
  [Theme.Light]: {
    containerStyle: css`
      border: 1px solid ${color[Theme.Light].border.tertiary.default};
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
          box-shadow: ${lightFocusBoxShadow}, ${lightBaseBoxShadow};
        }
      }
    `,
  },
  [Theme.Dark]: {
    containerStyle: css`
      border: 1px solid ${color[Theme.Dark].border.tertiary.default};
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
          box-shadow: ${darkBaseBoxShadow}, ${darkFocusBoxShadow};
        }
      }
    `,
  },
};

const containerStyle = css`
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

export const getCardStyles = ({
  theme,
  contentStyle,
  className,
}: {
  theme: Theme;
  contentStyle?: ContentStyle;
  className?: string;
}) =>
  cx(
    containerStyle,
    colorSet[theme].containerStyle,
    {
      [colorSet[theme].clickableStyle]: contentStyle === ContentStyle.Clickable,
    },
    className,
  );
