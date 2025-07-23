import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { GraphicStyle } from '../MarketingModal/MarketingModal.types';

const centeredContainerStyle = css`
  padding-top: 48px;
  padding-bottom: ${spacing[4]}px;
`;

const filledContainerStyle = css`
  padding-bottom: ${spacing[4]}px;
  position: relative;
`;

export const containerStyleStyles: Record<GraphicStyle, string> = {
  [GraphicStyle.Center]: centeredContainerStyle,
  [GraphicStyle.Fill]: filledContainerStyle,
};

export const containerBaseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const filledStyle = css`
  width: 100%;
`;

export const baseStyle = css`
  display: block;
`;

export const curvedSVGBaseStyles = css`
  position: absolute;
  left: 0;
  bottom: ${spacing[4]}px;
`;

export const curvedSVGThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.white};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};
