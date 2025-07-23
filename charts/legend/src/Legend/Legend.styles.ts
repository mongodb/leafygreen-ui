import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseLegendStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[100]}px;
`;

export const getLegendStyles = ({ className }: { className?: string }) =>
  cx(baseLegendStyles, className);
