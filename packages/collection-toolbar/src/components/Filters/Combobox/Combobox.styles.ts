import { css, cx } from '@leafygreen-ui/emotion';

const baseComboboxStyles = css`
  width: fit-content;
`;

export const getComboboxStyles = ({ className }: { className?: string }) =>
  cx(baseComboboxStyles, className);
