import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

export const actionsClassName = createUniqueClassName('actions');

export const baseStyles = css`
  display: flex;
  flex-direction: row;  
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getActionStyles = ({ className }: { className?: string }) =>
  cx(actionsClassName, baseStyles, className);
