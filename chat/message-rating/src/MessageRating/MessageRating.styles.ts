import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const buttonContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getIconFill = (darkMode: boolean, isSelected: boolean) => {
  if (darkMode) {
    if (isSelected) {
      return palette.black;
    } else {
      return palette.gray.light2;
    }
  } else {
    if (isSelected) {
      return palette.gray.light3;
    } else {
      return palette.gray.dark1;
    }
  }
};

export const hiddenStyles = css`
  display: none;
`;
