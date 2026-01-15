import { css, cx } from '@leafygreen-ui/emotion';

const baseButtonStyles = css`
  flex: 1;
`;

export const getButtonStyles = (className?: string) =>
  cx(baseButtonStyles, className);
