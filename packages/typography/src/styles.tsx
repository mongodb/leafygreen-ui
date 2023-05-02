import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { BaseFontSize, fontFamilies, typeScales } from '@leafygreen-ui/tokens';

export const baseTypographyStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

export const bodyTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
  `,
} as const;

export const codeTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.code1.fontSize}px;
    line-height: ${typeScales.code1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.code2.fontSize}px;
    line-height: ${typeScales.code2.lineHeight}px;
  `,
} as const;

export const defaultTextColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};
