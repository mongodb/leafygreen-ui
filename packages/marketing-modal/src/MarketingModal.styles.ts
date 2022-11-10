import { css } from "@leafygreen-ui/emotion";
import { Theme } from "@leafygreen-ui/lib";
import { palette } from "@leafygreen-ui/palette";
import { fontFamilies } from "@leafygreen-ui/tokens";

export const titleStyle = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
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

export const centeredGraphicContainerStyle: Record<Theme, string> = {
  [Theme.Light]: css`
  padding-top: 20px;
  padding-bottom: 8px;
  `,
  [Theme.Dark]: css`
    padding-top: 20px;
    padding-bottom: 8px;
  `,
};

export const filledGraphicContainerStyle = css`
  padding-bottom: 24px;
  position: relative;
`;

export const filledGraphicStyle = css`
  width: 100%;
`;

export const contentStyle = css`
  font-family: ${fontFamilies.default};
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  padding: 0 20px 32px;
  max-width: 476px;
  margin: 0 auto;
  // color: ${palette.gray.dark3};
`;

export const contentThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
  color: ${palette.gray.light1};
  `
}

export const footerContentStyle = css`
  line-height: 24px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;