import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  Variant as ColorVariant,
} from '@leafygreen-ui/tokens';

import { Variant } from './ChatButton.types';

/** non-palette blue used for Chat branding */
const ALT_BLUE_COLOR = '#00D2FF';
const GRADIENT_BORDER_WIDTH = 1;

export const getGradientStartColor = (darkMode: boolean) => {
  return palette.green[darkMode ? 'base' : 'dark1'];
};

export const getGradientEndColor = (darkMode: boolean) => {
  return darkMode ? ALT_BLUE_COLOR : palette.blue.base;
};

const getDefaultButtonStyles = (theme: Theme) => {
  const darkMode = theme === Theme.Dark;
  const gradientStart = getGradientStartColor(darkMode);
  const gradientEnd = getGradientEndColor(darkMode);

  return css`
    position: relative;
    border: 1px solid transparent;
    background-color: ${color[theme].background[ColorVariant.Primary][
      InteractionState.Default
    ]};
    color: ${darkMode ? palette.white : palette.green.dark2};

    /* Create gradient border using pseudo-element */
    &::before {
      content: '';
      position: absolute;
      inset: -${GRADIENT_BORDER_WIDTH}px;
      border-radius: inherit;
      background: linear-gradient(to bottom, ${gradientStart}, ${gradientEnd});
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: ${GRADIENT_BORDER_WIDTH}px;
      pointer-events: none;
      z-index: -1;
    }
  `;
};

export const getButtonStyles = ({
  className,
  theme,
  variant,
}: {
  className?: string;
  theme: Theme;
  variant: Variant;
}) =>
  cx(
    {
      [getDefaultButtonStyles(theme)]: variant === Variant.Default,
    },
    className,
  );
