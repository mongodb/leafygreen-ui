import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

import { TRANSITION_DURATION } from '../constants';

const BUTTON_HEIGHT = 24;

const getTriggerStyles = (theme: Theme) => {
  const backgroundColor = color[theme].background.info.default;
  const textColor = color[theme].text.onInfo.default;

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
      & svg[role='presentation'] {
        color: ${color[theme].text.onInfo.default};
        transition: transform ${TRANSITION_DURATION}ms ease-in-out;
        transform: rotate(0deg);
      }
    `,
    {
      [css`
        & svg[role='presentation'] {
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
