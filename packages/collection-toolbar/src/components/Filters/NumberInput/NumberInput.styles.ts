import { css, cx } from '@leafygreen-ui/emotion';

export const baseInputStyles = css`
  width: auto;
`;

export const getInputStyles = ({ className }: { className?: string }) =>
  cx(baseInputStyles, className);
