import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { CloseIconColor } from '../Modal/Modal.types';

const getColor = (theme: Theme, customColor: CloseIconColor) => {
  switch (customColor) {
    case 'dark':
      return palette.black;

    case 'light':
      return palette.gray.light2;

    default:
      return theme === Theme.Light ? palette.gray.dark1 : palette.gray.light2;
  }
};

export const closeButtonStyles = (
  theme: Theme,
  customColor: CloseIconColor,
) => css`
  position: absolute;
  cursor: pointer;
  // x-icon should be 24px from edge. IconButton is 28x28 and Icon is 16x16
  // so there's already (28 - 16) / 2 = 6px of spacing. 24 - 6 = 18.
  right: 18px;
  top: 18px;
  color: ${getColor(theme, customColor)};
`;
