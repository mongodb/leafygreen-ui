import { css, cx } from '@leafygreen-ui/emotion';

export const baseContainerStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
