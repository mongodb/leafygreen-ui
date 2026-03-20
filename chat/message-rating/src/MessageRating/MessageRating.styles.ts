import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

export const buttonContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

const baseHiddenStyles = css`
  display: none;
`;

export const getHiddenStyles = (isHidden: boolean) =>
  cx({
    [baseHiddenStyles]: isHidden,
  });
