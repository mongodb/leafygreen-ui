import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  width: 100%;
`;

export const labelContainerStyles = css`
  display: flex;
  justify-content: end;
`;

export const labelStyles = css`
  flex: 1;
  padding-top: 3px; // to match icon button padding
`;

export const textAreaStyle = css`
  margin-top: ${spacing[100]}px;
`;

export const actionContainerStyles = css`
  margin-top: ${spacing[200]}px;
  display: flex;
  gap: ${spacing[2]}px;
  justify-content: end;
`;
