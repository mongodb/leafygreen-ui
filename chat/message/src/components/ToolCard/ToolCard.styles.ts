import { css, cx } from '@leafygreen-ui/emotion';

export const baseContainerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
