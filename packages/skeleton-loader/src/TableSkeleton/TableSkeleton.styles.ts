import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  width: 100%;
  table-layout: fixed;
`;

export const cellStyles = css`
  padding: 10px 40px 10px 8px;
`;

export const tableHeadStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
    box-shadow: 0 3px ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0 3px ${palette.gray.light2};
  `,
};

// offsets box-shadow on thead
export const firstRowStyles = css`
  margin-top: 2px; // the td doesn't start exactly at the bottom of the box-shadow
`;

export const headerCellStyles = css`
  text-align: left;
`;

export const columnHeaderStyles = css`
  font-weight: 600;
`;
