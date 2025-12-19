import { css, cx } from '@leafygreen-ui/emotion';

const baseContainerStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 8px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
