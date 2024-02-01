import { css } from '@leafygreen-ui/emotion';
import { Size } from '@leafygreen-ui/tokens';

export const calendarButtonSize: Record<Size, number> = {
  [Size.XSmall]: 20,
  [Size.Small]: 22,
  [Size.Default]: 28,
  [Size.Large]: 28,
};

// FormField does not account for icon width combined with the gap so this is a temp workaround
const getMargin = (size: Size) => {
  const iconWidthDiff = (calendarButtonSize[size] - 16) / 2; // spec is 16px width but eng width is wider because of hover/focus states
  return -iconWidthDiff;
};

export const iconButtonStyles = (size: Size) => css`
  svg + button {
    margin-left: ${getMargin(size)}px;
  }
`;

export const calendarButtonSizeStyle = (size: Size) => css`
  width: ${calendarButtonSize[size]}px;
  height: ${calendarButtonSize[size]}px;
`;
