import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { CloseIconColor } from '../shared.types';

/**
 * x-icon should be 24px from edge. IconButton is 28x28 and Icon is 16x16
 * so there's already (28 - 16) / 2 = 6px of spacing. 24 - 6 = 18.
 */
const BUTTON_OFFSET = 18;

const getColor = (theme: Theme, customColor: CloseIconColor) => {
  switch (customColor) {
    case 'dark':
      return palette.black;

    case 'light':
      return palette.gray.light2;

    default:
      return theme === Theme.Light ? palette.gray.dark1 : palette.gray.base;
  }
};

const getBaseCloseButtonStyles = ({
  customColor,
  theme,
}: {
  customColor: CloseIconColor;
  theme: Theme;
}) => css`
  position: absolute;
  cursor: pointer;
  right: ${BUTTON_OFFSET}px;
  top: ${BUTTON_OFFSET}px;
  color: ${getColor(theme, customColor)};
`;

export const getButtonStyles = ({
  className,
  customColor,
  theme,
}: {
  className?: string;
  customColor: CloseIconColor;
  theme: Theme;
}) => cx(getBaseCloseButtonStyles({ customColor, theme }), className);
