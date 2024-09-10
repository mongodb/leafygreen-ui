import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

export const titleStyle = css`
  margin-bottom: ${spacing[1]}px;
`;

export const baseModalStyle = css`
  width: 600px;
  padding: initial;
  overflow: hidden;
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
  margin-top: ${spacing[3]}px;
`;

export const disclaimerStyles = css`
  padding: ${spacing[5]}px ${spacing[5] + spacing[3]}px 0px;
  color: ${palette.gray.dark1};
`;
