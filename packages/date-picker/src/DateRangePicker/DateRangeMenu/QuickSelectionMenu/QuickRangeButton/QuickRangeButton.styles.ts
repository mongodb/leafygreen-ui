import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

export const baseQuickRangeButtonStyles = css`
  border: none;
  outline: none;
  background-color: unset;
  display: block;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  font-weight: ${fontWeights.regular};
  padding: 2px ${spacing[1]}px;
  border-radius: ${spacing[2]}px;
  cursor: pointer;
`;

const hoverSelector = `&:hover, &[data-hover="true"]`;
const focusSelector = `&:focus-visible, &[data-focus="true"]`;

export const baseQuickRangeButtonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};

    ${hoverSelector} {
      outline: 2px solid ${palette.gray.light2};
    }

    ${focusSelector} {
      color: ${palette.blue.dark1};
      outline: 2px solid ${palette.blue.light1};
      font-weight: ${fontWeights.bold};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.white};

    ${hoverSelector} {
      outline: 2px solid ${palette.gray.dark2};
    }

    ${focusSelector} {
      color: ${palette.blue.light1};
      outline: 2px solid ${palette.blue.light1};
      font-weight: ${fontWeights.bold};
    }
  `,
};
