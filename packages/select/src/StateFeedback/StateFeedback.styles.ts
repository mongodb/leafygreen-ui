import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { mobileSizeSet } from '../styleSets';
import { MobileMediaQuery } from '../utils';

export const containerStyles = css`
  padding-top: ${spacing[100]}px;
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const hideContainerStyle = css`
  opacity: 0;
`;

export const errorIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: palette.red.base,
  [Theme.Dark]: palette.red.light1,
};

export const errorTransitionStyles = css`
  transition: color ${transitionDuration.faster}ms ease-in-out;
  transition-delay: ${transitionDuration.faster}ms;
`;

export const errorTextMobileStyles = css`
  ${MobileMediaQuery} {
    font-size: ${mobileSizeSet.description.text}px;
    line-height: ${mobileSizeSet.description.lineHeight}px;
  }
`;

export const validIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: palette.green.dark1,
  [Theme.Dark]: palette.green.base,
};

export const validMessageThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.base};
  `,
};

export const validMessageTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};
