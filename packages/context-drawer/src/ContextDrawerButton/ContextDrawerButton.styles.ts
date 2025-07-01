import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

import { TRANSITION_DURATION } from '../constants';

const BUTTON_HEIGHT = 20;

const getTriggerStyles = (theme: Theme) => {
  const backgroundColor = color[theme].background.info.default;
  const textColor = palette.blue[theme === Theme.Dark ? 'light2' : 'dark3'];

  return css`
    height: ${BUTTON_HEIGHT}px;
    border: none;
    background-color: ${backgroundColor};
    color: ${textColor};
    border-radius: 0 0 ${borderRadius[400]}px ${borderRadius[400]}px;
    padding: 0 ${spacing[200]}px;
    font-size: ${typeScales.disclaimer.fontSize}px;
    font-weight: ${fontWeights.medium};
    line-height: ${typeScales.disclaimer.lineHeight}px;
    text-transform: none;

    &:focus-visible {
      background-color: ${backgroundColor};
      color: ${textColor};
      box-shadow: none;
    }

    &:hover,
    &:active {
      background-color: ${backgroundColor};
      color: ${textColor};
      box-shadow: none;
    }
  `;
};

const getGlyphStyles = ({ isOpen, theme }: { isOpen: boolean; theme: Theme }) =>
  cx(
    css`
      & svg {
        color: ${palette.blue[theme === Theme.Dark ? 'light2' : 'dark2']};
        transition: transform ${TRANSITION_DURATION}ms ease-in-out;
        transform: rotate(0deg);
      }
    `,
    {
      [css`
        & svg {
          transform: rotate(180deg);
        }
      `]: isOpen,
    },
  );

export const getButtonStyles = ({
  className,
  isOpen,
  theme,
}: {
  className?: string;
  isOpen: boolean;
  theme: Theme;
}) => cx(getTriggerStyles(theme), getGlyphStyles({ isOpen, theme }), className);
