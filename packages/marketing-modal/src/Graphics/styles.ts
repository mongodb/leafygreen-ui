import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { GraphicStyle } from '../MarketingModal/types';

const centeredGraphicContainerStyle = css`
  padding-top: 48px;
  padding-bottom: ${spacing[4]}px;
`;

const filledGraphicContainerStyle = css`
  padding-bottom: ${spacing[4]}px;
  position: relative;
`;

export const graphicContainerStyleStyles: Record<GraphicStyle, string> = {
  [GraphicStyle.Center]: centeredGraphicContainerStyle,
  [GraphicStyle.Fill]: filledGraphicContainerStyle,
};

export const graphicContainerBaseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const graphicFilledStyle = css`
  width: 100%;
`;

export const graphicBaseStyle = css`
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
