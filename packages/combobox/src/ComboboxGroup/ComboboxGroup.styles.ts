import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, spacing } from '@leafygreen-ui/tokens';

export const comboboxGroupStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    padding-top: ${spacing[2]}px;
  `,
  [Theme.Dark]: css`
    padding-top: ${spacing[2]}px;
  `,
};

export const comboboxGroupLabel = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 16px;
  font-weight: ${fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const comboboxGroupLabelThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};
