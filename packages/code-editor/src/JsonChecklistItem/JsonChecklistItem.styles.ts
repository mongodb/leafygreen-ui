import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${spacing[200]}px ${spacing[600]}px;
  gap: ${spacing[200]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

export const contentContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
`;

export const labelBadgesContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const presentContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getPresentIconFill = (theme: Theme) =>
  color[theme].icon.success.default;

export const getPresentTextStyles = (theme: Theme) => css`
  color: ${palette.green[theme === Theme.Dark ? 'base' : 'dark2']};
`;
