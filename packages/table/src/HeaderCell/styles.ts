import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Align } from './types';

export const baseStyles = css`
  vertical-align: middle;
  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }
`;

export const contentContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const alignmentStyles = (align: Align) =>
  css`
    justify-content: ${align};
  `;

// export const themeStyles: Record<Theme, string> = {
//   [Theme.Dark]: css`
//     color: ${palette.grey.light2};
//   `,
//   [Theme.Light]: css`
    
//   `,
// };
