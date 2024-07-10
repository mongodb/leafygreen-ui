import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  fontFamilies,
  InteractionState,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { leftGlyphClassName, titleClassName } from '../InputOptionContent';

export const inputOptionClassName = createUniqueClassName('input_option');

interface InputOptionStyleArgs {
  theme: Theme;
  disabled?: boolean;
  highlighted?: boolean;
  isInteractive?: boolean;
}

export const getInputOptionStyles = ({
  theme,
  disabled,
  highlighted,
  isInteractive,
}: InputOptionStyleArgs) => {
  const ixnState = highlighted
    ? InteractionState.Focus
    : InteractionState.Default;
  return css`
    display: block;
    position: relative;
    list-style: none;
    outline: none;
    border: unset;
    margin: 0;
    text-align: left;
    text-decoration: none;
    cursor: pointer;

    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    font-family: ${fontFamilies.default};
    padding: ${spacing[200]}px ${spacing[300]}px;

    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: background-color, color;

    color: ${color[theme].text.primary[ixnState]};
    background-color: ${color[theme].background.primary[ixnState]};

    ${disabled &&
    css`
      cursor: not-allowed;
      color: ${color[theme].text.disabled[ixnState]};
    `}

    /* Interactive states */
    ${isInteractive &&
    !disabled &&
    css`
      /* Hover */
      &:hover {
        outline: none;
        color: ${color[theme].text.primary.hover};
        background-color: ${color[theme].background.primary.hover};

        .${titleClassName} {
          color: ${color[theme].text.primary.hover};
        }

        .${leftGlyphClassName} {
          color: ${color[theme].icon.primary.hover};
        }
      }

      /* Focus (majority of styling handled by the 'highlighted' prop) */
      &:focus {
        outline: none;
        border: unset;
      }
    `}
  `;
};

/** in px */
const wedgeWidth = spacing[100];
/** in px */
const wedgePaddingY = spacing[200];

export const getInputOptionWedge = ({
  disabled,
  highlighted,
}: InputOptionStyleArgs) => css`
  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: ${wedgeWidth}px;
    height: calc(100% - ${2 * wedgePaddingY}px);
    min-height: ${spacing[600]}px;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0) translateY(-50%);
    transform-origin: 0%; // 0% since we use translateY
    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: transform, background-color;

    ${highlighted &&
    css`
      transform: scaleY(1) translateY(-50%);
      background-color: ${palette.blue.base};
    `}

    ${disabled &&
    css`
      content: unset;
    `}
  }
`;
