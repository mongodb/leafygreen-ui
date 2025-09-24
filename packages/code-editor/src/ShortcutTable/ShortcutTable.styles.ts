import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const TABLE_WIDTH = '282px';
const ROW_PADDING = spacing[300];
const CONTAINER_MARGIN_TOP = spacing[1000] - ROW_PADDING; // Account for the padding on the first row

export const TableContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${CONTAINER_MARGIN_TOP}px;
`;

export const TableStyles = css`
  width: ${TABLE_WIDTH};
  border-spacing: 0;

  tr + tr td {
    padding-top: ${ROW_PADDING}px;
  }

  td {
    vertical-align: top;

    &:first-child {
      width: 60%;
    }

    &:last-child {
      width: 40%;
      text-align: right;
    }
  }
`;

export const PlusSignStyles = css`
  display: inline-block;
  margin: 0 ${spacing[100]}px;
`;
