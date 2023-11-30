import { css } from '@leafygreen-ui/emotion';
import { RenderedContext } from '@leafygreen-ui/input-option';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, spacing } from '@leafygreen-ui/tokens';

export const groupStyle = css`
  padding: ${spacing[2]}px 0;
`;

export const labelStyle = css`
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
  color: ${palette.gray.dark1};
`;

export const labelThemeStyle = (
  theme: Theme,
  renderedContext?: RenderedContext,
) => {
  if (renderedContext === RenderedContext.Menu && theme === Theme.Light) {
    return css`
      color: ${palette.white};
      background-color: ${palette.black};
    `;
  }

  if (theme === Theme.Light) {
    return css`
      color: ${palette.gray.dark1};
      background-color: ${palette.white};
    `;
  }

  if (theme === Theme.Dark) {
    return css`
      color: ${palette.gray.base};
      background-color: ${palette.gray.dark3};
    `;
  }
};
