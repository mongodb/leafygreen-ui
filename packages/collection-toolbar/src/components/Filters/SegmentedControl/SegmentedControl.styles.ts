import { css, cx } from '@leafygreen-ui/emotion';

const baseStyles = css`
  flex-direction: column;
  align-items: flex-start;
`;

export const getSegmentedControlStyles = ({
  className,
}: {
  className?: string;
}) => cx(baseStyles, className);
