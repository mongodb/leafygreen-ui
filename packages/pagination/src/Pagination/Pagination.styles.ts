import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div:first-child {
    justify-content: flex-start;
  }
  > div:last-child {
    justify-content: flex-end;
  }
`;

export const flexSectionStyles = css`
  flex: 1;
  display: flex;
  gap: ${spacing[1]}px;
  align-items: center;
  justify-content: center;
`;
