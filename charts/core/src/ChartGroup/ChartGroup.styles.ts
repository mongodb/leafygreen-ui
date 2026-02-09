import { css, cx } from '@leafygreen-ui/emotion';

const baseContainerStyles = css`
  width: 100%;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
