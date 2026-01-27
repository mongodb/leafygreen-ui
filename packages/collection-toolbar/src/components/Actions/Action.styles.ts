import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const actionsClassName = createUniqueClassName('actions');

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing[100]}px;
`;

const iconBaseStyles = css`
  transition: transform ${transitionDuration.default}ms ease-in-out;
`;

const iconExpandedStyles = css`
  transform: rotate(180deg);
`;

export const getIconStyles = ({ isExpanded }: { isExpanded: boolean }) =>
  cx(iconBaseStyles, {
    [iconExpandedStyles]: isExpanded,
  });

export const getActionStyles = ({ className }: { className?: string }) =>
  cx(actionsClassName, baseStyles, className);
