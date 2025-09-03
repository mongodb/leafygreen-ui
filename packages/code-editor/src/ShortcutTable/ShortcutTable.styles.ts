import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const TABLE_WIDTH = '282px';

export const TableContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TableStyles = css`
  width: ${TABLE_WIDTH};
  border-spacing: 0;

  tr {
    margin-bottom: 12px;
    display: block;
  }

  td {
    display: inline-block;
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

export const HeadingStyles = css`
  margin-bottom: ${spacing[1000]}px;
`;

export const PlusSignStyles = css`
  display: inline-block;
  margin: 0 ${spacing[100]}px;
`;
