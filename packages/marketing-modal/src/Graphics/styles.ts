import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseGraphicContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const centeredGraphicContainerStyle = css`
  padding-top: 48px;
  padding-bottom: ${spacing[4]}px;
`;

export const filledGraphicContainerStyle = css`
  padding-bottom: ${spacing[4]}px;
  position: relative;
`;

export const filledGraphicStyle = css`
  width: 100%;
`;

export const baseGraphicStyle = css`
  display: block;
`;

export const curvedSVGBaseStyles = css`
  position: absolute;
  left: 0;
  bottom: ${spacing[4]}px;
`;

export const curvedSVGThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: #ffffff;
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};
