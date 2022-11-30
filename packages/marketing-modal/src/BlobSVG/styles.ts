import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const blobBaseStyles = css`
  position: absolute;
  z-index: -1;
`;

export const blobThemeStyles = (darkMode: boolean) =>
  css`
    color: ${darkMode ? palette.gray.dark3 : palette.purple.light3};
  `;
