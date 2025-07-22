import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
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

const getBaseIconFill = (darkMode: boolean) =>
  palette.gray[darkMode ? 'light2' : 'dark1'];

const getSelectedIconFill = (darkMode: boolean) =>
  darkMode ? palette.black : palette.gray.light3;

export const getIconFill = ({
  darkMode,
  isSelected,
}: {
  darkMode: boolean;
  isSelected: boolean;
}) => (isSelected ? getSelectedIconFill(darkMode) : getBaseIconFill(darkMode));

const baseHiddenStyles = css`
  display: none;
`;

export const getHiddenStyles = (isHidden: boolean) =>
  cx({
    [baseHiddenStyles]: isHidden,
  });
