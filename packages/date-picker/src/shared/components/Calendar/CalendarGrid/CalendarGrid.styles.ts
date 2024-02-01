import { css } from '@leafygreen-ui/emotion';
import { fontWeights } from '@leafygreen-ui/tokens';

export const calendarGridStyles = css`
  height: max-content;
  border-collapse: collapse;
`;

export const calendarHeaderCellStyles = css`
  font-weight: ${fontWeights.regular};
  text-transform: capitalize;
`;

export const calendarThStyles = css`
  padding: 0;
`;
