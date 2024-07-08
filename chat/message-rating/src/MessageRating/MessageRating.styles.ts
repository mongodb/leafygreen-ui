import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const buttonContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 4px;
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
