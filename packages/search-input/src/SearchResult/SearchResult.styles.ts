import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing, typeScales } from '@leafygreen-ui/tokens';

export const searchResultStyles = css`
  display: block;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${spacing[3]}px;
  padding: ${spacing[1]}px ${spacing[3]}px;
`;

export const searchResultTitleStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    font-weight: 700;
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    font-weight: 700;
    color: ${palette.gray.light2};
  `,
};

export const searchResultDescriptionStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};
