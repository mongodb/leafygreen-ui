import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

export const titleStyle = css`
  margin-bottom: 4px;
`;

export const baseModalStyle = css`
  width: 600px;
  padding: initial;
  overflow: hidden;
`;

export const baseGraphicContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const baseGraphicStyle = css`
  display: block;
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

export const wrapperStyle = css`
  text-align: center;
  padding: 0 20px 32px;
  max-width: 476px;
  margin: 0 auto;
`;

export const contentStyle = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const contentThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const footerContentStyle = css`
  line-height: 24px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const buttonStyle = css`
  min-width: 200px;
`;

export const linkStyle = css`
  margin-top: 16px;
`;
