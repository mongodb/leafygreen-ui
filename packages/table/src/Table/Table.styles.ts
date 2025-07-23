import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { bodyTypeScaleStyles } from '@leafygreen-ui/typography';

export const tableClassName = createUniqueClassName('lg-table');

export const baseStyles = css`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark3};
  `,
};

export const getTableContainerStyles = (isVirtual = false) =>
  cx(
    css`
      width: 100%;
      position: relative;
    `,
    {
      [css`
        overflow: auto;
      `]: isVirtual,
    },
  );

export const getTableStyles = (
  theme: Theme,
  baseFontSize: BaseFontSize,
  isVirtual = false,
  shouldTruncate = false,
) =>
  cx(baseStyles, themeStyles[theme], bodyTypeScaleStyles[baseFontSize], {
    [css`
      //TODO: add to documentation
      // If this is a virtual table that does not truncate the table needs to have a fixed layout.
      // Without a fixed layout, column widths may change during scrolling, which can cause row heights to shift. This can lead to an infinite loop, ultimately crashing the application. 🙃
      // A fixed layout prevents this because it prevents columns widths from changing.
      table-layout: fixed;
    `]: isVirtual && !shouldTruncate,
  });
