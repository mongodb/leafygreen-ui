import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseGraphicContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const centeredGraphicContainerStyle = css`
  padding-top: 48px;
  padding-bottom: 24px;
`;

export const filledGraphicContainerStyle = css`
  padding-bottom: 24px;
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
  bottom: 24px;
`;

export const curvedSVGThemeStyles = (darkMode: boolean) =>
  css`
    color: ${darkMode ? palette.black : '#ffffff'};
  `;
